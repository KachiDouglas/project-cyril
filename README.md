# Project Cyril

Next.js 16 + TypeScript application with a custom authentication flow, Prisma/PostgreSQL persistence, modular auth UI, toast feedback, and JWT cookie sessions.

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
	1. modules/auth/session/index.ts
3. Auth UI:
	1. modules/auth/templates/login.tsx
	2. modules/auth/templates/register.tsx
	3. modules/auth/components/common/*
	4. modules/auth/components/login/login-form.tsx
	5. modules/auth/components/register/register-form.tsx
4. Shared UI:
	1. modules/common/components/buttons/index.tsx
	2. modules/common/components/input/index.tsx
	3. modules/common/components/toast/index.tsx

## Environment Variables

Required values in .env:

1. DIRECT_URL
	1. PostgreSQL connection string used by Prisma config.
2. JWT_SECRET
	1. Secret used to sign and verify JWT session tokens.

Notes:

1. Ensure special characters in database credentials are URL-encoded in DIRECT_URL.
2. Keep only one JWT_SECRET value in .env.

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

## Next Recommended Steps

1. Add route protection middleware for authenticated areas.
2. Add CSRF protection strategy for auth endpoints.
3. Add integration tests for register/login/session flows.
4. Replace custom password handling with a dedicated password-hashing library (for example, argon2) if required by your security baseline.
