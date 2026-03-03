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
    updateModuleInfo();
    init();
});

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
    // Create base layers: Carto Dark, OpenStreetMap (streets) and Esri World Imagery (satellite)
    const cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO' });
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
    const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri' });

    map = L.map('mapView', { center: [10.4806, -66.8983], zoom: 12, layers: [cartoDark] }); // CCS default

    // Layer control and scale
    const baseLayers = { 'Carto Dark': cartoDark, 'OpenStreetMap': osm, 'Satellite (Esri)': esriSat };
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
    const markers = points.map(r => {
        const m = r._meta;
        const color = m.estado === 'completada' ? '#10B981' : '#F59E0B';
        const html = `
            <div class="p-4 min-w-[200px] bg-brand-950 text-slate-200 border border-white/10 rounded-xl">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[10px] font-bold text-slate-500 uppercase">Encuestador</span>
                    <span class="w-2 h-2 rounded-full" style="background:${color}"></span>
                </div>
                <div class="font-bold text-sm mb-1">${m.nombre}</div>
                <div class="text-[10px] text-slate-400 mb-3">${m.fecha}</div>
                <div class="grid grid-cols-2 gap-2 border-t border-white/5 pt-2">
                    <div>
                        <div class="text-[8px] uppercase text-slate-500">Municipio</div>
                        <div class="text-[10px] font-bold">${m.mun}</div>
                    </div>
                     <div>
                        <div class="text-[8px] uppercase text-slate-500">Condición</div>
                        <div class="text-[10px] font-bold">${m.condicion}</div>
                    </div>
                </div>
            </div>
        `;
        return L.marker([m.lat, m.lng]).bindPopup(html, { className: 'custom-popup', maxWidth: 300 });
    });

    markerCluster.addLayers(markers);
    if (markers.length > 0) {
        const bounds = markerCluster.getBounds();
        if (bounds.isValid()) map.fitBounds(bounds, { padding: [50, 50] });
    }
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

    // Special handling for Map and Charts
    if (tabId === 'tab-mapa') {
        if (!map) initMap();
        setTimeout(() => map.invalidateSize(), 150);
        renderMap();
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
            situacion_vivienda
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
            legend: { labels: { color: '#8b949e', font: { size: 11 } } },
            tooltip: { backgroundColor: '#1c2128', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 }
        },
        scales: {
            x: { ticks: { color: '#8b949e', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
            y: { ticks: { color: '#8b949e', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } }
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
        encuestas: m.encuestas,
        completadas: m.completadas,
        avgDur: m.avgDur != null ? Math.round(m.avgDur) : '--',
        personas: m.personas,
        score: m.score,
    }));

    if (!rankingTabulator) {
        rankingTabulator = new Tabulator('#rankingTable', {
            data: tableData,
            layout: 'fitColumns',
            height: '360px',
            placeholder: 'Sin datos',
            columns: [
                { title: '#', field: 'pos', width: 50, hozAlign: 'center', headerSort: false },
                { title: 'Nombre', field: 'nombre', minWidth: 150 },
                { title: 'Enc.', field: 'encuestas', hozAlign: 'center', width: 70, sorter: 'number' },
                { title: 'Comp.', field: 'completadas', hozAlign: 'center', width: 70, sorter: 'number' },
                {
                    title: 'Dur. Prom.', field: 'avgDur', hozAlign: 'center', width: 90,
                    formatter: function (cell) {
                        const v = cell.getValue();
                        return v !== '--' ? v + ' min' : '--';
                    }
                },
                { title: 'Personas', field: 'personas', hozAlign: 'center', width: 80, sorter: 'number' },
                {
                    title: 'Score', field: 'score', hozAlign: 'center', width: 70, sorter: 'number',
                    formatter: function (cell) {
                        const v = cell.getValue();
                        const color = v >= 70 ? '#10B981' : v >= 40 ? '#F59E0B' : '#EF4444';
                        return `<span style="color:${color};font-weight:bold">${v}</span>`;
                    }
                },
            ],
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

// Tabulator-based detail explorer
function initGrid() {
    if (detailTable) return;
    detailTable = new Tabulator('#detailGrid', {
        data: [],
        layout: 'fitColumns',
        height: '500px',
        pagination: true,
        paginationSize: ROWS_PER_PAGE,
        paginationSizeSelector: [10, 25, 50, 100],
        movableColumns: true,
        placeholder: 'Sin datos cargados',
        columns: [
            { title: 'Cédula', field: 'cedula', headerFilter: 'input', minWidth: 100 },
            { title: 'Nombre', field: 'nombre', headerFilter: 'input', minWidth: 150 },
            { title: 'Control', field: 'control', headerFilter: 'input', minWidth: 100 },
            { title: 'Fecha', field: 'fecha', headerFilter: 'input', minWidth: 100, sorter: 'date', sorterParams: { format: 'yyyy-MM-dd' } },
            { title: 'Municipio', field: 'mun', headerFilter: 'input', minWidth: 100 },
            { title: 'Parroquia', field: 'par', headerFilter: 'input', minWidth: 100 },
            { title: 'Nodo', field: 'nodo', headerFilter: 'input', minWidth: 80 },
            {
                title: 'Estado', field: 'estado', headerFilter: 'input', minWidth: 90,
                formatter: function (cell) {
                    const v = cell.getValue();
                    const color = v === 'completada' ? '#10B981' : '#F59E0B';
                    return `<span style="color:${color};font-weight:600">${v}</span>`;
                }
            },
            { title: 'Condición', field: 'condicion', headerFilter: 'input', minWidth: 100 },
            { title: 'Uso', field: 'uso', headerFilter: 'input', minWidth: 80 },
        ],
    });

    detailTable.on('rowClick', function (e, row) {
        const rec = row.getData()._rec;
        if (rec) showDetailModal(rec);
    });
}

function updateGrid(data = filtered) {
    if (!detailTable) initGrid();
    const rows = data.map(rec => {
        const m = rec._meta || {};
        return {
            _rec: rec,
            cedula: m.cedula || '',
            nombre: m.nombre || '',
            control: m.control || '',
            fecha: m.fecha || '',
            mun: m.mun || '',
            par: m.par || '',
            nodo: m.nodo || '',
            estado: m.estado || '',
            condicion: m.condicion || '',
            uso: m.uso || '',
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
function showDetailModal(rec) {
    const modal = $('detailModal');
    const body = $('detailModalBody');
    if (!modal || !body || !rec) return;

    // Define preferred display order and mapping to original JSON keys where applicable
    const fields = [
        { label: 'Cédula Encuestador', meta: 'cedula', json: 'S0/cedula_encuestador' },
        { label: 'Nombre Encuestador', meta: 'nombre', json: 'S0/s0_nombreapellido' },
        { label: 'Fecha', meta: 'fecha', json: 'today/_submission_time' },
        { label: 'Control', meta: 'control', json: 'group_sh53u78/control' },
        { label: 'Municipio', meta: 'mun', json: 'S1/mun' },
        { label: 'Parroquia', meta: 'par', json: 'S1/par' },
        { label: 'Nodo', meta: 'nodo', json: 'S1/nodo' },
        { label: 'Uso Unidad', meta: 'uso', json: 'S1/Uso_de_la_Unidad_inmobiliaria' },
        { label: 'Condición', meta: 'condicion', json: 'Condici_n_de_ocupaci_n/condicion_de_ocupacion' },
        { label: 'Duración (min)', meta: 'durMin', json: 'start / end' },
        { label: 'Distancia (m)', meta: 'distance_m', json: 'start-geopoint / group_sh53u78/ubicacion_i' },
        { label: 'Hogares (declarados)', meta: 'hogares', json: 'datos_hogar/hogar' },
        { label: 'Personas Totales', meta: 'totalPers', json: 'datos_hogar/hogar.integrantes_hogar' },
        { label: 'Latitud', meta: 'lat', json: '_geolocation / S1/ubicacion' },
        { label: 'Longitud', meta: 'lng', json: '_geolocation / S1/ubicacion' },
        { label: 'Flags', meta: null, json: '' }
    ];

    const rows = fields.map(f => {
        let val = '';
        if (f.meta && rec._meta && typeof rec._meta[f.meta] !== 'undefined' && rec._meta[f.meta] !== null) {
            val = rec._meta[f.meta];
        } else if (f.json) {
            // try to extract value from raw JSON using the common key hints
            const keys = String(f.json).split('/').map(s => s.trim());
            for (const k of keys) {
                if (!k) continue;
                if (k.includes(' ')) continue; // skip complex hints
                if (rec[k] !== undefined) { val = rec[k]; break; }
            }
        }
        // pretty format booleans and objects
        let display = '';
        if (val === null || typeof val === 'undefined' || val === '') display = '<span class="text-slate-500">(vacío)</span>';
        else if (typeof val === 'object') display = `<pre class="text-sm bg-brand-950/20 p-2 rounded mt-1 overflow-x-auto">${JSON.stringify(val, null, 2)}</pre>`;
        else display = `<div class="font-mono text-sm text-slate-200">${String(val)}</div>`;

        const jsonNote = f.json ? `<div class="text-[10px] text-slate-500 mt-1">${f.json}</div>` : '';

        return `<div class="mb-3">
            <div class="text-xs text-slate-400 font-bold">${f.label}</div>
            ${display}
            ${jsonNote}
        </div>`;
    }).join('');

    // Add a compact raw JSON dump at the end for debugging/tracing
    const rawJson = `<details class="mt-4 text-sm text-slate-400"><summary class="cursor-pointer font-bold">Mostrar JSON bruto</summary><pre class="text-xs bg-brand-950/20 p-3 rounded mt-2 overflow-x-auto">${JSON.stringify(rec, null, 2)}</pre></details>`;

    body.innerHTML = `<div class="space-y-2">${rows}${rawJson}</div>`;

    // Accessibility: save last focused element and focus modal
    _lastFocused = document.activeElement;
    modal.classList.remove('hidden');
    const closeBtn = document.getElementById('detailModalClose');
    if (closeBtn) closeBtn.focus();
}

function closeDetailModal() { const m = $('detailModal'); if (m) { m.classList.add('hidden'); if (_lastFocused && typeof _lastFocused.focus === 'function') { try { _lastFocused.focus(); } catch (e) { } } } }

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
        const cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; CARTO' });
        const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' });
        const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri' });

        locMap = L.map('locMap', { center: [lat, lng], zoom: 16, layers: [cartoDark] });
        const baseLayersLoc = { 'Carto Dark': cartoDark, 'OpenStreetMap': osm, 'Satellite (Esri)': esriSat };
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
