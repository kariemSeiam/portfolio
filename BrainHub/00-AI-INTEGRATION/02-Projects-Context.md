# 📦 Projects Context - Complete Portfolio

> **All 75+ Projects - Quick Reference for AI**

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║         📦 PROJECTS CONTEXT                                   ║
║                                                              ║
║     Complete Project Portfolio - Quick Reference              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## 🌟 Flagship Projects

### **1. Hvar-Hub (HUB-MCRM)** (Private - Flagship)
**Created:** August 2025 (Pre-MCRM: July 29 - August 15, 2025) | **Updated:** January 2025  
**Type:** Complete Service Management & Inventory System  
**Tech Stack:** Flask 3.0.0 + React 18.3.1 + MySQL 8.0+ + Vite 6.0.3  
**Status:** Production System (Deployed on LiteSpeed/CyberPanel)  
**Repository Location:** `f:/Developer/Web/Hvar/Hvar-2025/HUB-MCRM`

**Version History:**
- **Pre-MCRM (July 29 - August 15, 2025):** Initial Order Management System with single API module (`/api/orders`), order scanning, Bosta integration, QR scanning, maintenance tracking. Foundation for MCRM expansion.
- **MCRM (August 15, 2025 - Present):** Complete expansion to multi-module system with service tickets, stock management, customer management, BOM tracking.

**Architecture:**
- **Backend:** Flask Blueprint architecture with 5 API modules
  - `customer_api.py` - Customer CRUD and Bosta sync (`/api/customers`)
  - `service_api.py` - Ticket workflows (`/api/tickets`)
  - `hub_api.py` - QR scanning and hub operations (`/api/hub`)
  - `stock_api.py` - Inventory management (`/api/stock`)
  - `bosta_api.py` - Shipping integration (`/api/bosta`)
- **Service Layer:** Business logic separated (service_manager, stock_manager, tracking_manager, bosta_service)
- **Model Layer:** Repository pattern for database queries
- **Frontend:** React with functional components, 3 main pages (HubPage, ServiceActionsPage, StockManagementPage)
- **Database:** MySQL with 9 core tables (customers, service_tickets, stock_items, stock_movements, etc.)

**Core Features:**
- **Service Ticket Management:** Replacement, maintenance, and return workflows with state machines
- **Stock Management:** Three-tier tracking (on-hand, reserved, damaged) with BOM (Bill of Materials)
- **QR Scanning:** Camera-based scanning with html5-qrcode and qr-scanner libraries
- **Bosta Integration:** Shipping API integration for order tracking and customer sync
- **Arabic/RTL:** Native RTL support with Cairo and Tajawal fonts, all UI in Arabic
- **PWA:** Service worker, offline support, installable app
- **Real-time Operations:** Hub scanning, receive/dispatch workflows, workshop queue

**Key Workflows:**
- **Replacement:** PENDING → CONFIRMED → IN_PROCESS → READY_FOR_DISPATCH → SENT → RETURNED → COMPLETED
- **Maintenance:** PENDING → CONFIRMED → IN_PROCESS (workshop) → READY_FOR_DISPATCH → SENT → COMPLETED
- **Return:** PENDING → CONFIRMED → IN_PROCESS → COMPLETED

**Documentation:**
- Comprehensive API docs (CLAUDE.md, README.md, service_tickets.md, stock.md)
- Database schema with migrations system
- Production deployment guide (RUN_WSGI.md)
- Complete workflow documentation

**Performance Optimizations:**
- Optimized count endpoints (200x faster, SQL GROUP BY)
- Optimistic UI updates with delayed refresh
- Request deduplication and caching
- Transaction management for atomic operations

**Why Flagship:** Most complex, most complete, production-ready business system with real-world deployment

### **1.5. Hvar Core System (hvar-v1)** (Private - Foundational)
**Created:** Active Development | **Updated:** Ongoing  
**Type:** Core/Foundational System + Comprehensive Customer Management Platform  
**Tech Stack:** React 18.3.1 + Vite 6.0.3 + Tailwind CSS 3.4.17 (Frontend), Flask 2.3.3 + SQLite (Backend - Hvar-Bosta-v2)  
**Status:** Active Development (Core Foundation)  
**Repository Location:** `d:/Projects/Hvar/hvar-v1`

