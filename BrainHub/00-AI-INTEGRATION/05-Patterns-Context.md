# 💡 Patterns Context - Your Recurring Approaches

> **Development Patterns - Quick Reference**

## 🏗️ Architecture Patterns

**1. Layered Architecture (Flask Blueprint Pattern)**
- **API Layer** (Blueprints): RESTful endpoints, request/response handling (`/api/*`)
- **Service Layer**: Business logic, workflow orchestration, transaction management
- **Model Layer**: Database queries, data access (Repository pattern)
- **Utils Layer**: Helpers (validation, messages, pagination, database utilities)
- **Example Structure:**
  ```
  app/
  ├── api/          # Blueprints (customer_api, service_api, hub_api, stock_api, bosta_api)
  ├── services/     # Business logic (service_manager, stock_manager, tracking_manager)
  ├── models/       # Database queries (customer, service_ticket, stock)
  └── utils/        # Helpers (db, validators, messages, pagination)
  ```
- Used in: Hvar-Hub (5 blueprints, 4 services, comprehensive utils)

**2. API-First Design (RESTful Architecture)**
- Backend API separate from frontend (independent development)
- RESTful conventions: GET (list/detail), POST (create/action), PUT (update), DELETE (delete)
- Standardized response format: `{success: bool, data: ..., error: ...}` (GeoLink) or `{data: ..., pagination: ..., error: ...}` (Hvar-Hub)
- Query parameter filtering (status, service_type, customer_id, date ranges)
- Pagination support (limit, offset with defaults)
- Dedicated count endpoints for performance (SQL GROUP BY)
- Versioned APIs (v1, v2) for evolution (GeoLink)
- Used in: GeoLink (9 API modules), Hvar-Hub (5 API modules), Shozati (6 API modules: auth, products, orders, users, admin, public)

**3. Component-Based Architecture (React Patterns)**
- Functional components with hooks (useState, useEffect, useCallback, useMemo)
- Custom hooks for shared logic (useTickets, useScanHub, useRTL, useRecentSearches)
- Component organization by domain (hub/, service/, stock/, ui/, forms/)
- Memoization for performance (React.memo, useMemo, useCallback)
- Optimistic UI updates (instant feedback, delayed sync)
- Centralized API client layer (Axios with interceptors)
- Used in: Hvar-Hub React frontend (3 pages, 50+ components), Shozati (component-based with lazy loading, custom hooks, context API)

**4. Modular Systems (Blueprint-Based Modules)**
- Flask Blueprints for API organization (one per domain)
- Separate service managers per domain (service_manager, stock_manager, tracking_manager)
- Independent model layers per entity
- Frontend pages as route modules (HubPage, ServiceActionsPage, StockManagementPage)
- Component grouping by feature (hub/, service/, stock/ components)
- Used in: Hvar-Hub (5 API blueprints, 4 service managers, modular frontend)

---

## 🎯 Development Patterns

**1. Hub/Management Systems (Service Management Pattern)**
- Centralized management hub (HubPage for operations)
- Multiple service workflows (replacement, maintenance, return)
- State machine workflows with status transitions
- Dynamic action calculation based on ticket state
- Stock reservation and management integration
- QR scanning for warehouse operations
- Real-time status tracking and updates
- Used in: Hvar-Hub (complete service management with 3 workflows, QR scanning, stock integration)

**2. Version Evolution**
- v1 → Public → v2 → Variants
- Used in: Geolink ecosystem

**3. Ecosystem Building**
- Multiple related projects
- Used in: Geolink, GeoEgy, Hub systems

**4. Market-Specific Solutions**
- Egyptian market focus
- Arabic/RTL support
- Used in: Hvar-Hub, GeoEgy, geolink-eg

---

## 💡 Problem-Solving Patterns

**1. Problem-First Approach**
- Start with business problem, not technology
- Understand workflows and requirements first
- Example: Hvar-Hub started with service ticket workflows, then built system around them
- Document workflows before coding (service_tickets.md, maintenance_workflow.md)

**2. Systems Thinking**
- See connections
- Complete solutions

**3. Production-Ready Mindset**
- Not just working code, production-ready systems
- Transaction management for data integrity
- Error handling with user-friendly messages (Arabic)
- Performance optimization (SQL queries, caching, count endpoints)
- Migration system for database schema
- WSGI deployment configuration
- Comprehensive documentation (CLAUDE.md, README.md, API docs)
- Health check endpoints and logging
- Used in: Hvar-Hub (deployed on LiteSpeed/CyberPanel, full production system)

**4. Documentation-First**
- Comprehensive API documentation (service_tickets.md, stock.md, workflows)
- AI assistant guide (CLAUDE.md) with patterns and conventions
- README.md with complete setup and architecture
- Code comments and docstrings
- Future-proof knowledge for maintenance

