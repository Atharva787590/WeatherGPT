WEATHERGPT — DEVELOPMENT RULES

1. Purpose

These rules define how WeatherGPT must be developed.

The coding agent must follow these rules for every feature, component, API, database operation and architectural change.

The goal is:

* Reliable software
* Maintainable code
* Strong type safety
* Secure implementation
* Consistent UX
* High-quality SIH demonstration

⸻

2. Technology Principles

Preferred application stack:

* Next.js
* React
* TypeScript
* Tailwind CSS
* shadcn/ui where appropriate
* Lucide React
* Framer Motion where appropriate
* Zod
* Neon PostgreSQL
* Better Auth
* Vitest/Jest
* Playwright
* GitHub
* Vercel

Do not introduce alternative technologies without a clear reason.

⸻

3. TypeScript

Use TypeScript throughout the application.

Avoid:

any

unless absolutely unavoidable.

Prefer:

* Explicit interfaces
* Type aliases
* Generics
* Discriminated unions
* Inferred types where safe

Strict TypeScript mode must remain enabled.

⸻

4. Naming Conventions

Components:

PascalCase

Example:

WeatherCard.tsx

Functions:

camelCase

Example:

getCurrentWeather()

Variables:

camelCase

Example:

weatherData

Constants:

UPPER_SNAKE_CASE when appropriate.

Example:

MAX_CACHE_AGE

Types:

PascalCase

Example:

NormalizedWeather

⸻

5. File Naming

Use clear predictable filenames.

React components:

PascalCase where appropriate.

Utility files:

camelCase or descriptive convention consistent with the project.

Avoid:

file1.ts

testnew.ts

temp.ts

random.ts

⸻

6. Components

Components should have one clear responsibility.

Avoid giant components containing:

* Data fetching
* Database operations
* Business logic
* UI
* Validation

all together.

Separate responsibilities.

⸻

7. Reusability

If a UI pattern appears multiple times, consider extracting a reusable component.

Examples:

WeatherCard

RiskBadge

SourceBadge

ForecastChart

LocationSelector

⸻

8. Business Logic

Business logic should not be unnecessarily embedded inside UI components.

Prefer dedicated modules for:

* Weather normalization
* Risk calculation
* Impact analysis
* Validation
* Provider selection
* AI grounding

⸻

9. Server-Side Logic

Sensitive operations belong on the server.

Examples:

* API keys
* Database access
* Weather provider requests
* AI provider requests
* Authorization
* Risk calculations requiring trusted data

⸻

10. Client-Side Logic

Client components should handle:

* User interaction
* UI state
* Browser APIs
* Animations
* Client-side presentation

Do not move sensitive logic into the browser.

⸻

11. API Routes

API endpoints must be:

* Clearly named
* Validated
* Secure
* Consistent
* Error handled

Avoid unnecessary endpoints.

⸻

12. API Response Structure

Use predictable response structures.

Success should communicate:

* Data
* Relevant metadata
* Optional source/freshness information

Errors should communicate:

* Safe error message
* Appropriate status code
* Request ID where useful

Never expose internal implementation details.

⸻

13. Input Validation

Validate external input before processing.

Use:

Zod

Validate:

* Query parameters
* Request bodies
* Coordinates
* Alert thresholds
* User settings
* Chat-related structured input

⸻

14. Weather Provider Adapters

Every provider must be isolated behind an adapter.

Conceptual:

WeatherProvider

↓

ProviderAdapter

↓

NormalizedWeather

The rest of the application must not depend directly on provider-specific response structures.

⸻

15. Normalized Weather Schema

Create a common internal weather schema.

Potential categories:

* Location
* Current conditions
* Hourly forecast
* Daily forecast
* Precipitation
* Wind
* Humidity
* Visibility
* Pressure
* UV
* Air quality
* Sunrise
* Sunset
* Alerts
* Metadata

Only fields actually available should be populated.

⸻

16. Missing Data

Never substitute fake values.

If a provider does not provide a field:

Represent it as unavailable.

Example:

null

or another explicitly documented representation.

Do not use:

0

as a fake replacement for missing data.

⸻

17. Numerical Validation

Weather values must be validated for reasonable ranges.

Examples:

Latitude:

-90 to 90

Longitude:

-180 to 180

Humidity:

0 to 100

Probability:

0 to 100

Other ranges should be defined according to the relevant metric.

⸻

18. Units

Normalize weather values to the project’s standard internal units.

