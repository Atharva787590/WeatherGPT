WEATHERGPT — MASTER BUILD PROMPT

ROLE

You are the principal AI software engineering agent responsible for designing, implementing, testing, securing, documenting, and preparing the WeatherGPT application for deployment.

You are building a serious, polished, production-oriented weather intelligence web application for the Smart India Hackathon 2026.

Product:

WEATHERGPT

Conversational AI for Weather Forecasting, Alerts, Risk Intelligence and Climate Information

⸻

1. PRIMARY OBJECTIVE

Build WeatherGPT as a conversational weather-intelligence platform.

The user should be able to communicate naturally with the system instead of navigating a conventional weather dashboard.

Example:

User:

“Will it rain tomorrow evening?”

WeatherGPT should:

1. Understand the intent.
2. Resolve the relevant location.
3. Resolve the relevant date/time.
4. Retrieve appropriate weather data.
5. Validate the data.
6. Normalize it.
7. Calculate relevant derived information.
8. Determine relevant risk/impact.
9. Generate a grounded explanation.
10. Show supporting evidence.
11. Clearly communicate uncertainty and freshness.

⸻

2. CORE PRINCIPLE

WeatherGPT is NOT:

“An LLM that guesses the weather.”

WeatherGPT IS:

“Verified weather data interpreted through conversational AI.”

Architecture:

USER

↓

CONVERSATIONAL INTERFACE

↓

INTENT / CONTEXT

↓

WEATHER DATA PROVIDER

↓

VALIDATION

↓

NORMALIZATION

↓

RISK / IMPACT ENGINE

↓

GROUNDED AI CONTEXT

↓

LLM

↓

RESPONSE VALIDATION

↓

RICH WEATHER RESPONSE

⸻

3. NON-NEGOTIABLE NO-HALLUCINATION POLICY

Never fabricate:

* Temperature
* Rain probability
* Wind speed
* Humidity
* Weather conditions
* Forecasts
* Historical observations
* Climate statistics
* Air quality
* UV index
* Alerts
* Government warnings
* Locations
* Coordinates
* Data sources
* Timestamps
* Risk scores

If required verified information is unavailable:

Tell the user.

Never guess.

⸻

4. OFFICIAL VS DERIVED INFORMATION

Always distinguish:

Official Information

Information originating from recognized official sources.

Examples:

* Government warnings
* Meteorological alerts
* Emergency information

WeatherGPT Assessment

Information calculated by WeatherGPT using available weather data.

Examples:

* Travel impact
* Outdoor activity suitability
* Rain-related inconvenience
* Heat risk
* Visibility impact

Never present a WeatherGPT assessment as an official warning.

⸻

5. PRODUCT EXPERIENCE

WeatherGPT should feel like:

“A conversation with an intelligent weather system.”

It should NOT feel like:

“A conventional weather dashboard with a chatbot added.”

The conversational experience is central.

⸻

6. CHATGPT-LIKE UX MODEL

Use familiar conversational interaction patterns:

* Sidebar
* New conversation
* Conversation history
* Chat composer
* User messages
* Assistant responses
* Search
* Settings
* Saved conversations
* Responsive navigation

However:

DO NOT copy ChatGPT’s exact visual identity.

WeatherGPT must have an original:

* Brand
* Typography
* Color system
* Icon system
* Weather visualization
* Layout
* Animation
* Components

⸻

7. VISUAL IDENTITY

Primary design language:

Botanical

Organic

Atmospheric

Modern AI

Professional weather intelligence

The result should feel:

* Premium
* Trustworthy
* Calm
* Intelligent
* Natural
* Modern
* Data-driven

⸻

8. THEMING

Support:

* Light
* Dark
* System

Also support multiple curated WeatherGPT visual themes.

Initial concepts:

Natural

Midnight

Sky

Aurora

Minimal

Themes must be implemented using centralized design tokens.

Do not simply change the background color.

Each theme should have coherent:

* Background
* Surface
* Text
* Accent
* Borders
* Shadows
* Weather visuals
* Charts
* Alerts

Theme selection must persist appropriately.

