WEATHERGPT — TECHNICAL ARCHITECTURE

1. Architecture Goal

WeatherGPT must be built as a production-quality web application with a modular architecture.

The architecture must prioritize:

1. Reliability
2. Accuracy
3. Security
4. Explainability
5. Maintainability
6. Scalability
7. Fast user experience

The architecture must prevent the language model from becoming the source of meteorological truth.

⸻

2. Technology Stack

Frontend

* Next.js
* React
* TypeScript
* App Router
* Tailwind CSS
* shadcn/ui where appropriate
* Lucide React
* Framer Motion

⸻

Backend

Use the Next.js server architecture.

Primary technologies:

* Next.js Route Handlers
* Server Actions where appropriate
* TypeScript
* Zod validation

The backend must keep provider API keys server-side.

⸻

Authentication

Use:

Better Auth

Authentication should support:

* User registration
* Login
* Logout
* Session management
* Protected user features
* Saved locations
* Preferences
* Alert configuration

Authentication should be implemented only when required by the feature.

⸻

Database

Use:

Neon PostgreSQL

Database responsibilities may include:

* Users
* Sessions
* Saved locations
* Preferences
* Conversations
* Alert rules
* Alert history
* Weather metadata
* Application configuration

Do not store unnecessary sensitive information.

⸻

Deployment

Primary deployment target:

Vercel

Source control:

GitHub

⸻

3. High-Level Architecture

The system should follow this logical architecture:

User Interface

↓

Next.js Application

↓

API / Server Layer

↓

Intent & Context Layer

↓

Weather Provider Abstraction

↓

Data Validation

↓

Data Normalization

↓

Weather Intelligence Engine

↓

Risk Engine

↓

ImpactAI

↓

AI Response Generator

↓

User Interface

⸻

4. Core Data Flow

Weather Query

User asks:

“Will it rain this evening?”

↓

1. Receive user message.

↓

2. Detect intent.

Intent:

WEATHER_FORECAST

↓

3. Determine location.

↓

4. Determine date/time.

↓

5. Validate the query.

↓

6. Retrieve weather data from configured provider.

↓

7. Validate provider response.

↓

8. Normalize provider response into the WeatherGPT internal schema.

↓

9. Pass structured data to the relevant intelligence engine.

↓

10. Calculate derived risk or impact where applicable.

↓

11. Provide structured verified data to the LLM.

↓

12. Generate natural-language explanation.

↓

13. Validate the response.

↓

14. Return response to user.

⸻

5. AI DATA BOUNDARY

This is a mandatory architectural rule.

The LLM must not directly query arbitrary weather APIs.

The server controls data retrieval.

Correct:

User

↓

Intent

↓

Server

↓

Weather API

↓

Validation

↓

Normalized Weather Data

↓

Risk / Impact

↓

LLM

↓

Response

Incorrect:

User

↓

LLM

↓

LLM guesses weather

The second architecture is prohibited.

⸻

6. Weather Provider Abstraction

WeatherGPT must not tightly couple the application to one weather provider.

Create a provider abstraction.

Conceptually:

WeatherProvider

* getCurrentWeather()
* getHourlyForecast()
* getDailyForecast()
* getAlerts()
* getHistoricalWeather()

Individual provider adapters implement this interface.

Example:

Provider A Adapter

Provider B Adapter

Official Data Adapter

↓

Common WeatherProvider Interface

↓

WeatherGPT

⸻

7. Provider Response Normalization

Different providers return different formats.

Never expose provider-specific response structures directly to the frontend.

Use:

Provider Response

↓

Adapter

↓

Normalized Weather Schema

↓

Application

⸻

8. Normalized Weather Model

The internal weather model should be provider-independent.

Conceptual structure:

WeatherData

* location
* observedAt
* forecastFor
* temperature
* feelsLike
* humidity
* pressure
* visibility
* wind
* precipitation
* cloudCover
* uvIndex
* airQuality
* condition
* source
* dataType
* fetchedAt

The actual schema must be strongly typed.

Optional values must be represented safely.

Missing provider values must not be fabricated.

⸻

9. Data Freshness

Every weather response should track freshness.

Important timestamps:

* Provider timestamp
* Observation timestamp
* Forecast timestamp
* Application fetch timestamp

The UI should communicate when data was updated where relevant.

⸻

10. Cache Architecture

Weather information should be cached where appropriate to reduce:

* API requests
* Latency
* Provider load
* Cost

Caching must have explicit expiration policies.

Example conceptual flow:

Request

↓

Cache lookup

↓

Fresh cache?

YES → return validated cached data

