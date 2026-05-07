import { state } from '../core/index.js';
import { ROWS_PER_PAGE } from '../core/index.js';
import { showDetailModal } from '../modal/index.js';
import { 
    estadoFormatter, duracionFormatter, alertasFormatter, actionButtonFormatter 
} from './formatters.js';

export function initGrid(initialData = []) {
    if (state.detailTable) return;
    
    state.detailTable = new Tabulator('#detailGrid', {
        data: initialData,
        layout: 'fitColumns',
        height: '100%',
        pagination: true,
        paginationSize: ROWS_PER_PAGE,
        paginationSizeSelector: [10, 25, 50, 100],
        movableColumns: true,
        responsiveLayout: 'collapse',
        clipboard: true,
        placeholder: '<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">Cargando base de datos...</div>',
        columnHeaderVertAlign: 'bottom',
        columns: [
            { formatter: 'responsiveCollapse', width: 30, minWidth: 30, hozAlign: 'center', headerSort: false, resizable: false, responsive: 0 },
            {
                title: 'Identificación', frozen: true,
                columns: [
                    { title: 'Cédula',  field: 'cedula',  headerFilter: 'input', minWidth: 90,  responsive: 0 },
                    { title: 'Nombre',  field: 'nombre',  headerFilter: 'input', minWidth: 140, responsive: 0 },
                    { title: 'Control', field: 'control', headerFilter: 'input', width: 85,     responsive: 0 },
                    { title: 'Serie',   field: 'serie',   headerFilter: 'input', width: 60,     responsive: 2 },
                    { title: 'Línea',   field: 'linea',   headerFilter: 'input', width: 60,     responsive: 2 },
                ]
            },
            {
                title: 'Contexto',
                columns: [
                    { title: 'Fecha',     field: 'fecha',     headerFilter: 'input', width: 90, sorter: 'date', responsive: 1 },
                    { title: 'Municipio', field: 'mun',       headerFilter: 'input', width: 90, responsive: 2 },
                    { title: 'Parroquia', field: 'par',       headerFilter: 'input', width: 90, responsive: 4 },
                    { title: 'Segm.',     field: 'segmento',  headerFilter: 'input', width: 70, hozAlign: 'center', responsive: 4 },
                    { title: 'Sect.',     field: 'sector',    headerFilter: 'input', width: 70, hozAlign: 'center', responsive: 4 },
                ]
            },
            {
                title: 'Métricas',
                columns: [
                    { title: 'Estado', field: 'estado', width: 100, responsive: 0, formatter: estadoFormatter, headerFilter: 'list', headerFilterParams: { valuesLookup: true, clearable: true } },
                    { title: 'Dur.', field: 'durMin', width: 70, hozAlign: 'center', responsive: 2, formatter: duracionFormatter },
                    { title: 'Alertas', field: 'alertas', minWidth: 160, headerSort: false, responsive: 2, formatter: alertasFormatter },
                ]
            },
            {
                title: 'Social',
                columns: [
                    { title: 'Hog.', field: 'hogares',  width: 50, hozAlign: 'center', responsive: 4 },
                    { title: 'Pers.', field: 'personas', width: 50, hozAlign: 'center', responsive: 4 },
                ]
            },
            {
                title: 'Acciones', width: 120, headerSort: false, hozAlign: 'center', responsive: 0,
                formatter: actionButtonFormatter,
                cellClick: (e, cell) => {
                    e.stopPropagation();
                    const btn = e.target.closest('button');
                    if (!btn) return;
                    const rec = cell.getData()._rec;
                    if (rec && btn.dataset.action === 'view') showDetailModal(rec);
                }
            }
        ],
        rowFormatter: row => {
            const data = row.getData();
            if (data.estado === 'completada')        row.getElement().classList.add('row-complete');
            else if (data.estado === 'no_efectiva') row.getElement().classList.add('row-no-efectiva');
            if (data.hasAlerts)                      row.getElement().classList.add('row-flagged');
        }
    });

    state.detailTable.on('rowClick', (e, row) => {
        const rec = row.getData()._rec;
        if (rec) showDetailModal(rec);
    });
}

export function updateGrid(data = state.filtered) {
    const rows = data.map(rec => {
        const m = rec._meta || {};
        return {
            _rec: rec,
            id:       m.control || rec._uuid,
            cedula:   m.cedula   || '',
            nombre:   m.nombre   || '',
            control:  m.control  || '',
            serie:    m.n_serie  || '',
            linea:    m.n_linea  || '',
            fecha:    m.fecha    || '',
            mun:      m.mun      || '',
            par:      m.par      || '',
            nodo:     m.nodo     || '',
            segmento: m.segmento || '',
            sector:   m.sector   || '',
            estado:   m.estado   || '',
            durMin:   m.durMin,
            alertas:  m.alertas  || [],
            hasAlerts: m.hasAlerts || false,
            hogares:  m.hogares  || 0,
            personas: m.totalPers || 0
        };
    });

    if (!state.detailTable) {
        initGrid(rows);
    } else {
        try {
            state.detailTable.setData(rows).then(() => {
                state.detailTable.redraw(true);
            });
        } catch (e) {
            console.warn('Tabulator setData delayed:', e.message);
            setTimeout(() => {
                if (state.detailTable) {
                    state.detailTable.setData(rows).then(() => {
                        state.detailTable.redraw(true);
                    });
                }
            }, 100);
        }
    }
}
