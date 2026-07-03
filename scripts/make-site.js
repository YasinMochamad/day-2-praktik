// Susun situs statis untuk Pages: dashboard status + laporan coverage.
// Support GitLab CI (CI_COMMIT_SHORT_SHA) dan GitHub Actions (GITHUB_SHA).
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

// 3) Ambil SHA — support GitLab & GitHub
const sha = process.env.CI_COMMIT_SHORT_SHA
  || (process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : null)
  || 'lokal';

// 4) Ambil info tambahan dari GitHub Actions (kalau ada)
const actor    = process.env.GITHUB_ACTOR || process.env.GITLAB_USER_LOGIN || '-';
const branch   = process.env.GITHUB_REF_NAME || process.env.CI_COMMIT_BRANCH || '-';
const repo     = process.env.GITHUB_REPOSITORY || process.env.CI_PROJECT_PATH || '-';
const runUrl   = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
  ? process.env.GITHUB_SERVER_URL + '/' + process.env.GITHUB_REPOSITORY + '/actions/runs/' + process.env.GITHUB_RUN_ID
  : '#';

// 5) Tulis index.html (tanpa dependency)
const html = `<!doctype html>
<html lang="id"><meta charset="utf-8">
<title>CI/CD Capstone — Status</title>
<style>
  body { font-family: system-ui; max-width: 680px; margin: 40px auto; padding: 0 16px }
  h1   { font-size: 1.4rem; margin-bottom: 8px }
  .ok  { color: #137333; font-weight: 600 }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 14px 16px; margin: 10px 0 }
  .card b { display: inline-block; min-width: 110px; color: #555 }
  a    { color: #0969da }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 12px;
           font-size: .85rem; font-weight: 600; margin-left: 8px }
  .green { background: #d4edda; color: #137333 }
</style>
<h1>🚀 CI/CD Capstone — Dashboard</h1>
<div class="card"><b>Build status:</b> <span class="ok">${info.status}</span><span class="badge green">PASSED</span></div>
<div class="card"><b>Commit:</b> <code>${sha}</code></div>
<div class="card"><b>Branch:</b> ${branch}</div>
<div class="card"><b>Actor:</b> ${actor}</div>
<div class="card"><b>Repository:</b> ${repo}</div>
<div class="card"><b>Modul:</b> ${(info.modul || []).join(', ')}</div>
<div class="card"><b>Pipeline:</b> <a href="${runUrl}" target="_blank">Lihat di GitHub Actions →</a></div>
<hr style="margin:20px 0;border:none;border-top:1px solid #eee">
<p><a href="./coverage/index.html">📊 Lihat laporan coverage</a></p>`;

fs.writeFileSync(path.join(pub, 'index.html'), html);
console.log('🌐 public/ siap untuk Pages (sha=' + sha + ', branch=' + branch + ')');