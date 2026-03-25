# Panduan: Menambahkan IP untuk Akses PostgreSQL dari Luar VPS

Panduan ini menjelaskan langkah-langkah untuk mengizinkan IP tertentu mengakses database PostgreSQL yang ada di VPS (119.235.250.90) dari luar (misalnya dari laptop lokal).

---

## Prasyarat

- Akses SSH ke VPS sebagai `root`
- IP publik yang ingin didaftarkan (cek di https://whatismyipaddress.com)

---

## Step 1: SSH ke VPS

```bash
ssh root@119.235.250.90
```

---

## Step 2: Tambahkan Rule di `pg_hba.conf`

File ini mengontrol siapa saja yang boleh terhubung ke PostgreSQL.

### 2.1 Cari lokasi file

```bash
find /etc/postgresql -name "pg_hba.conf"
```

Output biasanya: `/etc/postgresql/<versi>/main/pg_hba.conf`

### 2.2 Edit file

```bash
nano /etc/postgresql/16/main/pg_hba.conf
```

> Ganti `16` dengan versi PostgreSQL yang terinstall jika berbeda.

### 2.3 Tambahkan baris berikut di bagian paling bawah file

```
# Akses dari IP laptop Didimus (contoh)
host    all    all    182.8.225.251/32    md5
```

**Penjelasan format:**

| Kolom | Nilai | Keterangan |
|-------|-------|------------|
| `host` | - | Koneksi via TCP/IP |
| `all` | - | Semua database |
| `all` | - | Semua user |
| `182.8.225.251/32` | - | IP yang diizinkan (`/32` = hanya IP ini) |
| `md5` | - | Autentikasi dengan password |

> Ganti `182.8.225.251` dengan IP publik Anda yang sebenarnya.

### 2.4 Simpan dan keluar

- Tekan `Ctrl + O` → Enter (simpan)
- Tekan `Ctrl + X` (keluar)

---

## Step 3: Pastikan PostgreSQL Mendengarkan di Semua Interface

### 3.1 Edit `postgresql.conf`

```bash
nano /etc/postgresql/16/main/postgresql.conf
```

### 3.2 Cari baris `listen_addresses`

```bash
# Gunakan Ctrl+W untuk search "listen_addresses"
```

### 3.3 Pastikan nilainya `'*'`

```
listen_addresses = '*'
```

> Jika baris ini di-comment (ada `#` di depan), hapus tanda `#` nya.
> Jika nilainya `'localhost'`, ubah menjadi `'*'`.

### 3.4 Simpan dan keluar

---

## Step 4: Tambahkan Rule Firewall (UFW)

UFW perlu mengizinkan koneksi ke port 5432 dari IP tersebut.

```bash
ufw allow from 182.8.225.251 to any port 5432
```

> Ganti `182.8.225.251` dengan IP Anda.

### Verifikasi rule UFW

```bash
ufw status | grep 5432
```

Output yang diharapkan:

```
5432    ALLOW    182.8.225.251
```

---

## Step 5: Restart PostgreSQL

```bash
systemctl restart postgresql
```

### Verifikasi PostgreSQL berjalan

```bash
systemctl status postgresql
```

Pastikan statusnya `active (exited)` atau `active (running)`.

---

## Step 6: Verifikasi Koneksi dari Laptop Lokal

### 6.1 Menggunakan `psql` (jika terinstall)

```bash
psql -h 119.235.250.90 -U <username> -d <database_name>
```

Contoh:

```bash
psql -h 119.235.250.90 -U technema -d technema_db
```

### 6.2 Menggunakan connection string (untuk aplikasi/tools)

```
postgresql://<username>:<password>@119.235.250.90:5432/<database_name>
```

### 6.3 Menggunakan GUI (DBeaver, TablePlus, pgAdmin, dll)

| Field | Nilai |
|-------|-------|
| Host | `119.235.250.90` |
| Port | `5432` |
| Database | `<nama_database>` |
| Username | `<username>` |
| Password | `<password>` |

---

## Troubleshooting

### Koneksi ditolak (Connection refused)

1. Cek PostgreSQL berjalan: `systemctl status postgresql`
2. Cek `listen_addresses` di postgresql.conf — harus `'*'`
3. Restart PostgreSQL setelah mengubah config

### Timeout / tidak bisa connect

1. Cek UFW sudah allow IP Anda: `ufw status | grep 5432`
2. Pastikan IP publik Anda benar (bisa berubah jika ISP dynamic)
3. Cek apakah port 5432 terbuka: `ss -tlnp | grep 5432`

### Authentication failed

1. Cek pg_hba.conf sudah ada entry untuk IP Anda
2. Pastikan username dan password benar
3. Restart PostgreSQL setelah edit pg_hba.conf

---

## Menghapus Akses IP

Jika IP sudah tidak perlu akses lagi:

### 1. Hapus dari pg_hba.conf

```bash
nano /etc/postgresql/16/main/pg_hba.conf
# Hapus atau comment (#) baris IP yang dimaksud
```

### 2. Hapus rule UFW

```bash
ufw delete allow from 182.8.225.251 to any port 5432
```

### 3. Restart PostgreSQL

```bash
systemctl restart postgresql
```

---

## Catatan Keamanan

- Jangan gunakan `0.0.0.0/0` di pg_hba.conf (membuka akses ke semua IP)
- Selalu gunakan `/32` untuk membatasi ke satu IP spesifik
- Jika IP Anda dynamic (berubah-ubah), pertimbangkan menggunakan VPN atau SSH tunnel sebagai alternatif
- Hapus akses IP yang sudah tidak digunakan
