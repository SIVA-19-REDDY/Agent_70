# Agent 70 — Academic Decision Support Agent (AURA)

### Institutional Decision-Support Workspace for Heads of Department and Deans

**Agent 70** of the 72-agent academic management platform.

Designed strictly for **Heads of Department (HoD)** and **Deans** to answer diagnostic, prioritisation, and resource-allocation questions using multi-agent evidence.

---

## Key Architecture & Design

- **Focused Navigation**: Strictly 3 views:
  1. `AI Decision Workspace` (Primary Screen)
  2. `Priorities` (Ranked Findings)
  3. `Decisions` (Decision Register & Outcomes)
- **3-Column Workspace**:
  - **Left**: Minimal navigation, role indicator (`HoD` or `Dean`), AI Engine status.
  - **Center**: Academic Decision Copilot with 4 prominent core questions, rich structured answers (Executive Answer, Analysis Scope, Ranked Findings Table with Impact & Actionability, Why?, Driver Diagnosis, Evidence Used, Options, Inline Scenario Simulation, Inline Decision Recording).
  - **Right**: Collapsible **Active Evidence Panel** showing telemetry details and *"How this evidence was used"*.
- **Role-Based Isolation**: Strictly supports **Head of Department** and **Dean** (with Demo HoD and Demo Dean access).
- **Dual AI Engine**: Supports **OpenAI GPT** (`gpt-4o`), **Google Gemini** (`gemini-1.5-flash`), **Auto Failover**, and an offline-safe **Demo AI Mode**.

---

## Quick Start

### 1. Run Backend
```bash
cd server
npm install
npm start
```
Runs on `http://localhost:5000`.

### 2. Run Frontend
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`.

### 3. Login
Navigate to `http://localhost:5173/login` and click:
- **Demo HoD** (`Dr. K. S. Sharma`) or
- **Demo Dean** (`Dr. M. S. Pillai`)
