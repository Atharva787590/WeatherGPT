WEATHERGPT — DEPLOYMENT & DEVOPS SPECIFICATION

1. Deployment Objective

WeatherGPT must be deployable as a production-quality web application.

Target architecture:

GitHub

↓

Vercel

↓

Next.js Application

↓

Server-side API Layer

↓

External Data Providers

↓

Neon PostgreSQL

↓

AI Provider

The application must be reproducible from a clean repository.

⸻

2. Primary Deployment Platform

Preferred deployment platform:

Vercel

The application should be optimized for Next.js deployment on Vercel.

⸻

3. Source Control

Primary source-control platform:

GitHub

The repository must contain:

* Application source code
* Documentation
* Configuration templates
* Tests
* Database migrations
* CI configuration
* Deployment documentation

Never commit production secrets.

⸻

4. Repository Strategy

Recommended repository:

WeatherGPT

The main branch should represent deployable application code.

Development work should preferably use feature branches when the project becomes larger.

⸻

5. Branching

Recommended branches:

main

development

feature/*

bugfix/*

For the SIH prototype, the workflow may remain simple if the team is small.

The important requirement is that main remains stable.

⸻

6. Commit Standards

Commits should describe actual changes.

Examples:

feat: add weather provider adapter

feat: add conversational weather endpoint

fix: handle provider timeout

fix: validate forecast response

docs: update deployment guide

test: add risk engine tests

Avoid meaningless commits such as:

update

changes

final

test123

⸻

7. Local Development

Developers should run the application locally before deployment.

Typical workflow:

Install dependencies

↓

Configure .env.local

↓

Run database migrations

↓

Start development server

↓

Run tests

↓

Run production build

⸻

8. Required Local Environment

The development environment should contain:

* Node.js
* npm
* Git
* Project dependencies
* Access to configured services

The exact supported Node.js version must be defined by the project configuration.

Do not depend on an undocumented local version.

⸻

9. Environment Variables

Secrets and environment-specific configuration must use environment variables.

Examples:

DATABASE_URL=

AUTH_SECRET=

WEATHER_API_KEY=

SECONDARY_WEATHER_API_KEY=

AIR_QUALITY_API_KEY=

LLM_API_KEY=

MAP_API_KEY=

Additional provider variables may be added when required.

⸻

10. Environment Separation

Maintain separate configurations for:

Development

Preview

Production

Do not casually reuse production credentials during development.

⸻

11. .env.example

The repository must contain:

.env.example

It should contain variable names without secret values.

Example:

DATABASE_URL=

AUTH_SECRET=

WEATHER_API_KEY=

LLM_API_KEY=

⸻

12. .env.local

Local secrets should be placed in:

.env.local

This file must be ignored by Git.

Never commit it.

⸻

13. Production Secrets

Production secrets should be configured through the deployment platform’s secure environment-variable system.

Never hard-code them in source code.

Never place them in README files.

Never place them in screenshots.

⸻

14. Vercel Environment Configuration

Configure variables separately for:

Development

Preview

Production

Only the variables required by each environment should be enabled.

⸻

15. Public vs Private Variables

Only values intentionally required by the browser may be exposed as public environment variables.

Any API credential must remain private.

Never expose:

WEATHER_API_KEY

LLM_API_KEY

DATABASE_URL

AUTH_SECRET

or equivalent secrets to client-side code.

⸻

16. Build Process

The production build must:

1. Install dependencies.
2. Validate TypeScript.
3. Run linting.
4. Run automated tests where configured.
5. Build the Next.js application.
6. Fail if critical errors occur.

A broken build must not be deployed as a successful production release.

⸻

17. Required Scripts

The project should provide appropriate npm scripts.

Conceptually:

npm run dev

npm run build

npm run start

npm run lint

npm run typecheck

npm run test

npm run test:e2e

The exact scripts should match the technologies actually used.

⸻

18. Type Safety

Production builds must use strict TypeScript configuration.

Type errors should not be silently ignored.

⸻

19. Linting

The application must use ESLint or the project’s current supported linting solution.

Critical linting failures should be addressed before production deployment.

⸻

20. Formatting

Use a consistent formatting system.

Preferred:

Prettier

Formatting should be automated where practical.

⸻

21. Testing Before Deployment

At minimum, verify:

* Unit tests
* API tests
* Risk-engine tests
* Data-validation tests
* Authentication tests
* Critical UI tests
* Production build

⸻

22. End-to-End Testing

Use an end-to-end framework such as:

Playwright

Critical flows should include:

1. Open application.
2. Search location.
3. View current weather.
4. View forecast.
5. Ask WeatherGPT a question.
6. Receive grounded response.
7. View RiskMap.
8. Configure an alert where implemented.
9. Authenticate where required.
10. Verify saved location functionality.

⸻

23. Deployment Gate

Before production deployment:

Type checking

↓

Linting

↓

Unit tests

↓

Integration tests

↓

E2E tests where applicable

↓

Production build

↓

Deployment

If a critical step fails, deployment should stop.

⸻

24. Preview Deployments

Pull requests or development branches may use preview deployments.

Preview deployments should use:

* Preview environment variables
* Safe test data
* Non-production credentials where possible

⸻

25. Production Deployment

Production deployment should occur only from the approved production branch.

The deployed version must correspond to a known Git commit.

⸻

26. Database Deployment

Database schema changes must use migrations.

Recommended workflow:

Create migration

↓

Review migration

↓

Test migration

↓

Apply to target environment

Never make undocumented production schema changes.

⸻

27. Database Environment Separation

Development, preview and production should use appropriate separate database environments where feasible.

Never intentionally connect a development build to production data.

⸻

28. Database Migration Safety

Before applying important migrations:

* Verify database connectivity.
* Test migration.
* Confirm backup/recovery availability.
* Check backward compatibility where relevant.

⸻

29. Rollback Strategy

Application rollback:

Deploy previous known-good Git commit.

Database rollback:

Use migration-specific rollback strategy where supported.

Never assume application rollback automatically reverses database changes.

⸻

30. Monitoring

Production should monitor:

* Application errors
* API failures
* Provider failures
* Response latency
* Database errors
* AI request failures
* Rate limits

⸻

31. Health Checks

Provide an appropriate health/status mechanism where useful.

Conceptual:

GET /api/health

It should verify basic application availability.

Do not expose secrets or sensitive infrastructure information.

⸻

32. Provider Health

Monitor external provider reliability.

Track:

* Successful requests
* Failed requests
* Timeout rate
* Rate limits
* Response latency
* Data freshness

⸻

33. AI Provider Monitoring

Track:

* Request success
* Request failure
* Latency
* Rate-limit errors
* Token usage where available

Never log API credentials.

⸻

34. Error Handling

Production errors should return safe user-facing messages.

Do not expose:

* Stack traces
* Internal file paths
* Database credentials
* Provider credentials
* Server configuration

⸻

35. Logging

Logs should include useful operational information.

Potential fields:

* Request ID
* Endpoint
* Status
* Latency
* Provider
* Error category

Sensitive information must not be logged.

⸻

36. Secret Detection

Before every GitHub push, check for accidentally exposed secrets.

Recommended automated protection:

* Secret scanning
* Dependency scanning
* CI checks

⸻

37. CI/CD

GitHub Actions may be used for automated verification.

Conceptual pipeline:

Push / Pull Request

↓

Install dependencies

↓

Lint

↓

Typecheck

↓

Unit tests

↓

Integration tests

↓

E2E tests where appropriate

↓

Build

↓

Deployment

⸻

38. Automatic Deployment

Where configured:

Successful changes to the production branch may automatically deploy to Vercel.

The deployment must use secure environment variables.

⸻

39. AI Coding Agent Rules

The coding agent may automate:

* File creation
* Code changes
* Tests
* Git operations
* Build verification
* Documentation updates
* Commit creation
* Branch creation
* Pull request preparation

However:

The agent must never expose secrets.

⸻

40. External Account Authentication

Automation involving GitHub, Vercel, Neon or other services must use official authentication mechanisms.

Do not place personal passwords or tokens inside source code.

If an external service requires interactive authentication, the human owner may need to authorize it once.

After authorization, automation may perform permitted operations.

⸻

41. API Key Acquisition

The coding agent must not invent API keys.

It must not bypass provider authentication.

It must not scrape credentials.

When a provider requires account creation, billing activation or manual approval, the human owner must complete that authorization step.

After valid credentials are supplied through secure environment configuration, the agent may configure the application to use them.

⸻

42. No Human Intervention Goal

The target workflow is:

Human initializes accounts and grants authorization once

↓

Agent configures project

↓

Agent writes code

↓

Agent tests

↓

Agent commits

↓

Agent pushes

↓

CI validates

↓

Vercel deploys

↓

Application launches

The agent should minimize repetitive manual work while respecting security boundaries.

⸻

43. GitHub Automation

The agent may use authenticated GitHub tooling to:

* Initialize repository
* Create branches
* Commit changes
* Push changes
* Create pull requests
* Inspect CI results
* Fix code
* Push fixes

The repository owner remains responsible for account authorization.

⸻

44. Deployment Automation

The agent may prepare:

* Vercel configuration
* Build configuration
* Environment-variable templates
* CI/CD configuration
* Database migration scripts

Production credentials must be supplied through secure service configuration.

⸻

45. Zero-Secret Repository Rule

The repository must never contain:

* API keys
* Access tokens
* Passwords
* Private keys
* Database credentials
* Authentication secrets

⸻

46. Pre-Push Security Check

Before pushing:

1. Check Git status.
2. Inspect changed files.
3. Verify .gitignore.
4. Search for obvious credential patterns.
5. Verify .env.local is ignored.
6. Run tests.
7. Run build.

Only then push.

⸻

47. Production URL

After deployment, record the production URL in deployment documentation.

Do not hard-code the URL throughout the application.

Use environment/configuration where necessary.

⸻

48. Custom Domain

A custom domain is optional.

For SIH demonstration purposes, a clean Vercel deployment URL is acceptable if a custom domain is not available.

⸻

49. Performance

Production deployment should optimize:

* Server response time
* Image loading
* JavaScript bundle size
* API latency
* Database queries
* Caching

Avoid unnecessary client-side JavaScript.

⸻

50. Reliability

The application should degrade gracefully.

Examples:

Weather provider unavailable

↓

Try fallback

↓

Try valid cache

↓

Show transparent unavailable state

Never:

Provider unavailable

↓

Fake weather

⸻

51. Deployment Acceptance Criteria

Deployment is considered successful when:

* Production build passes.
* Application loads.
* Weather API works.
* Chat works with verified data.
* Risk calculations work.
* Database connectivity works.
* Authentication works where implemented.
* No secrets are exposed.
* Critical tests pass.

⸻

52. Production Smoke Test

After deployment, verify:

1. Home page loads.
2. Location search works.
3. Current weather loads.
4. Forecast loads.
5. Chat request works.
6. Risk assessment works.
7. Alerts work where implemented.
8. Saved location works.
9. Mobile layout works.
10. No console-critical errors exist.

⸻

53. Disaster Recovery Principle

WeatherGPT should never depend on one fragile component unnecessarily.

Where practical:

* Weather fallback
* Cache fallback
* Database recovery
* Safe AI fallback

must be considered.

⸻

54. Final Deployment Architecture

DEVELOPER / AI AGENT

↓

GITHUB

↓

CI VALIDATION

↓

VERCEL

↓

NEXT.JS

↓

SERVER API

├── Weather Providers

├── Official Alerts

├── Air Quality

├── Maps

├── Risk Engine

├── LLM

└── Neon PostgreSQL

↓

USER

⸻

55. Final DevOps Principle

Automation should eliminate repetitive work.

Security must never be sacrificed for automation.

The desired result is:

CODE ONCE → TEST AUTOMATICALLY → DEPLOY RELIABLY

while keeping:

SECRETS PRIVATE → DATA VERIFIED → PRODUCTION SAFE