**Architecture:**
- **Frontend:** React with 15+ feature pages, modular component system, Context API for state management
- **Backend:** Flask Blueprint architecture with 7+ route modules (customers, products, maintenance, customer_service, unified_service, orders, unified_orders)
- **Database:** SQLite with comprehensive production schema (1600+ lines), extensible design
- **Structure:** Modular, expandable architecture designed for future system additions

**Core Features:**
- **Customer Management:** Comprehensive customer profiles, segmentation, AI-powered insights, analytics
- **Orders Management:** Order tracking, analytics, business category classification, financial tracking, timeline visualization
- **Hub Scanning:** QR scanning, hub queue management, inspection forms, hub operations workflow
- **Stock Management:** Product catalog, stock levels, movements tracking, low stock alerts, stock analytics
- **Service Actions:** Service action management, workflows, tracking
- **Customer Service:** Service tickets, follow-ups, request management, analytics
- **Call Center:** Call center operations and tracking
- **Analytics:** Comprehensive analytics dashboard, business intelligence, performance metrics
- **Products:** Product management and catalog
- **Maintenance:** Maintenance cycles, SLA monitoring, stock integration, technician management

**Key Implementations:**
- Comprehensive API service layer (800+ lines, organized by modules)
- Background order sync with Bosta API integration
- Unified order processing system
- Production-ready database schema with geographic hierarchy
- RTL/Arabic support with Cairo font
- Virtual scrolling for performance (react-window, @tanstack/react-virtual)
- Lazy loading for all pages (code splitting)
- Theme system (light/dark mode)

**Design Philosophy:**
- Built anticipating owner's changing requirements
- Flexible foundation designed to accommodate all future Hvar systems
- Modular architecture for easy expansion
- Component-based design for reusability
- Service-oriented backend for scalability

**Why Notable:** Core/foundational system demonstrating architectural thinking for long-term flexibility, comprehensive business system capabilities, production-ready implementation, foundation for Hvar ecosystem

### **2. GeoLink V1** (Public - 8 stars)
**Created:** February 2024 | **Updated:** November 2025  
**Type:** Production Geolocation API Platform (Full-Stack)  
**Tech Stack:** Flask 3.0.3 + SQLAlchemy 2.0.44+ + React 18.3.1 + Vite 6.0.3  
**Status:** Production System (Live at www.geolink-eg.com)  
**Production Metrics:** ~5 million requests/month, serving 50+ clients (startups, real projects, developers)  
**Repository Location:** `e:/BackUp/geo/geolink` (Backup location)

**Architecture:**
- **Backend:** Flask Blueprint architecture with 8 API modules
  - `api_bp` - Geolocation APIs v1 (`/api/v1`) - Text search, directions, geocoding, reverse geocoding
  - `api_v2_bp` - Optimized Geolocation APIs v2 (`/api/v2`)
  - `auth_bp` - Authentication endpoints (`/auth`) - Registration, login, password reset with OTP
  - `user_bp` - User management (`/user`) - Profile, API keys, usage stats, unified dashboard
  - `payment_bp` - Payment processing (`/payment`) - Payment methods, history, account balance
  - `admin_bp` - Admin dashboard (`/admin`) - User management, payments, system settings, stats
  - `backup_bp` - Backup operations (DEBUG only)
  - `debug_bp` - Debug endpoints (DEBUG only)
- **Database:** SQLAlchemy ORM with SQLite (dev) / PostgreSQL-ready (prod)
  - 8 core models: User, APIKey, UsageLog, Payment, SystemSettings, EndpointPricing, Notification, PasswordReset
  - Connection pooling (20 persistent + 30 overflow)
  - Multi-layer caching (API keys: 10K cache, endpoint pricing: 1K cache, system settings: thread-local)
- **Frontend:** React 18.3.1 with Context API (AuthProvider, UserContext, PaymentsContext, NotificationsContext)
  - Lazy loading for all pages (code splitting)
  - Request deduplication (stale-while-revalidate pattern)
  - Intelligent caching with TTL (profile: 2min, API keys: 1min, usage stats: 3min)
  - Unified dashboard endpoint (10x faster - single request)
- **Production:** Gunicorn (Linux) / Waitress (Windows) + Docker support
  - Auto-calculated workers based on CPU/memory
  - Health check endpoints
  - Log rotation (10MB files, 10 backups, auto-delete after 24h)

