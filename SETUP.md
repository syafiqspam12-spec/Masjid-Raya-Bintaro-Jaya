# Panduan Setup Payment Gateway

## 1. Supabase — Buat Tabel Database

1. Login ke https://supabase.com
2. Buka project Anda → SQL Editor
3. Copy-paste isi file `supabase-schema.sql` dan klik Run
4. Pergi ke Settings → API → salin:
   - Project URL
   - anon public key
   - service_role key (rahasia!)

## 2. Netlify — Setup Environment Variables

1. Login ke https://netlify.com
2. Buka site Anda → Site Settings → Environment Variables
3. Tambahkan variabel berikut:

```
MIDTRANS_SERVER_KEY    = [Server Key dari Midtrans]
MIDTRANS_CLIENT_KEY    = [Client Key dari Midtrans]
MIDTRANS_IS_PRODUCTION = false
SUPABASE_URL           = [URL dari Supabase]
SUPABASE_ANON_KEY      = [anon key dari Supabase]
SUPABASE_SERVICE_KEY   = [service_role key dari Supabase]
```

## 3. Midtrans — Setup Notification URL

1. Login ke https://dashboard.midtrans.com
2. Settings → Configuration
3. Isi Payment Notification URL:
   `https://[nama-site-anda].netlify.app/.netlify/functions/payment-notification`

## 4. Deploy ke Netlify

```bash
npm install
netlify deploy --prod
```

## 5. Testing

- Gunakan kartu test Midtrans Sandbox:
  - Nomor: 4811 1111 1111 1114
  - CVV: 123
  - Expired: 01/25

## Catatan Penting

- Setelah testing berhasil, ganti MIDTRANS_IS_PRODUCTION=true
- Ganti script Midtrans di service.html dari sandbox ke production:
  `https://app.midtrans.com/snap/snap.js`
- Regenerate key Midtrans yang sudah terlanjur dibagikan
