import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;
export const supabaseConfigured = Boolean(url && key);

/*
 * Run this SQL in your Supabase project → SQL Editor:
 *
 * create table public.progress (
 *   id uuid primary key default gen_random_uuid(),
 *   user_id uuid references auth.users(id) on delete cascade unique,
 *   tier_id integer default 1,
 *   level integer default 0,
 *   total_xp integer default 0,
 *   streak integer default 0,
 *   last_checkin_date date,
 *   checkin_date date,
 *   active_habit_ids text[] default '{}',
 *   unlocked_tiers integer[] default '{1}',
 *   completed_today text[] default '{}',
 *   updated_at timestamptz default now()
 * );
 *
 * create table public.journal_entries (
 *   id uuid primary key default gen_random_uuid(),
 *   user_id uuid references auth.users(id) on delete cascade,
 *   content text not null,
 *   ai_response text,
 *   entry_date date default current_date,
 *   created_at timestamptz default now()
 * );
 *
 * alter table public.progress enable row level security;
 * alter table public.journal_entries enable row level security;
 *
 * create policy "own progress" on public.progress for all using (auth.uid() = user_id);
 * create policy "own journal" on public.journal_entries for all using (auth.uid() = user_id);
 */
