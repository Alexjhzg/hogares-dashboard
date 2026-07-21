/**
 * ─── Módulo: Reportes ────────────────────────────────────────────────────────
 * Controlador completo de la pestaña de generación de reportes.
 * Gestiona la selección de campos, presets, búsqueda dinámica y exportación
 * a .xlsx usando la biblioteca SheetJS (xlsx).
 */

import { state, ALERT_MAP } from '../core/index.js';
import * as XLSX from 'xlsx';

// ─── Mapa de campos normalizados (_meta) ──────────────────────────────────────
// Cada campo define la clave del checkbox en el DOM, la cabecera en el Excel
// y la función extractora que recibe el registro crudo (r) y devuelve el valor.
const META_FIELDS = [
    // Identificación
    { id: 'rpt-f-cedula',      header: 'Cédula Encuestador',    extract: r => r._meta?.cedula ?? '' },
    { id: 'rpt-f-nombre',      header: 'Nombre Encuestador',    extract: r => r._meta?.nombre ?? '' },
    { id: 'rpt-f-control',     header: 'Control (últimos 4)',   extract: r => r._meta?.control ?? '' },
    { id: 'rpt-f-serie',       header: 'N° Serie',              extract: r => r._meta?.n_serie ?? '' },
    { id: 'rpt-f-linea',       header: 'N° Línea',              extract: r => r._meta?.n_linea ?? '' },
    { id: 'rpt-f-linea_valida',header: 'Línea Válida (Control)',extract: r => {
        if (r._meta?._ls_ctrl_ok === undefined) return 'Sin índice';
        return r._meta._ls_linea_ok ? 'Válida' : 'INVÁLIDA';
    }},
    { id: 'rpt-f-lote',        header: 'Lote',                  extract: r => r._meta?.lote ?? '' },
    { id: 'rpt-f-semana',      header: 'Semana',                extract: r => r._meta?.semana ?? '' },
    { id: 'rpt-f-fecha',       header: 'Fecha',                 extract: r => r._meta?.fecha ?? '' },
    { id: 'rpt-f-uuid',        header: 'UUID Kobo',             extract: r => r._uuid ?? '' },
    // Ubicación
    { id: 'rpt-f-entidad',     header: 'Entidad (Código)',      extract: r => r._meta?.ent ?? '' },
    { id: 'rpt-f-mun',         header: 'Municipio (Código)',    extract: r => r._meta?.mun ?? '' },
    { id: 'rpt-f-par',         header: 'Parroquia (Código)',    extract: r => r._meta?.par ?? '' },
    { id: 'rpt-f-nodo',        header: 'Nodo',                  extract: r => r._meta?.nodo ?? '' },
    { id: 'rpt-f-segmento',    header: 'Segmento',              extract: r => r._meta?.segmento ?? '' },
    { id: 'rpt-f-sector',      header: 'Sector',                extract: r => r._meta?.sector ?? '' },
    { id: 'rpt-f-manzana',     header: 'Manzana',               extract: r => r._meta?.manzana ?? '' },
    { id: 'rpt-f-parcela',     header: 'Parcela',               extract: r => r._meta?.parcela ?? '' },
    { id: 'rpt-f-direccion',   header: 'Dirección / Nombre Sector', extract: r => r._meta?.direccion ?? '' },
    { id: 'rpt-f-lat',         header: 'Latitud',               extract: r => r._meta?.lat ?? '' },
    { id: 'rpt-f-lng',         header: 'Longitud',              extract: r => r._meta?.lng ?? '' },
    // Vivienda / Estado
    { id: 'rpt-f-estado',         header: 'Estado Encuesta',              extract: r => r._meta?.estado ?? '' },
    { id: 'rpt-f-tipo_vivienda',  header: 'Clasificación Vivienda (A/B/C/E)', extract: r => r._meta?.tipo_vivienda ?? '' },
    { id: 'rpt-f-subtipo_vivienda', header: 'Subtipo de Vivienda',         extract: r => r._meta?.subtipo_vivienda ?? '' },
    { id: 'rpt-f-condicion',      header: 'Condición de Ocupación',       extract: r => r._meta?.condicion ?? '' },
    { id: 'rpt-f-uso',            header: 'Uso de la Unidad',             extract: r => r._meta?.uso ?? '' },
    { id: 'rpt-f-situacion_vivienda', header: 'Situación Vivienda (raw)', extract: r => r._meta?.situacion_vivienda ?? '' },
    { id: 'rpt-f-nota',           header: 'Nota / Observación Final',     extract: r => r._meta?.nota ?? '' },
    // Demografía
    { id: 'rpt-f-totalPers',   header: 'Total Personas',        extract: r => r._meta?.totalPers ?? '' },
    { id: 'rpt-f-hogares',     header: 'N° Hogares',            extract: r => r._meta?.hogares ?? '' },
    { id: 'rpt-f-hombres',     header: 'Total Hombres',         extract: r => r._meta?.totalHombres ?? '' },
    { id: 'rpt-f-mujeres',     header: 'Total Mujeres',         extract: r => r._meta?.totalMujeres ?? '' },
    // Calidad / Auditoría
    { id: 'rpt-f-durMin',      header: 'Duración (min)',        extract: r => r._meta?.durMin ?? '' },
    { id: 'rpt-f-distance_m',  header: 'Distancia al Control (m)', extract: r => r._meta?.distance_m ?? '' },
    { id: 'rpt-f-dist_ini_fin', header: 'Desplazamiento Ini-Fin (m)', extract: r => r._meta?.dist_ini_fin ?? '' },
    { id: 'rpt-f-actual_seg',  header: 'Segmento Real (GPS)',   extract: r => r._meta?.actual_seg ?? '' },
    {
        id: 'rpt-f-alertas',
        header: 'Alertas',
        extract: (r, opts) => {
            const alertas = r._meta?.alertas ?? [];
            if (!alertas.length) return '';
            if (opts?.alertsAsText) {
                return alertas.map(code => ALERT_MAP[code]?.label ?? code).join('; ');
            }
            return alertas.join('; ');
        }
    },
    { id: 'rpt-f-hasAlerts',   header: '¿Tiene Alertas?',       extract: r => r._meta?.hasAlerts ? 'Sí' : 'No' },
    {
        id: 'rpt-f-hora_inicio',
        header: 'Hora Inicio',
        extract: r => {
            const start = r._meta?.start || r['start'] || '';
            if (!start) return '';
            try { return new Date(start).toTimeString().slice(0, 8); } catch { return start; }
        }
    },
    {
        id: 'rpt-f-hora_trans',
        header: 'Hora Transmisión',
        extract: r => {
            const ts = r['_submission_time'] || '';
            if (!ts) return '';
            try { return new Date(ts).toTimeString().slice(0, 8); } catch { return ts; }
        }
    },
];