**Core Features:**
- **Geolocation APIs:** Text search, directions, geocoding, reverse geocoding, distance matrix
- **Billing System:** Credit-based with free monthly quotas (default: 3,000 requests), account balance management, credit limit system (-500 EGP default)
- **Billing Flow:** Free credits → Account balance → Credit limit → Rejection
- **API Key Management:** Multiple keys per user, UUID format, rate limiting (daily limits), usage tracking, key regeneration/deactivation
- **Payment Processing:** Vodafone Cash, Instapay, Bank Transfer with admin approval workflow
- **Admin Dashboard:** User management, system settings configuration, payment processing, system-wide statistics
- **User Management:** Registration (freelancer/company), session-based authentication, profile management, in-app notifications
- **Security:** PBKDF2-SHA256 password hashing (50K iterations), session-based + API key auth, admin protection, security headers

**Performance Optimizations:**
- Multi-layer caching (API keys, endpoint pricing, system settings, user stats)
- Background async processing (queue-based usage logging)
- Connection pooling with retry logic
- Request deduplication on frontend
- Code splitting and lazy loading
- Unified dashboard endpoint (reduces 4 requests to 1)

**Documentation:**
- Comprehensive AI assistant guide (CLAUDE.md - 2237 lines)
- Design system documentation (DESIGN.md - 1166 lines, GEOLINK_DESIGN_SYSTEM.md - 1188 lines)
- Complete API documentation (README.md - 1527 lines)
- Deployment guides (DEPLOYMENT.md, QUICK_START.md)

**Production Deployment:**
- Live at www.geolink-eg.com
- Docker containerization support
- Environment-based configuration
- Health check endpoints (`/health`)
- Performance monitoring and metrics tracking
- Handles 5M+ requests/month for 50+ clients

**Why Notable:** Production API platform (5M+ req/month), public API success (8 stars), complete billing system, comprehensive architecture, serves 50+ real clients (startups, production projects, developers)

### **3. Areo** (Public - 2 stars)
**Created:** June 2024 | **Updated:** Ongoing  
**Type:** Professional Pilot & Driver Trip Management Android App  
**Package:** `com.pigo.areo`  
**Tech Stack:** Kotlin 1.9.0 + Material Design 1.12.0 + Firebase Realtime Database 21.0.0 + Google Maps SDK 18.2.0  
**Status:** Public Android App (Production)  
**Repository:** GitHub (Public, 2 stars)  
**Android SDK:** compileSdk 34, targetSdk 34, minSdk 24

**Architecture:**
- **MVVM Pattern** - SharedViewModel with LiveData and Data Binding (enabled in build.gradle)
- **Kotlin Coroutines 1.7.3** - Asynchronous programming with Coroutines Play Services
- **Firebase Realtime Database 21.0.0** - Real-time data synchronization for trips and locations
- **SharedViewModel** - Central state management across fragments (CreateTrip, CurrentTrip, TripHistory)
- **Navigation Component 2.7.7** - Fragment-based navigation with bottom navigation
- **Service Layer** - Background LocationService with foreground notification (separate process)
- **Repository Pattern** - GeolinkRepository for API abstraction

**Core Features:**
- **Dual-Role System** - PILOT and DRIVER roles with role-specific location update intervals (DRIVER: 1.5s, PILOT: 5s)
- **Real-Time Location Tracking** - Geofire 3.2.0 for real-time location queries and Firebase synchronization
- **Custom Compass** - CompassManager using accelerometer and magnetometer sensors with rotation matrix calculations
- **Background Processing** - Foreground LocationService with wake locks, WiFi locks, and battery optimization request
- **Trip Management** - Trip model with coordinates, speeds, start/end times, arrival flags
- **Custom Geolink Integration** - Text search, directions, reverse geocoding via Retrofit 2.9.0
- **Dynamic UI/UX** - Material Design with custom map styles (dark/light themes)
- **Auto-Start Service** - BootCompleteReceiver to restart location service on device boot

