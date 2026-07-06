-- EmotionJournal Database Schema
-- Run this in Supabase SQL Editor

-- Create journals table
CREATE TABLE journals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  entry_date DATE DEFAULT CURRENT_DATE,
  emotions TEXT[] NOT NULL, -- Array of emotion names: joy, sadness, anger, fear, surprise, disgust
  content TEXT NOT NULL,
  mood_intensity INTEGER CHECK (mood_intensity >= 1 AND mood_intensity <= 10)
);

-- Enable Row Level Security
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only CRUD their own journals
CREATE POLICY "Users can CRUD own journals" ON journals
  FOR ALL USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_journals_user_id ON journals(user_id);
CREATE INDEX idx_journals_entry_date ON journals(entry_date);
CREATE INDEX idx_journals_created_at ON journals(created_at);