// ─── Presets de Selección Rápida ──────────────────────────────────────────────
const PRESETS = {
    basic: [
        'rpt-f-cedula', 'rpt-f-nombre', 'rpt-f-control', 'rpt-f-semana',
        'rpt-f-fecha', 'rpt-f-mun', 'rpt-f-estado', 'rpt-f-condicion'
    ],
    audit: [
        'rpt-f-cedula', 'rpt-f-nombre', 'rpt-f-control', 'rpt-f-fecha',
        'rpt-f-estado', 'rpt-f-durMin', 'rpt-f-distance_m', 'rpt-f-dist_ini_fin',
        'rpt-f-actual_seg', 'rpt-f-alertas', 'rpt-f-hasAlerts', 'rpt-f-hora_inicio',
        'rpt-f-hora_trans'
    ],
    demo: [
        'rpt-f-cedula', 'rpt-f-nombre', 'rpt-f-control', 'rpt-f-fecha',
        'rpt-f-mun', 'rpt-f-par', 'rpt-f-estado', 'rpt-f-totalPers',
        'rpt-f-hogares', 'rpt-f-hombres', 'rpt-f-mujeres'
    ],
    geo: [
        'rpt-f-cedula', 'rpt-f-control', 'rpt-f-fecha', 'rpt-f-entidad',
        'rpt-f-mun', 'rpt-f-par', 'rpt-f-nodo', 'rpt-f-segmento', 'rpt-f-sector',
        'rpt-f-manzana', 'rpt-f-parcela', 'rpt-f-direccion', 'rpt-f-lat', 'rpt-f-lng'
    ],
};