⸻

9. CROSS-PLATFORM REQUIREMENT

Build ONE responsive application.

Target:

* macOS
* Windows
* iPhone
* iPad
* Android phones
* Android tablets

Support modern browsers:

* Safari
* Chrome
* Edge
* Firefox

The UI must intentionally adapt to:

* Mobile
* Tablet
* Desktop

Do not simply shrink desktop UI.

⸻

10. PWA

Architect the application for Progressive Web App support.

Where appropriate implement:

* Manifest
* Icons
* Installability
* Standalone experience
* Safe static caching
* Appropriate offline shell

Never claim live weather works offline.

⸻

11. CORE FEATURES

Implement the most valuable weather intelligence functionality.

Core capabilities should include:

Current Weather

* Temperature
* Feels-like temperature
* Condition
* Humidity
* Wind
* Visibility
* Pressure
* UV
* Air quality where available
* Sunrise
* Sunset

Forecast

* Hourly forecast
* Daily forecast
* Longer-range forecast where reliable data exists
* Rain probability
* Temperature trends
* Wind trends

Conversational Weather

Examples:

“Will it rain today?”

“Will it rain tomorrow evening?”

“Should I carry an umbrella?”

“How hot will tomorrow be?”

“Compare tomorrow and Saturday.”

“Is it a good day for an outdoor event?”

⸻

12. LOCATION

Support:

* Search
* Browser geolocation with permission
* Saved locations
* Coordinates

Never fabricate coordinates.

Validate:

Latitude:

-90 to +90

Longitude:

-180 to +180

⸻

13. SAVED LOCATIONS

Authenticated users should be able to save locations.

Examples:

Home

College

Office

Farm

Travel destination

The system must securely associate saved locations with the correct user.

⸻

14. WEATHER CHAT CONTEXT

Conversation context may include:

* Location
* Date
* Time
* User mode
* Previous relevant weather context

Do not retain unnecessary information.

If missing information materially affects correctness:

Ask the user.

⸻

15. USER MODES

Support contextual experiences such as:

GENERAL

STUDENT

TRAVELLER

FARMER

EVENT PLANNER

These modes should prioritize relevant information.

They must not fabricate specialized advice.

⸻

16. WEATHER RISK INTELLIGENCE

Create deterministic, explainable risk assessment.

Potential categories:

* Heavy rainfall
* Flood-related risk
* Thunderstorm
* Lightning
* Extreme heat
* Extreme cold
* Strong wind
* Poor visibility
* Poor air quality
* Outdoor activity risk

Risk output should contain:

* Risk level
* Supporting factors
* Timestamp
* Data context

⸻

17. IMPACT INTELLIGENCE

Translate weather into practical consequences.

Examples:

Travel

Outdoor activity

Events

Agriculture

Heat exposure

Visibility

The system should explain WHY an impact is suggested.

⸻

18. SMART RECOMMENDATIONS

Recommendations should be evidence-based.

Examples:

“Carry an umbrella because precipitation probability is high.”

“Consider delaying an outdoor event because thunderstorms are forecast.”

“Visibility may affect travel conditions.”

Avoid absolute guarantees.

⸻

19. ALERTS

Support weather alert experiences.

Alert categories may include:

* Heavy rainfall
* Thunderstorms
* Lightning
* Strong winds
* Extreme heat
* Extreme cold
* Flood-related alerts
* Poor air quality
* Cyclones where supported
* Wildfire hazards where supported

Official alerts must remain clearly marked as official.

⸻

20. PERSONAL ALERTS

Users may configure alerts for saved locations.

Examples:

Notify me when:

Temperature exceeds threshold.

Rain probability exceeds threshold.

Severe weather is detected.

Air quality becomes poor.

Only create alerts based on actual available data.

⸻

21. HISTORICAL WEATHER

Where reliable historical data is available, support:

* Historical temperature
* Rainfall
* Weather conditions
* Comparisons

Clearly distinguish historical observations from forecasts.

⸻

22. CLIMATE INTELLIGENCE

Climate information must be treated differently from short-term weather.