**5. Transaction Management Pattern**
- Context manager pattern for transactions (`with transaction() as cursor`)
- Atomic multi-step operations (all or nothing)
- Automatic commit on success, rollback on error
- Used for: Stock reservations, ticket creation, status updates
- Example: Ticket confirmation reserves stock atomically

**6. State Machine Workflows**
- Status-based workflows with defined transitions
- Available actions calculated dynamically from current state
- History tracking for audit trail (service_ticket_history)
- Status-specific business logic and stock operations
- Used in: Service tickets (replacement, maintenance, return workflows)

**7. Stock Reservation Pattern**
- Three-tier quantity tracking (on_hand, reserved, damaged)
- Available = on_hand - reserved
- Reservation on ticket confirmation, commit on dispatch
- Movement tracking for audit trail (stock_movements table)
- BOM (Bill of Materials) support for product assembly

**8. Credit-Based Billing Pattern**
- Free monthly quota system with automatic reset
- Account balance with credit limit
- Billing priority: Free credits → Account balance → Credit limit → Rejection
- Per-API-key rate limiting with daily counters
- Usage logging with async processing for performance
- Payment workflow: Request → Pending → Admin approval → Balance update
- Account suspension when balance falls below credit limit
- Used in: GeoLink (credit-based API platform)

**9. API Key Management Pattern**
- UUID-based API keys with plain text storage
- Multi-key support per user (name-based organization)
- Key operations: Create, regenerate, deactivate, activate
- Per-key rate limiting (daily limits with automatic reset)
- Usage tracking per key (requests, costs, endpoints)
- Caching for performance (LRU cache with TTL)
- Used in: GeoLink (comprehensive API key system)

**10. Database Design Patterns**
- Snake_case naming for tables and columns
- Standard audit fields (created_at, updated_at, created_by, updated_by)
- Foreign keys with ON DELETE CASCADE/RESTRICT appropriately
- ENUM/VARCHAR for status fields
- JSON columns for flexible data (bosta_orders, customer_services)
- Composite primary keys for sequences (ticket_sequences)
- Indexes on frequently queried columns
- Soft delete pattern (not deleted flags, but SKU versioning)
- History tables for audit trails (service_ticket_history, stock_movements)

**11. Arabic/RTL Implementation Pattern**
- All user-facing text in Arabic (no English in UI)
- RTL layout with Tailwind RTL utilities (`flex-row-reverse`, `space-x-reverse`)
- Arabic fonts (Cairo, Tajawal, Cairo Play) with proper font-family
- RTL-aware components (toast notifications, modals, forms)
- Custom hook for RTL detection (useRTL)
- Theme context with RTL support
- Proper text direction attributes (`dir="rtl"`)
- Arabic date formatting and number formatting

**12. QR Scanning Pattern**
- Camera-based scanning (html5-qrcode, qr-scanner libraries)
- Performance optimized with frame rate controls
- Error handling for camera permissions and device compatibility
- Scanning frame UI with visual feedback
- Integration with tracking system (hub_api)
- Support for multiple scan types (receive, dispatch, lookup)

**13. Production Server Deployment Pattern**
- Multi-server support: Gunicorn (Linux), Waitress (Windows)
- Dynamic worker calculation based on CPU/memory
- Health check endpoints for monitoring
- Environment-based configuration (dev/prod/test)
- Docker containerization with volume mounts
- Graceful shutdown handling (SIGTERM, SIGINT)
- Log rotation and cleanup automation
- Used in: GeoLink (production deployment), Hvar-Hub (WSGI)

**14. Design System Pattern**
- Comprehensive design documentation (DESIGN.md, GEOLINK_DESIGN_SYSTEM.md)
- Design tokens (colors, typography, spacing, components)
- Mobile-first responsive design
- WCAG accessibility compliance (AA minimum, AAA preferred)
- Component library with patterns and examples
- Design consistency across all interfaces
- Used in: GeoLink (extensive design system), Areo (Material Design 3)

**15. MVVM Android Architecture Pattern**
- SharedViewModel for centralized state management across fragments
- LiveData for reactive UI updates and lifecycle-aware components
- Data Binding + View Binding (both enabled in build.gradle)
- Kotlin Coroutines (1.7.3) for asynchronous operations with Play Services support
- Repository pattern for data layer abstraction (GeolinkRepository)
- ViewModelFactory for dependency injection into ViewModels
- Navigation Component for fragment-based navigation
- Used in: Areo (complete MVVM implementation with SharedViewModel)