// ─── Claves técnicas a excluir del listado dinámico ───────────────────────────
const RAW_EXCLUDE_PREFIXES = ['_', 'formhub/', '__version__', 'meta/', 'deviceid'];
const RAW_EXCLUDE_KEYS = new Set([
    'start', 'end', 'today', 'start-geopoint', '_backend_meta', '_geo_meta'
]);

// ─── Inicialización ───────────────────────────────────────────────────────────

let _initialized = false;

/**
 * Punto de entrada: llamar al hacer clic en la pestaña por primera vez.
 * Idempotente; llamadas posteriores solo actualizan el contador de registros.
 */
export function initReportesTab() {
    _updateRecordCount();

    if (_initialized) return;
    _initialized = true;

    _bindSectionToggles();
    _bindPresets();
    _bindSelectDeselectAll();
    _bindCheckboxCounters();
    _bindDataSourceRadio();
    _bindRawSearch();
    _bindExportButton();

    // Populate dynamic raw fields list on first init
    _populateDynamicFieldsList();

    if (window.lucide) lucide.createIcons();
}

// ─── Helpers de DOM ───────────────────────────────────────────────────────────

function _$ (id) { return document.getElementById(id); }

function _updateRecordCount() {
    const label = _$('rpt-count-label');
    if (!label) return;
    const src = document.querySelector('input[name="rpt-datasource"]:checked')?.value ?? 'filtered';
    const count = src === 'all' ? (state.rawData?.length ?? 0) : (state.filtered?.length ?? 0);
    label.textContent = `${count.toLocaleString('es-VE')} registros listos`;
}

// ─── Colapsar / Expandir Secciones ───────────────────────────────────────────

function _bindSectionToggles() {
    document.querySelectorAll('.rpt-section-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const sec = btn.dataset.section;
            const body    = document.querySelector(`.rpt-section-body[data-section="${sec}"]`);
            const chevron = document.querySelector(`.rpt-chevron[data-section="${sec}"]`);
            if (!body) return;

            const isHidden = body.classList.toggle('hidden');
            if (chevron) {
                chevron.style.transform = isHidden ? 'rotate(-90deg)' : 'rotate(0deg)';
            }
        });
    });
}

// ─── Contadores de Selección por Sección ─────────────────────────────────────

function _bindCheckboxCounters() {
    const updateCounters = () => {
        document.querySelectorAll('.rpt-selected-count').forEach(badge => {
            const sec = badge.dataset.section;
            if (sec === 'raw') {
                const count = document.querySelectorAll(`#rpt-raw-fields-list input[type="checkbox"]:checked`).length;
                badge.textContent = count;
            } else {
                const body = document.querySelector(`.rpt-section-body[data-section="${sec}"]`);
                if (!body) return;
                const count = body.querySelectorAll('input[type="checkbox"]:checked').length;
                badge.textContent = count;
            }
        });
    };

    // Listen on all static checkboxes
    document.querySelectorAll('.rpt-field-checkbox').forEach(cb => {
        cb.addEventListener('change', updateCounters);
    });

    // Dynamic raw fields are bound after population (see _populateDynamicFieldsList)
    window._rptUpdateCounters = updateCounters;
    updateCounters();
}

// ─── Presets ─────────────────────────────────────────────────────────────────