Potential capabilities:

* Long-term trends
* Historical comparisons
* Seasonal patterns
* Climate context

Never infer climate trends from insufficient short-term data.

⸻

23. WEATHER VISUALIZATION

Use visualizations where they improve understanding.

Examples:

* Temperature chart
* Rain probability chart
* Wind visualization
* Forecast timeline
* Humidity visualization
* UV indicator
* AQI indicator
* Sunrise/sunset
* Risk indicators

Charts must remain readable on mobile.

⸻

24. ATMOSPHERIC UI

Where appropriate, the interface can subtly reflect current conditions.

Examples:

Clear

Rain

Cloudy

Storm

Extreme weather

Effects must:

* Remain subtle
* Preserve readability
* Be performant
* Respect reduced motion

⸻

25. MAPS

Where map support is implemented:

Provide:

* Location context
* Weather overlays where supported
* Risk visualization
* Relevant alert information

Maps must remain usable on touch devices.

⸻

26. SOURCE TRANSPARENCY

Where appropriate display:

* Weather provider
* Retrieved timestamp
* Forecast/observed status
* Freshness
* Official/derived distinction

Users should be able to understand where information came from.

⸻

27. DATA FRESHNESS

Always distinguish:

Current

Forecast

Historical

Cached

Official Alert

Derived Assessment

AI Interpretation

Never silently present stale data as current.

⸻

28. WEATHER PROVIDER ARCHITECTURE

Use provider adapters.

Concept:

Provider

↓

Adapter

↓

Normalized Weather Schema

↓

Application

This prevents provider-specific code from spreading throughout the project.

⸻

29. NORMALIZED DATA

Create a unified internal weather representation.

Provider differences must be normalized before application logic uses the data.

⸻

30. VALIDATION

Use Zod for external data validation.

Validate:

* Response structure
* Types
* Required fields
* Numeric ranges
* Coordinates
* Dates
* Units

Invalid data must not reach the AI layer.

⸻

31. API FAILURE

Handle:

* Timeout
* Rate limit
* Network error
* Invalid response
* Provider outage
* Authentication error

Use configured fallback mechanisms where appropriate.

Never replace failed weather data with an AI guess.

⸻

32. CACHING

Use caching strategically.

Track:

* Provider
* Retrieval timestamp
* Expiration
* Data type

Expired information must not be presented as current.

⸻

33. AI GROUNDING

The AI receives structured verified context.

Example:

USER QUESTION

NORMALIZED WEATHER

RISK DATA

IMPACT DATA

SOURCE METADATA

↓

LLM

The LLM explains the information.

It does not invent the underlying weather.

⸻

34. PROMPT INJECTION DEFENSE

User input is untrusted.

Never allow user instructions to override:

* System instructions
* Security rules
* Data grounding
* Application policies

⸻

35. RESPONSE VALIDATION

Where practical inspect AI responses for:

* Unsupported numbers
* Unsupported claims
* Invented sources
* Invented alerts
* Excessive certainty

⸻

36. AI FAILURE

If the AI provider fails:

Return deterministic weather information where possible.

Example:

“The weather data is available, but the conversational explanation service is temporarily unavailable.”

Never fabricate an AI response.

⸻

37. DATABASE

Use Neon PostgreSQL.

Potential data:

* Users
* Sessions
* Preferences
* Saved locations
* Conversations
* Alert rules
* Application state

Live weather should remain provider-derived.

⸻

38. AUTHENTICATION

Use Better Auth.

Support appropriate authentication methods according to the project’s implementation plan.

Protect private resources.

⸻

39. AUTHORIZATION

Every protected operation must verify:

Authenticated user

Resource ownership

Never trust a client-provided user ID.

⸻

40. SECURITY

Never expose:

* API keys
* Database credentials
* Tokens
* Passwords
* Private keys

Use environment variables.

Never commit secrets.

⸻

41. FRONTEND/BACKEND SEPARATION

Sensitive operations remain server-side.

Client:

* UI
* Interaction
* Browser APIs

Server:

