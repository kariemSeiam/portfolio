# 🛠️ Tech Stack Context - Complete Expertise

> **All Technologies - Quick Reference for AI**

## 🎯 Technology Expertise Levels

### **⭐⭐⭐⭐⭐ Expert Level**

**Kotlin:**
- 20+ Android apps
- Modern patterns (Coroutines, Material 3)
- Production apps
- Complete mastery

**Python Flask:**
- Production systems (Hvar-Hub - Flask 3.0.0, GeoLink - Flask 3.0.3)
- Blueprint architecture (5-9 API modules per project)
  - GeoLink: 8 blueprints (api_bp, api_v2_bp, auth_bp, user_bp, payment_bp, admin_bp, backup_bp, debug_bp)
  - Hvar-Hub: 5 API modules (customer_api, service_api, hub_api, stock_api, bosta_api)
- RESTful APIs (GeoLink - 8 stars, 5M+ req/month, Hvar-Hub)
- Service layer pattern (business logic separation)
- WSGI deployment (Gunicorn, Waitress, LiteSpeed/CyberPanel)
- Transaction management with context managers (`execute_in_transaction` with retry logic)
- Production deployment experience (multiple platforms)
- Multi-layer caching strategies (LRU caches, thread-local storage)
- Background async processing (queue-based workers)

**Geolocation Services:**
- 10+ projects
- Public API success
- Google Maps integration
- Platform expertise

**Arabic/RTL:**
- Complete implementation
- Production systems
- Unique specialization
- MENA market expertise

### **⭐⭐⭐⭐ Advanced Level**

**React:**
- Production frontends (React 18.3.1 in Hvar-Hub, Hvar-Catalog, GeoLink)
- Functional components with hooks
- Component-based architecture
- Custom hooks (useTickets, useScanHub, useRTL, useProducts, useAuth, useUserManagement, usePayments)
- React Router 7.1.3 for navigation with lazy loading
- Context API patterns (AuthProvider, UserContext, PaymentsContext, NotificationsContext)
- Request deduplication (stale-while-revalidate pattern)
- Intelligent caching with TTL (GeoLink: profile 2min, API keys 1min, usage stats 3min)
- Unified dashboard endpoints (GeoLink: single request for profile + API keys + usage + balance)
- Optimistic UI updates
- Full-stack integration with Flask
- Static site generation (Vite + React for marketing sites)

**JavaScript:**
- 25+ projects
- ES6+ modern JS
- React integration
- Frontend expertise

**Database Systems:**
- **MySQL 8.0+** - Production databases (Hvar-Hub)
- **SQLAlchemy 2.0.44+** - ORM expertise (GeoLink, production systems)
- **SQLite** - Development databases with WAL mode and pragma optimizations
- **PostgreSQL/MySQL** - Production-ready with connection pooling (pool_size=20, max_overflow=30)
- Complex schema design (8-9 core tables, relationships)
  - GeoLink: 8 core models (User, APIKey, UsageLog, Payment, SystemSettings, EndpointPricing, Notification, PasswordReset)
  - Hvar-Hub: 9 core tables (customers, service_tickets, stock_items, etc.)
- Migration systems (manual migrations, Alembic support)
- Transaction management and ACID compliance (`execute_in_transaction` with retry logic, exponential backoff)
- Index optimization and query performance (composite indexes, lazy loading, joinedload for N+1 prevention)
- Foreign key constraints and cascade rules
- JSON columns for flexible data storage
- Business systems with audit trails
- Caching strategies (LRU caches, thread-local storage, TTL-based invalidation)