NO → fetch provider

↓

Validate

↓

Normalize

↓

Cache

↓

Return

⸻

11. Stale Data Protection

If cached information is too old to be considered appropriate for the requested operation:

Do not silently present it as current.

Instead:

* Fetch fresh data
* Try another configured provider where appropriate
* Inform the user when current data is unavailable

⸻

12. Weather Validation Layer

Provider data must be validated before reaching intelligence or AI layers.

Validation should check:

* Required fields
* Data types
* Timestamp validity
* Geographic information
* Numeric ranges where appropriate
* Provider response integrity

Use:

Zod

for runtime validation.

⸻

13. Risk Engine

The Risk Engine converts validated weather data into derived risk indicators.

Initial categories:

* Rain Risk
* Heat Risk
* Wind Risk
* Thunderstorm Risk
* Visibility Risk
* Air Quality Risk
* Travel Risk
* Outdoor Activity Risk
* Overall Weather Safety

Each risk should contain:

* Risk category
* Risk level
* Supporting factors
* Calculation metadata
* Timestamp
* Data source references

⸻

14. Risk Levels

Use:

LOW

MODERATE

HIGH

SEVERE

Risk calculation must use deterministic, documented rules wherever possible.

Avoid asking the LLM to calculate the numerical risk itself.

The LLM may explain the already-calculated result.

⸻

15. Explainability

Every important derived insight should have supporting factors.

Example:

Travel Risk: MODERATE

Supporting factors:

* Precipitation probability
* Rain intensity where available
* Wind conditions
* Visibility
* Severe weather indicators

The exact values must originate from validated weather data.

⸻

16. ImpactAI

ImpactAI converts validated weather and risk information into contextual impact information.

Input:

WeatherData

RiskAssessment

UserContext

↓

ImpactAI

↓

ImpactAssessment

Potential impacts:

* Travel
* Outdoor activity
* Agriculture
* Heat exposure
* Visibility
* Waterlogging
* General safety

The system must distinguish between:

Observed/forecast data

Derived risk

AI interpretation

⸻

17. User Context

The intelligence layer may use:

* User mode
* Selected location
* Selected time
* User preferences
* Query intent

Possible user modes:

* General
* Student
* Farmer
* Traveller

User context must not alter the underlying weather data.

⸻

18. Conversation Context

WeatherGPT should maintain short-term conversational context.

Example:

User:

“Will it rain tomorrow?”

Assistant:

“Rain is likely during the afternoon.”

User:

“What about evening?”

The system should resolve:

Date = tomorrow

Location = previous location

Time = evening

The context engine should produce structured parameters for the weather query.

⸻

19. Intent Layer

The system should classify user queries into structured intents.

Potential intents:

* CURRENT_WEATHER
* HOURLY_FORECAST
* DAILY_FORECAST
* WEATHER_ALERT
* WEATHER_EXPLANATION
* TRAVEL_WEATHER
* FARM_WEATHER
* STUDENT_WEATHER
* HISTORICAL_WEATHER
* CLIMATE_ANALYSIS
* LOCATION_SEARCH
* WEATHER_COMPARISON

Intent detection should not itself provide weather facts.

It only determines what information needs to be retrieved.

⸻

20. Location Resolution

Location input may come from:

* Search
* User-selected location
* Browser geolocation
* Saved location

The system should resolve locations into a structured representation.

Conceptual:

Location

* name
* latitude
* longitude
* region
* country

Do not expose precise location data unnecessarily.

⸻

21. Browser Geolocation

Browser location access must require user permission.

If permission is denied:

Provide manual location search.

Never silently assume the user’s location.

⸻

22. AI Response Generation

The LLM receives structured information rather than arbitrary raw provider responses.

Example conceptual input:

User question:

“Should I travel this evening?”

Verified weather:

Temperature: 29°C

Rain probability: 78%

Wind: 24 km/h

Visibility: 5 km

Risk:

Travel Risk: MODERATE

Supporting factors:

Rain probability

Reduced visibility

The LLM generates the explanation.

⸻

23. AI Grounding Rules

The AI must follow:

1. Use only supplied verified data.
2. Never invent weather values.
3. Never invent alerts.
4. Never invent sources.
5. Never invent timestamps.
6. Never invent historical measurements.
7. Never claim unavailable information.
8. Clearly state when data is unavailable.
9. Distinguish forecasts from observations.
10. Distinguish derived assessments from official warnings.

⸻

24. AI Response Verification

Where practical, AI responses should be checked against structured source data.

Potential checks:

