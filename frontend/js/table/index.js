/**
 * ─── Tables (Refactorized Orchestrator) ───────────────────────────────────────
 * Manages the Raw Data Explorer and the Agent Ranking Leaderboard.
 */

export { initGrid, updateGrid } from './detail.js';
export { renderRankingTable }  from './ranking.js';

// Specific formatters can also be re-exported if needed by other modules
export * from './formatters.js';