**Android Development:**
- Material Design 1.12.0 (Areo - complete implementation with custom map styles)
- Modern architecture (MVVM pattern with SharedViewModel, Kotlin Coroutines 1.7.3, LiveData 2.8.2)
- Navigation Component 2.7.7 (Fragment-based navigation with bottom navigation)
- Real-time features (Firebase Realtime Database 21.0.0, Geofire 3.2.0 for location queries)
- Background services (Foreground LocationService, wake locks, battery optimization)
  - LocationTrackingService (Dinamo): Foreground service with 5-second interval, 10m displacement, location persistence, broadcast system
  - TripFetchService (Dinamo): Foreground service for trip fetching coordination
  - Service lifecycle management (START_REDELIVER_INTENT, START_STICKY)
  - Permission handling (FOREGROUND_SERVICE_LOCATION for Android 14+)
- DataStore Preferences 1.1.1 (Modern key-value storage)
- Sensor integration (CompassManager with accelerometer and magnetometer)
- **Dual-app systems (Dinamo - Go_Driver + Go_User):** Complete dual-application architecture with shared backend API, product flavors for multi-brand support (go/wasalni brands, dev/prod environments)
- **WorkManager 2.7.1 (Driver) / 2.7.0 (User) - Dinamo:**
  - CoroutineWorker implementation for async background tasks
  - Periodic background work requests with 30-second polling
  - Two-layer architecture: Foreground Service (TripFetchService) + WorkManager Worker (TripFetchWorker)
  - Location-based trip fetching with saved location integration
  - Ignored orders management with timestamp tracking
  - Wake lock and WiFi lock management for reliable execution
  - Driver status checking for conditional execution
  - Retry logic for transient failures
- **Realm Database 10.15.1 (Dinamo - Both Apps):**
  - Local data persistence for user sessions
  - Transaction data caching
  - Schema versioning in production
  - User session management across app restarts
  - Production-ready local storage solution
- **ObjectBox 3.1.2 (Dinamo Driver App Only):**
  - Additional local storage for driver-specific data
  - Object model management
  - Performance optimization for driver data
  - Complements Realm for specialized driver data storage
- **RxJava 3.1.3 + RxAndroid 3.0.0 (Dinamo User App Only):**
  - Reactive programming for API calls
  - Retrofit RxJava3 adapter integration
  - Reactive data streams for location and trip updates
  - Used in CarViewModel and service classes
- Production apps with enterprise-ready architecture, foreground services, and background processing

**Google Maps API:**
- Deep integration (Google Maps SDK 18.2.0 in Areo, 17.0.0 in Dinamo, Maps Compose 4.3.0 in Taxiarab_ANDROID)
- Multiple projects (GeoLink backend, Areo frontend, Dinamo dual-app system, Taxiarab_ANDROID)
- Location services (high-accuracy tracking, geofencing, foreground location services)
- Maps expertise (real-time visualization, custom styling, route visualization)
- Custom compass integration with magnetic field sensors
- **Custom Geolink API Integration:**
  - Dinamo wasalni_rider package: Production use of custom geolocation API (Text Search, Directions, Geocoding, Reverse Geocoding) as alternative to Google Places API
    - GeolinkApiService class with dynamic API key retrieval from backend
    - Retrofit interface (GeolinkService) with 4 endpoints
    - Kotlin Flow support for reactive methods (reverseGeocode, direction)
    - Callback-based methods for synchronous operations (geocode, textSearch)
    - Fallback to default API keys on backend retrieval failure
    - Cost-effective solution optimized for Egyptian market
    - Integration in CarViewModel, ProgressActivity, DetailsHistoryActivity
  - Taxiarab_ANDROID: GeoLink API integration for places search, geocoding, reverse geocoding, and directions

**WSGI Deployment:**
- Production deployment
- Server configuration
- Real-world usage

**Node.js/Express:**
- Express.js 4.18.2 (Hvar-Traders - REST API with JSON file persistence)
- Simple server architecture (file-based data storage)
- Real-time JSON synchronization (direct file writes on every change)
- CORS-enabled APIs
- Lightweight tool development (rapid prototyping patterns)
- No database overhead for simple use cases

### **⭐⭐⭐ Intermediate/Growing**

**TypeScript:**
- Recent adoption
- Growing projects (masar, portfolio, docs)
- Modern frontend
- Learning phase

