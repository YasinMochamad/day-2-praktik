// Build bundle: satukan semua modul src/ -> dist/bundle.js + dist/manifest.json
const fs = require('fs');
const path = require('path');

console.log('📦 Memulai proses bundle...');

const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');
fs.mkdirSync(distDir, { recursive: true });

// 1) Kumpulkan semua file .js di src/ (kecuali file test)
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.js') && !f.includes('test'));

if (files.length === 0) {
  console.error('❌ Tidak ada file .js di src/');
  process.exit(1);
}

// 2) Gabungkan isi semua file menjadi satu bundle
const banner = [
  '// ============================================================',
  '// BUNDLE — di-generate otomatis oleh scripts/build-bundle.js',
  '// Tanggal : ' + new Date().toISOString(),
  '// Modul   : ' + files.join(', '),
  '// ============================================================',
].join('\n');

let bundleContent = banner + '\n\n';
const modul = [];

for (const file of files) {
  const filePath = path.join(srcDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const moduleName = path.basename(file, '.js');

  bundleContent += '// --- ' + file + ' ---\n';
  bundleContent += content;
  bundleContent += '\n';
  modul.push(moduleName);
}

// 3) Tulis dist/bundle.js
const bundlePath = path.join(distDir, 'bundle.js');
fs.writeFileSync(bundlePath, bundleContent, 'utf8');

const bundleSize = fs.statSync(bundlePath).size;
console.log('bundleSize terbentuk: ' + bundleSize + ' bytes -> dist/bundle.js');

// 4) Tulis dist/manifest.json
const manifest = {
  builtAt: new Date().toISOString(),
  modul: modul,
  files: files.map(function(f) {
    return { name: f, size: fs.statSync(path.join(srcDir, f)).size };
  }),
  bundle: { file: 'dist/bundle.js', size: bundleSize },
};

fs.writeFileSync(
  path.join(distDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2),
  'utf8'
);

console.log('manifest terbentuk -> dist/manifest.json');
console.log('Modul: ' + modul.join(', '));
console.log('Bundle OK');