**Technical Implementation:**
- **Google Maps SDK 18.2.0** - Interactive mapping with custom map styles (MapStyleOptions)
- **Geofire 3.2.0** - Real-time location queries with GeoQuery and GeoQueryEventListener
- **DataStore Preferences 1.1.1** - Modern key-value storage for user preferences and roles
- **Retrofit 2.9.0 + OkHttp 4.9.3** - Geolink API integration with logging interceptor
- **SDP/SSP Android 1.1.0** - Scalable size units for responsive layouts
- **Lifecycle Components 2.8.2** - ViewModel and LiveData for lifecycle-aware components
- **Location Services 21.3.0** - FusedLocationProviderClient with LocationRequest (HIGH_ACCURACY priority)
- **Separate Process** - LocationService runs in `:locationServiceProcess` for isolation

**Data Models:**
- **Trip** - tripId, startTime, endTime, coordinates (List<CustomLatLng>), speeds (List<Float>), arrival flags
- **CustomLatLng** - Custom latitude/longitude wrapper with conversion utilities
- **DirectionResponse, TextSearchResponse, ReverseGeocodeResponse** - Geolink API models

**Permissions & Services:**
- ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION, ACCESS_BACKGROUND_LOCATION
- FOREGROUND_SERVICE, FOREGROUND_SERVICE_LOCATION
- WAKE_LOCK, REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
- ACCESS_WIFI_STATE, CHANGE_WIFI_STATE

**Why Notable:** Production Android app with real-time tracking, enterprise-ready MVVM architecture, custom Geolink API integration, sensor-based compass navigation, persistent background service with battery optimization

### **4. snapupdate** (Public)
**Created:** August 2025  
**Type:** Android Update Framework  
**Tech:** Kotlin (Client) + Flask (Backend)  
**Status:** Public Framework  
**Features:**
- Version management
- APK distribution
- Auto-installation
- Material 3 design
- Client-server architecture

---

## 🗺️ Geolocation Ecosystem (10+ Projects)

**Public:**
- **Geolink V1** (8 stars) - Production full-stack geolocation API platform
  - Flask 3.0.3 + SQLAlchemy 2.0.44+ + React 18.3.1
  - Credit-based billing, API key management, admin dashboard
  - Production deployed on dev.geolink-eg.com, geolink-eg.com
  - Comprehensive documentation (2237+ lines)
- GeoEgy (1 star, 2 forks) - Dashboard

**Private:**
- Geolink-v1, Geolink-v2 (earlier versions)
- Geolink-BackEnd, Geolink-Flask (backend variants)
- geolink-front, geolink-eg (frontend/country-specific)
- GeoEgy-BackEnd, GeoEgy-Orders-Backend

**Mobile:**
- Areo - Trip tracking with maps

**Pattern:** Complete ecosystem - Production API platform + Dashboard + Backend variants + Mobile

---

## 🏢 Business Systems (5+ Projects)

**Flagship:**
- Hvar-Hub - Complete service management

**Hvar Ecosystem - Marketing & Tools:**
- **Hvar-Catalog** (Private) - Product Catalog & Brand Marketing Site
  - **Created:** 2025 | **Type:** Static Product Catalog / Marketing Landing Page
  - **Tech Stack:** React 18.3.1 + Vite 6.0.3 + Tailwind CSS 3.4.17 (Frontend-only, static site)
  - **Architecture:** Single-page application, static JSON data (public/data/), GitHub Pages deployment
  - **Frontend Libraries:** 
    - Framer Motion 11.0.8 (animations), Recharts 2.15.0 (charts), Leaflet + react-leaflet (maps)
    - React Router 7.1.3, React Hot Toast 2.5.1, Heroicons + Lucide React (icons)
    - Date-fns 4.1.0, Axios 1.7.9
  - **Core Features:**
    - Product catalog (~20 SKUs) with categories (choppers, blenders, irons, stand mixers, ovens, grinders, vacuums, air fryers)
    - Advanced product filtering (category, price range, search with Arabic diacritics-insensitive matching)
    - Blogger reviews aggregation (YouTube/Instagram embeds with graceful fallbacks)
    - Support & Maintenance hub (warranty info, service process, contact options)
    - Quick view modal with product details and CTAs
    - SEO optimization (meta tags, Open Graph, Twitter Cards, structured data JSON-LD)
    - Promo banners (dismissible, time-limited promotions)
    - Contact integration (phone, email, WhatsApp direct links)
  - **UI/UX:**
    - Complete RTL/Arabic interface (Almarai headings, Tajawal body, Cairo fallback)
    - WCAG 3 AAA compliance (keyboard navigation, screen readers, high contrast, reduced motion)
    - Dark mode support (automatic theme detection)
    - Responsive design (mobile-first, Core Web Vitals optimized)
    - Premium design system (red theme gradients, custom typography scale, 4px grid system)
    - Performance optimized (lazy loading, code splitting, image optimization, LCP < 2.5s target)
  - **Component Architecture:**
    - ProductCard (memoized, lazy loading, accessible), ProductGrid (advanced filtering/sorting)
    - ProductShowcase (integrated grid + modal), QuickViewModal (comprehensive product details)
    - DesignSystemProvider (theme context), custom hooks (useProducts with normalization)
    - Component documentation (docs/product-components.md)
  - **Why Notable:** Demonstrates expertise in marketing websites, SEO optimization, static site architecture, comprehensive accessibility (WCAG 3 AAA), and premium Arabic/RTL design systems. Shows ability to build polished, conversion-focused brand sites with modern React patterns.

