create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_hr text not null,
  title_en text not null,
  category_hr text not null,
  category_en text not null,
  excerpt_hr text,
  excerpt_en text,
  description_hr text,
  description_en text,
  client text,
  year text,
  services_hr text[] not null default '{}',
  services_en text[] not null default '{}',
  cover_image_url text,
  gallery_image_urls text[] not null default '{}',
  published boolean not null default false,
  show_date boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_published_idx on public.projects (published, sort_order, created_at desc);
create index if not exists projects_slug_idx on public.projects (slug);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

alter table public.projects enable row level security;

drop policy if exists "Published projects are public" on public.projects;
create policy "Published projects are public"
on public.projects
for select
using (published = true);

drop policy if exists "Admin can read all projects" on public.projects;
create policy "Admin can read all projects"
on public.projects
for select
to authenticated
using ((auth.jwt() ->> 'email') = 'tin.lojen@hotmail.com');

drop policy if exists "Admin can insert projects" on public.projects;
create policy "Admin can insert projects"
on public.projects
for insert
to authenticated
with check ((auth.jwt() ->> 'email') = 'tin.lojen@hotmail.com');

drop policy if exists "Admin can update projects" on public.projects;
create policy "Admin can update projects"
on public.projects
for update
to authenticated
using ((auth.jwt() ->> 'email') = 'tin.lojen@hotmail.com')
with check ((auth.jwt() ->> 'email') = 'tin.lojen@hotmail.com');

drop policy if exists "Admin can delete projects" on public.projects;
create policy "Admin can delete projects"
on public.projects
for delete
to authenticated
using ((auth.jwt() ->> 'email') = 'tin.lojen@hotmail.com');

insert into storage.buckets (id, name, public)
values ('public-bucket', 'public-bucket', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Project images are public" on storage.objects;
create policy "Project images are public"
on storage.objects
for select
using (bucket_id = 'public-bucket');

drop policy if exists "Admin can upload project images" on storage.objects;
create policy "Admin can upload project images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'public-bucket'
  and (auth.jwt() ->> 'email') = 'tin.lojen@hotmail.com'
);

drop policy if exists "Admin can update project images" on storage.objects;
create policy "Admin can update project images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'public-bucket'
  and (auth.jwt() ->> 'email') = 'tin.lojen@hotmail.com'
)
with check (
  bucket_id = 'public-bucket'
  and (auth.jwt() ->> 'email') = 'tin.lojen@hotmail.com'
);

drop policy if exists "Admin can delete project images" on storage.objects;
create policy "Admin can delete project images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'public-bucket'
  and (auth.jwt() ->> 'email') = 'tin.lojen@hotmail.com'
);