function _bindPresets() {
    document.querySelectorAll('.rpt-preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = PRESETS[btn.dataset.preset];
            if (!preset) return;

            // Deselect all meta checkboxes first
            document.querySelectorAll('.rpt-field-checkbox').forEach(cb => { cb.checked = false; });

            // Select preset fields
            preset.forEach(id => {
                const el = _$(id);
                if (el) el.checked = true;
            });

            if (window._rptUpdateCounters) window._rptUpdateCounters();
        });
    });
}

function _bindSelectDeselectAll() {
    _$('rpt-select-all')?.addEventListener('click', () => {
        document.querySelectorAll('.rpt-field-checkbox, #rpt-raw-fields-list input[type="checkbox"]')
            .forEach(cb => { cb.checked = true; });
        if (window._rptUpdateCounters) window._rptUpdateCounters();
    });

    _$('rpt-clear-all')?.addEventListener('click', () => {
        document.querySelectorAll('.rpt-field-checkbox, #rpt-raw-fields-list input[type="checkbox"]')
            .forEach(cb => { cb.checked = false; });
        if (window._rptUpdateCounters) window._rptUpdateCounters();
    });
}

// ─── Radio de Fuente de Datos ─────────────────────────────────────────────────

function _bindDataSourceRadio() {
    document.querySelectorAll('input[name="rpt-datasource"]').forEach(radio => {
        radio.addEventListener('change', _updateRecordCount);
    });
}

// ─── Campos Dinámicos (Raw Kobo) ──────────────────────────────────────────────

function _populateDynamicFieldsList() {
    const container = _$('rpt-raw-fields-list');
    if (!container) return;

    const sample = state.rawData ?? [];
    if (!sample.length) {
        container.innerHTML = `<div class="col-span-full text-center text-sm text-slate-400 py-4">No hay datos cargados aún.</div>`;
        return;
    }

    // Collect all unique scalar/semi-scalar keys across all records
    const keySet = new Set();
    const maxScan = Math.min(sample.length, 200); // scan up to 200 records for performance
    for (let i = 0; i < maxScan; i++) {
        const rec = sample[i];
        Object.keys(rec).forEach(k => {
            if (RAW_EXCLUDE_KEYS.has(k)) return;
            if (RAW_EXCLUDE_PREFIXES.some(p => k.startsWith(p))) return;
            keySet.add(k);
        });
    }

    const keys = [...keySet].sort((a, b) => a.localeCompare(b));

    container.innerHTML = keys.map(key => `
        <label class="rpt-raw-label flex items-start gap-2 cursor-pointer group py-0.5">
          <input type="checkbox" class="rpt-raw-checkbox mt-0.5 shrink-0 accent-purple-500 cursor-pointer" data-raw-key="${key}" />
          <span class="text-[11px] font-mono text-slate-600 dark:text-slate-300 group-hover:text-brand-purple transition-colors leading-tight break-all">${key}</span>
        </label>
    `).join('');

    // Bind counter updates to dynamic checkboxes
    container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
            if (window._rptUpdateCounters) window._rptUpdateCounters();
        });
    });
}

function _bindRawSearch() {
    _$('rpt-raw-search')?.addEventListener('input', e => {
        const q = e.target.value.trim().toLowerCase();
        document.querySelectorAll('.rpt-raw-label').forEach(label => {
            const key = label.querySelector('input')?.dataset?.rawKey ?? '';
            label.style.display = (!q || key.toLowerCase().includes(q)) ? '' : 'none';
        });
    });
}

// ─── Exportación a Excel ──────────────────────────────────────────────────────

function _bindExportButton() {
    _$('rpt-export-btn')?.addEventListener('click', async () => {
        await exportToExcel();
    });
}

