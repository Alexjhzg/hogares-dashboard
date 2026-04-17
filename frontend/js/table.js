/**
 * ─── Tables (Refactorized Orchestrator) ───────────────────────────────────────
 * Manages the Raw Data Explorer and the Agent Ranking Leaderboard.
 */

export { initGrid, updateGrid } from './table/detail.js';
export { renderRankingTable }  from './table/ranking.js';

// Specific formatters can also be re-exported if needed by other modules
export * from './table/formatters.js';
