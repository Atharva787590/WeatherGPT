WEATHERGPT — DATABASE SPECIFICATION

1. Database Purpose

WeatherGPT uses PostgreSQL as its persistent application database.

Primary database:

Neon PostgreSQL

The database stores application information that needs persistence across sessions.

The database must not become the source of truth for live weather.

Live weather information must originate from configured external weather providers.

⸻

2. Database Principles

The database must prioritize:

* Data integrity
* Security
* Minimal data collection
* Clear relationships
* Efficient queries
* Scalability
* Auditability

Do not store unnecessary personal information.

⸻

3. Core Entities

Initial entities:

1. User
2. Session
3. Saved Location
4. User Preference
5. Conversation
6. Conversation Message
7. Alert Rule
8. Alert Event
9. Weather Cache Metadata
10. AI / System Request Metadata

Historical weather data should generally remain with the appropriate external data source unless there is a clear reason to persist a local dataset.

⸻

4. User

Purpose:

Store the minimum information required for authenticated application functionality.

Conceptual fields:

* id
* name
* email
* createdAt
* updatedAt

Potential additional fields should only be added when required.

Do not store:

* Passwords in plaintext
* API keys
* Unnecessary personal information
* Precise location history

Authentication credentials should be managed through the authentication system.

⸻

5. Session

Purpose:

Manage authenticated sessions.

Conceptual fields:

* id
* userId
* expiresAt
* createdAt
* updatedAt

Session security must follow the authentication framework’s recommended design.

⸻

6. Saved Location

Purpose:

Allow users to quickly access important locations.

Examples:

* Home
* College
* Farm
* Workplace
* Travel destination

Conceptual fields:

* id
* userId
* name
* latitude
* longitude
* locationLabel
* region
* country
* createdAt
* updatedAt

⸻

7. Location Privacy

Saved locations should only be accessible to the authorized user.

Do not expose saved locations publicly.

Do not create unauthorized location sharing.

Precise coordinates should not be displayed unnecessarily.

⸻

8. User Preference

Purpose:

Store personalization settings.

Conceptual fields:

* id
* userId
* preferredMode
* preferredLanguage
* preferredTemperatureUnit
* preferredWindUnit
* notificationsEnabled
* createdAt
* updatedAt

Potential modes:

* GENERAL
* STUDENT
* FARMER
* TRAVELLER

⸻

9. Conversation

Purpose:

Persist user conversations where conversation history is enabled.

Conceptual fields:

* id
* userId
* title
* locationContext
* mode
* createdAt
* updatedAt

A conversation should not automatically store unnecessary sensitive information.

⸻

10. Conversation Message

Purpose:

Store individual conversation messages when persistence is enabled.

Conceptual fields:

* id
* conversationId
* role
* content
* createdAt

Roles:

* USER
* ASSISTANT
* SYSTEM

Where structured weather context is stored, it must be handled carefully.

⸻

11. Weather Provenance

If weather context is persisted for audit or debugging, store metadata rather than unnecessary duplicate weather datasets.

Potential fields:

* provider
* dataType
* retrievedAt
* observedAt
* forecastFor
* requestId

The database must not be treated as the live weather source.

⸻

12. Alert Rule

Purpose:

Store user-configured weather notification conditions.

Examples:

Rain probability > 70%

Temperature > 40°C

Severe weather warning exists

Conceptual fields:

* id
* userId
* locationId
* ruleType
* threshold
* enabled
* createdAt
* updatedAt

⸻

13. Alert Event

Purpose:

Track notifications triggered by configured alert rules.

Conceptual fields:

* id
* alertRuleId
* eventType
* triggeredAt
* notificationStatus
* source
* metadata

The event should retain enough information to understand why the alert was triggered.

⸻

14. Official Alert Storage

Official warnings may be temporarily persisted for application functionality where appropriate.

If stored, retain:

* Issuing authority
* Alert identifier where available
* Affected area
* Issue time
* Start time
* End time
* Severity
* Original source
* Retrieved time

Never modify stored official information in a way that changes its meaning.

⸻

15. Weather Cache Metadata

Weather caching may use a dedicated cache system or database depending on implementation.

If PostgreSQL is used for cache metadata, store:

