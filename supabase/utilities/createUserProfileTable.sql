create table public.user_profiles (
    id bigint primary key generated always as identity,
    user_id uuid references auth.users(id) on delete cascade,
    username text,
    confirmed_at timestamp with time zone,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.user_profiles enable row level security;

-- Create an index on the user_id for better performance on joins
create index idx_user_profiles_user_id on public.user_profiles(user_id);