**16. Real-Time Location Tracking Pattern**
- Foreground LocationService in separate process (`:locationServiceProcess`) for isolation
- Geofire (3.2.0) integration for real-time location queries with GeoQuery
- Role-based update intervals (DRIVER: 1.5s, PILOT: 5s) via LocationRequest
- Wake locks and WiFi locks for persistent tracking
- Battery optimization request (REQUEST_IGNORE_BATTERY_OPTIMIZATIONS permission)
- BootCompleteReceiver for auto-start service on device boot
- FusedLocationProviderClient with HIGH_ACCURACY priority
- Firebase Realtime Database for trip and location synchronization
- Used in: Areo (production real-time tracking system with persistent background service)

**17. Android Sensor Integration Pattern**
- Custom sensor managers (CompassManager) with SensorEventListener
- Accelerometer and magnetometer sensor fusion
- Rotation matrix calculations for orientation (SensorManager.getRotationMatrix)
- Kotlin Flow (callbackFlow) for reactive sensor updates
- Proper sensor registration and unregistration lifecycle management

**18. Clean Architecture Pattern (Multi-Module)**
- Domain layer (pure Kotlin, no Android dependencies) with models, repository interfaces, and use cases
- Data layer (Android-specific) with repository implementations, API services, and data sources
- Presentation layer (Compose UI) with ViewModels and screens
- Dependency rule: Domain ← Data ← Presentation
- Multi-module structure (core:domain, core:data, client, driver, design_system)
- Use Case pattern for business logic orchestration
- Repository pattern for data abstraction

**19. Service Lifecycle Management Pattern**
- ServiceInitializer as lifecycle-aware coordinator (ProcessLifecycleOwner integration)
- LocationServiceManager as single source of truth for service state
- StateFlow-based state management for service status
- Health checks with automatic recovery mechanisms
- Boot receiver integration for service recovery
- App foreground/background handling
- Login/logout service coordination

**20. Foreground Service Pattern (Advanced)**
- LocationForegroundService with adaptive intervals (foreground/background modes)
- WebSocketForegroundService for persistent connections
- RideTrackingService for trip-specific tracking
- Unified notification management
- Battery optimization handling across Android versions
- Service health monitoring
- Wake lock management
- Network state awareness

**21. Sequential Permission Queue Pattern**
- Single-queue handler for permission requests
- One permission at a time with user-friendly explanations
- Android 13+ compliance (POST_NOTIFICATIONS, media permissions)
- Background location permission handling (Android 10+)
- Settings redirection for denied permissions
- Permission state persistence

**22. Real-Time Communication Pattern (Pusher/WebSocket)**
- Pusher Java Client integration for WebSocket communication
- Presence channels for real-time location updates
- Private channels for ride events
- Connection state management with automatic reconnection
- Exponential backoff for reconnection attempts
- Event-driven architecture for ride state management
- Authentication provider implementation

**18. Dual-App Architecture Pattern (Driver + User Apps)**
- Separate applications for different user roles (driver-facing vs user-facing)
- Shared backend API with role-based endpoints
- Independent deployment cycles and version management
- Different UI/UX tailored to each user type
- Shared business logic patterns across apps
- Consistent authentication and data models
- Used in: Dinamo (Go_Driver + Go_User - production dual-app ride-sharing platform)

**19. Product Flavor Pattern (Multi-Brand, Multi-Environment)**
- Product flavors for brand differentiation (e.g., go/wasalni brands)
- Environment dimensions (dev/prod) separate from brand dimensions
- Different package names per brand (com.starbugs.go_driver vs com.starbugs.wasalni_driver)
- Different base URLs per brand/environment combination
- Brand-specific configurations (Google API keys, app settings, feature flags)
- Build variant generation (brand × environment × buildType)
- Shared codebase with flavor-specific resources and configurations
- Used in: Dinamo (4 build variants per app: goDev/goProd/wasalniDev/wasalniProd)

**20. Foreground Location Service Pattern (Production Location Tracking)**
- Foreground service with persistent notification for continuous location tracking
- LocationRequest configuration (5-second interval, 3-second fastest interval, 10m smallest displacement, HIGH_ACCURACY priority)
- FusedLocationProviderClient with LocationCallback for location updates
- Background location permission handling with graceful degradation
- Foreground service location permission check (Android 14+ FOREGROUND_SERVICE_LOCATION)
- Battery optimization exemption requests (REQUEST_IGNORE_BATTERY_OPTIMIZATIONS)
- Location persistence (SharedPreferences) for state recovery and cross-service access
- Broadcast updates to activities/fragments for UI synchronization (LocalBroadcastManager)
- Service lifecycle management (START_REDELIVER_INTENT for automatic restart, proper cleanup)
- Binder pattern for activity-service communication (LocalBinder)
- Kotlin Coroutines for async operations (location broadcasting)
- Notification channel management (Android O+)
- Arabic notification content for localization
- Integration with other services (TripFetchWorker reads saved location)
- Used in: Dinamo (LocationTrackingService - production location tracking with 5-second updates, 10m displacement, location persistence, and broadcast system)