* cache key
* provider
* location identifier
* data type
* retrievedAt
* expiresAt

Large transient weather payloads should not be stored unnecessarily in the primary relational database.

⸻

16. AI Request Metadata

For debugging and observability, store minimal metadata when required.

Potential fields:

* requestId
* userId where appropriate
* model identifier
* latency
* success/failure
* createdAt

Do not store API keys.

Do not store secrets.

Do not store unnecessary personal information.

⸻

17. Risk Assessment Persistence

Derived risk assessments may optionally be persisted when needed for:

* Alert history
* Analytics
* Debugging
* Demonstration

Conceptual fields:

* id
* location
* riskType
* riskLevel
* factors
* calculatedAt
* dataSourceMetadata

Risk assessments must clearly be identified as WeatherGPT-derived.

They are not official warnings.

⸻

18. Impact Assessment Persistence

Impact assessments may be stored when necessary.

Conceptual fields:

* id
* location
* userMode
* impactType
* summary
* supportingFactors
* createdAt

AI-generated text should not be treated as authoritative weather data.

⸻

19. Database Relationships

Conceptual relationships:

User

↓

Sessions

User

↓

Saved Locations

User

↓

Preferences

User

↓

Conversations

Conversation

↓

Messages

User

↓

Alert Rules

Alert Rule

↓

Alert Events

⸻

20. Primary Keys

Every entity must use a secure unique identifier.

Prefer:

UUID

or another cryptographically safe identifier.

Do not expose sequential database IDs unnecessarily.

⸻

21. Foreign Keys

Use foreign-key relationships where appropriate.

Examples:

session.userId

savedLocation.userId

conversation.userId

message.conversationId

alertRule.userId

alertRule.locationId

alertEvent.alertRuleId

⸻

22. Cascading Rules

Deletion behavior must be deliberate.

For example:

Deleting a user may require deletion or anonymization of associated:

* Sessions
* Saved locations
* Preferences
* Conversations
* Alert rules
* Alert events

The exact behavior must respect authentication, privacy and retention requirements.

Do not blindly enable cascading deletes across every relationship.

⸻

23. Indexing

Indexes should be created for common query patterns.

Potential indexes:

* User email
* Session user ID
* Session expiry
* Saved location user ID
* Conversation user ID
* Message conversation ID
* Alert rule user ID
* Alert event rule ID
* Cache key
* Timestamp fields used for cleanup

Indexes should be added based on actual query requirements.

Avoid unnecessary indexes.

⸻

24. Timestamps

Persistent entities should generally use:

* createdAt
* updatedAt

Where relevant, also use:

* expiresAt
* triggeredAt
* observedAt
* retrievedAt
* forecastFor

Store timestamps consistently.

Prefer UTC internally.

Convert to the user’s local timezone at the presentation layer.

⸻

25. Units

Persist normalized values using documented units where numerical weather information is stored.

Default internal units:

Temperature:

°C

Wind:

km/h

Visibility:

km

Pressure:

hPa

Precipitation:

mm

⸻

26. JSON Fields

JSON/JSONB may be used where appropriate for:

* Provider metadata
* Alert metadata
* Supporting factors
* Flexible configuration

Do not use JSONB as an excuse to avoid proper relational structure.

Frequently queried fields should have explicit columns.

⸻

27. Schema Validation

Application-level validation must be implemented using:

Zod

Database constraints should additionally enforce:

* Required fields
* Unique values
* Foreign keys
* Appropriate data types
* Valid timestamps where practical

⸻

28. Authentication Data

Authentication information must be protected.

Never expose:

* Password hashes
* Session secrets
* Authentication tokens
* API keys

through public API responses.

⸻

29. API Key Storage

Weather provider keys and AI provider keys must NOT be stored in normal user database records.

They belong in secure environment configuration.

⸻

30. Privacy

WeatherGPT should follow data minimization.

Do not store:

* Continuous precise location history
* Unnecessary user activity
* Unnecessary conversation metadata
* Sensitive information unrelated to weather functionality

Only retain what is required.

⸻

31. Conversation Privacy

Conversation history should be accessible only to the authenticated owner.

Every conversation request must verify authorization.

Never trust a conversation ID supplied by a client without checking ownership.

