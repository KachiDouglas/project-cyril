# Project Cyril: Intent Fidelity and Code Architecture Framework

This document defines how product intent is translated into implementation decisions and how feature specifications are structured.

## 1. Intent Fidelity Framework

### 1.1 Purpose
Intent fidelity means each code change can be traced back to the product intent, user outcomes, and system constraints.

### 1.2 Fidelity Checks (Use for every feature)
1. Intent to Requirement: Is there a clear user and business reason for the feature?
2. Requirement to Design: Does UI/API design satisfy the requirement without overbuilding?
3. Design to Code: Do modules, routes, and data models match the design boundaries?
4. Code to Validation: Are tests and acceptance criteria present for expected behavior?
5. Validation to Release: Are security, performance, and rollout constraints respected?

### 1.3 Definition of Done (Intent Fidelity)
A feature is complete only when all are true:
1. Feature-level spec exists and is updated.
2. Public behavior matches acceptance criteria.
3. Data/security implications are documented.
4. Regressions are checked on related areas.
5. Follow-up work is captured in roadmap/backlog.

## 2. Code Architecture Framework

### 2.1 Architecture Principles
1. Modular domain-first structure in `modules/`.
2. Thin route handlers in `app/api/*`, with logic delegated to domain libs/modules.
3. Shared primitives in `modules/common/components/*`.
4. Server-side session guards for protected pages.
5. Prisma as single source of truth for persisted domain entities.

### 2.2 Current High-Level Layers
1. App Routing Layer: `app/` pages, route handlers, and layouts.
2. Domain Module Layer: `modules/auth`, `modules/dashboard`, `modules/home`.
3. Shared UI Layer: `modules/common/components`.
4. Service Layer: `lib/security/session`, `lib/config/prisma`, route constants.
5. Data Layer: Prisma schema and generated client.

### 2.3 Boundary Rules
1. UI components should not directly embed persistence logic.
2. API route handlers should validate input and delegate domain logic.
3. Session/auth concerns should remain centralized in session/auth modules.
4. Database access should go through Prisma client wrappers.

### 2.4 Decision Record Template
Use this when introducing non-trivial architecture changes.

- Decision:
- Context:
- Alternatives Considered:
- Chosen Approach:
- Tradeoffs:
- Follow-up Actions:

## 3. Project-Level Spec

Fill and maintain this section as the canonical product baseline.

### 3.1 Goal
- Build a secure, modular web platform for child protection risk assessment workflows.
- Enable authenticated practitioners to access actionable case dashboards.

### 3.2 Mission
- Deliver a reliable and auditable assessment experience that supports safer, faster decisions.

### 3.3 Target Audience
- Primary: Safeguarding practitioners and assessors.
- Secondary: Team leads, supervisors, and administrators overseeing case outcomes.

### 3.4 Constrain
- Regulatory and privacy expectations for sensitive case data.
- Secure session handling and credential storage requirements.
- Maintainable architecture for ongoing feature growth.
- Time and scope limits for phased delivery.

### 3.5 Tech Stack
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS v4.
- Backend/API: Next.js Route Handlers.
- Auth/session: JWT in HTTP-only cookies.
- Database/ORM: PostgreSQL + Prisma v7.
- Tooling: ESLint, TypeScript compiler.

### 3.6 Roadmap
1. Foundation: Auth flows, session handling, database setup. (In place)
2. Dashboard iteration: Real data integration, filtering, and case actions. (In progress)
3. Home/marketing experience: Public landing and informational sections. (Planned)
4. Security hardening: Middleware protection, CSRF strategy, audit logging. (Planned)
5. Quality and ops: Integration tests, performance budget, release checklist. (Planned)

### 3.7 Scope
In scope:
1. Authentication and session lifecycle.
2. Protected dashboard shell and case overview UX.
3. Core user model and role-aware session payload.

Out of scope (current phase):
1. Advanced role-based access matrix.
2. Full assessment workflow engine.
3. External system integrations.

## 4. Feature-Level Specs

Use one section per feature. Copy the template for new features.

### 4.0 Feature Spec Template
- Feature Name:
- Problem Statement:
- User Story:
- Success Metrics:
- In Scope:
- Out of Scope:
- UX/Flow Notes:
- Data Contract (inputs/outputs):
- API/Route Contract:
- Security/Privacy Notes:
- Acceptance Criteria:
- Test Plan:
- Dependencies:
- Open Questions:
- Status:

### 4.1 Auth
- Feature Name: Authentication and Session Management
- Problem Statement: Users need secure account creation, login, and persistent session behavior.
- User Story: As a practitioner, I can register, sign in, and stay signed in based on preference.
- Success Metrics:
  1. Successful register/login completion rate.
  2. Authentication error rate.
  3. Session validity and logout reliability.
