import { state } from '../state.js';
import { $ } from '../helpers.js';
import { applyFilters } from '../filters.js';
import { showDetailModal } from '../modal.js';
import { getRouteMarkerIconHtml, getRouteTooltipHtml } from './templates.js';

function clearAgentRoute() {
    if (state.agentRouteLayer) {
        state.map.removeLayer(state.agentRouteLayer);
        state.agentRouteLayer = null;
    }
}

export function drawAgentRoute(cedula) {
    clearAgentRoute();
    if (!cedula || !state.map) return;

    const agentPoints = state.filtered
        .filter(r => r._meta?.cedula === cedula && r._meta.lat && r._meta.lng)
        .sort((a, b) => {
            const ta = new Date(a['start'] || 0).getTime();
            const tb = new Date(b['start'] || 0).getTime();
            return ta - tb;
        });

    if (agentPoints.length === 0) return;

    const countEl = $('mapRouteAgentCount');
    if (countEl) countEl.textContent = `${agentPoints.length} ptos`;

    const latlngs = agentPoints.map(r => [r._meta.lat, r._meta.lng]);
    const layers = [];

    layers.push(L.polyline(latlngs, {
        color: '#F97316',
        weight: 2.5,
        opacity: 0.85,
        dashArray: '6 4',
    }));

    agentPoints.forEach((r, idx) => {
        const m = r._meta;
        const num = idx + 1;
        const hora = (r['start'] || '').slice(11, 16) || '—';
        const durText = m.durMin !== null ? `${Math.round(m.durMin)} min` : '—';

        const icon = L.divIcon({
            className: '',
            html: getRouteMarkerIconHtml(num),
            iconSize: [22, 22],
            iconAnchor: [11, 11],
        });

        const marker = L.marker([m.lat, m.lng], { icon });
        marker.bindTooltip(getRouteTooltipHtml(num, hora, m, durText), { sticky: true, opacity: 0.97 });
        marker.on('click', () => showDetailModal(r));
        layers.push(marker);
    });

    state.agentRouteLayer = L.layerGroup(layers).addTo(state.map);
    const bounds = L.latLngBounds(latlngs);
    if (bounds.isValid()) state.map.fitBounds(bounds, { padding: [60, 60] });
}

export function initVerRutaButton() {
    const selEnc = document.getElementById('filterEncuestador');
    const btn = document.getElementById('btnVerRutaAgente');
    const countLabel = document.getElementById('mapRouteAgentCount');

    if (!selEnc || !btn) return;
    if (btn._verRutaAttached) return;
    btn._verRutaAttached = true;

    const syncBtn = () => {
        const hasAgent = !!selEnc.value;
        const pts = hasAgent ? state.filtered.filter(r =>
            r._meta?.cedula === selEnc.value && r._meta.lat && r._meta.lng
        ).length : 0;

        btn.disabled = !hasAgent;
        if (countLabel) countLabel.textContent = (hasAgent && pts) ? `${pts} pts` : '—';

        if (!hasAgent) {
            clearAgentRoute();
            btn.dataset.routeActive = '0';
            btn.classList.remove('bg-brand-orange/20', 'border-brand-orange');
            const labelEl = btn.querySelector('.route-label');
            if (labelEl) labelEl.textContent = 'Ver Ruta';

            if (state.map && state.markerCluster && !state.map.hasLayer(state.markerCluster)) {
                state.map.addLayer(state.markerCluster);
            }
        }
    };

    syncBtn();
    selEnc.addEventListener('change', syncBtn);
    document.addEventListener('filtersApplied', syncBtn);

    btn.addEventListener('click', () => {
        const cedula = selEnc.value;
        if (!cedula) return;

        const isActive = btn.dataset.routeActive === '1';

        if (isActive) {
            clearAgentRoute();
            btn.dataset.routeActive = '0';
            if (state.map && state.markerCluster && !state.map.hasLayer(state.markerCluster)) {
                state.map.addLayer(state.markerCluster);
            }
            btn.classList.remove('bg-brand-orange/20', 'border-brand-orange');
            const pts = state.filtered.filter(r => r._meta?.cedula === cedula && r._meta.lat && r._meta.lng).length;
            if (countLabel) countLabel.textContent = `${pts} pts`;
            const labelEl = btn.querySelector('.route-label');
            if (labelEl) labelEl.textContent = 'Ver Ruta';
        } else {
            const tabBtn = document.querySelector('[data-tab="tab-mapa"]');
            if (tabBtn) tabBtn.click();

            setTimeout(() => {
                drawAgentRoute(cedula);
                btn.dataset.routeActive = '1';
                if (state.map && state.markerCluster && state.map.hasLayer(state.markerCluster)) {
                    state.map.removeLayer(state.markerCluster);
                }
                btn.classList.add('bg-brand-orange/20', 'border-brand-orange');
                const pts = state.filtered.filter(r => r._meta?.cedula === cedula && r._meta.lat && r._meta.lng).length;
                if (countLabel) countLabel.textContent = `${pts} pts`;
                const labelEl = btn.querySelector('.route-label');
                if (labelEl) labelEl.textContent = 'Ocultar Ruta';
            }, 200);
        }
    });
}
