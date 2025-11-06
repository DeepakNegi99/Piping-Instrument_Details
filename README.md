## Piping & Instrument Damage Reporting Platform

A full-stack web application for Deepak's Chemicals to report, track, and manage damage incidents for instruments and piping across facilities and sites. Requests move through a workflow for review/approval and finally to engineers for repair/replace. Includes dashboard, request form with sections, workflow tracking with comments/approval, QR scanning and AI image analysis, and a contact page.

Tech stack
- Frontend: React, TypeScript, Redux Toolkit (RTK), Ant Design, MSAL (Azure AD), CASL (RBAC), CRACO, Axios, Moment, Crypto, React Router, ESLint, Jest, Stylelint, Husky, qrcode.react
- Backend: Azure Functions (Node.js + TypeScript), Axios, Bcrypt, CORS, Envalid, Busboy, Lodash, Moment, NanoID, Socket.io, Winston, UUID, JSON Web Token, Prisma, Jest, Nodemon, ESLint, Husky
- Database: Microsoft SQL Server 2022 (MS SSMS 2021)
- DevOps: Azure DevOps (multi-stage YAML pipeline)


## Monorepo structure

```
.
├─ client/                 # React + TS app (CRACO)
├─ api/                    # Azure Functions (TypeScript)
├─ azure-pipelines.yml     # Azure DevOps CI/CD pipeline
├─ .gitignore
└─ README.md
```


## Features implemented (MVP skeleton)

- Dashboard page: placeholder pie/bar charts grouped by month/year, facility, and site/location
- Request form page: multi-section form using Ant Design Collapse/Steps
- Workflow page: shows pending approvals, comments, approve/reject actions (stubbed)
- Scanner/Upload page: QR scanner (camera) or image upload; AI analysis endpoint stub
- Contact page
- MSAL setup placeholder; CASL ability scaffold
- Backend HTTP functions: requests (list/create), workflow (approve/reject/comment), ai-detect (stub), upload (multipart stub)
- Prisma schema with MSSQL provider and core entities
- Linting, tests, and Husky hooks (basic)


## Prerequisites

- Node.js 18+ (LTS recommended)
- Azure Functions Core Tools v4
- MS SQL Server 2022 + an accessible database
- Azure AD App Registrations (for MSAL) if enabling auth locally
- (Optional) Azure AI Vision endpoint/key if you want real image analysis


## Quick start (Windows PowerShell)

1) Clone and install dependencies

```powershell
# from repo root
cd client; npm install; cd ..
cd api; npm install; cd ..
```

2) Configure environment

- Copy `api/local.settings.json.template` to `api/local.settings.json` and set values (DB connection string, AI service keys if any)
- Copy `client/.env.example` to `client/.env` and set base URLs and MSAL settings

3) Database init (Prisma)

```powershell
cd api
npm run prisma:generate
npm run prisma:migrate:dev
cd ..
```

4) Run locally (two terminals)

```powershell
# Terminal 1: backend
cd api; npm run dev

# Terminal 2: frontend
cd client; npm start
```

Frontend will run on http://localhost:3000 and backend on http://localhost:7071 by default.


## Environment variables

Frontend (`client/.env`):
- REACT_APP_API_BASE_URL=http://localhost:7071
- REACT_APP_MSAL_CLIENT_ID=your-azure-ad-app-id
- REACT_APP_MSAL_TENANT_ID=your-tenant-id
- REACT_APP_MSAL_AUTHORITY=https://login.microsoftonline.com/your-tenant-id

Backend (`api/local.settings.json`):
- DATABASE_URL=sqlserver://USER:PASSWORD@HOST:PORT;database=DBNAME;encrypt=true
- AI_SERVICE_ENDPOINT=https://<region>.api.cognitive.microsoft.com/vision/v3.2/analyze
- AI_SERVICE_KEY=your-key
- JWT_AUDIENCE, JWT_ISSUER (if validating AAD/JWT tokens)
- CORS_ORIGINS=http://localhost:3000


## Azure DevOps pipeline

The provided `azure-pipelines.yml` will:
- Install and build client and api
- Run lint and tests
- Publish artifacts for deployment

You must create service connections and variables in Azure DevOps to enable deployment stages.


## Notes and next steps

- Auth: MSAL is scaffolded; backend token validation is stubbed. Wire Azure AD validation (issuer/audience/keys) before production.
- AI damage detection: the API is stubbed. Plug your Azure AI Vision (or custom model) using `AI_SERVICE_*` settings.
- Charts: using placeholder data and Ant Design plots. Connect to real request aggregations once DB data is present.
- File storage: Upload function parses files; integrate Azure Blob Storage or similar for persistence.
- Security: Add input validation, audit logs, and role-based policies using CASL.

Contributions and PRs welcome.


