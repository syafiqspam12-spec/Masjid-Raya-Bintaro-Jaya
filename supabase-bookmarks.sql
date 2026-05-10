-- Jalankan SQL ini di Supabase SQL Editor

-- Tabel bookmarks (tanda baca per user)
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  surah INTEGER NOT NULL,
  ayat INTEGER NOT NULL,
  nama_surah TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, surah) -- 1 bookmark per surah per user
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);

-- RLS
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User bisa baca bookmark sendiri" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User bisa insert bookmark sendiri" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "User bisa update bookmark sendiri" ON bookmarks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "User bisa hapus bookmark sendiri" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Tabel profiles (data tambahan user)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User bisa baca profil sendiri" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "User bisa update profil sendiri" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "User bisa insert profil sendiri" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile saat user register
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