Default:

°C

km/h

km

hPa

mm

Convert for display when the user chooses different units.

⸻

19. Time

Store internal timestamps consistently.

Prefer UTC internally.

Convert to local timezone for users.

Never assume the user’s timezone from browser appearance alone when exact location context is required.

⸻

20. Date Handling

Weather queries involving:

* Today
* Tomorrow
* Tonight
* This weekend
* Next week

must resolve dates using the relevant location timezone.

Do not blindly use server timezone.

⸻

21. Location Handling

A weather request should contain enough location context to avoid ambiguity.

Examples:

City

Coordinates

Location ID

Saved location

Browser location

If ambiguity materially affects the answer, ask the user.

⸻

22. API Failure

Every external API call must handle:

* Timeout
* Network failure
* Invalid response
* Rate limit
* Authentication failure
* Server error

Never crash the entire application because one provider fails.

⸻

23. Provider Fallback

Where multiple providers are configured:

Primary provider

↓

Failure

↓

Fallback provider

↓

Failure

↓

Valid cache if acceptable

↓

Transparent unavailable state

Never:

Failure

↓

AI guess

⸻

24. Caching

Cache only where beneficial.

Every cache entry must have:

* Key
* Provider
* Retrieved time
* Expiry
* Data type

Do not treat expired cache as current data.

⸻

25. AI Architecture

AI must receive verified structured context.

Conceptual:

User Question

↓

Intent

↓

Weather Data

↓

Validation

↓

Normalized Data

↓

Risk/Impact

↓

Grounded Context

↓

LLM

↓

Response Validation

↓

User

⸻

26. AI Prompt Construction

Prompts must clearly separate:

* System instructions
* Verified weather data
* Derived risk information
* User question

User text must never overwrite system instructions.

⸻

27. AI Response Validation

Where practical, validate AI output.

Check for:

* Unsupported numbers
* Unsupported claims
* Invented sources
* Invented alerts
* Unsupported certainty

⸻

28. AI Fallback

If AI fails:

Provide a useful deterministic weather response where possible.

If insufficient data exists:

Explain that information is unavailable.

Never fabricate an answer.

⸻

29. Risk Engine

Risk logic must be:

* Deterministic where possible
* Documented
* Testable
* Explainable

Avoid allowing the LLM to directly calculate important risk scores.

⸻

30. Risk Evidence

Every risk assessment should have supporting factors.

Example:

Risk:

HIGH

Factors:

* High rainfall
* Strong winds
* Low visibility

Only use actual verified inputs.

⸻

31. Impact Analysis

Impact recommendations should be connected to evidence.

Examples:

Travel

Outdoor activities

Agriculture

Events

Heat exposure

Do not make unsupported medical or emergency claims.

⸻

32. Official Alerts

Official alerts must be visually and logically distinct from AI-derived assessments.

Never fabricate official warnings.

Never modify severity without explicitly identifying the information as a WeatherGPT interpretation.

⸻

33. Database

Database operations should be centralized and organized.

Do not place raw database queries throughout random UI components.

⸻

34. Authorization

Every protected database operation must verify:

Authentication

Resource ownership

⸻

35. Error Handling

Use predictable error handling.

Do not silently swallow errors.

Do not expose sensitive internal errors.

Log useful server-side information when appropriate.

⸻

36. Loading States

Every asynchronous UI feature should have an appropriate loading state.

Examples:

* Skeleton
* Spinner
* Progressive rendering

Never display fake weather values while loading.

⸻

37. Empty States

Empty states must provide useful guidance.

Example:

“No saved locations yet.”

Then:

“Add a location”

⸻

38. Error States

Every major feature should have a recoverable error state.

Example:

“Weather data couldn’t be loaded.”

Actions:

Retry

Change location

Try again later

⸻

39. Accessibility

Use:

* Semantic HTML
* ARIA where appropriate
* Keyboard navigation
* Focus states
* Accessible labels
* Screen-reader support

Do not add ARIA unnecessarily when native HTML semantics are sufficient.

⸻

40. Responsive Development

Build responsive behavior into components from the beginning.

Do not wait until the end to make the application mobile-compatible.

Test:

* Mobile
* Tablet
* Desktop

⸻

41. Theme Development

All components must use theme tokens.

Do not hard-code colors that break alternate themes.

Every new component must work with:

* Light
* Dark
* System
* WeatherGPT themes

⸻

42. Animation

Use animation purposefully.