⸻

32. Saved Location Authorization

Every request involving a saved location must verify:

savedLocation.userId == authenticatedUser.id

Never rely solely on a client-provided user ID.

⸻

33. Alert Authorization

Users may only:

* Create
* Modify
* Disable
* Delete

their own alert rules.

⸻

34. Database Transactions

Use transactions for multi-step operations where consistency matters.

Examples:

Creating a user preference and related records.

Creating an alert rule and associated metadata.

Deleting a user and dependent records.

⸻

35. Migration Strategy

Database schema changes must use migrations.

Never manually modify production tables without a tracked migration.

Every migration must be:

* Reproducible
* Version controlled
* Reviewable

⸻

36. Development Database

Development should use a separate database/environment from production.

Never use production data for experimentation unless explicitly authorized and appropriately protected.

⸻

37. Environment Configuration

Database connection:

DATABASE_URL

The actual production value must be stored securely in the deployment platform.

Never commit:

.env

.env.local

or any file containing real credentials.

⸻

38. Database Security

Use:

* Strong authentication
* Secure connection
* Least privilege
* Environment isolation
* Parameterized queries
* ORM/query safety
* Input validation

Never construct SQL from untrusted raw user input.

⸻

39. Weather Data Source Rule

The database is not the authoritative source for current weather.

Correct:

Weather Provider

↓

Validation

↓

WeatherGPT

↓

Optional cache

↓

User

Incorrect:

Database

↓

Pretend weather is current forever

Cached data must always have freshness metadata.

⸻

40. Cache Expiration

Expired weather cache entries must not silently appear as current weather.

The system should:

1. Detect expiration.
2. Attempt fresh retrieval.
3. Use another configured provider where appropriate.
4. Use stale data only when explicitly allowed by policy.
5. Inform the user when fresh information is unavailable.

⸻

41. Data Retention

Retention periods should be defined according to actual product requirements.

Potential cleanup targets:

* Expired sessions
* Old cache metadata
* Temporary provider records
* Old alert events where no longer required

Do not retain data indefinitely without a reason.

⸻

42. Auditability

Important system operations should have traceable metadata.

Potential examples:

* Alert triggered
* Provider failure
* Risk calculation
* AI request
* Data retrieval

Do not create logs containing secrets or unnecessary personal data.

⸻

43. Backup

Production database backups must be enabled according to the database provider’s available capabilities.

Before major schema changes:

* Verify backup/recovery availability.
* Test migrations.
* Maintain rollback strategy where practical.

⸻

44. Performance

Database queries should:

* Select only required fields
* Use appropriate indexes
* Avoid unnecessary joins
* Paginate long result sets
* Avoid N+1 queries

Conversation history and alert history should be paginated.

⸻

45. Database Failure

If the database becomes unavailable:

WeatherGPT should still provide public weather functionality where technically possible.

Features requiring persistence may temporarily become unavailable.

Do not fabricate successful saves.

Example:

“Your location couldn’t be saved right now. Please try again.”

⸻

46. Demo Reliability

For the SIH demonstration:

The application must not depend on manually inserting weather records into PostgreSQL to simulate live weather.

Live weather must come from actual configured providers.

The database should support:

* User state
* Saved locations
* Preferences
* Conversations
* Alerts

⸻

47. Initial Schema Summary

Minimum required persistent entities:

users

sessions

saved_locations

user_preferences

conversations

conversation_messages

alert_rules

alert_events

Additional tables should only be introduced when a demonstrated product requirement exists.

⸻

48. Final Database Principle

Use PostgreSQL for:

USER STATE + APPLICATION STATE

Use weather providers for:

WEATHER TRUTH

Use deterministic application logic for:

RISK

Use AI for:

EXPLANATION

The responsibilities must remain separate.

⸻

49. Final Data Architecture

USER

↓

AUTHENTICATION

↓

USER STATE

↓

SAVED LOCATIONS / PREFERENCES / ALERTS / CONVERSATIONS

↓

WEATHER PROVIDERS

↓

VALIDATION

↓

NORMALIZATION

↓

RISK ENGINE

↓

IMPACTAI

↓

LLM EXPLANATION

↓

USER

This separation is mandatory for WeatherGPT.