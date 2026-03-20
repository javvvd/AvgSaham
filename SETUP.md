# 🚀 Panduan Cepat - Setup & Running

## ⚡ Langkah-Langkah Instalasi

### Langkah 1: Buka Terminal
Buka terminal di folder `Calculator-Saham` (atau buka folder ini di VS Code dan gunakan terminal terintegrasi)

### Langkah 2: Instalasi Dependencies
```bash
npm install
```
Tunggu sampai semua dependencies selesai terinstall.

### Langkah 3: Jalankan Development Server
```bash
npm run dev
```

Anda akan melihat output seperti ini:
```
  VITE v4.3.9  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Press h to show help
```

### Langkah 4: Buka di Browser
Klik link `http://localhost:5173/` atau buka browser dan ketik alamat tersebut.

## 🎉 Aplikasi Sudah Siap!

Sekarang Anda bisa mulai menggunakan Kalkulator Average Down Saham dengan segala fiturnya.

## 📝 Cara Menggunakan Aplikasi

1. **Input Pembelian Pertama**
   - Masukkan jumlah lot (contoh: 1)
   - Masukkan harga per lembar (contoh: 5000)
   - Klik "Tambah Pembelian"

2. **Input Pembelian Lanjutan** (untuk average down)
   - Masukkan lot dan harga yang lebih rendah
   - Klik "Tambah Pembelian"
   - Lihat average down price berkurang

3. **Cek Keuntungan/Kerugian**
   - Masukkan "Harga Saham Saat Ini"
   - Aplikasi otomatis menghitung profit/loss

4. **Kelola Data**
   - Klik tombol 🗑️ untuk hapus satu pembelian
   - Klik "Bersihkan Semua" untuk reset kalkulasi

## 🛠️ Command Lainnya

```bash
# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

## ❓ Troubleshooting

### Error: "Cannot find module 'react'"
```bash
npm install
```

### Port 5173 sudah digunakan
Terminal akan otomatis menggunakan port berikutnya (5174, 5175, dst)

### Halaman tidak refresh dengan otomatis
Refresh manual dengan Ctrl+R atau Cmd+R

## 📞 Tips

- Simpan hasilnya ke notes/spreadsheet karena data akan hilang saat refresh
- Gunakan untuk planning strategy average down Anda
- Bisa digunakan kapan saja untuk quick calculation

Selamat menggunakan! 🎊