Animations should communicate:

* Loading
* State changes
* Navigation
* Weather atmosphere

Respect reduced-motion preferences.

⸻

43. Performance

Avoid:

* Unnecessary re-renders
* Huge client bundles
* Unoptimized images
* Excessive animations
* Unnecessary API requests

Prefer server rendering when appropriate.

⸻

44. Mobile Performance

Mobile performance is a priority.

Avoid heavy visual effects that significantly reduce usability.

Provide graceful degradation for lower-powered devices.

⸻

45. Dependencies

Before adding a dependency:

1. Confirm it solves a real requirement.
2. Check whether existing tools can solve it.
3. Verify compatibility.
4. Consider bundle size.
5. Consider maintenance quality.

⸻

46. No Dependency Duplication

Do not add multiple packages for the same responsibility without a strong reason.

⸻

47. Comments

Write comments only where they explain:

* Complex reasoning
* Non-obvious constraints
* Important security decisions
* Mathematical logic
* Provider-specific behavior

Do not comment obvious code.

⸻

48. Documentation

When architecture changes:

Update the relevant documentation.

When a feature changes:

Update the relevant feature documentation.

Documentation must reflect actual behavior.

⸻

49. Testing

New important logic should include tests.

Prioritize:

* Weather normalization
* Validation
* Risk engine
* API routes
* Authorization
* AI grounding
* Provider fallback

⸻

50. Test Quality

Tests should verify behavior, not implementation details.

Avoid brittle tests.

⸻

51. End-to-End Tests

Critical user journeys should be tested.

Examples:

Search location

↓

View weather

↓

Ask WeatherGPT

↓

Receive grounded response

↓

View risk

↓

Save location

↓

Configure alert

⸻

52. Git

Use Git throughout development.

Before committing:

* Review changes
* Check status
* Check diff
* Check secrets
* Run validation

⸻

53. Commit Quality

Use descriptive commit messages.

Examples:

feat: add location search

feat: implement weather normalization

fix: handle missing forecast data

test: add risk engine coverage

⸻

54. Pull Requests

When using pull requests:

Include:

* Summary
* Major changes
* Testing performed
* Known limitations

⸻

55. No Secrets

Never commit:

* API keys
* Passwords
* Tokens
* Private keys
* Database credentials

⸻

56. Environment Variables

Use:

.env.local

for local secrets.

Maintain:

.env.example

without real values.

⸻

57. Security Validation

Before major commits:

Check for:

* Secrets
* Unsafe input handling
* Authorization problems
* Unsafe HTML
* SQL injection risks
* Exposed API credentials

⸻

58. Production Build

Before considering a release complete:

Run:

npm run lint

npm run typecheck

npm run test

npm run build

Run E2E tests where configured.

⸻

59. Feature Development Process

Every feature should follow:

Requirement

↓

Design

↓

Architecture

↓

Implementation

↓

Validation

↓

Testing

↓

UI QA

↓

Documentation

↓

Build verification

↓

Commit

⸻

60. Feature Scope

Do not add features simply because they look impressive.

Every feature should provide:

* User value
* SIH relevance
* Demonstration value
* Technical justification

⸻

61. SIH Priority

Prioritize features that demonstrate:

* Innovation
* Social usefulness
* Technical depth
* Reliability
* Explainability
* Real-world applicability

⸻

62. Visual Quality

Before completing a major screen check:

* Alignment
* Typography
* Spacing
* Responsive behavior
* Theme compatibility
* Loading state
* Error state
* Empty state
* Accessibility

⸻

63. No Placeholder Production UI

Do not leave:

* Lorem ipsum
* Dummy weather
* Fake statistics
* Fake testimonials
* Fake user counts
* Fake government partnerships

in the final product.

⸻

64. No Fake Data

Never use fake live weather data in production.

Demonstration data must be clearly identified as demonstration data.

⸻

65. No Watermarks

Do not add coding-agent or template watermarks to the final application.

⸻

66. Original UI

Do not copy another application’s exact:

* Branding
* Logo
* Visual identity
* Layout
* Text
* Assets

Use familiar interaction patterns but maintain WeatherGPT originality.

⸻

67. Cross-Platform

Every major feature must be evaluated across:

* macOS
* Windows
* iOS
* Android

through responsive browser/PWA behavior.

⸻

68. Browser Compatibility

Test important functionality in:

* Safari
* Chrome
* Edge
* Firefox

where practical.

⸻

