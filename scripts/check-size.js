// check-size.js — performance budget: pastikan dist/bundle.js tidak melebihi batas ukuran.
// Jika bundle terlalu besar -> exit(1) -> pipeline MERAH.
const fs = require('fs');
const path = require('path');

// Batas maksimum ukuran bundle (bytes). Sesuaikan dengan kebutuhan project.
const BUDGET_BYTES = 50 * 1024; // 50 KB

const bundlePath = path.join(__dirname, '..', 'dist', 'bundle.js');

if (!fs.existsSync(bundlePath)) {
  console.error('dist/bundle.js tidak ditemukan. Jalankan npm run bundle terlebih dahulu.');
  process.exit(1);
}

const sizeBytes = fs.statSync(bundlePath).size;
const sizeKB = (sizeBytes / 1024).toFixed(2);
const budgetKB = (BUDGET_BYTES / 1024).toFixed(0);

console.log('Budget check:');
console.log('  File   : dist/bundle.js');
console.log('  Ukuran : ' + sizeKB + ' KB');
console.log('  Budget : ' + budgetKB + ' KB');

if (sizeBytes > BUDGET_BYTES) {
  console.error('BUDGET TERLAMPAUI! ' + sizeKB + ' KB > ' + budgetKB + ' KB');
  console.error('Kurangi ukuran bundle sebelum merge ke main.');
  process.exit(1); // exit != 0 -> pipeline MERAH
}

console.log('Budget OK — ' + sizeKB + ' KB <= ' + budgetKB + ' KB');