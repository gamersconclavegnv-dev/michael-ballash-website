-- Run this in the SQL editor of THIS project's own Supabase project
-- (create a brand-new Supabase project for michaelballash.com —
-- do not run this against any other project's database).

create table if not exists paintings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  dimensions text,
  medium text,
  year int,
  story text,
  image_url text not null,
  image_key text, -- R2 object key, used to delete the file on removal
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  mode text not null check (mode in ('dinner', 'art')),
  name text not null,
  email text not null,
  phone text,
  date text,
  location text,
  guests text,
  occasion text,
  piece text,
  message text,
  created_at timestamptz not null default now()
);

-- Row Level Security: the public site only ever reads published paintings
-- through the anon key. All writes go through the service role key from
-- server-side /api/admin/* routes, which bypasses RLS entirely.
alter table paintings enable row level security;
alter table inquiries enable row level security;

create policy "Public can read published paintings"
  on paintings for select
  using (is_published = true);

-- No public policies on inquiries — only the service role (admin API) can
-- read or write inquiry records.
