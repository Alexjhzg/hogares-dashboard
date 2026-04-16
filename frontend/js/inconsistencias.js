// ─── Módulo de Inconsistencias ───────────────────────────────────────────────
// Renderiza el panel resumen de alertas de calidad de datos.
// Agrupa alertas por tipo usando ALERT_MAP para obtener labels legibles.

import { state }     from './state.js?v=39';
import { ALERT_MAP } from './config.js?v=39';
import { $, $$  }    from './helpers.js?v=39';
import { showDetailModal } from './modal.js?v=39';

let currentAlertFilter = '';
let currentSearchQuery = '';
let isEventsBound = false;

/**
 * Inicializa la tabla Tabulator para las inconsistencias.
 */
function initInconsistenciasTable(initialData = []) {
    if (state.inconsistenciasTabulator) return;
    
    state.inconsistenciasTabulator = new Tabulator('#inconsistenciasTable', {
        data: initialData,
        layout: 'fitColumns',
        height: '500px',
        responsiveLayout: 'collapse',
        placeholder: '<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">No hay inconsistencias para mostrar</div>',
        columnHeaderVertAlign: 'bottom',
        columns: [
            { formatter: 'responsiveCollapse', width: 30, minWidth: 30, hozAlign: 'center', headerSort: false, resizable: false, responsive: 0 },
            { title: 'Encuestador', field: 'nombre', minWidth: 150, responsive: 0,
              formatter: cell => `<div style="font-weight:700;">${cell.getValue()}</div>`
            },
            { title: 'Cédula', field: 'cedula', width: 100, responsive: 2, cssClass: 'font-mono' },
            { title: 'Control', field: 'control', width: 100, responsive: 0, cssClass: 'font-mono text-brand-blue font-bold' },
            { title: 'Fecha', field: 'fecha', width: 100, responsive: 1, sorter: 'date' },
            { title: 'Semana', field: 'semana', width: 80, hozAlign: 'center', responsive: 1 },
            { title: 'Alertas', field: 'alertas', minWidth: 200, headerSort: false, responsive: 0,
              formatter: cell => {
                  const codes = cell.getValue();
                  if (!codes) return '';
                  return codes.map(code => {
                      const rule = ALERT_MAP[code] || { label: code };
                      return `<span style="display:inline-flex;align-items:center;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.2);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;margin-right:3px;white-space:nowrap;">${rule.label}</span>`;
                  }).join('');
              }
            }
        ],
    });

    state.inconsistenciasTabulator.on('rowClick', (e, row) => {
        const rec = row.getData()._rec;
        if (rec) showDetailModal(rec);
    });
}

/**
 * Renderiza el panel de inconsistencias.
 * - Tarjetas de resumen: total de alertas por código.
 * - Tabla expandible: encuestador, control, fecha, semana, tipo de alerta.
 * Llamar desde renderAll() en main.js.
 */
