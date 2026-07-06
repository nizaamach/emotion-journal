# 📝 EmotionJournal

Aplikasi jurnaling berbasis web yang membantu pengguna mengekspresikan 6 emosi dasar manusia secara terstruktur.

## ✨ Fitur

- **6 Emosi Dasar** - Joy, Sadness, Anger, Fear, Surprise, Disgust (berdasarkan teori Paul Ekman)
- **Multi-select emosi** - Pilih lebih dari satu emosi
- **Unlimited text** - Textarea tanpa batas karakter
- **Emotion Info Panel** - Edukasi lengkap tentang setiap emosi (deskripsi, tips, pemicu)
- **Calendar View** - Lihat pattern emosi sepanjang waktu dengan warna indicator
- **Export PDF** - Download journal sebagai PDF
- **Authentication** - Login/register dengan Supabase Auth

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **PDF Generation**: jsPDF
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🚀 Setup

### 1. Clone/Download Project

```bash
cd journal-app
npm install
```

### 2. Setup Supabase

1. Buat akun di [supabase.com](https://supabase.com) (gratis)
2. Buat project baru
3. Buka SQL Editor dan jalankan schema berikut:

```sql
-- Create journals table
CREATE TABLE journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  entry_date DATE DEFAULT CURRENT_DATE,
  emotions TEXT[] NOT NULL,
  content TEXT NOT NULL,
  mood_intensity INTEGER CHECK (mood_intensity >= 1 AND mood_intensity <= 10)
);

-- Enable Row Level Security
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;

-- Policy: Users can CRUD own journals
CREATE POLICY "Users can CRUD own journals" ON journals
  FOR ALL USING (auth.uid() = user_id);
```

4. Copy URL dan anon key dari Settings > API

### 3. Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Buka http://localhost:5173

## 📁 Project Structure

```
journal-app/
├── src/
│   ├── components/
│   │   ├── Auth/          # Login, Signup
│   │   ├── Journal/       # EmotionSelector, EmotionInfo, JournalForm, JournalList
│   │   ├── Calendar/      # CalendarView
│   │   ├── Export/         # PDFExport
│   │   └── Layout/         # Navbar
│   ├── context/
│   │   └── AuthContext.jsx # Authentication state
│   ├── lib/
│   │   ├── supabase.js    # Supabase client
│   │   └── emotions.js     # Emotion data
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Calendar.jsx
│   │   └── Journal.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
└── vite.config.js
```

## 🎨 6 Emosi Dasar (Paul Ekman)

| Emosi | Warna | Deskripsi |
|-------|-------|-----------|
| Joy (Senang) | Yellow #FCD34D | Bahagia, puas, bersyukur |
| Sadness (Sedih) | Blue #60A5FA | Kehilangan, kecewa, patah hati |
| Anger (Marah) | Red #F87171 | Frustrasi, jengkel, kesal |
| Fear (Takut) | Purple #A78BFA | Cemas, khawatir, panik |
| Surprise (Terkejut) | Orange #FB923C | Kaget, tercengang |
| Disgust (Jijik) | Green #4ADE80 | Muak, tidak suka |

## 📄 License

MIT
# emotion-journal