**21. Background Trip Fetching Pattern (WorkManager + Foreground Service)**
- Two-layer architecture: Foreground service (TripFetchService) + WorkManager worker (TripFetchWorker)
- Foreground service for trip availability checking and worker triggering
- WorkManager CoroutineWorker for background execution with retry logic
- 30-second polling interval for trip fetching via Handler
- Driver status checking (SharedPreferences flags) to control service execution
- Conditional service lifecycle (stop when driver inactive)
- Foreground notification for service visibility
- Location-based trip fetching (integration with LocationTrackingService)
- Ignored orders management with timestamp tracking (30-second cooldown)
- FIFO order processing (first trip in array gets priority)
- Wake lock and WiFi lock management for reliable execution (10-minute timeout)
- Trip eligibility checking (budget settings, notification preferences)
- Used in: Dinamo (TripFetchService + TripFetchWorker - reliable background trip fetching with location integration)

**22. Custom Geolink API Integration Pattern (Production Custom API)**
- Custom geolocation API service integration in production apps
- Service class (GeolinkApiService) with dynamic API key retrieval from backend
- Retrofit interface (GeolinkService) for API endpoints (Text Search, Directions, Geocoding, Reverse Geocoding)
- Dynamic API key management (backend endpoint: /api/Driver/geo_link) with fallback defaults
- Kotlin Flow support for reactive programming (reverseGeocode, direction methods)
- Callback-based methods for synchronous operations (geocode, textSearch)
- Caching strategies for API responses (route cache, place name cache in ViewModel)
- Error handling with graceful fallback to default API keys
- Integration with existing Google Maps SDK usage (complementary, not replacement)
- Package-level organization (wasalni_rider package for brand-specific integration)
- Cost-effective alternative to Google Places API for Egyptian market
- Used in: Dinamo (GeolinkApiService in wasalni_rider package - production alternative to Google Places API with dynamic key management)
- Used in: Areo (custom compass with magnetic field sensors)

**18. Dynamic Schema Management Pattern**
- Runtime column/field configuration without database migrations
- Column type management (text, number, phone, email, url, date, checkbox, select)
- Column reordering and deletion with data migration
- Schema stored in JSON/database alongside data
- Type-aware input rendering based on schema definition
- Excel export adapts to dynamic schema
- Used in: Hvar-Traders (dynamic trader columns)

**19. JSON File-Based Persistence Pattern**
- REST API with file system as database (fs.writeFileSync, fs.readFileSync)
- Real-time synchronization (direct file writes on every change)
- No database overhead for simple use cases
- JSON schema validation and structure maintenance
- Migration utilities for schema updates
- Used in: Hvar-Traders (traders.json with dynamic columns structure)

**20. Hierarchical Location Navigation Pattern**
- Tree structure navigation (Parent → Child locations)
- Expandable/collapsible location lists
- Badge indicators for item counts
- Location-based data filtering
- Breadcrumb-style selection tracking
- Used in: Hvar-Traders (Governorates → Cities navigation)

**21. Static Site Product Catalog Pattern**
- Frontend-only architecture (React + Vite, no backend)
- Static JSON data files (public/data/) for products, categories, reviews
- SEO-first design (meta tags, Open Graph, structured data JSON-LD)
- Advanced client-side filtering (category, price, search with diacritics-insensitive Arabic matching)
- Blogger review aggregation (embedded media with graceful fallbacks)
- Quick view modals for product details without page navigation
- Performance optimization (lazy loading, code splitting, Core Web Vitals targets)
- GitHub Pages deployment (static hosting)
- Used in: Hvar-Catalog (product catalog with marketing focus)

**22. WCAG 3 AAA Accessibility Pattern**
- WCAG 3 Level AAA compliance (WCAG 2.2 AA as baseline)
- Keyboard navigation (all interactive elements accessible, logical tab order)
- Focus management (visible focus indicators, not obscured by sticky elements)
- Screen reader support (proper ARIA labels, semantic HTML, landmarks)
- High contrast mode support
- Reduced motion preferences (respect prefers-reduced-motion)
- Target size compliance (≥ 24×24 CSS px for interactive elements)
- RTL-aware accessibility (Arabic text handling, direction-aware focus)
- Used in: Hvar-Catalog (complete AAA implementation)

**23. Marketing-First SEO Pattern**
- Comprehensive meta tags (title, description, keywords, Open Graph, Twitter Cards)
- Structured data (JSON-LD for brands, products, organizations)
- Semantic HTML (proper heading hierarchy, landmarks, article/section)
- Arabic-first SEO (lang="ar", dir="rtl", Arabic content optimization)
- Performance as SEO factor (Core Web Vitals optimization, lazy loading)
- Social media optimization (Open Graph images, Twitter Cards)
- Used in: Hvar-Catalog (marketing site with SEO focus)

---

**Complete patterns in `07-Insights/` directory** 💡✨

