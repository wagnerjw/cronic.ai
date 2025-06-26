# cronic.ai ⏰🤖

_A cron-scheduler for AI agents built with **LlamaIndex AgentWorkflow**_

---

## ✨ Features

| Capability               | TL;DR                                                                                                                                                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Drag-and-drop canvas** | Design agents visually with [React Flow]. A single **FunctionAgent** node plus four docking zones: **⬅ Input** (dynamic events) · **⬆ Context** (docs / RAG / memory) · **⬇ Tools** (optional actions) · **➡ Output** (delivery or pipe to next agent). |
| **Pick-your-own RAG**    | Upload docs → tweak chunk size, overlap, embedding model, top-k, query-rewrite via a 📚 **RAG-Config** block.                                                                                                                                               |
| **One-click ingest**     | Press **Ingest Now** or let the first run lazy-index your docs into Supabase pgvector.                                                                                                                                                                      |
| **Cron per tenant**      | Supabase **pg_cron** fires HTTPS → Runner; no separate AWS scheduler required.                                                                                                                                                                              |
| **Serverless Runner**    | Single Python function assembles `AgentWorkflow`, lets agents think, stores artifacts, then emails / Slacks links.                                                                                                                                          |

---

## 🏗 Repo layout

apps/
└─ ui-nextjs/ # Next.js 15 + ReactFlow canvas
supabase/
└─ migrations/ # flows, flow_versions, runs, data_sources tables
edge/
├─ schedule_flow/ # inserts flow_version + pg_cron job
└─ ingest_docs/ # splits / embeds docs → pgvector
runner/
└─ lambda/ # Python 3.12, LlamaIndex, tool wrappers

---

## ⚡ Quick start (front-end only)

````bash
# 1  Clone & install
git clone https://github.com/<you>/cronic-ai.git
cd cronic-ai/apps/ui-nextjs
pnpm install

# 2  Dev server
pnpm dev

# 3  Open http://localhost:3000
drag an Agent node, add docs & RAG config, export JSON.(No backend required for this step.)```

---

🐘 Supabase setup
# 1 Create project on app.supabase.com
# 2 Enable extensions
supabase sql "create extension if not exists pgvector;"
supabase sql "create extension if not exists pg_net;"
supabase sql "create extension if not exists pg_cron;"

# 3 Apply migrations
supabase db push        # or psql -f supabase/migrations/init.sql

# 4 Local env vars
cp .env.example .env
````
