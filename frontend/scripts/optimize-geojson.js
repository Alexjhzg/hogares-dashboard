/**
 * ─── Automated GeoJSON Optimizer & Compressor ───────────────────────────────
 * Simplifies polygons to specified percentage (default 40%) using Mapshaper CLI
 * and truncates coordinate precision to 5 decimal places (~1m accuracy).
 * 
 * Usage:
 *   npm run optimize:geojson
 *   npm run optimize:geojson -- 30%
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../public/data');
const targetPct = process.argv[2] || '40%';

console.log(`\n🗺️  [GeoJSON Optimizer] Starting optimization with target ratio: ${targetPct}`);

if (!fs.existsSync(dataDir)) {
    console.error(`❌ Data directory not found: ${dataDir}`);
    process.exit(1);
}

const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.geojson') && !f.includes('_backup'));

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const backupPath = path.join(dataDir, `${path.parse(file).name}_backup.geojson`);
    
    // Create backup if not exists
    if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log(`📦 Created backup for ${file} -> ${path.basename(backupPath)}`);
    }

    const origSizeMB = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);

    try {
        console.log(`⚡ Processing ${file} (${origSizeMB} MB)...`);
        
        // Execute mapshaper simplification & 5-decimal precision truncation
        const cmd = `npx -y mapshaper "${backupPath}" -simplify ${targetPct} keep-shapes -o precision=0.00001 "${filePath}"`;
        execSync(cmd, { stdio: 'pipe' });

        const newSizeMB = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
        const reduction = (((origSizeMB - newSizeMB) / origSizeMB) * 100).toFixed(1);
        
        console.log(`✅ ${file}: ${origSizeMB} MB ➔ ${newSizeMB} MB (Reduced by ${reduction}%)\n`);
    } catch (err) {
        console.error(`❌ Error processing ${file}:`, err.message);
    }
});

console.log('🎉 GeoJSON Optimization Completed Successfully!\n');
