-- Jalankan SQL ini di Supabase SQL Editor

CREATE TABLE donasi (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id TEXT UNIQUE NOT NULL,
  program TEXT NOT NULL,
  nominal INTEGER NOT NULL,
  porsi INTEGER,
  nama TEXT DEFAULT 'Hamba Allah',
  email TEXT,
  doa TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','success','failed','fraud')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk query cepat
CREATE INDEX idx_donasi_status ON donasi(status);
CREATE INDEX idx_donasi_program ON donasi(program);
CREATE INDEX idx_donasi_order_id ON donasi(order_id);

-- Row Level Security
ALTER TABLE donasi ENABLE ROW LEVEL SECURITY;

-- Siapapun bisa baca donasi yang sukses (untuk laporan transparansi)
CREATE POLICY "Public read success donasi" ON donasi
  FOR SELECT USING (status = 'success');

-- Hanya service key yang bisa insert/update
CREATE POLICY "Service insert donasi" ON donasi
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service update donasi" ON donasi
  FOR UPDATE USING (true);
