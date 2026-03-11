console.log('app.js: Cargando script...');

// ─── Configuration ──────────────────────────────
const BACKEND_URL = '';

// ─── State ─────────────────────────────────────
let rawData = [], filtered = [];
let charts = {}, map, markerCluster;
let locMap = null, locMarker = null;
let encMap = {};
// cédula → metrics object
let currentSort = 'encuestas';
let currentPage = 1;

// Tabulator state for detail explorer
let detailTable;
let rankingTabulator;
const ROWS_PER_PAGE = 25;

// MM-111
let mm111Table = null;

// map of household situation codes to readable labels
// TODO: replace the placeholder strings with actual descriptions from the form

// ─── Chart color palette ────────────────────────
const COLORS = [
    '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B',
    '#39d0c4', '#EF4444', '#e3b341', '#a371f7',
    '#ffa657', '#79c0ff', '#56d364', '#ff7b72',
];


// ─── DOM refs ───────────────────────────────────
const $ = id => document.getElementById(id);

// ─── Bootstrap ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateModuleInfo();
    init();
});

// ─── Theme Management ───────────────────────────
function initTheme() {
    const defaultDark = true; // Por defecto es premium dark
    const storedTheme = localStorage.getItem('esca_theme');

    let isDark = defaultDark;
    if (storedTheme === 'light') isDark = false;
    else if (storedTheme === 'dark') isDark = true;

    applyTheme(isDark);

    const btn = $('btnThemeToggle');
    if (btn) {
        btn.addEventListener('click', () => {
            const isCurrentlyDark = document.documentElement.classList.contains('dark');
            applyTheme(!isCurrentlyDark);
        });
    }
}

function applyTheme(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('esca_theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('esca_theme', 'light');
    }

    // Si hay gráficos renderizados, forzamos su actualización de color
    updateChartsTheme(isDark);
}

function updateChartsTheme(isDark) {
    const textColor = isDark ? '#94a3b8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';

    Chart.defaults.color = textColor;
    Chart.defaults.scale.grid.color = gridColor;

    // Redraw all active charts
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.update === 'function') {
            chart.update('none'); // Update without animation
        }
    });
}

async function init() {
    console.log('app.js: Iniciando init()...');
    $('btnReset').addEventListener('click', resetFilters);
    $('btnRefresh').addEventListener('click', () => loadData($('assetSelect').value));
    $('searchEncuesta').addEventListener('input', () => applyFilters());
    $('assetSelect').addEventListener('change', (e) => loadData(e.target.value));


    // Off-Canvas Filters controls
    if ($('btnOpenFilters')) $('btnOpenFilters').addEventListener('click', openFiltersPanel);
    if ($('btnCloseFilters')) $('btnCloseFilters').addEventListener('click', closeFiltersPanel);
    if ($('filtersOverlay')) $('filtersOverlay').addEventListener('click', closeFiltersPanel);
    if ($('btnApplyFilters')) $('btnApplyFilters').addEventListener('click', () => { closeFiltersPanel(); applyFilters(); });

    // Primary Filters
    ['filterEncuestador', 'filterFechaInicio', 'filterFechaFin'].forEach(id => {
        if ($(id)) $(id).addEventListener('change', applyFilters);
    });

    // Meta diaria configurable: persiste en localStorage y re-calcula KPIs al cambiar
    const metaInput = $('inputMetaDiaria');
    if (metaInput) {
        try {
            const stored = localStorage.getItem('esca_meta_diaria');
            if (stored && !isNaN(Number(stored))) metaInput.value = stored;
        } catch (_) { }
        metaInput.addEventListener('input', () => {
            try { localStorage.setItem('esca_meta_diaria', metaInput.value); } catch (_) { }
            updateKPIs();
        });
    }

    // Cascading municipio -> parroquia -> nodo
    if ($('filterMunicipio')) {
        $('filterMunicipio').addEventListener('change', () => {
            const mun = $('filterMunicipio').value;
            const selPar = $('filterParroquia');
            const selNodo = $('filterNodo');
            if (!selPar || !selNodo) return;
            selPar.innerHTML = '<option value="">Todas</option>';
            selNodo.innerHTML = '<option value="">Todos</option>';
            const pars = new Set();
            const nodos = new Set();
            rawData.forEach(r => {
                if (r._meta && (mun === '' || r._meta.mun === mun)) {
                    if (r._meta.par) pars.add(r._meta.par);
                    if (r._meta.nodo) nodos.add(r._meta.nodo);
                }
            });
            [...pars].sort().forEach(p => { const o = document.createElement('option'); o.value = p; o.textContent = p; selPar.appendChild(o); });
            [...nodos].sort().forEach(n => { const o = document.createElement('option'); o.value = n; o.textContent = n; selNodo.appendChild(o); });
        });
    }

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(btn.dataset.tab);
        });
    });

    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentSort = btn.dataset.sort;
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRankingTable();
        });
    });

    await loadAssets();

    if (window.lucide) lucide.createIcons();
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active', 'bg-white', 'dark:bg-slate-800', 'text-brand-blue', 'dark:text-white', 'shadow-sm');
        b.classList.add('text-slate-500', 'hover:bg-slate-200', 'dark:hover:bg-slate-800');
        if (b.dataset.tab === tabId) {
            b.classList.add('active', 'bg-white', 'dark:bg-slate-800', 'text-brand-blue', 'dark:text-white', 'shadow-sm');
            b.classList.remove('text-slate-500', 'hover:bg-slate-200', 'dark:hover:bg-slate-800');
        }
    });

    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden-tab'));
    const target = $(tabId);
    if (target) {
        target.classList.remove('hidden-tab');
        if (tabId === 'tab-ranking' && rankingTabulator) rankingTabulator.redraw();
        if (tabId === 'tab-datos' && detailTable) detailTable.redraw();
        if (tabId === 'tab-mapa' && map) setTimeout(() => map.invalidateSize(), 150);
        if (tabId === 'tab-mm111') {
            if (mm111Table) mm111Table.redraw();
            if (!mm111Table && filtered.length > 0) initMM111Grid();
        }
    }
}

function renderChartHorario() {
    destroyChart('hor');
    const hoursCount = new Array(24).fill(0);
    filtered.forEach(r => {
        if (r._meta.hora !== null) hoursCount[r._meta.hora]++;
    });

    charts.hor = new Chart($('chartHorario'), {
        type: 'bar',
        data: {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: [{
                label: 'Encuestas Capturadas',
                data: hoursCount,
                backgroundColor: '#10B98144',
                borderColor: '#10B981',
                borderWidth: 1,
                borderRadius: 4,
            }]
        },
        options: {
            ...baseChartOpts(),
            indexAxis: 'x',
            plugins: {
                ...baseChartOpts().plugins,
                legend: { display: false }
            }
        }
    });
}

function initMap() {
    if (map) return;
    // Create base layers: OpenStreetMap (streets) and Esri World Imagery (satellite)
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
    const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri' });

    map = L.map('mapView', { center: [10.4806, -66.8983], zoom: 12, layers: [osm] }); // CCS default

    // Layer control and scale
    const baseLayers = { 'OpenStreetMap': osm, 'Satellite (Esri)': esriSat };
    L.control.layers(baseLayers, null, { collapsed: false }).addTo(map);
    L.control.scale().addTo(map);
    markerCluster = L.markerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true
    });
    map.addLayer(markerCluster);
}

function renderMap() {
    if (!map || !markerCluster) return;
    markerCluster.clearLayers();

    const points = filtered.filter(r => r._meta.lat && r._meta.lng);

    // ─── Map KPI Updates ───
    const completedOnMap = points.filter(r => /totalment/i.test(r._meta.nota)).length;
    const agentsOnMap = new Set(points.map(r => r._meta.cedula)).size;
    const flaggedDistance = points.filter(r => r._meta.flag_distance_gt_500).length;
    const munsOnMap = new Set(points.map(r => r._meta.mun).filter(m => m && m !== 'N/A'));
    const parsOnMap = new Set(points.map(r => r._meta.par).filter(p => p && p !== 'N/A'));
    const nodosOnMap = new Set(points.map(r => r._meta.nodo).filter(n => n && n !== 'N/A'));

    if ($('mapKpiPoints')) $('mapKpiPoints').textContent = points.length;
    if ($('mapKpiComplete')) $('mapKpiComplete').textContent = completedOnMap;
    if ($('mapKpiAgents')) $('mapKpiAgents').textContent = agentsOnMap;
    if ($('mapKpiFlagged')) $('mapKpiFlagged').textContent = flaggedDistance;

    // Coverage badge
    const badge = $('mapCoverageBadge');
    if (badge && points.length > 0) {
        badge.classList.remove('hidden');
        if ($('mapMunCount')) $('mapMunCount').textContent = munsOnMap.size;
        if ($('mapParCount')) $('mapParCount').textContent = parsOnMap.size;
        if ($('mapNodoCount')) $('mapNodoCount').textContent = nodosOnMap.size;
    }

    // ─── Create Color-Coded Circle Markers ───
    const markers = points.map(r => {
        const m = r._meta;
        const isComplete = /totalment/i.test(m.nota);
        const isFlagged = m.flag_distance_gt_500;

        // Color priority: flagged (red) > partial (orange) > complete (green)
        let color, borderColor, label;
        if (isFlagged) {
            color = '#EF4444'; borderColor = '#DC2626'; label = '⚠ Flag Distancia';
        } else if (isComplete) {
            color = '#10B981'; borderColor = '#059669'; label = 'Efectiva';
        } else {
            color = '#F59E0B'; borderColor = '#D97706'; label = 'No Respuesta';
        }

        const durText = m.durMin !== null ? `${Math.round(m.durMin)} min` : '—';
        const distText = m.distance_m !== null ? `${Math.round(m.distance_m)} m` : '—';

        const html = `
            <div class="p-4 min-w-[240px] bg-[#0f172a] text-slate-200 rounded-xl" style="font-family:'Inter',sans-serif">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Encuestador</span>
                    <span class="px-2 py-0.5 rounded-md text-[9px] font-bold text-white" style="background:${color}">${label}</span>
                </div>
                <div class="font-bold text-sm text-white mb-0.5">${m.nombre}</div>
                <div class="text-[10px] text-slate-400 mb-3">${m.fecha} · ${m.cedula}</div>
                <div class="grid grid-cols-3 gap-2 border-t border-white/5 pt-3 mb-3">
                    <div>
                        <div class="text-[8px] uppercase text-slate-500 font-bold">Municipio</div>
                        <div class="text-[10px] font-bold text-white">${m.mun}</div>
                    </div>
                    <div>
                        <div class="text-[8px] uppercase text-slate-500 font-bold">Parroquia</div>
                        <div class="text-[10px] font-bold text-white">${m.par || '—'}</div>
                    </div>
                    <div>
                        <div class="text-[8px] uppercase text-slate-500 font-bold">Nodo</div>
                        <div class="text-[10px] font-bold text-white">${m.nodo || '—'}</div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 border-t border-white/5 pt-3 mb-3">
                    <div>
                        <div class="text-[8px] uppercase text-slate-500 font-bold">Duración</div>
                        <div class="text-[10px] font-bold" style="color:${m.durMin !== null && m.durMin < 15 ? '#EF4444' : '#10B981'}">${durText}</div>
                    </div>
                    <div>
                        <div class="text-[8px] uppercase text-slate-500 font-bold">Distancia</div>
                        <div class="text-[10px] font-bold" style="color:${isFlagged ? '#EF4444' : '#94a3b8'}">${distText}</div>
                    </div>
                    <div>
                        <div class="text-[8px] uppercase text-slate-500 font-bold">Uso</div>
                        <div class="text-[10px] font-bold text-white">${(m.uso || '—').replace(/_/g, ' ')}</div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                    <div>
                        <div class="text-[8px] uppercase text-slate-500 font-bold">Condición</div>
                        <div class="text-[10px] font-bold text-white">${(m.condicion || '—').replace(/_/g, ' ')}</div>
                    </div>
                    <div>
                        <div class="text-[8px] uppercase text-slate-500 font-bold">Hogares / Pers.</div>
                        <div class="text-[10px] font-bold text-white">${m.hogares} / ${m.totalPers}</div>
                    </div>
                </div>
            </div>
        `;

        return L.circleMarker([m.lat, m.lng], {
            radius: 7,
            fillColor: color,
            color: borderColor,
            weight: 2,
            opacity: 0.9,
            fillOpacity: 0.7,
        }).bindPopup(html, { className: 'custom-popup', maxWidth: 320 });
    });

    markerCluster.addLayers(markers);
    if (markers.length > 0) {
        const bounds = markerCluster.getBounds();
        if (bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50] });
    }

    if (window.lucide) lucide.createIcons();
}

