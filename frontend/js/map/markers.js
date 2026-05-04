import { state } from '../core/index.js';
import { $ } from '../utils/index.js';
import { applyFilters } from '../filters/index.js';
import { COLORS, ALERT_MAP } from '../core/index.js';
import { getSurveyMarkerPopupHtml } from './templates.js';
import { drawAgentRoute } from './route.js';

export function renderMap() {
    if (!state.map || !state.markerCluster) return;
    state.markerCluster.clearLayers();

    const points = state.filtered.filter(r => r._meta.lat && r._meta.lng);

    const completedOnMap = points.filter(r => r._meta && r._meta.estado === 'completada').length;
    const noEfectOnMap = points.length - completedOnMap;
    const agentsOnMap = new Set(points.map(r => r._meta.cedula)).size;
    const alertasOnMap = points.filter(r => r._meta.hasAlerts).length;
    const munsOnMap = new Set(points.map(r => r._meta.mun).filter(m => m && m !== 'N/A'));
    const parsOnMap = new Set(points.map(r => r._meta.par).filter(p => p && p !== 'N/A'));
    const nodosOnMap = new Set(points.map(r => r._meta.nodo).filter(n => n && n !== 'N/A'));

    if ($('mapKpiPoints')) $('mapKpiPoints').textContent = points.length;
    if ($('mapKpiComplete')) $('mapKpiComplete').textContent = completedOnMap;
    if ($('mapKpiNoEfectiva')) $('mapKpiNoEfectiva').textContent = noEfectOnMap;
    if ($('mapKpiAgents')) $('mapKpiAgents').textContent = agentsOnMap;
    if ($('mapKpiAlertas')) $('mapKpiAlertas').textContent = alertasOnMap;

    const badge = $('mapCoverageBadge');
    if (badge && points.length > 0) {
        badge.classList.remove('hidden');
        if ($('mapMunCount')) $('mapMunCount').textContent = munsOnMap.size;
        if ($('mapParCount')) $('mapParCount').textContent = parsOnMap.size;
        if ($('mapNodoCount')) $('mapNodoCount').textContent = nodosOnMap.size;
    }

    const markers = points.map(r => {
        const m = r._meta;
        const isComplete = m.estado === 'completada';
        const hasAlerts = m.hasAlerts;
        const alertas = m.alertas || [];

        let color, borderColor, alertBadge;
        if (hasAlerts) {
            color = '#EF4444'; borderColor = '#DC2626';
            alertBadge = 'Alerta';
        } else if (isComplete) {
            color = '#10B981'; borderColor = '#059669'; alertBadge = 'Efectiva';
        } else {
            color = '#F59E0B'; borderColor = '#D97706'; alertBadge = 'No Efectiva';
        }

        const durText = m.durMin !== null ? `${Math.round(m.durMin)} min` : '—';
        const distText = m.distance_m !== null ? `${Math.round(m.distance_m)} m` : '—';

        const html = getSurveyMarkerPopupHtml(m, r._uuid, color, borderColor, alertBadge, alertas, durText, distText);

        return L.circleMarker([m.lat, m.lng], {
            radius: 7, fillColor: color, color: borderColor,
            weight: 2, opacity: 0.9, fillOpacity: 0.7,
        }).bindPopup(html, { className: 'custom-popup', maxWidth: 320 });
    });

    state.markerCluster.addLayers(markers);

    const routeBtn = document.getElementById('btnVerRutaEncuestador');
    const routeActive = routeBtn?.dataset?.routeActive === '1';

    if (routeActive) {
        if (state.map.hasLayer(state.markerCluster)) state.map.removeLayer(state.markerCluster);
        const selEnc = document.getElementById('filterEncuestador');
        if (selEnc && selEnc.value) {
            drawAgentRoute(selEnc.value);
        }
    } else {
        if (markers.length > 0) {
            const bounds = state.markerCluster.getBounds();
            if (bounds.isValid()) state.map.fitBounds(bounds, { padding: [50, 50] });
        }
    }
    if (window.lucide) lucide.createIcons();
}

window.setQuickFilter = function (mode) {
    state.quickFilterMode = mode;
    const mapFilters = {
        'all': { 
            id: 'btnMapFilterAll', 
            active: ['bg-brand-blue/10', 'dark:bg-brand-blue/20', 'border-brand-blue', 'ring-brand-blue/30'],
            inactive: 'border-brand-blue' 
        },
        'efectivas': { 
            id: 'btnMapFilterEfectivas', 
            active: ['bg-brand-emerald/10', 'dark:bg-brand-emerald/20', 'border-brand-emerald', 'ring-brand-emerald/30'],
            inactive: 'border-brand-emerald' 
        },
        'no_efectiva': { 
            id: 'btnMapFilterNoEfectiva', 
            active: ['bg-brand-orange/10', 'dark:bg-brand-orange/20', 'border-brand-orange', 'ring-brand-orange/30'],
            inactive: 'border-brand-orange' 
        },
        'alertas': { 
            id: 'btnMapFilterAlertas', 
            active: ['bg-brand-red/10', 'dark:bg-brand-red/20', 'border-brand-red', 'ring-brand-red/30'],
            inactive: 'border-brand-red' 
        },
    };

    Object.entries(mapFilters).forEach(([m, cfg]) => {
        const btn = $(cfg.id);
        if (!btn) return;
        btn.classList.remove(
            'bg-brand-blue/10', 'dark:bg-brand-blue/20', 'border-brand-blue', 'ring-brand-blue/30',
            'bg-brand-emerald/10', 'dark:bg-brand-emerald/20', 'border-brand-emerald', 'ring-brand-emerald/30',
            'bg-brand-orange/10', 'dark:bg-brand-orange/20', 'border-brand-orange', 'ring-brand-orange/30',
            'bg-brand-red/10', 'dark:bg-brand-red/20', 'border-brand-red', 'ring-brand-red/30',
            'ring-1', 'shadow-md', 'border-slate-400',
            'active-filter-blue', 'active-filter-emerald', 'active-filter-orange', 'active-filter-red'
        );
        if (m === mode) {
            const activeClass = `active-filter-${m === 'all' ? 'blue' : m === 'efectivas' ? 'emerald' : m === 'no_efectiva' ? 'orange' : 'red'}`;
            btn.classList.add(activeClass, 'shadow-md');
        } else {
            btn.classList.add(cfg.inactive);
        }
    });
    applyFilters();
};
