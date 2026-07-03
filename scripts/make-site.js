// Susun situs statis untuk GitLab Pages: dashboard status + laporan coverage.
const fs = require('fs');
const path = require('path');

const pub = path.join(__dirname, '..', 'public');
fs.mkdirSync(pub, { recursive: true });

// 1) Salin laporan coverage HTML (kalau ada)
const cov = path.join(__dirname, '..', 'coverage', 'lcov-report');
if (fs.existsSync(cov)) fs.cpSync(cov, path.join(pub, 'coverage'), { recursive: true });

// 2) Baca build-info untuk dashboard
let info = { status: 'unknown', modul: [] };
const infoPath = path.join(__dirname, '..', 'dist', 'build-info.json');
if (fs.existsSync(infoPath)) info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));

// 3) Tulis index.html (tanpa dependency)
const sha = process.env.CI_COMMIT_SHORT_SHA || 'lokal';
const html = `<!doctype html>
<html lang="id"><meta charset="utf-8">
<title>CI/CD Capstone — Status</title>
<style>body{font-family:system-ui;max-width:640px;margin:40px auto;padding:0 16px}
.ok{color:#137333}.card{border:1px solid #ddd;border-radius:8px;padding:16px;margin:12px 0}</style>
<h1>🚀 CI/CD Capstone — Dashboard</h1>
<div class="card"><b>Build status:</b> <span class="ok">${info.status}</span></div>
<div class="card"><b>Commit:</b> ${sha}</div>
<div class="card"><b>Modul:</b> ${(info.modul || []).join(', ')}</div>
<p><a href="./coverage/index.html">📊 Lihat laporan coverage</a></p>`;
fs.writeFileSync(path.join(pub, 'index.html'), html);
console.log('🌐 public/ siap untuk GitLab Pages');