* Mentioned temperature exists in source data.
* Mentioned precipitation value exists in source data.
* Mentioned warning exists in source data.
* Source attribution matches actual provider.
* No unsupported numerical weather values appear.

If verification fails:

Regenerate or return a safe fallback response.

⸻

25. Official Alert Boundary

Official alerts must remain separate from AI-generated insights.

Example:

OFFICIAL WARNING

Issued by:

Actual issuing authority

Valid:

Actual validity period

Source:

Actual source

⸻

WEATHERGPT ASSESSMENT

Travel Risk:

HIGH

Reason:

Derived from validated forecast information.

These must never be visually or semantically merged.

⸻

26. API Architecture

Frontend should communicate with controlled server endpoints.

Potential endpoints:

GET /api/weather/current

GET /api/weather/hourly

GET /api/weather/daily

GET /api/weather/alerts

POST /api/chat

POST /api/risk

POST /api/impact

GET /api/location/search

GET /api/history

GET /api/climate

POST /api/alerts

⸻

27. Server-Side Secrets

Provider API keys must never be exposed to:

* Browser
* Client JavaScript
* GitHub
* Public source code

Secrets must be stored using environment variables.

Example:

WEATHER_PROVIDER_API_KEY

LLM_API_KEY

DATABASE_URL

The actual variable names may be refined during implementation.

⸻

28. Error Handling

The system must handle:

* Provider timeout
* Provider rate limit
* Invalid response
* Missing data
* Database failure
* LLM failure
* Location resolution failure
* Network failure

The user should receive useful error messages.

Never fabricate a successful weather response after a provider failure.

⸻

29. Fallback Strategy

Preferred:

Provider A

↓

Failure?

↓

Provider B where configured

↓

Failure?

↓

Validated cache where appropriate

↓

Failure?

↓

Transparent unavailable-data response

Never:

Provider failure

↓

AI-generated guess

⸻

30. Rate Limiting

Sensitive and expensive endpoints should have rate limiting.

Especially:

* Chat
* Weather retrieval
* Historical analysis
* Climate analysis

Rate limiting should be implemented server-side.

⸻

31. Observability

The application should log useful technical information such as:

* Provider latency
* Provider failures
* API errors
* Cache hits/misses
* AI latency
* Request IDs

Do not log unnecessary personal information.

Do not log API secrets.

⸻

32. Performance

Priorities:

* Fast first load
* Streaming conversational responses where appropriate
* Efficient weather caching
* Server-side data fetching where beneficial
* Lazy loading for heavy map components
* Optimized images
* Minimal unnecessary client-side JavaScript

⸻

33. Map Architecture

RiskMap should be implemented as a separate client-heavy component where necessary.

The map should consume structured geospatial data.

Potential data:

* Points
* Areas
* Polygons
* Hazard regions
* Weather overlays

The exact map provider must be selected during implementation based on licensing, performance and availability.

⸻

34. Frontend State

Use the simplest state architecture that satisfies the application.

Avoid unnecessary global state.

Separate:

* Server data
* UI state
* Conversation state
* User preferences

⸻

35. Security Principles

Follow:

* Principle of least privilege
* Server-side secret management
* Input validation
* Output validation
* Authentication for protected resources
* Authorization checks
* Rate limiting
* Secure cookies/session handling
* Protection against injection
* Safe error messages

⸻

36. Development Environment

Local development:

Next.js development server

Database:

Neon PostgreSQL development environment

Source control:

Git

Remote repository:

GitHub

Deployment:

Vercel

⸻

37. Environment Separation

Maintain separate configuration for:

Development

Preview

Production

Never use production secrets in source code.

Never commit .env files containing real secrets.

⸻

38. Testing Architecture

Testing layers:

Unit tests

↓

Integration tests

↓

API tests

↓

End-to-end tests

Critical paths:

* Weather retrieval
* Provider normalization
* Validation
* Risk calculation
* AI grounding
* Authentication
* Saved locations
* Alerts

⸻

39. Architecture Decision Rule

Prefer simple, reliable architecture over unnecessary complexity.

Do not introduce:

* Microservices
* Message queues
* Complex orchestration
* Unnecessary infrastructure

unless there is a demonstrated need.

The SIH prototype must remain achievable and reliable.

⸻

40. Final Architecture Principle

The most important boundary in WeatherGPT is:

VERIFIED DATA → INTELLIGENCE → AI EXPLANATION

Never:

AI → INVENTED WEATHER

The system must remain useful even when the AI model is unavailable.

Weather data retrieval and core risk calculations must not depend on the LLM.

This architecture is the foundation of WeatherGPT’s reliability and anti-hallucination strategy.