export async function exportToExcel() {
    const btn        = _$('rpt-export-btn');
    const iconEl     = _$('rpt-export-icon');
    const spinnerEl  = _$('rpt-export-spinner');
    const textEl     = _$('rpt-export-text');

    // ── Set loading state ────────────────────────────────────────────────────
    if (btn) btn.disabled = true;
    if (iconEl) iconEl.classList.add('hidden');
    if (spinnerEl) spinnerEl.classList.remove('hidden');
    if (textEl) textEl.textContent = 'Generando…';

    try {
        // Yield to browser for spinner repaint
        await new Promise(resolve => setTimeout(resolve, 30));

        // ── 1. Resolve data source ───────────────────────────────────────────
        const srcValue = document.querySelector('input[name="rpt-datasource"]:checked')?.value ?? 'filtered';
        const records = srcValue === 'all'
            ? (state.rawData ?? []).filter(r => r._meta)
            : (state.filtered ?? []).filter(r => r._meta);

        if (!records.length) {
            alert('No hay registros que exportar. Carga los datos primero.');
            return;
        }

        // ── 2. Collect selected meta fields ──────────────────────────────────
        const opts = {
            alertsAsText: _$('rpt-opt-alerts-text')?.checked ?? true,
        };

        const selectedMeta = META_FIELDS.filter(f => _$(f.id)?.checked);

        // ── 3. Collect selected raw fields ───────────────────────────────────
        const selectedRaw = [...document.querySelectorAll('.rpt-raw-checkbox:checked')]
            .map(cb => cb.dataset.rawKey)
            .filter(Boolean);

        if (!selectedMeta.length && !selectedRaw.length) {
            alert('Por favor selecciona al menos un campo para exportar.');
            return;
        }

        // ── 4. Build rows ────────────────────────────────────────────────────
        const rows = records.map(r => {
            const row = {};

            // Normalized meta fields
            selectedMeta.forEach(f => {
                row[f.header] = f.extract(r, opts);
            });

            // Raw Kobo fields
            selectedRaw.forEach(key => {
                const val = r[key];
                if (val === null || val === undefined) {
                    row[key] = '';
                } else if (typeof val === 'object') {
                    // Stringify arrays/objects to avoid [object Object]
                    row[key] = JSON.stringify(val);
                } else {
                    row[key] = val;
                }
            });

            return row;
        });

        // ── 5. Build Excel workbook ───────────────────────────────────────────
        const ws = XLSX.utils.json_to_sheet(rows, { skipHeader: false });

        // Style: freeze top row (header)
        ws['!freeze'] = { xSplit: 0, ySplit: 1, topLeftCell: 'A2', activePane: 'bottomLeft' };

        // Auto-fit columns (approx based on header length)
        const allKeys = rows.length > 0 ? Object.keys(rows[0]) : [];
        ws['!cols'] = allKeys.map(k => ({
            wch: Math.max(k.length + 2, 12)
        }));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Encuestas');

        // Optional metadata sheet
        const metaSheet = XLSX.utils.aoa_to_sheet([
            ['Generado por',   'DashboardSociales SEEM'],
            ['Fecha de exportación', new Date().toLocaleString('es-VE')],
            ['Total registros', records.length],
            ['Fuente', srcValue === 'all' ? 'Universo completo' : 'Registros filtrados'],
            ['Campos exportados', allKeys.length],
        ]);
        XLSX.utils.book_append_sheet(wb, metaSheet, 'Metadata');

        // ── 6. Download ────────────────────────────────────────────────────────
        const filenameRaw = _$('rpt-filename')?.value?.trim() || 'reporte_encuestas';
        const filename = filenameRaw.endsWith('.xlsx') ? filenameRaw : `${filenameRaw}.xlsx`;

        XLSX.writeFile(wb, filename);

    } catch (err) {
        console.error('[Reportes] Error exportando Excel:', err);
        alert(`Ocurrió un error al generar el reporte: ${err.message}`);
    } finally {
        // ── Reset button state ────────────────────────────────────────────────
        if (btn) btn.disabled = false;
        if (iconEl) iconEl.classList.remove('hidden');
        if (spinnerEl) spinnerEl.classList.add('hidden');
        if (textEl) textEl.textContent = 'Generar Reporte Excel';
    }
}