export function renderInconsistencias() {
    const container = $('inconsistenciasContainer');
    if (!container) return;

    // ── 1. Recopilar todos los registros con alertas ──────────────────────────
    const globalAlertedRecs = state.filtered.filter(r => r._meta && r._meta.hasAlerts);

    // ── 2. Contar por código ──────────────────────────────────────────────────
    /** @type {Record<string, number>} */
    const countByCode = {};
    globalAlertedRecs.forEach(r => {
        r._meta.alertas.forEach(code => {
            countByCode[code] = (countByCode[code] || 0) + 1;
        });
    });

    const totalAlertas = globalAlertedRecs.length;

    // ── 3. Ligar eventos iniciales ────────────────────────────────────────────
    if (!isEventsBound) {
        isEventsBound = true;
        
        const searchInp = $('incSearchInput');
        const clearBtn = $('incClearSearch');
        const filterSel = $('incFilterAlerta');
        const cardsCont = $('inconsistenciasCards');

        if (searchInp) {
            searchInp.addEventListener('input', (e) => {
                currentSearchQuery = e.target.value.trim().toLowerCase();
                if (clearBtn) clearBtn.classList.toggle('hidden', currentSearchQuery.length === 0);
                renderInconsistencias();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInp) searchInp.value = '';
                currentSearchQuery = '';
                clearBtn.classList.add('hidden');
                renderInconsistencias();
            });
        }

        if (filterSel) {
            filterSel.addEventListener('change', (e) => {
                currentAlertFilter = e.target.value;
                renderInconsistencias();
            });
        }

        if (cardsCont) {
            cardsCont.addEventListener('click', (e) => {
                const card = e.target.closest('.alert-card');
                if (!card) return;
                const code = card.dataset.code;
                currentAlertFilter = (currentAlertFilter === code) ? '' : code;
                renderInconsistencias();
            });
        }
    }

    // ── 4. Actualizar desplegable de alertas ──────────────────────────────────
    const selectEl = $('incFilterAlerta');
    if (selectEl) {
        const codeEntries = Object.entries(countByCode).sort((a, b) => b[1] - a[1]);
        const opts = ['<option value="">Todas las alertas</option>'];
        codeEntries.forEach(([code, count]) => {
            const label = ALERT_MAP[code] ? ALERT_MAP[code].label : code;
            const sel = (code === currentAlertFilter) ? 'selected' : '';
            opts.push(`<option value="${code}" ${sel}>${label} (${count})</option>`);
        });
        
        // Evitamos reescribir todo el innerHTML si no es necesario para no perder el foco
        const currentHTML = selectEl.innerHTML;
        const newHTML = opts.join('');
        if (currentHTML !== newHTML) {
            selectEl.innerHTML = newHTML;
        }
    }

    // ── 5. Renderizar tarjetas de resumen ─────────────────────────────────────
    const cardsEl = $('inconsistenciasCards');
    if (cardsEl) {
        if (totalAlertas === 0) {
            cardsEl.innerHTML = `
                <div class="col-span-full text-center py-10 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                         fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2 text-brand-green">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <p class="font-bold text-sm">Sin inconsistencias detectadas</p>
                    <p class="text-xs mt-1 opacity-60">Todos los registros del filtro actual pasan las validaciones.</p>
                </div>`;
        } else {
            const BADGE_COLORS = {
                'TIEMPO_CORTO_EHM':    { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
                'TIEMPO_CORTO_ESCA':   { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
                'TIEMPO_CORTO':        { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
                'TIEMPO_LARGO':        { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
                'APERT_LEJOS':         { bg: '#8B5CF622', border: '#8B5CF6', text: '#8B5CF6' },
                'FUERA_SEGMENTO':      { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
                'SEGMENTO_INCORRECTO': { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
                'ARRANQUE_INCONSISTENTE': { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
                'LINEA_SERIE_INVALIDA':   { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
                'CEDULA_INVALIDA':        { bg: '#EF444422', border: '#EF4444', text: '#EF4444' },
                'INGRESO_ANOMALO':        { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
                'DESPLAZAMIENTO_ANOMALO': { bg: '#F59E0B22', border: '#F59E0B', text: '#F59E0B' },
            };

            const sorted = Object.entries(countByCode).sort((a, b) => b[1] - a[1]);
            cardsEl.innerHTML = sorted.map(([code, count]) => {
                const rule = ALERT_MAP[code] || { label: code };
                const c = BADGE_COLORS[code] || { bg: '#64748b22', border: '#64748b', text: '#64748b' };
                const isActive = currentAlertFilter === code;
                const ringClass = isActive ? `ring-2 ring-offset-1 dark:ring-offset-[#0B1120]` : '';
                const styleRing = isActive ? `ring-color: ${c.border}; border-color: ${c.border};` : `border-color:${c.border}30;`;
                
                return `
                <div class="alert-card ${ringClass}"
                     data-code="${code}"
                     style="background:${c.bg}; ${styleRing};">
                    <div class="min-w-0 pr-2">
                        <div class="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-0.5 truncate"
                             style="color:${c.text}" title="${rule.label}">${rule.label}</div>
                        <div class="text-[9px] text-slate-500 font-mono truncate opacity-60">${code}</div>
                    </div>
                    <div class="text-xl sm:text-2xl font-black font-outfit shrink-0 ml-auto" style="color:${c.text}">${count}</div>
                </div>`;
            }).join('');
        }
    }

    // ── 6. Aplicar filtros locales de búsqueda y alerta ───────────────────────
    let localAlertedRecs = globalAlertedRecs;

    if (currentAlertFilter) {
        localAlertedRecs = localAlertedRecs.filter(r => r._meta.alertas.includes(currentAlertFilter));
    }

    if (currentSearchQuery) {
        localAlertedRecs = localAlertedRecs.filter(r => {
            const m = r._meta;
            return (m.nombre && m.nombre.toLowerCase().includes(currentSearchQuery)) ||
                   (m.cedula && m.cedula.toLowerCase().includes(currentSearchQuery)) ||
                   (m.control && m.control.toLowerCase().includes(currentSearchQuery));
        });
    }

    // ── 7. Renderizar tabla con Tabulator ──────────────────────────────────
    const rows = [...localAlertedRecs].sort((a, b) => {
        const diff = b._meta.alertas.length - a._meta.alertas.length;
        if (diff !== 0) return diff;
        return (b._meta.fecha || '').localeCompare(a._meta.fecha || '');
    });

    const tableRows = rows.map(r => ({
        _rec: r,
        nombre: r._meta.nombre,
        cedula: r._meta.cedula,
        control: r._meta.control || '—',
        fecha: r._meta.fecha || '—',
        semana: r._meta.semana || '—',
        alertas: r._meta.alertas,
    }));

    if (!state.inconsistenciasTabulator) {
        initInconsistenciasTable(tableRows);
    } else {
        state.inconsistenciasTabulator.setData(tableRows);
    }
}