- **Hvar-Traders** (Private) - Governorates and Cities Trader Management System
  - **Created:** 2025 | **Type:** Standalone Trader Management Tool
  - **Tech Stack:** Node.js + Express 4.18.2 + Vanilla JavaScript + JSON file storage
  - **Architecture:** Simple REST API (GET/POST /api/traders) with JSON file persistence
  - **Frontend:** Pure JavaScript (1715 lines), CSS (2086 lines), HTML
  - **Core Features:**
    - Real-time JSON synchronization (direct API sync, no localStorage)
    - Dynamic column schema management (add/edit/delete/reorder columns)
    - Hierarchical location navigation (Governorates → Cities tree structure)
    - Inline row editing with type-aware inputs (text, number, phone, email, url, date, checkbox, select)
    - Excel/CSV export with UTF-8 BOM for proper Arabic encoding
    - Search and filtering by governorate/city
    - Column type management with options (text, number, phone, email, url, date, checkbox, select with custom options)
    - City-based trader organization
  - **UI/UX:**
    - Complete RTL/Arabic interface with Cairo font
    - Responsive design (mobile-friendly)
    - Accessibility features (ARIA labels, screen reader support)
    - Material Design inspired styling
    - Professional table layout with location columns
    - Modal-based confirmations and column editing
  - **Why Notable:** Demonstrates ability to build complete, production-ready tools quickly (lightweight alternative to full systems), showcases dynamic schema management, real-time file-based persistence, and comprehensive Arabic/RTL support

**Related:**
- Pigo-Hub - Business hub platform
- hvar-traders-management - Trader module
- bosta-crm - CRM system
- Spice-Hub - Android business hub

**Pattern:** Hub/Management systems, complete solutions, rapid tool development

---

## 📱 Mobile Apps (15+ Projects)

**Production:**
- **Areo** (2 stars) - Professional pilot & driver trip management
  - Kotlin 1.9.0 + Material Design 3 + Firebase + Google Maps SDK
  - Real-time location tracking with Geofire
  - MVVM architecture with background services
  - Custom Geolink integration
