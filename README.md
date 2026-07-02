# day-2-praktik

Project latihan CI/CD (Sesi 1 & 2) — Node.js utility functions dengan ESLint & build validation.

## Setup

```bash
npm install
```

## Scripts

| Perintah | Keterangan |
|---|---|
| `npm run lint` | Jalankan ESLint pada folder `src/` dan `scripts/` |
| `npm run build` | Validasi build — cek semua module & fungsi tersedia, hasilkan `dist/build-info.json` |
| `npm start` | Demo: jalankan `capitalize('halo dunia')` |

## Struktur Project

```
day-2-praktik/
├── src/
│   ├── stringUtils.js     # capitalize, reverse, wordCount, isPalindrome
│   └── mathUtils.js       # add, divide, isPrime
├── scripts/
│   └── validate-build.js  # Build validation script
├── .eslintrc.json
└── package.json
```

## Utility Functions

### stringUtils
- `capitalize(text)` — Kapitalkan huruf pertama tiap kata
- `reverse(text)` — Balik urutan karakter string
- `wordCount(text)` — Hitung jumlah kata (toleran spasi ganda)
- `isPalindrome(text)` — Cek apakah string adalah palindrom

### mathUtils
- `add(a, b)` — Penjumlahan dua angka
- `divide(a, b)` — Pembagian, throw `RangeError` jika `b === 0`
- `isPrime(n)` — Cek bilangan prima