function switchTab(tabId) {
    if (!tabId) return;
    console.log('Cambiando a pestaña:', tabId);

    // Update buttons
    const tabsMenu = document.getElementById('mainTabs');
    if (tabsMenu) {
        tabsMenu.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('tab-btn-active', btn.dataset.tab === tabId);
            btn.classList.toggle('active', btn.dataset.tab === tabId); // Keep for legacy
        });
    }

    // Update content
    document.querySelectorAll('.tab-content').forEach(content => {
        const isTarget = content.id === tabId;
        content.classList.toggle('hidden-tab', !isTarget);
    });

    // Special handling for Map, Charts and Grid
    if (tabId === 'tab-mapa') {
        if (!map) initMap();
        setTimeout(() => map.invalidateSize(), 150);
        renderMap();
    }

    if (tabId === 'tab-ranking') {
        if (rankingTabulator) {
            setTimeout(() => {
                rankingTabulator.redraw(true);
            }, 50);
        }
    }

    if (tabId === 'tab-datos') {
        if (detailTable) {
            setTimeout(() => {
                detailTable.redraw(true);
                if (window.lucide) lucide.createIcons();
            }, 50);
        }
    }

    setTimeout(() => {
        Object.values(charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.update('none'); // Update without animation for speed
                chart.resize();
            }
        });
        window.dispatchEvent(new Event('resize')); // Universal trigger
    }, 50);

    if (window.lucide) lucide.createIcons();
}

function updateModuleInfo() {
    const d = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const display = document.getElementById('currentDateDisplay');
    if (display) display.textContent = d.toLocaleDateString('es-ES', options);
}


// ─── API Communication ─────────────────────────

async function loadAssets() {
    console.log('Iniciando loadAssets() con BACKEND_URL:', BACKEND_URL);
    showLoading('Buscando formularios en KoboToolbox…');
    try {
        const url = `${BACKEND_URL}/api/assets`;
        console.log('Fetching URL:', url);
        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error del backend:', response.status, errorText);
            throw new Error(`Error API (${response.status}): ${errorText}`);
        }

        const assets = await response.json();
        const sel = $('assetSelect');
        sel.innerHTML = '<option value="">— Seleccionar encuesta —</option>';

        assets.forEach(a => {
            const opt = document.createElement('option');
            opt.value = a.uid;
            opt.textContent = a.name;
            sel.appendChild(opt);
        });

        hideLoading();
        $('statusBadge').textContent = 'Conectado';
        if (window.lucide) lucide.createIcons();

        // Auto-select "ESCA Ampliada V3" if exists
        const escaV3 = assets.find(a => a.name.toLowerCase().includes('esca') && a.name.toLowerCase().includes('v3'));
        if (escaV3) {
            sel.value = escaV3.uid;
            loadData(escaV3.uid);
        }
    } catch (err) {
        console.error(err);
        hideLoading();
        $('errorState').style.display = 'flex';
        $('statusBadge').textContent = 'Error de conexión';
        $('statusBadge').classList.remove('active');
    }
}

async function loadData(uid) {
    if (!uid) return;

    showLoading('Descargando datos desde Kobo API…');
    $('btnRefresh').disabled = true;

    try {
        const response = await fetch(`${BACKEND_URL}/api/data/${uid}`);
        if (!response.ok) throw new Error('Error al descargar los datos');

        const json = await response.json();
        rawData = json.results || [];

        processData();

        $('statusBadge').textContent = `${rawData.length} registros`;
        $('errorState').classList.add('hidden');
        $('mainContent').classList.remove('hidden');
        if (window.lucide) lucide.createIcons();
    } catch (err) {
        alert('Error: ' + err.message);
    } finally {
        hideLoading();
        $('btnRefresh').disabled = false;
    }
}

function showLoading(msg) {
    $('loadingOverlay').style.display = 'flex';
    $('loadingMsg').textContent = msg;
}

function hideLoading() {
    $('loadingOverlay').style.display = 'none';
}

