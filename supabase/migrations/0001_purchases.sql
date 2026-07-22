-- Run this in Supabase Dashboard -> SQL Editor (or via `supabase db push`
-- once this file sits in supabase/migrations/).

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  full_name text,
  phone text,
  course_id text not null,
  course_name text not null,
  amount_eur numeric not null,
  stripe_session_id text unique,
  stripe_payment_intent text,
  status text not null default 'pending' -- pending | paid | failed | refunded
);

alter table public.purchases enable row level security;

-- Students can see only their own purchases.
create policy "Users can view their own purchases"
  on public.purchases for select
  using (auth.uid() = user_id);

-- No direct inserts/updates from the browser — all writes happen from the
-- Edge Functions using the service_role key, which bypasses RLS.