- In Scope:
  1. Register, login, session read, session clear endpoints.
  2. Password hashing and credential verification.
  3. Keep-me-signed-in cookie duration behavior.
- Out of Scope:
  1. MFA and social login.
  2. Password reset workflows.
- UX/Flow Notes:
  1. Form validation and toast feedback on auth pages.
  2. Redirect to protected destination on successful auth.
- Data Contract (inputs/outputs):
  1. Inputs: identity and credential fields from login/register forms.
  2. Outputs: session payload in cookie and API status response.
- API/Route Contract:
  1. POST `/api/register`
  2. POST `/api/login`
  3. GET `/api/session`
  4. DELETE `/api/session`
- Security/Privacy Notes:
  1. HTTP-only cookie flags.
  2. JWT secret management.
  3. Password hash storage only.
- Acceptance Criteria:
  1. Valid users can register and login.
  2. Invalid credentials are rejected with safe error messaging.
  3. Unauthenticated dashboard access is redirected.
- Test Plan:
  1. Endpoint contract tests for success and failure paths.
  2. Route guard checks for dashboard access.
- Dependencies:
  1. Prisma User model.
  2. Session utility module.
- Open Questions:
  1. Final policy for password complexity and rotation.
  2. Need for account lockout throttling.
- Status: Implemented (baseline), hardening pending.

### 4.2 Home Page
- Feature Name: Public Home Experience
- Problem Statement: New and returning users need a clear entry point and product context.
- User Story: As a visitor, I can understand the platform and navigate to login/register quickly.
- Success Metrics:
  1. Landing-to-auth click-through rate.
  2. Bounce rate and time on page.
- In Scope:
  1. Hero section and FAQ content blocks.
  2. Clear calls to action for login/register.
- Out of Scope:
  1. Full CMS-driven content management.
  2. Marketing experiment framework.
- UX/Flow Notes:
  1. Mobile-first layout and accessibility baseline.
  2. Consistent style language with auth/dashboard.
- Data Contract (inputs/outputs):
  1. Mostly static content in current phase.
- API/Route Contract:
  1. Public route at `/`.
- Security/Privacy Notes:
  1. No sensitive data exposure in public content.
- Acceptance Criteria:
  1. Home page renders as public entry route.
  2. CTA routes to login/register work.
- Test Plan:
  1. Basic route rendering and navigation tests.
- Dependencies:
  1. Home module components (`hero`, `faq`).
- Open Questions:
  1. Final content and branding copy.
  2. SEO metadata strategy.
- Status: Partially scaffolded, content integration pending.

### 4.3 Dashboard
- Feature Name: Assessment Dashboard
- Problem Statement: Authenticated users need immediate visibility of case and risk status.
- User Story: As a logged-in practitioner, I can view summary metrics, active cases, and alerts.
- Success Metrics:
  1. Time to first actionable view.
  2. Dashboard usage frequency.
- In Scope:
  1. Protected dashboard route.
  2. Sidebar, top bar, summary cards, cases, and alerts panels.
- Out of Scope:
  1. Full case editing workflow.
  2. Advanced analytics exports.
- UX/Flow Notes:
  1. Role/name pulled from session payload.
  2. Responsive panel layout.
- Data Contract (inputs/outputs):
  1. Session user input.
  2. Panel datasets currently static placeholders.
- API/Route Contract:
  1. Route at `/dashboard` guarded by session check.
- Security/Privacy Notes:
  1. Redirect unauthenticated users to login route.
- Acceptance Criteria:
  1. Authenticated users can access dashboard.
  2. Unauthenticated users are redirected.
- Test Plan:
  1. Guard behavior tests.
  2. Rendering tests for primary dashboard sections.
- Dependencies:
  1. Session utilities.
  2. Dashboard component suite.
- Open Questions:
  1. Source of truth for live case/alert data.
- Status: Implemented with placeholder data.

### 4.4 Future Feature Slots
Add additional sections as needed:
1. Case Workflow
2. Assessment Form Engine
3. Recommendation Engine
4. Admin and Role Management
5. Reporting and Exports

## 5. Spec Governance

### 5.1 Ownership
- Product owner: Maintains goal, mission, roadmap, and scope.
- Engineering lead: Maintains architecture rules and boundary enforcement.
- Feature owner: Maintains each feature-level spec and acceptance criteria.

### 5.2 Update Cadence
- Update project-level spec at each milestone boundary.
- Update feature-level spec before implementation and at merge completion.
- Keep statuses current: Planned, In Progress, Implemented, Deprecated.

### 5.3 Review Checklist
1. Is intent clear and measurable?
2. Are constraints and security assumptions explicit?
3. Does architecture mapping still match implementation?
4. Are acceptance criteria and tests aligned?
5. Are open questions tracked with owners?