// ─── Data processing ────────────────────────────
function processData() {
    encMap = {};

    rawData.forEach(r => {
        const cedula = (r['S0/cedula_encuestador'] || 'N/A').trim();
        const nombre = (r['S0/s0_nombreapellido'] || 'Desconocido').trim();
        const start = r['start'] || '';
        const end = r['end'] || '';
        const fecha = (r['today'] || r['_submission_time'] || '').slice(0, 10);
        const nota = r['ubicacion_final/nota'] || '';
        const condicion = r['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || 'N/A';
        const mun = r['S1/mun'] || 'N/A';
        const par = r['S1/par'] || 'N/A';
        const nodo = r['S1/nodo'] || 'N/A';
        const semana = r['group_sh53u78/semana'] || '';

        const uso = r['S1/Uso_de_la_Unidad_inmobiliaria'] || 'N/A';
        const control = r['group_sh53u78/control'] || r['_uuid'] || '';
        // raw vivienda situation value (may be text codes)
        const situacion_vivienda = r['Condici_n_de_ocupaci_n/situacion_vivienda'] || '';

        // Census tracking fields
        const segmento = r['S1/segmento'] || r['S1/group_segmeto_sector/segmento'] || r['group_segmeto_sector/segmento'] || '';
        const sector = r['S1/sector'] || r['S1/group_segmeto_sector/sector'] || r['group_segmeto_sector/sector'] || '';
        const manzana = r['S1/manzana'] || '';
        const parcela = r['S1/parcela'] || '';
        const edificacion = r['S1/Edificaci_n'] || r['S1/edificacion'] || '';
        const lado_manz = r['S1/lado_manz'] || '';
        const n_linea = r['group_sh53u78/n_linea'] || '';
        const n_serie = r['group_sh53u78/n_serie'] || '';
        const direccion = r['S1/P_nomsect'] || r['S1/direccion'] || '';

        // Duration in minutes
        let durMin = null;
        if (start && end) {
            try {
                const s = new Date(start), e = new Date(end);
                durMin = Math.round((e - s) / 60000 * 10) / 10;
                if (durMin < 0 || durMin > 600) durMin = null;
            } catch (_) { }
        }

        // Households & persons
        const hogares = Array.isArray(r['datos_hogar/hogar']) ? r['datos_hogar/hogar'] : [];
        let totalPers = 0;
        let totalProd = 0;
        hogares.forEach(h => {
            const ints = Array.isArray(h['datos_hogar/hogar/integrantes_hogar']) ? h['datos_hogar/hogar/integrantes_hogar'] : [];
            totalPers += ints.length;
        });

        // Hour for productivity chart
        let hora = null;
        if (start) {
            try { hora = new Date(start).getHours(); } catch (_) { }
        }

        // GPS Coords
        let lat = null, lng = null;
        if (r['_geolocation'] && r['_geolocation'].length >= 2) {
            lat = r['_geolocation'][0];
            lng = r['_geolocation'][1];
        } else if (r['S1/ubicacion']) { // Algunos formularios usan este path
            const parts = r['S1/ubicacion'].split(' ');
            if (parts.length >= 2) { lat = parseFloat(parts[0]); lng = parseFloat(parts[1]); }
        }

        // Compute distance between start-geopoint and location if available
        let distance_m = null;
        try {
            const sgeo = r['start-geopoint'] || r['start_geopoint'] || r['start-geopoint'];
            const egeo = r['group_sh53u78/ubicacion_i'] || r['end-geopoint'] || r['end_geopoint'];
            const startPt = parseGeoString(sgeo) || (r['_geolocation'] && r['_geolocation'].length >= 2 ? [r['_geolocation'][0], r['_geolocation'][1]] : null);
            const endPt = parseGeoString(egeo) || (r['_geolocation'] && r['_geolocation'].length >= 2 ? [r['_geolocation'][0], r['_geolocation'][1]] : null);
            if (startPt && endPt) {
                distance_m = haversineMeters(startPt[0], startPt[1], endPt[0], endPt[1]);
            }
        } catch (e) { distance_m = null; }

        // Flags: short duration and distance
        const flag_short_duration = (durMin !== null && durMin < 15);
        const flag_distance_gt_500 = (distance_m !== null && distance_m > 500);

        r._meta = {
            cedula, nombre, fecha, durMin, nota, condicion, mun, par, nodo, uso, semana,
            hogares: hogares.length, totalPers, totalProd, control, hora, lat, lng,
            situacion_vivienda, segmento, sector, manzana, parcela, edificacion, lado_manz,
            n_linea, n_serie, direccion
        };
        // set a simple estado for legacy checks (used for marker color)
        r._meta.estado = /totalment/i.test(nota) ? 'completada' : 'parcial';
        // attach flags and diagnostics
        r._meta.distance_m = distance_m;
        r._meta.flag_distance_gt_500 = flag_distance_gt_500;
        r._meta.flag_short_duration = flag_short_duration;

        if (!encMap[cedula]) {
            encMap[cedula] = {
                cedula, nombre,
                encuestas: 0,
                completadas: 0,
                duraciones: [],
                personas: 0,
                municipios: new Set(),
                condiciones: {},
            };
        }
        const m = encMap[cedula];
        m.encuestas++;
        if (/totalment/i.test(nota)) m.completadas++;
        if (durMin !== null) m.duraciones.push(durMin);
        m.personas += totalPers;
        m.municipios.add(mun);
        m.condiciones[condicion] = (m.condiciones[condicion] || 0) + 1;
    });

    Object.values(encMap).forEach(m => {
        m.avgDur = m.duraciones.length ? avg(m.duraciones) : null;
        m.pctCompleta = m.encuestas ? Math.round(m.completadas / m.encuestas * 100) : 0;
        m.score = calcScore(m);
    });

    populateFilters();
    filtered = [...rawData];
    renderAll();
}

function calcScore(m) {
    const maxEnc = Math.max(...Object.values(encMap).map(x => x.encuestas), 1);
    const volScore = m.encuestas / maxEnc * 100;
    const effScore = m.avgDur != null ? Math.max(0, 100 - Math.abs(m.avgDur - 40) * 2) : 50;
    return Math.round(m.pctCompleta * 0.4 + volScore * 0.3 + effScore * 0.3);
}

function populateFilters() {
    const selEnc = $('filterEncuestador');
    const selMun = $('filterMunicipio');
    const selCon = $('filterCondicion');
    const selSitV = $('filterSituacionVivienda');
    const selUso = $('filterUso');
    const selSemana = $('filterSemana');
    const selControl = $('filterControl');
    const selPar = $('filterParroquia');
    const selNodo = $('filterNodo');
    selEnc.innerHTML = '<option value="">Todos</option>';
    selMun.innerHTML = '<option value="">Todos</option>';
    // IDs and statuses no longer used
    selCon.innerHTML = '<option value="">Todas</option>';
    selUso.innerHTML = '<option value="">Todos</option>';
    if (selSemana) selSemana.innerHTML = '<option value="">Todas</option>';
    if (selControl) selControl.innerHTML = '<option value="">Todos</option>';
    if (selPar) selPar.innerHTML = '<option value="">Todas</option>';
    if (selNodo) selNodo.innerHTML = '<option value="">Todos</option>';

    const muns = new Set();
    const sitVs = new Set();
    const cons = new Set();
    const usos = new Set();
    const semanas = new Set();
    const controles = new Set();
    const pars = new Set();
    const nodos = new Set();
    Object.values(encMap).sort((a, b) => a.nombre.localeCompare(b.nombre)).forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.cedula;
        opt.textContent = `${m.nombre} (${m.cedula})`;
        selEnc.appendChild(opt);
    });
    rawData.forEach(r => {
        if (r._meta.mun !== 'N/A') muns.add(r._meta.mun);
        if (r._meta.situacion_vivienda) sitVs.add(r._meta.situacion_vivienda);
        if (r._meta.condicion !== 'N/A') cons.add(r._meta.condicion);
        if (r._meta.uso !== 'N/A') usos.add(r._meta.uso);
        if (r._meta.semana) semanas.add(r._meta.semana);
        if (r._meta.control) controles.add(r._meta.control);
        if (r._meta.par && r._meta.par !== 'N/A') pars.add(r._meta.par);
        if (r._meta.nodo && r._meta.nodo !== 'N/A') nodos.add(r._meta.nodo);
    });
    [...muns].sort().forEach(mun => {
        const opt = document.createElement('option');
        opt.value = mun;
        opt.textContent = mun;
        selMun.appendChild(opt);
    });
    if (selSitV) {
        [...sitVs].sort().forEach(v => {
            const o = document.createElement('option');
            o.value = v;
            o.textContent = v.replace(/_/g, ' ').toUpperCase();
            selSitV.appendChild(o);
        });
    }
    if (selSemana) [...semanas].sort().forEach(s => { const o = document.createElement('option'); o.value = s; o.textContent = s; selSemana.appendChild(o); });
    if (selControl) [...controles].sort().forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; selControl.appendChild(o); });
    if (selPar) [...pars].sort().forEach(p => { const o = document.createElement('option'); o.value = p; o.textContent = p; selPar.appendChild(o); });
    if (selNodo) [...nodos].sort().forEach(n => { const o = document.createElement('option'); o.value = n; o.textContent = n; selNodo.appendChild(o); });
    // status filter disabled since we no longer handle statuses
    [...cons].sort().forEach(con => {
        const opt = document.createElement('option');
        opt.value = con;
        opt.textContent = con.replace(/_/g, ' ').toUpperCase();
        selCon.appendChild(opt);
    });
    [...usos].sort().forEach(uso => {
        const opt = document.createElement('option');
        opt.value = uso;
        opt.textContent = uso.replace(/_/g, ' ').toUpperCase();
        selUso.appendChild(opt);
    });

    // Trigger municipality cascade to populate parroquias/nodos for current selection
    if ($('filterMunicipio')) $('filterMunicipio').dispatchEvent(new Event('change'));
}

function applyFilters() {
    const query = $('searchEncuesta') ? $('searchEncuesta').value.toLowerCase() : '';
    const enc = $('filterEncuestador') ? $('filterEncuestador').value : '';
    const fi = $('filterFechaInicio') ? $('filterFechaInicio').value : '';
    const ff = $('filterFechaFin') ? $('filterFechaFin').value : '';

    // Secondary Filters (Off-Canvas)
    const semana = $('filterSemana') ? $('filterSemana').value : '';
    const control = $('filterControl') ? $('filterControl').value : '';
    const mun = $('filterMunicipio') ? $('filterMunicipio').value : '';
    const parroquia = $('filterParroquia') ? $('filterParroquia').value : '';
    const nodo = $('filterNodo') ? $('filterNodo').value : '';
    const estado = $('filterEstado') ? $('filterEstado').value : '';
    const situacionVivienda = $('filterSituacionVivienda') ? $('filterSituacionVivienda').value : '';
    const condicion = $('filterCondicion') ? $('filterCondicion').value : '';
    const uso = $('filterUso') ? $('filterUso').value : '';

    filtered = rawData.filter(r => {
        const m = r._meta;
        if (query && !(m.nombre.toLowerCase().includes(query) || m.cedula.includes(query) || m.control.includes(query))) return false;
        if (enc && m.cedula !== enc) return false;
        if (fi && m.fecha < fi) return false;
        if (ff && m.fecha > ff) return false;
        if (semana && m.semana !== semana) return false;
        if (control && m.control !== control) return false;
        if (mun && m.mun !== mun) return false;
        if (parroquia && m.par !== parroquia) return false;
        if (nodo && m.nodo !== nodo) return false;
        if (estado === 'completada' && !/totalment/i.test(m.nota)) return false;
        if (estado === 'parcial' && /totalment/i.test(m.nota)) return false;
        if (situacionVivienda && m.situacion_vivienda !== situacionVivienda) return false;
        if (condicion && m.condicion !== condicion) return false;
        if (uso && m.uso !== uso) return false;
        return true;
    });

    renderActiveFilterTags();
    renderAll();
}

// ─── Off-Canvas & Mobile Feedback ───────────────────────────

function openFiltersPanel() {
    $('offCanvasFilters').classList.remove('translate-x-full');
    $('filtersOverlay').classList.remove('hidden');
    // slight delay for transition
    setTimeout(() => $('filtersOverlay').classList.remove('opacity-0'), 10);
}

function closeFiltersPanel() {
    $('offCanvasFilters').classList.add('translate-x-full');
    $('filtersOverlay').classList.add('opacity-0');
    setTimeout(() => $('filtersOverlay').classList.add('hidden'), 300);
}

function renderActiveFilterTags() {
    const container = $('activeFiltersContainer');
    const badge = $('activeFiltersBadge');
    if (!container || !badge) return;

    const filters = [
        { id: 'filterMunicipio', label: 'Mpio' },
        { id: 'filterParroquia', label: 'Parr' },
        { id: 'filterNodo', label: 'Nodo' },
        { id: 'filterEstado', label: 'Estado' },
        { id: 'filterCondicion', label: 'Condición' },
        { id: 'filterSituacionVivienda', label: 'Sit. Viv' },
        { id: 'filterUso', label: 'Uso' },
        { id: 'filterSemana', label: 'Sem' },
        { id: 'filterControl', label: 'Control' }
    ];

    let activeCount = 0;
    container.innerHTML = '';

    filters.forEach(f => {
        const el = $(f.id);
        if (el && el.value) {
            activeCount++;
            const text = el.options[el.selectedIndex].text;

            const btn = document.createElement('button');
            btn.className = 'group flex items-center gap-2 px-3 py-1.5 bg-brand-blue/10 hover:bg-brand-red/10 border border-brand-blue/30 hover:border-brand-red/30 text-brand-blue hover:text-brand-red rounded-lg text-[10px] font-bold transition-all';
            btn.innerHTML = `<span class="opacity-70">${f.label}:</span> <span>${text}</span> <i data-lucide="x" class="w-3 h-3 group-hover:scale-110 transition-transform"></i>`;

            // Remove filter on click
            btn.addEventListener('click', () => {
                el.value = '';
                // trigger cascade if municipality is removed
                if (f.id === 'filterMunicipio') el.dispatchEvent(new Event('change'));
                applyFilters();
            });

            container.appendChild(btn);
        }
    });

    if (activeCount > 0) {
        badge.textContent = activeCount;
        badge.classList.remove('hidden');
        container.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
        container.classList.add('hidden');
    }

    if (window.lucide) lucide.createIcons();
}