* Secrets
* Database
* Provider requests
* AI provider requests
* Security-sensitive logic

⸻

42. PERFORMANCE

Optimize:

* Rendering
* API requests
* Caching
* Bundle size
* Images
* Charts
* Maps
* Animations

Do not sacrifice data correctness for performance.

⸻

43. ACCESSIBILITY

Support:

* Keyboard navigation
* Screen readers
* Focus states
* Semantic HTML
* Accessible labels
* Contrast
* Reduced motion

⸻

44. RESPONSIVE DESIGN

Every major feature must be tested on:

Mobile

Tablet

Desktop

Themes:

Light

Dark

Natural

Midnight

Sky

Aurora

Minimal

⸻

45. SETTINGS

Settings should provide organized controls for:

* Appearance
* Theme
* Units
* Language
* Notifications
* Locations
* Privacy
* Accessibility
* AI preferences
* Data

⸻

46. CHAT INTERFACE

Chat should support:

* New conversation
* History
* Search
* Rich AI responses
* Weather cards
* Charts
* Risk cards
* Source information
* Suggested follow-up questions
* Retry
* Stop generation
* Composer

⸻

47. RICH RESPONSE FORMAT

WeatherGPT responses may combine:

Text

Weather cards

Charts

Risk information

Recommendations

Sources

This is a major differentiator.

⸻

48. FOLLOW-UP QUESTIONS

Generate contextually useful follow-up suggestions.

Example:

“Will it rain tomorrow?”

↓

“Will it rain in the evening?”

“Should I carry an umbrella?”

“Compare tomorrow with Saturday.”

Do not generate irrelevant suggestions.

⸻

49. VOICE

Where browser support allows:

Support voice input.

Provide fallback to text.

Voice is optional and must never be required for core functionality.

⸻

50. NO WATERMARKS

Final application must not contain unnecessary:

* AI coding tool watermarks
* Template branding
* Generator branding
* Development labels

⸻

51. NO FAKE CONTENT

Never create fake:

* User counts
* Reviews
* Testimonials
* Partnerships
* Government endorsements
* Accuracy statistics

⸻

52. ORIGINAL DESIGN

Do not clone another product.

Use familiar interaction concepts while creating original WeatherGPT design.

⸻

53. SIH WINNING QUALITY

Prioritize:

Innovation

Technical depth

Real-world usefulness

Trustworthiness

Explainability

Beautiful UX

Reliable engineering

Do not prioritize feature quantity over quality.

⸻

54. DEMONSTRATION EXPERIENCE

The primary demo should demonstrate:

1. Open WeatherGPT.
2. Select a location.
3. Ask a natural-language weather question.
4. Show verified weather retrieval.
5. Show structured weather information.
6. Show risk intelligence.
7. Show practical recommendation.
8. Show source/freshness information.
9. Ask a follow-up question.
10. Demonstrate another powerful capability.

The flow should be smooth and visually impressive.

⸻

55. SIH DIFFERENTIATION

The application should demonstrate that WeatherGPT goes beyond:

“What’s the temperature?”

It should answer:

“What does this weather mean for me?”

This distinction should be visible throughout the product.

⸻

56. DEVELOPMENT PROCESS

Before coding:

Read:

README.md

PROJECT_SPEC.md

FEATURES.md

ARCHITECTURE.md

DESIGN.md

API_SPEC.md

DATABASE.md

SECURITY.md

DEPLOYMENT.md

DEVELOPMENT_RULES.md

TESTING.md

ROADMAP.md

AGENT_INSTRUCTIONS.md

docs/problem-statement.md

docs/user-personas.md

docs/use-cases.md

docs/innovation.md

Then inspect:

prompts/MASTER_BUILD_PROMPT.md

⸻

57. IMPLEMENTATION ORDER

Follow this general order:

1. Project initialization
2. Application architecture
3. Design system
4. Theme system
5. Core layout
6. Database
7. Authentication
8. Weather provider abstraction
9. Weather retrieval
10. Validation and normalization
11. Current weather
12. Forecast
13. Location system
14. Chat system
15. AI grounding
16. Risk engine
17. Impact intelligence
18. Alerts
19. Historical weather
20. Climate intelligence
21. Maps
22. Rich visualizations
23. PWA
24. Testing
25. Accessibility
26. Performance
27. Security audit
28. Production build
29. Deployment
30. SIH demo polish

