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

# 🏗 Repository Layout

`````text
cronic-ai/
├─ apps/
│  └─ ui-nextjs/               # Next.js 15 front-end (React Flow canvas + inspector)
│     ├─ components/           # AgentNode, AccessoryNode, side panels
│     ├─ lib/                  # JSON-schemas, helpers
│     ├─ app/                  # App-Router pages
│     └─ tailwind.config.js
│
├─ supabase/
│  ├─ migrations/              # SQL files for tables & RLS (flows, runs, data_sources)
│  └─ README.md                # psql / supabase CLI instructions
│
├─ edge/                       # Supabase Edge Functions
│  ├─ schedule_flow/           # POST / schedule-flow → creates flow_version + cron job
│  │   ├─ index.ts
│  │   └─ deno.json
│  └─ ingest_docs/             # POST / ingest → split + embed docs to pgvector
│      ├─ index.ts
│      └─ deno.json
│
├─ runner/                     # Serverless execution layer
│  └─ lambda/                  # AWS Lambda (or Supabase Edge Runtime) implementation
│      ├─ main.py              # handler: builds & runs AgentWorkflow
│      ├─ agent_factory.py     # merges prompt, tools, memory, RAG config
│      ├─ tools/               # sql_query_tool, chart_tool, etc.
│      ├─ requirements.txt
│      └─ README.md
│
├─ scripts/                    # Dev utilities (local pgvector ingest, test triggers)
│
├─ docs/                       # Diagrams, demo GIFs, product spec
│
├─ .env.example                # Client-side and server-side env var template
├─ README.md                   # Project overview & quick-start
└─ LICENSE


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
`````
