# Project Cyril

Next.js 16 + TypeScript application with a custom authentication flow, Prisma/PostgreSQL persistence, modular auth UI, toast feedback, and JWT cookie sessions.

## Product and Architecture Spec

See `PROJECT_FRAMEWORK.md` for:

1. Intent fidelity framework
2. Code architecture framework
3. Project-level spec (goal, mission, target audience, constrain, tech stack, roadmap, scope)
4. Feature-level specs (auth, home page, dashboard, and future feature slots)

## Progress Summary

Implemented features so far:

1. Reusable UI components:
	1. Button component with variants, sizes, loading state, icons, and width controls.
	2. Input component with variants, sizes, loading state, icons, and width controls.
2. Auth pages:
	1. Login page styled to match the provided design.
	2. Register page with matching layout and required fields.
3. Atomic auth structure:
	1. Shared auth shell, header, card, footer, field group, and icon components.
	2. Dedicated login and register form components.
4. Form UX improvements:
	1. Client-side validation on login and register.
	2. Reusable toast notifications for success/failure feedback.
5. Backend auth routes:
	1. Register API route with modular request parsing, validation, hashing, and persistence.
	2. Login API route with credential verification.
6. Database setup:
	1. Prisma User model aligned with registration fields.
	2. Initial migration created and applied.
7. JWT cookie session module:
	1. Token creation and verification helpers.
	2. HTTP-only cookie set/clear helpers.
	3. Session introspection and logout API route.
8. Keep me signed in behavior:
	1. Login route reads checkbox state.
	2. Session duration/cookie persistence changes based on checkbox.
9. Security provider modularization:
	1. Password hashing and verification moved behind provider interfaces.
	2. Token signing and verification moved behind provider interfaces.
	3. Environment-driven provider selection for password/token libraries.
10. Protected route architecture:
	1. Centralized route access policy in route config.
	2. Next.js 16 `proxy.ts` optimistic auth redirects based on route policy.
	3. Server-side guard utility for authoritative page protection.
11. Protected home route:
	1. `/` now requires an authenticated session.
	2. Guest users are redirected to `/login`.

## Tech Stack

1. Next.js 16 (App Router)
2. React 19
3. TypeScript
4. Tailwind CSS v4
5. Prisma v7
6. PostgreSQL (Supabase)
7. JWT via jsonwebtoken

## Project Structure (Auth-related)

1. API routes:
	1. app/api/register/route.ts
	2. app/api/register/lib/*
	3. app/api/login/route.ts
	4. app/api/session/route.ts
2. Session module:
	1. lib/security/session/index.ts
3. Security providers:
	1. lib/security/password/index.ts
	2. lib/security/password/providers/pbkdf2.ts
	3. lib/security/password/providers/argon.ts
	4. lib/security/token/index.ts
	5. lib/security/token/providers/jwt.ts
4. Session guard:
	1. lib/security/session/guards.ts
5. Route protection entrypoint:
	1. proxy.ts
6. Auth UI:
	1. modules/auth/templates/login.tsx
	2. modules/auth/templates/register.tsx
	3. modules/auth/components/common/*
	4. modules/auth/components/login/login-form.tsx
	5. modules/auth/components/register/register-form.tsx
7. Shared UI:
	1. modules/common/components/buttons/index.tsx
	2. modules/common/components/input/index.tsx
	3. modules/common/components/toast/index.tsx
8. Home (protected) UI:
	1. modules/home/templates/index.tsx

## Environment Variables

Required values in .env:

1. DIRECT_URL
	1. PostgreSQL connection string used by Prisma config.
2. JWT_SECRET
	1. Secret used to sign and verify JWT session tokens.
3. PASSWORD_PROVIDER
	1. Password hashing provider selector.
	2. Supported values: `pbkdf2`, `argon2`.
	3. Default: `pbkdf2`.
4. TOKEN_PROVIDER
	1. Token provider selector.
	2. Supported values: `jwt`.
	3. Default: `jwt`.

Notes:

1. Ensure special characters in database credentials are URL-encoded in DIRECT_URL.
2. Keep only one JWT_SECRET value in .env.
3. Set `PASSWORD_PROVIDER=argon2` to enable Argon2 hashing for newly created passwords.
4. Existing PBKDF2 password hashes remain verifiable after switching to Argon2.

## Local Development

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev --name init
```

Start development server:

```bash
npm run dev
```

App default URL:

1. http://localhost:3000

## Auth and Session Endpoints

1. POST /api/register
	1. Creates user and sets auth cookie.
2. POST /api/login
	1. Authenticates user and sets auth cookie.
3. GET /api/session
	1. Returns current session status and user payload.
4. DELETE /api/session
	1. Clears auth cookie (logout).

Session cookie:

1. Name: auth_token
2. Flags: httpOnly, sameSite=lax, secure in production
3. Lifetime:
	1. keep me signed in checked: long-lived cookie
	2. unchecked: browser session cookie

## Route Access Control

1. Central policy is defined in `lib/routes/index.ts` via `APP_ROUTE_ACCESS`.
2. Access types:
	1. `protected`: requires session
	2. `guest-only`: redirects authenticated users away
	3. `public`: no auth requirement
3. Route enforcement:
	1. `proxy.ts` performs optimistic redirect checks using session cookie presence.
	2. `lib/security/session/guards.ts` performs authoritative server-side session verification in pages.
4. Current defaults:
	1. `/` and `/dashboard` are protected.
	2. `/login` and `/register` are guest-only.

## Next Recommended Steps

1. Add CSRF protection strategy for auth endpoints.
2. Add integration tests for register/login/session/proxy route flows.
3. Add rehash-on-login flow so users with legacy PBKDF2 hashes are upgraded to Argon2 transparently.
4. Add role-based route access extensions on top of the current protected/guest-only/public policy.