function resetFilters() {
    ['filterEncuestador', 'filterFechaInicio', 'filterFechaFin', 'filterSemana', 'filterControl', 'filterMunicipio', 'filterParroquia', 'filterNodo', 'filterEstado', 'filterCondicion', 'filterSituacionVivienda', 'filterUso', 'searchEncuesta']
        .forEach(id => { if ($(id)) $(id).value = ''; });

    // trigger cascade reset
    if ($('filterMunicipio')) $('filterMunicipio').dispatchEvent(new Event('change'));

    filtered = [...rawData];
    renderActiveFilterTags();
    renderAll();
}

function renderAll() {
    updateKPIs();
    renderChartEncuestador();
    renderChartDuracion();
    renderChartHorario();
    renderChartHistograma();
    renderChartCondicion();
    renderChartUso();
    renderChartPorDia();
    renderRankingTable();
    renderEncuestadorCards();
    updateGrid();
    renderMap();
    renderMM111();
    if (window.lucide) lucide.createIcons();
}

// ─── Visual Rendering ───────────────────────────

function updateKPIs() {
    const completadas = filtered.filter(r => /totalment/i.test(r._meta.nota)).length;
    const encs = new Set(filtered.map(r => r._meta.cedula)).size;
    const durs = filtered.map(r => r._meta.durMin).filter(d => d !== null);
    const avgDuracion = durs.length ? avg(durs) : 0;
    const personas = filtered.reduce((s, r) => s + r._meta.totalPers, 0);
    const municipios = new Set(filtered.map(r => r._meta.mun)).size;

    $('kpiTotal').textContent = filtered.length;
    $('kpiCompletadas').textContent = completadas;
    $('kpiEncuestadores').textContent = encs;
    $('kpiDuracion').textContent = avgDuracion ? `${Math.round(avgDuracion)} min` : 'N/A';
    $('kpiPersonas').textContent = personas;
    $('kpiMunicipios').textContent = municipios;

    // Productivity Module KPIs
    const encPerHour = filtered.length / (encs * 8 || 1); // Mock 8h shift
    $('kpiEncPerHour').textContent = encPerHour.toFixed(1);

    const producers = {};
    filtered.forEach(r => { producers[r._meta.nombre] = (producers[r._meta.nombre] || 0) + 1; });
    const topProducer = Object.entries(producers).sort((a, b) => b[1] - a[1])[0] || ["--", 0];
    $('kpiTopProducer').textContent = topProducer[0].split(' ')[0];
    $('kpiTopProducerVal').textContent = `${topProducer[1]} encuestas`;

    const hours = {};
    filtered.forEach(r => { if (r._meta.hora !== null) hours[r._meta.hora] = (hours[r._meta.hora] || 0) + 1; });
    const peakHour = Object.entries(hours).sort((a, b) => b[1] - a[1])[0] || [null, 0];
    $('kpiPeakHour').textContent = peakHour[0] !== null ? `${peakHour[0]}:00` : '--';

    // Meta diaria configurable via DOM input (default 20)
    const metaInput = $('inputMetaDiaria');
    const meta = metaInput && !isNaN(Number(metaInput.value)) && Number(metaInput.value) > 0
        ? Number(metaInput.value)
        : 20;
    const metaGlobal = encs * meta;
    const progreso = Math.min(100, (filtered.length / (metaGlobal || 1)) * 100);
    $('kpiMetaProgreso').textContent = `${Math.round(progreso)}%`;
    $('kpiMetaBar').style.width = `${progreso}%`;
}

function destroyChart(id) {
    if (charts[id]) { charts[id].destroy(); delete charts[id]; }
}

function baseChartOpts() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { font: { size: 11, family: "'Inter', sans-serif" } } },
            tooltip: {
                backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                titleColor: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#0f172a',
                bodyColor: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#334155',
                borderColor: document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                borderWidth: 1
            }
        },
        scales: {
            x: { ticks: { font: { size: 10, family: "'Inter', sans-serif" } }, grid: {} },
            y: { ticks: { font: { size: 10, family: "'Inter', sans-serif" } }, grid: {} }
        }
    };
}

function renderChartEncuestador() {
    destroyChart('enc');
    const counts = {};
    filtered.forEach(r => {
        const n = r._meta.nombre.split(' ')[0];
        counts[n] = (counts[n] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 15);

    charts.enc = new Chart($('chartEncuestador'), {
        type: 'bar',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{
                label: 'Encuestas',
                data: sorted.map(e => e[1]),
                backgroundColor: '#3B82F666',
                borderColor: '#3B82F6',
                borderWidth: 1,
                borderRadius: 4,
            }]
        },
        options: baseChartOpts(),
    });
}

function renderChartDuracion() {
    destroyChart('dur');
    const durPerEnc = {};
    filtered.forEach(r => {
        const n = r._meta.nombre.split(' ')[0];
        if (r._meta.durMin !== null) {
            if (!durPerEnc[n]) durPerEnc[n] = [];
            durPerEnc[n].push(r._meta.durMin);
        }
    });
    const sorted = Object.entries(durPerEnc)
        .map(([k, v]) => [k, avg(v)])
        .sort((a, b) => b[1] - a[1]).slice(0, 15);

    charts.dur = new Chart($('chartDuracion'), {
        type: 'bar',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{
                label: 'Minutos Promedio',
                data: sorted.map(e => Math.round(e[1])),
                backgroundColor: '#8B5CF666',
                borderColor: '#8B5CF6',
                borderWidth: 1,
                borderRadius: 4,
            }]
        },
        options: baseChartOpts(),
    });
}

function renderChartHistograma() {
    destroyChart('histo');
    const bins = [0, 20, 40, 60, 90, 120, 999];
    const labels = ['<20', '20-40', '40-60', '60-90', '90-120', '>120'];
    const counts = new Array(labels.length).fill(0);

    filtered.forEach(r => {
        const d = r._meta.durMin;
        if (d === null) return;
        for (let i = 0; i < bins.length - 1; i++) { if (d < bins[i + 1]) { counts[i]++; break; } }
    });

    charts.histo = new Chart($('chartHistograma'), {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                data: counts,
                backgroundColor: '#F59E0B66',
                borderColor: '#F59E0B',
                borderWidth: 1
            }]
        },
        options: baseChartOpts(),
    });
}