- snapupdate - Update framework
- **number-converter-app** (March 2023, Last Updated: August 2025) - First Kotlin Android Studio project
  - **Repository:** [kariemSeiam/number-converter-app](https://github.com/kariemSeiam/number-converter-app)
  - **Tech:** Kotlin 100%, Material Design, Data Binding Library
  - **Features:** Number base conversion (Binary, Octal, Decimal, Hexadecimal), real-time results, adaptive light/dark mode, smart input validation
  - **Significance:** First Kotlin project, Material Design + Data Binding learning, utility tool for developers

**Transportation:**
- **Areo** (Public - 2 stars) - Professional trip management for pilots/drivers
- **Dinamo (Go_Driver + Go_User)** (Private, Production) - Complete dual-app ride-sharing and delivery platform
  - **Timeline:** January 2021 - January 2025 (Active period: Jul 2023 - Jan 2025, 1 year 7 months)
  - **Type:** Dual-application system (Driver-facing + User-facing apps)
  - **Tech:** Kotlin (converted from Java in 2021), Firebase (FCM, Auth, Database, Storage, Analytics, Crashlytics), Google Maps SDK 17.0.0, Realm database (both apps), ObjectBox (Driver app), Retrofit 2.9.0 (User) / 2.3.0 (Driver), RxJava 3 (User app), WorkManager 2.7.x
  - **Architecture:** Fragment-based navigation, Service-oriented (LocationTrackingService, TripFetchService, TripFetchWorker), BaseActivity pattern, Product flavors (go/wasalni brands, dev/prod environments)
  - **Features:** 
    - Driver App: Location tracking (foreground service, 5s interval, 10m displacement), trip/order management, background trip fetching (30s polling), chat (text, voice, images), wallet (top-up, withdraw, transactions), order history, vehicle management, SMS/OTP verification
    - User App: Ride booking (with Geolink API), delivery service, buy-for-me service, real-time driver tracking, saved places (August 2023), merchant integration, chat bot, wallet, Geolink API integration (Text Search, Directions, Geocoding, Reverse Geocoding)
  - **Key Implementations:** 
    - LocationTrackingService: Foreground service with 5-second interval, 10m displacement, location persistence, broadcast updates
    - TripFetchService + TripFetchWorker: Two-layer background system with 30-second polling, location-based trip fetching, ignored orders management, wake/WiFi locks
    - Custom Geolink API integration: GeolinkApiService in wasalni_rider package with dynamic API key retrieval, Flow-based methods, production alternative to Google Places API
    - Product flavors: Multi-brand (go/wasalni) × Multi-environment (dev/prod) with different package names, endpoints, and configurations
    - Search API V2: Enhanced location search implementation (September 2023)
    - Saved Places: User favorite locations with Material Design chips, Cairo fonts (August 2023)
  - **Major Updates (Jul 2023 - Jan 2025):**
    - August 2023: Saved places feature, profile UX refactoring, search enhancements, registration flow updates (flexible email, FCM token reliability)
    - September 2023: Search API V2, app crash fixes, responsive sizing (SSP/SDP), route handling improvements
    - September 2024 (Driver): Background trip fetching service, FCM modernization, location tracking improvements
    - July 2024 (User): Default Arabic language, locale metadata, BaseActivity improvements
    - 2023-2024: Continuous code maintainability refactoring
    - January 2025: Error handling improvements (Driver app)
  - **Status:** Production apps (versionCode 83 Driver / 116 User, versionName 8.2.2 / 10.3.7)
  - **Repositories:** [Dinamo-Driver](https://github.com/kariemSeiam/Dinamo-Driver) | [Dinamo-User](https://github.com/kariemSeiam/Dinamo-User)
- **Taxiarab_ANDROID (Client + Driver)** (Private, Production) - Modern multi-module ride-sharing platform with Clean Architecture and Jetpack Compose

**Components:**
- FacilityPicker - UI components
- Telegram-Profile-UI - UI replication

**Learning:**
- **Ramadan-Task** (March 2023) - UI/UX design masterpiece
  - **Repository:** [kariemSeiam/Ramadan-Task](https://github.com/kariemSeiam/Ramadan-Task)
  - **Tech:** Native Android (Kotlin 100%), Material Design, MotionLayout
  - **Features:** Single-screen design, prayer times, Ramadan schedule, categories (Prayer Time, Mosque Finder, Al-Quran)
  - **Design:** Beautiful Ramadan-themed UI with Islamic motifs (mosque, crescent moon, stars, lanterns)
  - **Recognition:** 7,955 LinkedIn reactions - praised by mobile developers for UI/UX excellence
  - **Significance:** Portfolio showcase demonstrating Material Design + MotionLayout mastery
- LinearLayoutTask
- Aero-Demo

**Foundation Phase (2019-2021):**
- **Scriptor** (September - November 2021) - Creative writing platform
  - Java Android app (pre-Kotlin transition)
  - Firebase Authentication + Realtime Database
  - MVC architecture pattern
  - Content sections: Novels, Poems, Quotes, Short Stories, Writing Basics
  - Features: User authentication, content creation/browsing, admin control panel, feedback system
  - Package: `com.scriptor.scriptor2020`
  - Early Android learning project, Foundation Phase
  - Repository: [kariemSeiam/Scriptor](https://github.com/kariemSeiam/Scriptor)

**Pattern:** Kotlin-first, Material 3, modern architecture (post-2021), Java foundation (2019-2021)

---

## 🛒 E-Commerce (5+ Projects)

**Complete Systems:**
- **ramadan-store + ramadan-store-admin** (January 22-23, 2025, Last Updated: February 11, 2025) - Seasonal e-commerce system
  - **Repositories:** [ramadan-store](https://github.com/kariemSeiam/ramadan-store) | [ramadan-store-admin](https://github.com/kariemSeiam/ramadan-store-admin)
  - **Deployments:** [Store](https://kariemSeiam.github.io/ramadan-store) | [Admin](https://kariemSeiam.github.io/ramadan-store-admin)
  - **Tech:** React 18.3.1 + Vite 6.0.3 + Tailwind CSS 3.4.17 (GitHub Pages)
  - **Architecture:** Dual-app system (separate frontends for store and admin)
  - **Client App:** Product catalog, shopping cart, order management, user auth, location/maps, image viewer
  - **Admin App:** Order dashboard, analytics (Recharts), user management, product management, design system
  - **Features:** Complete e-commerce functionality, Framer Motion animations, React Leaflet maps, Recharts analytics
  - **Significance:** Seasonal project with quick delivery, client-focused, complete store + admin solution
- **Shozati (Trendy Corner)** (February 2025, Last Updated: September 2025) - Full-stack fashion e-commerce platform
  - **Production:** Live at www.trendy-corner.org
  - **Repository:** [kariemSeiam/shozati-store](https://github.com/kariemSeiam/shozati-store)
  - **Frontend:** React 18.3.1 + Vite 6.1.1 + Tailwind CSS 3.4.17 (GitHub Pages)
  - **Backend:** Flask + Flask-SQLAlchemy 3.0.0 + SQLAlchemy 2.0.0 (PythonAnywhere)
  - **Architecture:** Blueprint pattern (6 API modules: auth, products, orders, users, admin, public)
  - **Key Features:** Full e-commerce (products, cart, orders, wishlist), bilingual Arabic/English with RTL, phone auth with OTP + JWT, admin dashboard with analytics (Recharts), promotional sliders, coupon system, location-based features (Leaflet), horizontal category navigation
  - **Performance:** Advanced code splitting, lazy loading, terser minification (3-pass compression), CSS-only animations (Framer Motion removed September 2025)
  - **Admin Panel:** Modern dark theme, token persistence fixes, key-based authentication
  - **Testing:** Comprehensive API testing (27 tests, 100% pass rate)
  - **Special:** PIGO Mini integration for development workflow, actively maintained
- **MarketBelbeis + MarketBelbeisSeller** (2021) - Android marketplace system
  - Java 94.3% + Kotlin 5.7% (early Kotlin adoption)
  - MVVM architecture (viewmodels, models, ui, utils)
  - Firebase backend integration
  - Dual-app system (user-facing + seller-facing)
  - Package: `com.erots.marketbelbeis`
  - Early career marketplace foundation project

**Specialized:**
- **adham-mansour-menu** (January 2025, Last Updated: February 2025) - Salon/Barbershop menu website
  - **Production:** Live at kariemseiam.github.io/adham-mansour-menu
  - **Repository:** [kariemSeiam/adham-mansour-menu](https://github.com/kariemSeiam/adham-mansour-menu)
  - **Tech:** React 18.3.1 + Vite 6.0.3 + Tailwind CSS 3.4.17 (GitHub Pages)
  - **Features:** Groom's packages (4 packages), services, skin care, branch locations, contact actions (phone, WhatsApp, Facebook, location)
  - **UI:** Glass-morphism design, dark theme with gold accents, RTL/Arabic support, responsive layout
  - **SEO:** Comprehensive Arabic SEO with Schema.org markup
  - **Client Project:** Adham Mansour Salon/Barbershop in Belbeis, Egypt

**Pattern:** Store + Admin panels, complete solutions, marketplace systems

**Web Apps:**
- **Alqaid Coffee POS** (Active Development) - Full-stack coffee shop Point of Sale system
  - **Repository Location:** `d:/Projects/Web/cofee`
  - **Backend:** Flask 2.3.3 + SQLAlchemy 2.0.20 + Flask-JWT-Extended 4.5.2 (SQLite with Alembic migrations)
  - **Frontend:** React 18.3.1 + Create React App 5.0.1 + Chart.js 4.2.1 + React Router DOM 6.8.2
  - **Architecture:** Blueprint pattern (10 API modules: auth, coffee_types, coffee_varieties, coffee_grades, coffee_mixes, spice_status, additives, products, orders, reports)
  - **Key Features:** Specialized coffee management (types, varieties, grades, mixes, spice status, additives), POS system with cart and payment processing, order management with status tracking, dashboard analytics with Chart.js, product management, comprehensive reporting
  - **Coffee Catalog:** Multi-layered coffee catalog (types → varieties → grades → mixes) with spice status and additives
  - **Order System:** Order lifecycle (new → preparing → ready → completed/cancelled), order items (coffee/products), order item additives, payment methods (cash, card, wallet)
  - **Analytics:** Sales statistics, sales charts, top selling products, active orders, timeframe filtering
  - **Arabic Support:** Native RTL support with Arabic UI throughout
  - **Client Project:** Alqaid coffee shop
  - **Significance:** Specialized domain system, complex coffee catalog management, full-stack Flask + React integration

---

## 🌐 Web Development (10+ Projects)

**Modern:**
- masar (TypeScript) - Latest project
- nexus-ui - UI library
- portfolio + pigo-portfolio - Portfolios
- docs (TypeScript) - Documentation system

**Dashboards:**
- GeoEgy - Interactive dashboard
- NumberToWordsConverter - Utility

**Tools:**
- LinkedIn-Connector - Automation
- Image-Scraper - Browser extension
- wa-bulk - WhatsApp messaging
- smart-line-space (PHP) - Text utility

**Pattern:** Modern JavaScript/TypeScript, component-based

---

## 🔌 Backend Services (10+ Projects)

**APIs:**
- Geolink ecosystem
- GeoEgy backend services
- Hvar-Hub backend

**Infrastructure:**
- proxy-pool - Network infrastructure
- TripX - Trip management backend

**Pattern:** Flask-based, RESTful APIs, production-ready

---

## 📊 Project Statistics

**Total:** 75+ projects  
**Public:** 64 projects  
**Private:** 11 projects  
**Stars:** 15+ total  
**Languages:** 8+ (Kotlin, JavaScript, Python, TypeScript, Java, Dart, PHP, Jupyter)

**Most Active Year:** 2025 (20+ projects)  
**Flagship:** Hvar-Hub  
**Most Popular:** Geolink (8 stars)

---

## 🔗 Project Relationships

### **Ecosystems**

**Geolink Ecosystem:**
- API + Dashboard + Backend + Mobile + Country-specific

**Hub Systems:**
- Hvar-Hub + Modules + Related hubs

**E-Commerce:**
- Stores + Admin panels + Marketplaces

**Mobile Apps:**
- Production apps + Components + Learning projects

### **Evolution Lines**

**Geolocation:** v1 → Public → v2 → Flask  
**Mobile:** Java → Kotlin → Material 3  
**Full-Stack:** Mobile → Backend → Frontend → Complete

---

## 💡 Key Project Patterns

### **1. Hub/Management Pattern**
- Centralized management
- Multiple modules
- Workflow automation
- Integration capabilities

### **2. API-First Pattern**
- Backend API separate
- Multiple clients
- Public + Private versions
- Ecosystem building

### **3. Version Evolution**
- Start private
- Go public
- Enhance private
- Create variants

### **4. Complete Solutions**
- Not just features
- Complete systems
- Production-ready
- Business value

---

## 🎯 Project Categories

**By Domain:**
- Geolocation (10+)
- Business Systems (5+)
- Mobile Apps (15+)
- E-Commerce (5+)
- Web Development (10+)
- Backend Services (10+)
- Learning Projects (15+)

**By Status:**
- Production (5+)
- Public APIs (2+)
- Active Development (10+)
- Maintained (20+)
- Learning (15+)

**By Technology:**
- Kotlin/Android (20+)
- JavaScript/React (25+)
- Python/Flask (15+)
- TypeScript (5+)

---

**Complete project details available in `03-Projects-Deep-Dive/` directory** 📦✨

---

*Use this for quick project reference. Deep dives available in Brain Hub.*