**Flutter:**
- Exploration phase
- Learning projects
- Cross-platform interest
- Future potential

---

## 📊 Technology Evolution

**2019-2021:** Java → Android basics  
**2021-2023:** Kotlin adoption → Modern Android  
**2023-2024:** Python Flask → Full-stack  
**2024-2025:** TypeScript → Modern frontend

---

## 🔗 Technology Relationships

**Backend Stack:**
- Python Flask 3.0.0+ (Flask 3.0.3 in GeoLink) + PyMySQL 1.1.0 + MySQL 8.0+ + WSGI
- SQLAlchemy 2.0.44+ (GeoLink) for ORM and advanced database operations
- Blueprint architecture + Service layer + Model layer + Utils
- python-dotenv for configuration
- flask-cors for API access
- Production servers: Gunicorn (Linux), Waitress (Windows), LiteSpeed/CyberPanel

**Frontend Stack:**
- React 18.3.1 + Vite 6.0.3 + JavaScript/TypeScript + Tailwind CSS 3.4.17
- Axios for API communication
- React Router 7.1.3 for navigation
- react-hot-toast for notifications
- html5-qrcode + qr-scanner for QR scanning
- Custom hooks pattern

**Mobile Stack:**
- Kotlin + Material 3 + Google Maps + Coroutines
- Modern Android architecture

**Full-Stack (Hvar-Hub):**
- Flask 3.0.0 + React 18.3.1 + MySQL 8.0+ + Vite 6.0.3 (Complete production system)
- Arabic/RTL support with Cairo/Tajawal fonts
- PWA with service worker
- Production deployment on LiteSpeed/CyberPanel

**Full-Stack E-Commerce (Shozati/Trendy Corner):**
- Flask + Flask-SQLAlchemy 3.0.0 + SQLAlchemy 2.0.0 + React 18.3.1 + Vite 6.1.1
- Blueprint architecture (6 API modules: auth, products, orders, users, admin, public)
- Bilingual Arabic/English with RTL (Noto Kufi Arabic font)
- Production deployment: Frontend (GitHub Pages) + Backend (PythonAnywhere)
- Advanced build optimization (code splitting, terser minification with 3-pass compression)
- Comprehensive testing (27 API tests, 100% pass rate)

**Static Site / Marketing Sites (Hvar-Catalog):**
- React 18.3.1 + Vite 6.0.3 + Tailwind CSS 3.4.17 (Frontend-only, static hosting)
- Static JSON data architecture (no backend)
- SEO optimization (meta tags, structured data, Open Graph)
- GitHub Pages deployment
- WCAG 3 AAA accessibility compliance

---

**Node.js/Express:**
- Express.js 4.18.2 (Hvar-Traders - REST API with JSON file persistence)
- Simple server architecture (file-based data storage)
- Real-time JSON synchronization (direct file writes)
- CORS-enabled APIs
- Lightweight tool development (rapid prototyping patterns)

**Tailwind CSS:**
- Advanced (Utility-first, responsive, Tailwind CSS 3.4.17)
- Production usage (Hvar-Hub, Hvar-Catalog)
- Custom configurations (extended themes, Arabic typography scales, RTL plugins)
- Complete RTL support (right-to-left layout, mirrored components)
- Design system integration (custom color palettes, typography scales, spacing systems, gradient utilities)
- Premium Arabic fonts (Almarai, Tajawal, Cairo) with optimized line heights and weights

**SEO & Marketing Websites:**
- SEO optimization (meta tags, Open Graph, Twitter Cards, structured data JSON-LD)
- Static site architecture (Vite + React for marketing sites, GitHub Pages deployment)
- Performance as SEO factor (Core Web Vitals optimization, LCP < 2.5s targets)
- Arabic-first SEO (lang="ar", dir="rtl" optimization, diacritics-insensitive search)
- Used in: Hvar-Catalog (complete SEO implementation with structured data)

---

**Complete tech details in `04-Tech-Stack/` directory** 🛠️✨