function renderChartCondicion() {
    destroyChart('cond');
    const counts = {};
    filtered.forEach(r => {
        const c = r._meta.condicion.replace(/_/g, ' ');
        counts[c] = (counts[c] || 0) + 1;
    });
    const entries = Object.entries(counts);

    charts.cond = new Chart($('chartCondicion'), {
        type: 'doughnut',
        data: {
            labels: entries.map(e => e[0]),
            datasets: [{
                data: entries.map(e => e[1]),
                backgroundColor: COLORS.map(c => c + 'aa'),
                borderColor: '#1c2128'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom', labels: { color: '#8b949e', boxWidth: 10, font: { size: 9 } } } }
        }
    });
    // update total below chart
    try {
        const totalCond = entries.reduce((s, e) => s + e[1], 0);
        if ($('condicionTotal')) $('condicionTotal').textContent = `Total: ${totalCond}`;
    } catch (e) { }
}


function renderChartPorDia() {
    destroyChart('dia');
    const counts = {};
    filtered.forEach(r => { if (r._meta.fecha) counts[r._meta.fecha] = (counts[r._meta.fecha] || 0) + 1; });
    const sorted = Object.entries(counts).sort();

    charts.dia = new Chart($('chartPorDia'), {
        type: 'line',
        data: {
            labels: sorted.map(e => e[0]),
            datasets: [{
                label: 'Encuestas',
                data: sorted.map(e => e[1]),
                borderColor: '#10B981',
                backgroundColor: '#10B98122',
                fill: true,
                tension: 0.3
            }]
        },
        options: baseChartOpts()
    });
}

function renderRankingTable() {
    const encsInFiltered = new Set(filtered.map(r => r._meta.cedula));
    let rows = Object.values(encMap).filter(m => encsInFiltered.has(m.cedula));

    const sortFns = {
        encuestas: (a, b) => b.encuestas - a.encuestas,
        completadas: (a, b) => b.completadas - a.completadas,
        duracion: (a, b) => (a.avgDur || 999) - (b.avgDur || 999),
        personas: (a, b) => b.personas - a.personas,
        eficiencia: (a, b) => b.score - a.score,
    };
    rows.sort(sortFns[currentSort] || sortFns.encuestas);

    const tableData = rows.map((m, i) => ({
        pos: i + 1,
        nombre: m.nombre,
        cedula: m.cedula,
        encuestas: m.encuestas,
        completadas: m.completadas,
        pctCompleta: m.pctCompleta,
        avgDur: m.avgDur != null ? Math.round(m.avgDur) : null,
        personas: m.personas,
        municipios: m.municipios.size,
        score: m.score,
    }));

    if (!rankingTabulator) {
        rankingTabulator = new Tabulator('#rankingTable', {
            data: tableData,
            layout: 'fitColumns',
            height: '420px',
            responsiveLayout: 'collapse',
            placeholder: '<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:13px;font-family:Inter,sans-serif;">Sin datos de agentes</div>',
            initialSort: [{ column: 'score', dir: 'desc' }],
            columns: [
                {
                    formatter: 'responsiveCollapse', width: 30, minWidth: 30, hozAlign: 'center',
                    headerSort: false, resizable: false, responsive: 0
                },
                {
                    title: '#', field: 'pos', width: 55, hozAlign: 'center', headerSort: false,
                    frozen: true, responsive: 0,
                    formatter: function (cell) {
                        const v = cell.getValue();
                        if (v === 1) return '<span style="font-size:18px" title="1er lugar">🥇</span>';
                        if (v === 2) return '<span style="font-size:18px" title="2do lugar">🥈</span>';
                        if (v === 3) return '<span style="font-size:18px" title="3er lugar">🥉</span>';
                        return `<span style="color:var(--text-muted);font-weight:800;font-size:12px;font-family:'Outfit',sans-serif">${v}</span>`;
                    }
                },
                {
                    title: 'Agente', field: 'nombre', minWidth: 140, frozen: true, responsive: 0,
                    formatter: function (cell) {
                        const d = cell.getData();
                        return `<div>
                            <div style="font-weight:800;color:var(--text-primary);font-size:12px;line-height:1.3;font-family:Inter,sans-serif;">${d.nombre}</div>
                            <div style="font-size:9px;color:var(--text-muted);font-weight:600;letter-spacing:0.03em;font-family:Inter,sans-serif;">${d.cedula}</div>
                        </div>`;
                    }
                },
                {
                    title: 'Vol.', field: 'encuestas', hozAlign: 'center', width: 65,
                    sorter: 'number', responsive: 0,
                    formatter: function (cell) {
                        return `<span style="font-weight:800;color:#3B82F6;font-family:'Outfit',sans-serif;font-size:14px">${cell.getValue()}</span>`;
                    }
                },
                {
                    title: '% Efect.', field: 'pctCompleta', hozAlign: 'center', width: 90,
                    sorter: 'number', responsive: 2,
                    formatter: function (cell) {
                        const v = cell.getValue();
                        const color = v >= 80 ? '#10B981' : v >= 50 ? '#F59E0B' : '#EF4444';
                        const bg = v >= 80 ? 'rgba(16,185,129,0.15)' : v >= 50 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)';
                        return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px">
                            <span style="font-weight:800;color:${color};font-size:12px;font-family:'Outfit',sans-serif">${v}%</span>
                            <div style="width:100%;height:4px;background:var(--border-medium);border-radius:4px;overflow:hidden">
                                <div style="width:${v}%;height:100%;background:${color};border-radius:4px;transition:width 0.6s ease"></div>
                            </div>
                        </div>`;
                    }
                },
                {
                    title: 'Dur.', field: 'avgDur', hozAlign: 'center', width: 80,
                    sorter: 'number', responsive: 3,
                    formatter: function (cell) {
                        const v = cell.getValue();
                        if (v === null) return '<span style="color:var(--text-muted)">—</span>';
                        let color, icon;
                        if (v < 15) { color = '#EF4444'; icon = '⚡'; }
                        else if (v < 25) { color = '#F59E0B'; icon = '⏱'; }
                        else { color = '#10B981'; icon = '✓'; }
                        return `<span style="color:${color};font-weight:700;font-size:11px" title="${v} min promedio">${icon} ${v}m</span>`;
                    }
                },
                {
                    title: 'Pers.', field: 'personas', hozAlign: 'center', width: 65,
                    sorter: 'number', responsive: 4,
                    formatter: function (cell) {
                        return `<span style="font-weight:600;color:var(--text-muted)">${cell.getValue()}</span>`;
                    }
                },
                {
                    title: 'Mun.', field: 'municipios', hozAlign: 'center', width: 60,
                    sorter: 'number', responsive: 4,
                    formatter: function (cell) {
                        return `<span style="font-weight:600;color:#8B5CF6">${cell.getValue()}</span>`;
                    }
                },
                {
                    title: 'Score', field: 'score', hozAlign: 'center', width: 90,
                    sorter: 'number', responsive: 0,
                    formatter: function (cell) {
                        const v = cell.getValue();
                        const color = v >= 70 ? '#10B981' : v >= 40 ? '#F59E0B' : '#EF4444';
                        const bg = v >= 70 ? 'rgba(16,185,129,0.12)' : v >= 40 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)';
                        return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px">
                            <span style="font-weight:900;color:${color};font-size:14px;font-family:'Outfit',sans-serif">${v}</span>
                            <div style="width:100%;height:5px;background:var(--border-medium);border-radius:4px;overflow:hidden">
                                <div style="width:${v}%;height:100%;background:linear-gradient(90deg,${color},${color}aa);border-radius:4px;transition:width 0.6s ease"></div>
                            </div>
                        </div>`;
                    }
                },
            ],
        });

        // Row click → filter dashboard by agent
        rankingTabulator.on('rowClick', function (e, row) {
            const cedula = row.getData().cedula;
            if (cedula && $('filterEncuestador')) {
                $('filterEncuestador').value = cedula;
                applyFilters();
            }
        });
    } else {
        rankingTabulator.setData(tableData);
    }
}

function renderEncuestadorCards() {
    const encsInFiltered = new Set(filtered.map(r => r._meta.cedula));
    const rows = Object.values(encMap).filter(m => encsInFiltered.has(m.cedula)).sort((a, b) => b.score - a.score);

    $('cardsGrid').innerHTML = rows.slice(0, 12).map(m => `
    <div class="card-premium flex flex-col gap-4">
      <div class="flex justify-between items-start">
        <div class="font-black text-white leading-tight truncate w-full" title="${m.nombre}">${m.nombre}</div>
      </div>
      <div class="text-[10px] text-slate-500 font-bold tracking-wider uppercase">ID: ${m.cedula}</div>
      <div class="grid grid-cols-3 gap-2 mt-2">
        <div class="p-2 bg-brand-950/50 rounded-lg text-center">
            <div class="text-xs font-black text-brand-blue">${m.encuestas}</div>
            <div class="text-[8px] uppercase text-slate-600 font-bold">Enc.</div>
        </div>
        <div class="p-2 bg-brand-950/50 rounded-lg text-center">
            <div class="text-xs font-black text-brand-green">${m.pctCompleta}%</div>
            <div class="text-[8px] uppercase text-slate-600 font-bold">Cmpl.</div>
        </div>
        <div class="p-2 bg-brand-950/50 rounded-lg text-center">
            <div class="text-xs font-black text-brand-orange">${m.score}</div>
            <div class="text-[8px] uppercase text-slate-600 font-bold">Pts.</div>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <span class="text-[10px] text-slate-500 font-medium">Municipios: ${m.municipios.size}</span>
        <div class="w-8 h-8 rounded-full border border-brand-blue/30 flex items-center justify-center text-[10px] font-black text-brand-blue">
            #${rows.indexOf(m) + 1}
        </div>
      </div>
    </div>`).join('');
}

// Tabulator-based detail explorer with advanced features
function initGrid() {
    if (detailTable) return;
    detailTable = new Tabulator('#detailGrid', {
        data: [],
        layout: 'fitColumns',
        height: '100%',
        pagination: true,
        paginationSize: ROWS_PER_PAGE,
        paginationSizeSelector: [10, 25, 50, 100],
        movableColumns: true,
        responsiveLayout: 'collapse',
        clipboard: true, // Enable clipboard support
        placeholder: '<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">Cargando base de datos...</div>',
        columnHeaderVertAlign: 'bottom',
        columns: [
            {
                formatter: 'responsiveCollapse', width: 30, minWidth: 30, hozAlign: 'center',
                headerSort: false, resizable: false, responsive: 0
            },
            {
                title: 'Identificación',
                columns: [
                    { title: 'Cédula', field: 'cedula', headerFilter: 'input', minWidth: 90, frozen: true, responsive: 0 },
                    { title: 'Nombre', field: 'nombre', headerFilter: 'input', minWidth: 140, frozen: true, responsive: 0 },
                    { title: 'Control', field: 'control', headerFilter: 'input', width: 90, responsive: 2 },
                ]
            },
            {
                title: 'Contexto',
                columns: [
                    { title: 'Fecha', field: 'fecha', headerFilter: 'input', width: 90, sorter: 'date', responsive: 1 },
                    { title: 'Municipio', field: 'mun', headerFilter: 'input', width: 90, responsive: 2 },
                    { title: 'Parroquia', field: 'par', headerFilter: 'input', width: 90, responsive: 4 },
                    { title: 'Segm.', field: 'segmento', headerFilter: 'input', width: 70, hozAlign: 'center', responsive: 4 },
                    { title: 'Sect.', field: 'sector', headerFilter: 'input', width: 70, hozAlign: 'center', responsive: 4 },
                ]
            },
            {
                title: 'Métricas',
                columns: [
                    {
                        title: 'Estado', field: 'estado', width: 100, responsive: 0,
                        headerFilter: 'list', headerFilterParams: { valuesLookup: true, clearable: true },
                        formatter: function (cell) {
                            const v = cell.getValue();
                            const color = v === 'completada' ? '#10B981' : '#F59E0B';
                            const label = v === 'completada' ? 'EFECTIVA' : 'PARCIAL';
                            return `<span style="color:${color};font-weight:700;font-size:10px;letter-spacing:0.02em">${label}</span>`;
                        }
                    },
                    {
                        title: 'Dur.', field: 'durMin', width: 70, hozAlign: 'center', responsive: 2,
                        formatter: function (cell) {
                            const v = cell.getValue();
                            if (v === null) return '—';
                            const color = v < 15 ? '#EF4444' : v < 25 ? '#F59E0B' : '#10B981';
                            return `<span style="color:${color};font-weight:800;font-family:Outfit,sans-serif;">${v}m</span>`;
                        }
                    },
                    {
                        title: 'Dist.', field: 'dist', width: 70, hozAlign: 'center', responsive: 3,
                        formatter: function (cell) {
                            const v = cell.getValue();
                            if (v === null) return '—';
                            const isFlagged = cell.getData().flagDist;
                            const color = isFlagged ? '#EF4444' : 'var(--text-muted)';
                            return `<span style="color:${color};font-weight:600">${v}m ${isFlagged ? '⚠' : ''}</span>`;
                        }
                    },
                ]
            },
            {
                title: 'Social',
                columns: [
                    { title: 'Hog.', field: 'hogares', width: 50, hozAlign: 'center', responsive: 4 },
                    { title: 'Pers.', field: 'personas', width: 50, hozAlign: 'center', responsive: 4 },
                ]
            },
            {
                title: 'Acciones', width: 160, headerSort: false, hozAlign: 'center', responsive: 0,
                formatter: function (cell) {
                    return `
                        <div class="flex gap-2">
                            <button class="tab-action-btn btn-view" data-action="view">
                                <i data-lucide="eye" style="width:12px;height:12px;pointer-events:none;"></i> VER
                            </button>
                        </div>
                    `;
                },
                cellClick: function (e, cell) {
                    e.stopPropagation();
                    const btn = e.target.closest('button');
                    if (!btn) return;

                    const action = btn.dataset.action;
                    const rec = cell.getData()._rec;

                    if (!rec) return;

                    if (action === 'view') {
                        showDetailModal(rec);
                    }
                }
            }
        ],
        rowFormatter: function (row) {
            const data = row.getData();
            if (data.estado === 'completada') row.getElement().classList.add('row-complete');
            else if (data.estado === 'parcial') row.getElement().classList.add('row-partial');
            if (data.flagDist || data.flagDur) row.getElement().classList.add('row-flagged');
        }
    });

    detailTable.on('rowClick', function (e, row) {
        const rec = row.getData()._rec;
        if (rec) showDetailModal(rec);
    });

    detailTable.on('tableBuilt', () => {
        if (window.lucide) lucide.createIcons();
    });
}

// Global helpers removed in favor of Tabulator cellClick events native delegation

function updateGrid(data = filtered) {
    if (!detailTable) initGrid();
    const rows = data.map(rec => {
        const m = rec._meta || {};
        return {
            _rec: rec,
            id: m.control || rec._uuid,
            cedula: m.cedula || '',
            nombre: m.nombre || '',
            control: m.control || '',
            fecha: m.fecha || '',
            mun: m.mun || '',
            par: m.par || '',
            nodo: m.nodo || '',
            segmento: m.segmento || '',
            sector: m.sector || '',
            estado: m.estado || '',
            durMin: m.durMin,
            dist: m.distance_m ? Math.round(m.distance_m) : null,
            flagDist: m.flag_distance_gt_500,
            flagDur: m.flag_short_duration,
            hogares: m.hogares || 0,
            personas: m.totalPers || 0,
            lat: rec.lat || m.lat || (rec._geolocation ? rec._geolocation[0] : null),
            lng: rec.lng || m.lng || (rec._geolocation ? rec._geolocation[1] : null)
        };
    });
    detailTable.setData(rows);
}



function renderChartUso() {
    destroyChart('uso');
    const counts = {};
    filtered.forEach(r => {
        const u = (r._meta.uso || 'N/A').replace(/_/g, ' ').toUpperCase();
        counts[u] = (counts[u] || 0) + 1;
    });
    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    charts.uso = new Chart($('chartUso'), {
        type: 'doughnut',
        data: {
            labels: entries.map(e => e[0]),
            datasets: [{
                data: entries.map(e => e[1]),
                backgroundColor: COLORS.map(c => c + 'aa'),
                borderColor: '#1c2128'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#8b949e', boxWidth: 8, font: { size: 8 } }
                }
            }
        }
    });
    try {
        const totalUso = entries.reduce((s, e) => s + e[1], 0);
        if ($('usoTotal')) $('usoTotal').textContent = `Total: ${totalUso}`;
    } catch (e) { }
}

// Detail modal control
// Detail modal control (Split-Card Design with Integrated Map)
let detailMiniMapObj = null;

function showDetailModal(rec) {
    const modal = $('detailModal');
    const body = $('detailModalBody');
    if (!modal || !body || !rec) return;

    const extractNested = (path) => {
        let val = '';
        if (rec._meta && typeof rec._meta[path] !== 'undefined' && rec._meta[path] !== null) {
            return rec._meta[path];
        }
        if (rec[path] !== undefined && rec[path] !== null) { return rec[path]; }
        const keys = String(path).split('/').map(s => s.trim());
        for (const k of keys) {
            if (!k || k.includes(' ')) continue;
            if (rec[k] !== undefined && rec[k] !== null) { return rec[k]; }
        }
        return null;
    };

    const fmt = (val) => {
        if (val === null || val === undefined || val === '') return '<span class="text-slate-500 font-medium italic">(No Registrado)</span>';
        if (typeof val === 'object') return `<pre class="text-[10px] bg-slate-950/20 p-2 rounded overflow-x-auto">${JSON.stringify(val, null, 2)}</pre>`;
        return `<span class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">${String(val)}</span>`;
    };

    // Column 1: Contexto Geográfico
    const stEntidad = fmt(extractNested('mun') || extractNested('S1/ent'));
    const stMpio = fmt(extractNested('mun'));
    const stParr = fmt(extractNested('par'));
    const stSegm = fmt(extractNested('segmento') || extractNested('S1/segmento') || extractNested('S1/group_segmeto_sector/segmento'));
    const stSect = fmt(extractNested('sector') || extractNested('S1/sector') || extractNested('S1/group_segmeto_sector/sector'));
    const stNodo = fmt(extractNested('nodo'));

    // Column 2: Datos Operativos
    const stAgente = fmt(extractNested('nombre') || extractNested('S0/s0_nombreapellido'));
    const stCedula = fmt(extractNested('cedula') || extractNested('S0/cedula_encuestador'));
    const stFecha = fmt(extractNested('fecha') || extractNested('today/_submission_time'));
    const stEstado = rec._meta && rec._meta.estado === 'completada'
        ? '<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-green/20 text-brand-green border border-brand-green/30">Completada (Efectiva)</span>'
        : '<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-orange/20 text-brand-orange border border-brand-orange/30">Parcial / Error</span>';
    const stDur = fmt(extractNested('durMin') ? `${extractNested('durMin')} min` : null);
    const stControl = fmt(extractNested('control') || extractNested('group_sh53u78/control'));

    // Column 3: Resultados
    const stHogares = fmt(extractNested('hogares') || extractNested('datos_hogar/hogar_count') || extractNested('lista_hogar_count'));
    const stPers = fmt(extractNested('totalPers') || extractNested('datos_hogar/hogar.integrantes_hogar'));
    const stUso = fmt(extractNested('uso') || extractNested('S1/Uso_de_la_Unidad_inmobiliaria'));
    const stCond = fmt(extractNested('condicion') || extractNested('Condici_n_de_ocupaci_n/condicion_de_ocupacion'));
    const rawDist = extractNested('distance_m');
    const isFlagged = rec._meta && rec._meta.flag_distance_gt_500;
    const stDist = rawDist !== null ? `<span class="font-outfit font-black ${isFlagged ? 'text-brand-red' : 'text-brand-emerald'}">${Math.round(rawDist)} m</span>`
        : '<span class="text-slate-500 font-medium italic">N/A</span>';

    // Parse coordinates and advanced geo metrics for Map
    const parseGeo = (geoStr) => {
        if (!geoStr || typeof geoStr !== 'string') return null;
        const parts = geoStr.trim().split(' ');
        if (parts.length >= 2) {
            return {
                lat: parseFloat(parts[0]),
                lng: parseFloat(parts[1]),
                alt: parts.length >= 3 ? parseFloat(parts[2]) : null,
                acc: parts.length >= 4 ? parseFloat(parts[3]) : null
            };
        }
        return null;
    };

    // Haversine trace calculation
    const calcDistance = (pt1, pt2) => {
        if (!pt1 || !pt2) return null;
        const R = 6371e3;
        const toRad = p => p * Math.PI / 180;
        const dLat = toRad(pt2.lat - pt1.lat);
        const dLng = toRad(pt2.lng - pt1.lng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(pt1.lat)) * Math.cos(toRad(pt2.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const ptStart = parseGeo(rec['start-geopoint']);
    const ptIni = parseGeo(rec['group_sh53u78/ubicacion_i'] || rec['ubicacion_i']);
    const ptFin = parseGeo(rec['ubicacion_final/ubicacion_f'] || rec['ubicacion_f']);

    const m = rec._meta || {};
    let rawLat = rec.lat || m.lat || (rec._geolocation ? rec._geolocation[0] : null);
    let rawLng = rec.lng || m.lng || (rec._geolocation ? rec._geolocation[1] : null);
    const ptMain = (rawLat && rawLng) ? { lat: parseFloat(rawLat), lng: parseFloat(rawLng) } : null;

    const walkedDistance = ptIni && ptFin ? calcDistance(ptIni, ptFin) : null;
    const hasMapData = ptStart || ptIni || ptFin || ptMain;

    const layout = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <!-- Columna 1 -->
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-blue tracking-widest flex items-center gap-2 mb-4">
                    <i data-lucide="map" class="w-3.5 h-3.5"></i> Contexto Geográfico
                </h4>
                <div class="space-y-3">
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Estado / Entidad</div>${stEntidad}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Municipio</div>${stMpio}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Parroquia</div>${stParr}</div>
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Segmento</div>${stSegm}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Sector</div>${stSect}</div>
                    </div>
                </div>
            </div>

            <!-- Columna 2 -->
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50 relative overflow-hidden">
                <h4 class="text-[10px] uppercase font-black text-brand-purple tracking-widest flex items-center gap-2 mb-4 relative z-10">
                    <i data-lucide="user-check" class="w-3.5 h-3.5"></i> Datos Operativos
                </h4>
                <div class="space-y-3 relative z-10">
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Agente de Campo</div>${stAgente}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Documento ID</div>${stCedula}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Fecha y Hora de Carga</div>${stFecha}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Estatus del Registro</div>${stEstado}</div>
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Duración Real</div>${stDur}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Control Nro.</div>${stControl}</div>
                    </div>
                </div>
            </div>

            <!-- Columna 3 -->
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-emerald tracking-widest flex items-center gap-2 mb-4">
                    <i data-lucide="home" class="w-3.5 h-3.5"></i> Resultados / Tipología
                </h4>
                <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Hogares</div>${stHogares}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Personas</div>${stPers}</div>
                    </div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Condición de Ocupación</div>${stCond}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Uso Estructural</div>${stUso}</div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Distancia calc. al segmento</div>
                        ${stDist}
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Integrated Map Section -->
        ${hasMapData ? `
        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden mt-6">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <h4 class="text-[10px] uppercase font-black text-brand-orange tracking-widest flex items-center gap-2 m-0">
                        <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> Verificación Geográfica Histórica
                    </h4>
                    ${isFlagged ? `<span class="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-brand-red/20 text-brand-red border border-brand-red/30">Desviación Detectada</span>` : ''}
                </div>
                <div class="flex items-center gap-4 text-[9px] uppercase font-bold text-slate-500">
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#3B82F6]"></div> Apertura</div>
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#10B981]"></div> P. Inicial</div>
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#F59E0B]"></div> P. Final</div>
                </div>
            </div>
            <div class="h-64 md:h-96 w-full relative">
                <!-- Floating HUD Box -->
                <div class="absolute top-4 left-4 z-[400] bg-slate-900/80 backdrop-blur-md rounded-xl p-3 border border-slate-700/50 shadow-xl w-48 pointer-events-none">
                    <h5 class="text-[9px] uppercase font-black text-slate-400 tracking-widest mb-2 border-b border-slate-700 pb-1">Métricas de Rastreo</h5>
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] text-slate-500 font-bold">Resumen Segm:</span>
                        <span class="text-[10px] font-mono font-bold ${isFlagged ? 'text-brand-red' : 'text-brand-emerald'}">${rawDist !== null ? Math.round(rawDist) + 'm' : 'N/A'}</span>
                    </div>
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] text-slate-500 font-bold">Ruta Calculada:</span>
                        <span class="text-[10px] font-mono text-brand-orange font-bold">${walkedDistance !== null ? Math.round(walkedDistance) + 'm' : 'N/A'}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-[10px] text-slate-500 font-bold">Tiempo Base:</span>
                        <span class="text-[10px] font-mono text-brand-blue font-bold">${extractNested('durMin') ? extractNested('durMin') + ' min' : 'N/A'}</span>
                    </div>
                </div>
                <div id="detailMap" class="absolute inset-0 z-0 bg-slate-800"></div>
            </div>
            <div class="p-2 border-t border-slate-200 dark:border-slate-700 text-center text-[10px] text-slate-400 flex items-center justify-center gap-2">
                <i data-lucide="info" class="w-3 h-3"></i> El círculo sombreado indica la zona válida de cobertura (radio de 500m). Haz clic en los pines para ver precisión y hora.
            </div>
        </div>
        ` : `
        <div class="mt-6 p-6 border border-dashed border-slate-700 rounded-xl text-center text-slate-500">
            <i data-lucide="map-pin-off" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
            <span class="text-xs uppercase tracking-widest font-bold block">No hay datos geográficos</span>
            <span class="text-[10px] block mt-1">Este registro no generó ni capturó coordenadas GPS con precisión adecuada.</span>
        </div>`}
    `;

    const rawJson = `<details class="mt-6 text-sm text-slate-400 group"><summary class="cursor-pointer font-bold text-[10px] uppercase tracking-widest flex items-center gap-2"><i data-lucide="code" class="w-3 h-3 group-hover:text-brand-purple transition-colors"></i> Ver JSON crudo</summary><pre class="text-xs bg-slate-950/40 border border-slate-800 p-4 rounded-xl mt-3 overflow-x-auto text-slate-300 font-mono">${JSON.stringify(rec, null, 2)}</pre></details>`;

    body.innerHTML = `${layout}${rawJson}`;

    if (window.lucide) lucide.createIcons({ root: body });

    _lastFocused = document.activeElement;
    modal.classList.remove('hidden');
    setTimeout(() => { modal.querySelector('#detailModalPane').classList.remove('scale-95', 'opacity-0'); }, 10);

    // Inject Leaflet map if data exists
    if (hasMapData) {
        setTimeout(() => {
            const displayLat = ptMain ? ptMain.lat : (ptIni ? ptIni.lat : (ptStart ? ptStart.lat : ptFin.lat));
            const displayLng = ptMain ? ptMain.lng : (ptIni ? ptIni.lng : (ptStart ? ptStart.lng : ptFin.lng));

            if (!detailMiniMapObj) {
                detailMiniMapObj = L.map('detailMap', { zoomControl: false }).setView([displayLat, displayLng], 16);
                const satLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri', maxZoom: 19
                });
                const osmLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; OpenStreetMap', subdomains: 'abcd', maxZoom: 19
                });

                satLayer.addTo(detailMiniMapObj);

                L.control.layers({
                    "Satélite Alto Detalle": satLayer,
                    "Estándar CartoDark": osmLayer
                }, null, { position: 'topright' }).addTo(detailMiniMapObj);
                L.control.zoom({ position: 'bottomright' }).addTo(detailMiniMapObj);
            } else {
                detailMiniMapObj.setView([displayLat, displayLng], 16);
                detailMiniMapObj.eachLayer(layer => {
                    if (layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.Polyline) {
                        detailMiniMapObj.removeLayer(layer);
                    }
                });
            }

            const validPoints = [];
            const pathCoords = [];

            const extractTimeStr = (type) => {
                if (type === 'start') return rec.start ? new Date(rec.start).toLocaleTimeString() : 'N/A';
                if (type === 'end') return rec.end ? new Date(rec.end).toLocaleTimeString() : 'N/A';
                return 'Desconocido';
            };

            const createCustomMarker = (pt, color, title, type) => {
                if (!pt) return;
                const markerIcon = L.divIcon({
                    className: 'custom-minimap-marker',
                    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`,
                    iconSize: [14, 14],
                    iconAnchor: [7, 7]
                });

                const accText = pt.acc ? `<span class="text-brand-emerald">± ${pt.acc}m</span>` : '<span class="text-slate-500">N/A</span>';
                const altText = pt.alt ? `${pt.alt}m s.n.m.` : 'N/A';
                const timeText = extractTimeStr(type);

                const popupHtml = `
                    <div class="font-inter p-1 w-52">
                        <div class="font-outfit font-black text-xs uppercase tracking-widest border-b border-slate-200 pb-1 mb-2" style="color: ${color}">${title}</div>
                        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Coordenada:</span><span class="font-mono text-slate-700">${pt.lat.toFixed(5)}, ${pt.lng.toFixed(5)}</span></div>
                        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Precisión GPS:</span><span class="font-mono font-bold">${accText}</span></div>
                        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Altitud Nivel Mar:</span><span class="font-mono text-slate-700">${altText}</span></div>
                        <div class="flex justify-between items-center text-[10px] border-t border-slate-100 pt-1 mt-1"><span class="font-bold text-slate-500">Hora de Captura:</span><span class="font-mono text-brand-purple font-bold">${timeText}</span></div>
                    </div>
                `;

                L.marker([pt.lat, pt.lng], { icon: markerIcon }).addTo(detailMiniMapObj).bindPopup(popupHtml, { className: 'custom-popup-enrich' });
                validPoints.push([pt.lat, pt.lng]);
                pathCoords.push([pt.lat, pt.lng]);
            };

            if (ptStart) createCustomMarker(ptStart, '#3B82F6', 'Apertura de la Encuesta', 'start');
            if (ptIni) createCustomMarker(ptIni, '#10B981', 'Confirmación Inicial', 'start');
            if (ptFin) createCustomMarker(ptFin, '#F59E0B', 'Cierre de Encuesta', 'end');

            if (!ptStart && !ptIni && !ptFin && ptMain) {
                createCustomMarker(ptMain, isFlagged ? '#EF4444' : '#10B981', 'Ubicación Registrada', 'end');
            }

            if (pathCoords.length > 1) {
                L.polyline(pathCoords, { color: '#94a3b8', dashArray: '4, 4', weight: 2, opacity: 0.6 }).addTo(detailMiniMapObj);
            }

            const targetCirclePt = ptIni || ptMain;
            if (targetCirclePt) {
                L.circle([targetCirclePt.lat, targetCirclePt.lng], {
                    radius: 500,
                    color: isFlagged ? '#EF4444' : '#10B981',
                    fillColor: isFlagged ? '#EF4444' : '#10B981',
                    fillOpacity: 0.05,
                    weight: 1,
                    dashArray: '4, 4'
                }).addTo(detailMiniMapObj);
            }

            if (validPoints.length > 0) {
                const bounds = L.latLngBounds(validPoints);
                if (validPoints.length === 1 && !isFlagged) {
                    detailMiniMapObj.setView(validPoints[0], 16);
                } else {
                    detailMiniMapObj.fitBounds(bounds, { padding: [40, 40], maxZoom: 18 });
                }
            }

            detailMiniMapObj.invalidateSize();
        }, 300);
    }
}

