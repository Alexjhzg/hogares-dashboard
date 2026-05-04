import { describe, it, expect, vi } from 'vitest';
import { runAlertEngine } from './alert-engine.js';

// Mock del estado global si fuera necesario
vi.mock('../core/index.js', async () => {
  const actual = await vi.importActual('../core/index.js');
  return {
    ...actual,
    state: {
      assetName: 'PRUEBA ESCA'
    }
  };
});

describe('Alert Engine (Frontend)', () => {
  it('debería detectar TIEMPO_LARGO si supera el umbral configurado', () => {
    const params = {
      r: {},
      normalized: { formType: 'ESCA' },
      durMin: 50, // > 45
      isCompletada: true,
      hogaresRaw: []
    };
    
    const alertas = runAlertEngine(params);
    expect(alertas).toContain('TIEMPO_LARGO');
  });

  it('no debería detectar TIEMPO_LARGO si no está completada', () => {
    const params = {
      r: {},
      normalized: { formType: 'ESCA' },
      durMin: 100, 
      isCompletada: false,
      hogaresRaw: []
    };
    
    const alertas = runAlertEngine(params);
    expect(alertas).not.toContain('TIEMPO_LARGO');
  });

  it('debería detectar DESPLAZAMIENTO_ANOMALO si la distancia es mayor a 30m', () => {
    const params = {
      r: {},
      normalized: {},
      dist_ini_fin: 45, // > 30
      isCompletada: true,
      hogaresRaw: []
    };
    
    const alertas = runAlertEngine(params);
    expect(alertas).toContain('DESPLAZAMIENTO_ANOMALO');
  });
});