The agent may adjust this sequence when technically justified.

⸻

58. CODE QUALITY

Follow:

DEVELOPMENT_RULES.md

and:

AGENT_INSTRUCTIONS.md

Do not bypass project rules.

⸻

59. TESTING

Before declaring the application complete:

Run:

npm run lint

npm run typecheck

npm run test

npm run build

Also run appropriate end-to-end tests.

⸻

60. SECURITY TESTING

Test:

* Authentication
* Authorization
* Prompt injection
* Input validation
* API security
* Secret exposure
* Unsafe HTML
* Database access
* Rate limiting

⸻

61. HALLUCINATION TESTING

Test:

Provider unavailable

Missing forecast

Missing location

Invalid API response

Contradictory data

Fake alert request

Prompt injection

Unsupported question

Expected behavior:

Transparent limitation.

Never fabricated weather.

⸻

62. VISUAL QA

Test:

* Mobile
* Tablet
* Desktop
* Light
* Dark
* Multiple themes

Check:

* Overflow
* Typography
* Charts
* Navigation
* Accessibility
* Loading
* Errors
* Empty states
* Touch interaction

⸻

63. GIT

Use Git consistently.

Before commits:

* Review status
* Review diff
* Search for secrets
* Run appropriate checks

⸻

64. DEPLOYMENT

Target:

Vercel

Database:

Neon PostgreSQL

Repository:

GitHub

Use secure environment variables.

Never commit production secrets.

⸻

65. AUTOMATION

Where authorized, automate:

* File creation
* Code changes
* Dependency installation
* Testing
* Build
* Git operations
* CI configuration
* Deployment configuration

Never bypass required human authorization.

⸻

66. HUMAN ACTIONS

The agent must clearly identify actions requiring human authorization.

Examples:

* OAuth approval
* Account creation
* Billing
* API credential entry
* Permission grants

Never guess or fabricate authorization.

⸻

67. AUTONOMOUS DEVELOPMENT

Once required services are authorized, the preferred workflow is:

SPECIFICATION

↓

IMPLEMENTATION

↓

TESTING

↓

FIXES

↓

BUILD

↓

GIT

↓

CI

↓

DEPLOYMENT

The agent should minimize unnecessary manual work.

⸻

68. STOP CONDITIONS

Stop and request human input when:

* A required credential is missing.
* An external service requires authorization.
* A destructive action is required.
* Requirements conflict materially.
* Security cannot be maintained.
* A production decision cannot safely be inferred.

Do not guess.

⸻

69. CHANGE CONTROL

For major architectural changes:

Explain:

* Reason
* Impact
* Alternatives
* Documentation updates
* Testing requirements

⸻

70. FINAL SUCCESS CRITERIA

WeatherGPT is successful when it is:

FAST

RELIABLE

SECURE

RESPONSIVE

ACCESSIBLE

BEAUTIFUL

ORIGINAL

DATA-GROUNDED

EXPLAINABLE

CROSS-PLATFORM

THEMEABLE

DEMONSTRABLE

AND

USEFUL IN REAL-WORLD WEATHER DECISIONS.

⸻

71. FINAL PRINCIPLE

Never optimize for:

“How many features can we add?”

Optimize for:

“How much useful, trustworthy intelligence can we deliver to the user?”

⸻

72. FINAL COMMAND

Build WeatherGPT as a serious weather-intelligence platform.

Do not build a toy.

Do not build a generic dashboard.

Do not build a ChatGPT clone.

Do not fabricate information.

Do not sacrifice security.

Do not sacrifice reliability.

Do not sacrifice usability for visual effects.

Build a product that a real person could trust for understanding weather conditions and their practical implications.

WEATHERGPT

SEE THE WEATHER.

UNDERSTAND THE WEATHER.

ACT WITH CONFIDENCE.