function closeDetailModal() {
    const m = $('detailModal');
    if (m) {
        m.querySelector('#detailModalPane').classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            m.classList.add('hidden');
            // reset expand if it was expanded
            const pane = document.getElementById('detailModalPane');
            const icon = document.getElementById('detailModalExpandIcon');
            if (pane && pane.classList.contains('max-w-none')) {
                pane.classList.remove('w-full', 'max-w-none', 'h-full', 'rounded-none');
                pane.classList.add('max-w-7xl', 'w-11/12', 'rounded-2xl', 'p-0');
                if (icon) icon.setAttribute('data-lucide', 'maximize');
            }

            if (detailMiniMapObj) {
                detailMiniMapObj.remove();
                detailMiniMapObj = null;
            }
            if (_lastFocused && typeof _lastFocused.focus === 'function') { try { _lastFocused.focus(); } catch (e) { } }
        }, 300);
    }
}

// Global hook for the HTML expand button in Detail Modal
window.toggleDetailModalExpand = function () {
    const pane = document.getElementById('detailModalPane');
    const icon = document.getElementById('detailModalExpandIcon');
    if (!pane || !icon) return;

    if (pane.classList.contains('max-w-7xl')) {
        // Expand
        pane.classList.remove('max-w-7xl', 'w-11/12', 'rounded-2xl', 'p-0');
        pane.classList.add('w-full', 'max-w-none', 'h-full', 'rounded-none');
        icon.setAttribute('data-lucide', 'minimize');
    } else {
        // Shrink
        pane.classList.remove('w-full', 'max-w-none', 'h-full', 'rounded-none');
        pane.classList.add('max-w-7xl', 'w-11/12', 'rounded-2xl', 'p-0');
        icon.setAttribute('data-lucide', 'maximize');
    }

    if (window.lucide) window.lucide.createIcons();
    // Re-adjust map bounds properly when resizing
    if (detailMiniMapObj) setTimeout(() => detailMiniMapObj.invalidateSize(), 350);
};