69. Progressive Web App

If PWA functionality is implemented:

Ensure:

* Manifest
* Icons
* Installability
* Appropriate caching
* Safe offline behavior

Do not claim live weather works offline.

⸻

70. Graceful Degradation

If an optional feature fails:

Core weather functionality should continue whenever possible.

Examples:

Map unavailable

↓

Weather still works.

AI unavailable

↓

Structured weather information still works.

Database temporarily unavailable

↓

Public weather functionality may continue where architecture permits.

⸻

71. User Feedback

Important actions should provide feedback.

Examples:

Location saved

Alert created

Theme changed

Request failed

⸻

72. No Silent Failures

If an action fails, communicate it.

Never make the UI appear successful when the server operation failed.

⸻

73. Data Freshness

Display freshness information when it materially helps trust.

Examples:

Updated 2 minutes ago

Forecast updated at 10:30 AM

Official alert issued at 8:15 AM

⸻

74. Source Transparency

Where appropriate, show:

* Provider
* Timestamp
* Forecast/observed status
* Official/derived status

⸻

75. User Trust

When deciding between:

A beautiful answer

and

A truthful incomplete answer

choose:

TRUTHFUL INCOMPLETE ANSWER.

⸻

76. Agent Decision Rule

When implementing something not explicitly specified:

1. Check documentation.
2. Follow existing architecture.
3. Prefer the simplest reliable solution.
4. Preserve security.
5. Preserve data integrity.
6. Avoid unnecessary dependencies.
7. Avoid breaking existing functionality.

⸻

77. Breaking Changes

Before introducing a breaking architectural change:

* Explain the reason.
* Identify affected areas.
* Update documentation.
* Update tests.
* Verify migration path.

⸻

78. Refactoring

Do not perform large unrelated refactors while implementing a small feature.

Keep changes focused.

⸻

79. Debugging

When fixing a bug:

1. Reproduce.
2. Identify root cause.
3. Implement minimal correct fix.
4. Add regression test where appropriate.
5. Run relevant tests.
6. Run build.

⸻

80. Build Failure

If the build fails:

Do not hide or bypass the error.

Find the cause.

Fix the root problem.

Re-run the build.

⸻

81. Type Errors

Do not solve type errors by blindly adding:

any

or disabling TypeScript checks.

Fix the underlying typing problem.

⸻

82. Lint Errors

Do not disable lint rules simply to make the build pass.

Only disable a rule when there is a documented justified reason.

⸻

83. AI Coding Agent

The coding agent may autonomously:

* Create files
* Modify files
* Install approved dependencies
* Run commands
* Run tests
* Run builds
* Create migrations
* Create Git commits
* Push authorized Git branches
* Prepare pull requests

⸻

84. Agent Permission Boundary

The agent must not:

* Invent credentials
* Bypass authentication
* Disable security controls
* Delete important data without authorization
* Push secrets
* Claim a deployment succeeded when it failed

⸻

85. External Services

For services such as:

* GitHub
* Vercel
* Neon
* Weather APIs
* AI providers

use official authentication mechanisms.

⸻

86. Human Authorization

Some actions may require the human project owner.

Examples:

* Creating accounts
* Accepting provider terms
* Billing authorization
* OAuth authorization
* Granting permissions
* Providing API credentials

The agent should request only the required human action.

⸻

87. Automation Goal

The desired workflow is:

Human authorizes services

↓

Agent configures project

↓

Agent codes

↓

Agent tests

↓

Agent commits

↓

Agent pushes

↓

CI validates

↓

Deployment occurs

The agent should minimize repetitive manual work.

⸻

88. Definition of Done

A feature is DONE only when:

* Requirement is implemented.
* UI works.
* Server logic works where applicable.
* Validation exists.
* Error handling exists.
* Security is considered.
* Responsive behavior works.
* Theme compatibility works.
* Tests are added where appropriate.
* Documentation is updated.
* Production build succeeds.

⸻

89. Final Development Principle

Build:

SMALL

↓

CORRECT

↓

TESTED

↓

COMPOSABLE

↓

REUSABLE

↓

PRODUCTION-READY

Do not build a huge fragile system just to increase feature count.

⸻

90. Final Rule

Every engineering decision must support:

TRUST

PERFORMANCE

SECURITY

USER VALUE

MAINTAINABILITY

SIH IMPACT

WeatherGPT should be impressive because it is genuinely useful and technically sound—not because it contains unnecessary complexity.