// ─── MODULE: MM-111 ──────────────────────────────
function renderMM111() {
    const searchBtn = $('btnLoadMM111');
    const searchInput = $('mm111SearchControl');
    if (!searchBtn || !searchInput) return;

    // Populate options from filtered
    const uniqueControls = new Set();
    filtered.forEach(r => {
        if (r._meta.control) uniqueControls.add(r._meta.control);
    });

    // Sort and build options
    const controls = [...uniqueControls].sort();

    // Keep the first default option and append the rest
    searchInput.innerHTML = '<option value="">Seleccionar Control...</option>' +
        controls.map(c => `<option value="${c}">${c}</option>`).join('');

    searchBtn.onclick = () => loadMM111ControlData(searchInput.value.trim());
    searchInput.onchange = () => {
        loadMM111ControlData(searchInput.value.trim());
    };

    // If there's an active query, re-render. If not, try to render the first available control
    const currentVal = searchInput.value.trim();
    if (currentVal) {
        loadMM111ControlData(currentVal);
    } else {
        // Try getting the first control from filtered
        const firstControlRecord = filtered.find(r => r._meta.control);
        if (firstControlRecord) {
            searchInput.value = firstControlRecord._meta.control;
            loadMM111ControlData(firstControlRecord._meta.control);
        }
    }
}

function loadMM111ControlData(controlNro) {
    if (!controlNro) return;

    // Find all records matching this control
    const constrolRecords = filtered.filter(r => String(r._meta.control).toLowerCase() === String(controlNro).toLowerCase());

    if (constrolRecords.length === 0) {
        // Reset view
        clearMM111Header();
        if (mm111Table) mm111Table.clearData();
        return;
    }

    const first = constrolRecords[0];

    // Update Header 
    // Uses S1 geo variables specifically requested
    $('mm111Entidad').textContent = first['S1/ent'] || first._meta.mun || 'N/A';
    $('mm111Municipio').textContent = first._meta.mun || 'N/A';
    $('mm111Parroquia').textContent = first._meta.par || 'N/A';
    $('mm111CPoblado').textContent = first['S1/cpoblado'] || 'N/A';

    // Attempt to extract numeric codes (usually present in raw Kobo options, simple fallback string extract)
    const extractCode = (str, sliceLast = null) => {
        if (!str) return '--';
        const match = String(str).match(/^(\d+)/);
        let code = match ? match[1] : '--';
        if (code !== '--' && sliceLast) {
            code = code.slice(-sliceLast);
        }
        return code;
    };

    $('mm111EntidadCod').textContent = extractCode(first['S1/ent']) || '--';
    $('mm111MunicipioCod').textContent = extractCode(first._meta.mun, 2) || '--';
    $('mm111ParroquiaCod').textContent = extractCode(first._meta.par, 2) || '--';
    $('mm111CPobladoCod').textContent = extractCode(first['S1/cpoblado']) || '--';

    // Update Control Bar
    // Using mapping names derived from previous analysis
    const formatSuffix = (val, length) => val && String(val).trim() !== '-' ? String(val).slice(-length) : '-';

    $('mm111Segmento').textContent = first['S1/segmento'] || first['S1/group_segmeto_sector/segmento'] || first['group_segmeto_sector/segmento'] || '-';
    $('mm111Sector').textContent = first['S1/sector'] || first['S1/group_segmeto_sector/sector'] || first['group_segmeto_sector/sector'] || '-';
    $('mm111Nodo').textContent = first._meta.nodo || '-';
    $('mm111Semana').textContent = formatSuffix(first._meta.semana, 2);
    $('mm111ControlNro').textContent = formatSuffix(first._meta.control, 4);

    // Lote and Control Maestro
    // Update Table
    updateMM111Grid(constrolRecords);
}

function clearMM111Header() {
    ['mm111Entidad', 'mm111Municipio', 'mm111Parroquia', 'mm111CPoblado'].forEach(id => $(id).textContent = '---');
    ['mm111EntidadCod', 'mm111MunicipioCod', 'mm111ParroquiaCod', 'mm111CPobladoCod'].forEach(id => $(id).textContent = '--');
    ['mm111Segmento', 'mm111Sector', 'mm111Nodo', 'mm111Semana', 'mm111ControlMaestro', 'mm111Lote'].forEach(id => $(id).textContent = '-');
    $('mm111ControlNro').textContent = '0000';
}

function updateMM111Grid(records) {
    const tbody = document.getElementById('mm111HTMLGrid');
    if (!tbody) return;

    if (!records || records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="text-center py-10 text-slate-400">No hay registros para este Control.</td></tr>';
        return;
    }

    const rows = records.map((rec, i) => {
        let dirParts = [];
        if (rec['S1/P_nomsect']) dirParts.push(rec['S1/P_nomsect']);

        // Street/Av labels
        for (let j = 1; j <= 4; j++) {
            const etiq = rec[`S1/G_P9/gp10_${j}_etiq`];
            const val = rec[`S1/G_P9/GP10_${j}b`];
            if (etiq && val) {
                dirParts.push(`${etiq} ${val}`);
            }
        }

        // House number
        const nro = rec['control_de_la_entrevista/in10'] || rec['control_entrevista/in10'];
        if (nro) dirParts.push(`Nro: ${nro}`);

        // Reference
        const ref = rec['control_de_la_entrevista/in11'] || rec['control_entrevista/in11'];
        if (ref) dirParts.push(`Ref: ${ref}`);

        const dirFinal = dirParts.length > 0 ? dirParts.join(', ') : (rec['S1/direccion'] || rec._meta.nota || '-');

        return {
            id: rec._uuid,
            linea: rec['group_sh53u78/n_linea'] || (i + 1),
            serie: rec['group_sh53u78/n_serie'] || '-',
            manzana: rec['S1/manzana'] || '-',
            parcela: rec['S1/parcela'] || '-',
            edificacion: rec['S1/Edificaci_n'] || rec['S1/edificacion'] || '-',
            estructura: rec['S1/estructura'] || rec['S1/unidad'] || '-', // Fallback if exists
            uso: rec['S1/Uso_de_la_Unidad_inmobiliaria'] || rec._meta.uso || '-',
            ladoManz: rec['S1/lado_manz'] || '-',
            direccion: dirFinal,
            razon: rec['Condici_n_de_ocupaci_n/condicion_de_ocupacion'] || rec._meta.condicion || '-',
            agente: rec._meta.nombre ? rec._meta.nombre.split(' ')[0] : 'N/A'
        };
    });

    // Sort by line number to match form
    rows.sort((a, b) => parseInt(a.linea) - parseInt(b.linea));

    tbody.innerHTML = rows.map((r, i) => `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white dark:bg-[#0B1120]' : 'bg-slate-50 dark:bg-slate-900/50'}">
            <td class="py-3 px-3 align-top font-mono font-bold text-center sticky left-0 z-10 ${i % 2 === 0 ? 'bg-white dark:bg-[#0B1120]' : 'bg-slate-50 dark:bg-slate-900/50'} shadow-[inset_-1px_0_0_rgba(226,232,240,1)] dark:shadow-[inset_-1px_0_0_rgba(30,41,59,1)]">${r.linea}</td>
            <td class="py-3 px-3 align-top font-mono text-center">${r.serie}</td>
            <td class="py-3 px-3 align-top text-center">${r.manzana}</td>
            <td class="py-3 px-3 align-top text-center">${r.parcela}</td>
            <td class="py-3 px-3 align-top text-center">${r.edificacion}</td>
            <td class="py-3 px-3 align-top text-center">${r.estructura}</td>
            <td class="py-3 px-3 align-top font-semibold truncate max-w-[120px]" title="${r.uso}">${r.uso}</td>
            <td class="py-3 px-3 align-top text-center">${r.ladoManz}</td>
            <td class="py-3 px-3 align-top whitespace-normal min-w-[200px] leading-snug">${r.direccion}</td>
            <td class="py-3 px-3 align-top whitespace-normal min-w-[150px] leading-snug text-slate-500 dark:text-slate-400">${r.razon}</td>
            <td class="py-3 px-3 align-top font-bold text-[10px] text-slate-400 dark:text-slate-500 uppercase">${r.agente}</td>
        </tr>
    `).join('');
}



// Location modal with Leaflet
function showLocationModal(rec) {
    const modal = $('locModal');
    const mapDiv = $('locMap');
    if (!modal || !mapDiv) return;
    const lat = Number(rec._meta.lat);
    const lng = Number(rec._meta.lng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) { alert('Coordenadas inválidas'); return; }

    modal.classList.remove('hidden');

    // Initialize map if needed
    if (!locMap) {
        // Create same base layers as main map for consistent view options
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
        const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri' });

        locMap = L.map('locMap', { center: [lat, lng], zoom: 16, layers: [osm] });
        const baseLayersLoc = { 'OpenStreetMap': osm, 'Satellite (Esri)': esriSat };
        L.control.layers(baseLayersLoc, null, { collapsed: false }).addTo(locMap);
        L.control.scale().addTo(locMap);
    } else {
        locMap.setView([lat, lng], 16);
    }

    if (locMarker) { try { locMap.removeLayer(locMarker); } catch (e) { } locMarker = null; }
    locMarker = L.marker([lat, lng]).addTo(locMap).bindPopup(`<b>${rec._meta.nombre}</b><br>${rec._meta.fecha}`).openPopup();

    // ensure proper sizing after modal shown
    setTimeout(() => { try { locMap.invalidateSize(); } catch (e) { } }, 120);

    // Accessibility: focus management
    _lastFocused = document.activeElement;
    const closeBtn = document.getElementById('locModalClose');
    if (closeBtn) closeBtn.focus();
}

function closeLocModal() { const m = $('locModal'); if (m) { m.classList.add('hidden'); if (locMarker) { try { locMap.removeLayer(locMarker); } catch (e) { } locMarker = null; } if (_lastFocused && typeof _lastFocused.focus === 'function') { try { _lastFocused.focus(); } catch (e) { } } } }

// ─── Helpers ─────────────────────────────────────
function avg(arr) { return arr.reduce((a, b) => a + b, 0) / arr.length; }

// Parse geopoint string 'lat lon [alt precision]'
function parseGeoString(g) {
    if (!g) return null;
    try {
        const parts = String(g).trim().split(/\s+/);
        if (parts.length < 2) return null;
        return [parseFloat(parts[0]), parseFloat(parts[1])];
    } catch (e) { return null; }
}

function haversineMeters(lat1, lon1, lat2, lon2) {
    const toRad = x => x * Math.PI / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Accessibility: track last focused element when opening modals
let _lastFocused = null;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // close modals if open
        if ($('detailModal') && !$('detailModal').classList.contains('hidden')) closeDetailModal();
        if ($('locModal') && !$('locModal').classList.contains('hidden')) closeLocModal();
    }
});
