// Featured projects data - Structure from BrainHub

export const featuredProjects = [
  {
    id: 1,
    title: 'Hvar-Hub',
    shortDescription: 'Full-stack service management platform with Arabic RTL',
    longDescription: `Production-ready service management system featuring complete stock management, customer workflows, and integrated shipping solutions. Built with a modern full-stack architecture using Flask backend and React frontend.

The system includes service ticket workflows for replacements, maintenance, and returns, along with comprehensive stock management featuring Bill of Materials (BOM) tracking and three-tier inventory control (quantity_on_hand, quantity_reserved, quantity_damaged).

Evolved from initial Order Management System (Pre-MCRM: July 29 - August 15, 2025) to complete platform with multiple API modules (customers, tickets, hub, stock, bosta). Features modular Flask Blueprint architecture with service layer separation, production WSGI deployment, and comprehensive documentation.

Native Arabic/RTL support with Cairo and Tajawal fonts ensures first-class localization for the MENA market, while PWA capabilities and QR scanning integration provide seamless mobile experiences.`,
    technologies: ['Flask', 'React', 'MySQL', 'Vite', 'Tailwind CSS', 'PWA', 'Python', 'JavaScript', 'WSGI', 'SQLAlchemy'],
    category: 'Full-Stack',
    features: [
      'Service ticket workflows (replacement, maintenance, return)',
      'Stock management with BOM tracking',
      'Three-tier inventory control (on-hand, reserved, damaged)',
      'Arabic/RTL native support',
      'Bosta shipping API integration',
      'QR scanning with camera',
      'PWA with service worker',
      'Modular Blueprint architecture',
      'Production WSGI deployment',
      'Customer workflow automation',
    ],
    performanceMetrics: {
      loadTime: '< 2s',
      bundleSize: '245KB',
      lighthouseScore: 92,
    },
    images: [
      // Add web screenshots to: public/images/projects/hvar-hub/web/
      // Add mobile screenshots to: public/images/projects/hvar-hub/mobile/
      // Example:
      // {
      //   url: '/images/projects/hvar-hub/web/dashboard.png',
      //   type: 'web',
      //   alt: 'Hvar-Hub dashboard interface',
      //   caption: 'Main dashboard with service management overview'
      // },
    ],
    liveDemoUrl: null,
    githubUrl: '#',
    isPrivate: true,
  },
  {
    id: 2,
    title: 'Geolink API',
    shortDescription: 'Production geolocation API with credit-based billing system',
    longDescription: `Full-featured geolocation API platform providing text search, directions, geocoding, and reverse geocoding services. Built with Flask 3.0.3 and SQLAlchemy 2.0.44+, featuring a comprehensive admin dashboard and sophisticated credit-based billing system.

Production system handling ~5 million requests per month, serving 50+ active clients (startups, real projects, developers). The platform includes multi-layer caching (API keys, endpoint pricing, system settings), connection pooling, and async queue-based usage logging for optimal performance.

Features comprehensive billing system with free monthly credits (default: 3,000 requests), account balance management, and credit limit system. Includes 8 Flask Blueprints, React Context API architecture with intelligent caching, and unified dashboard endpoint (10x faster - single request).

Deployed in production at www.geolink-eg.com with Docker containerization support, Gunicorn/Waitress production servers, and comprehensive documentation (2237+ lines).`,
    technologies: ['Flask', 'SQLAlchemy', 'React', 'Vite', 'Docker', 'PostgreSQL', 'Python', 'REST API', 'Gunicorn', 'Context API'],
    category: 'API Platform',
    features: [
      'Credit-based billing system (free credits → balance → credit limit)',
      'API key management with rate limiting',
      'Admin dashboard with analytics',
      'Text search, directions, geocoding APIs',
      'Multi-layer caching (10K API keys, 1K pricing)',
      'Async queue-based usage logging',
      'Connection pooling (20 persistent + 30 overflow)',
      'Production: 5M+ requests/month, 50+ clients',
      'Unified dashboard endpoint (10x faster)',
      'Docker containerization',
    ],
    performanceMetrics: {
      loadTime: '< 1.5s',
      bundleSize: '180KB',
      lighthouseScore: 95,
    },
    images: [
      {
        url: '/images/projects/geolink-api/web/landing-hero.png',
        type: 'web',
        alt: 'Geolink API landing page with hero section',
        caption: 'Landing page featuring "Location Services Made Simple" with code example demonstration'
      },
      {
        url: '/images/projects/geolink-api/mobile/landing-hero.jpg',
        type: 'mobile',
        alt: 'Geolink API mobile landing page',
        caption: 'Mobile-first landing page with responsive design and touch-optimized interface'
      },
      {
        url: '/images/projects/geolink-api/mobile/api-keys.jpg',
        type: 'mobile',
        alt: 'Mobile API keys management page',
        caption: 'Mobile API key management with touch-optimized interface'
      },
      {
        url: '/images/projects/geolink-api/mobile/api-docs.jpg',
        type: 'mobile',
        alt: 'Mobile API documentation',
        caption: 'Mobile-optimized API documentation interface with endpoint listings'
      },
      {
        url: '/images/projects/geolink-api/mobile/notifications.jpg',
        type: 'mobile',
        alt: 'Mobile notifications page',
        caption: 'Mobile notifications center with swipe gestures and filters'
      },
      // Add more web screenshots to: public/images/projects/geolink-api/web/
      // {
      //   url: '/images/projects/geolink-api/web/dashboard.png',
      //   type: 'web',
      //   alt: 'Geolink admin dashboard interface',
      //   caption: 'Admin dashboard with real-time analytics, user management, and API key administration'
      // },
      // {
      //   url: '/images/projects/geolink-api/web/api-keys.png',
      //   type: 'web',
      //   alt: 'API key management page',
      //   caption: 'API key management interface with rate limiting and usage tracking'
      // },
      // {
      //   url: '/images/projects/geolink-api/web/api-docs.png',
      //   type: 'web',
      //   alt: 'API documentation page',
      //   caption: 'Comprehensive API documentation with interactive examples and code snippets'
      // },
      // {
      //   url: '/images/projects/geolink-api/web/notifications.png',
      //   type: 'web',
      //   alt: 'Notifications page',
      //   caption: 'Notifications center with activity feed and alerts'
      // },
    ],
    liveDemoUrl: 'https://geolink-eg.com',
    githubUrl: 'https://github.com/kariemSeiam/Geolink',
    isPrivate: false,
    stars: 8,
  },
  {
    id: 3,
    title: 'Areo',
    shortDescription: 'Android location tracking app with custom compass',
    longDescription: `Modern Android application for professional pilots and drivers to manage trips with real-time location tracking. Built with Kotlin 1.9.0 and Material Design 3, featuring MVVM architecture with SharedViewModel, Firebase Realtime Database, and Google Maps SDK integration.

The app includes a custom compass using CompassManager with accelerometer and magnetometer sensors, rotation matrix calculations, and sensor fusion. Dual-role system (PILOT/DRIVER) with role-specific location update intervals (DRIVER: 1.5s, PILOT: 5s) and real-time location tracking with Geofire 3.2.0.

Background LocationService runs in a separate process (locationServiceProcess) with wake locks, WiFi locks, and battery optimization requests, ensuring reliable tracking even when the app is in the background. Features custom Geolink API integration via Retrofit for text search, directions, and reverse geocoding.`,
    technologies: ['Kotlin', 'Material Design 3', 'Firebase', 'Google Maps SDK', 'Jetpack', 'Coroutines', 'MVVM', 'Geofire', 'Retrofit', 'DataStore'],
    category: 'Mobile App',
    features: [
      'Real-time location tracking with Geofire',
      'Custom compass with sensor fusion (accelerometer + magnetometer)',
      'Dual-role system (PILOT/DRIVER) with role-specific intervals',
      'Background LocationService (separate process)',
      'Geolink API integration (text search, directions, reverse geocoding)',
      'Boot auto-start receiver',
      'Material Design 3 UI',
      'Firebase Realtime Database synchronization',
      'DataStore Preferences for user settings',
    ],
    performanceMetrics: {
      loadTime: 'N/A',
      bundleSize: '8.5MB',
      lighthouseScore: null,
    },
    images: [
      // Add mobile screenshots to: public/images/projects/areo/mobile/
      // Example:
      // {
      //   url: '/images/projects/areo/mobile/home-screen.png',
      //   type: 'mobile',
      //   alt: 'Areo home screen',
      //   caption: 'Home screen with trip management interface'
      // },
      // {
      //   url: '/images/projects/areo/mobile/compass-view.png',
      //   type: 'mobile',
      //   alt: 'Custom compass interface',
      //   caption: 'Custom compass using accelerometer and magnetometer sensors'
      // },
    ],
    liveDemoUrl: null,
    githubUrl: 'https://github.com/kariemSeiam/Areo',
    isPrivate: false,
    stars: 2,
    appLinks: [
      {
        name: 'Areo',
        version: null,
        versionCode: null,
        playStoreUrl: null, // Add Google Play Store URL when available
        description: 'Location sharing app with custom compass and dual-role system',
        icon: '🧭',
      },
    ],
  },
  {
    id: 4,
    title: 'Taxiarab Platform',
    shortDescription: 'Production ride-sharing platform built with Clean Architecture',
    longDescription: `Complete production ride-sharing solution featuring separate Client (Rider) and Driver applications built with Jetpack Compose and Material Design 3. Implements Clean Architecture with multi-module structure (client, driver, core:data, core:domain, design_system) for maximum scalability and maintainability.

**Architecture Excellence:**
- **Clean Architecture**: Pure Kotlin domain layer (no Android dependencies), Android-specific data layer, Compose presentation layer
- **Multi-Module Design**: 5 modules with clear separation of concerns and dependency injection via Hilt
- **Service Architecture**: LocationServiceManager (singleton coordinator) manages LocationForegroundService, WebSocketForegroundService, and RideTrackingService with unified state management

**Real-Time Communication:**
- **Pusher WebSocket Integration**: RidePusherClient handles real-time ride events (invitation, acceptance, tracking, cancellation) via presence channels
- **Event-Driven Architecture**: SharedFlow/StateFlow for reactive UI updates, automatic reconnection with exponential backoff
- **Driver Location Streaming**: Real-time driver location updates via Pusher presence channels for live ride tracking

**Advanced Service Management:**
- **LocationForegroundService**: Adaptive intervals (5s foreground, 30s background), speed calculation with smoothing, battery optimization handling, driver status-based behavior (AVAILABLE, ON_TRIP, OFFLINE)
- **WebSocketForegroundService**: Persistent Pusher connection with health monitoring, automatic reconnection, wake lock management
- **RideTrackingService**: Detailed trip tracking with timeline (5-second intervals), distance calculations (total and actual), speed smoothing, gap handling for app kills, data persistence

**Production Features:**
- **Sequential Permission Queue**: One-permission-at-a-time system in MainActivity with Android 13+ compliance, settings redirection for denied permissions
- **AppUpdateManager**: Google Play in-app updates (flexible and immediate), UpdateDialog composable, fallback to Play Store
- **Boot Recovery**: BootCompletedReceiver with Android 15+ compatibility, service state restoration, wake lock management
- **GeoLink API Integration**: Custom GeoLink API service for places search, directions, geocoding, and reverse geocoding (production API at www.geolink-eg.com)

**Localization & UX:**
- **Complete Arabic/RTL Support**: LocaleUtils with setAppLocale extension, RTL layout direction, Arabic language throughout
- **Dynamic UI Scaling**: Responsive design system for different screen sizes
- **Material Design 3**: Latest design system with dynamic theming

**Production Status:** Rider App v4.4 (versionCode 17), Driver App v2.6 (versionCode 26) - Both apps in production on Google Play Store.`,
    technologies: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Hilt', 'Retrofit', 'Pusher', 'Google Maps', 'Clean Architecture', 'StateFlow', 'Coroutines', 'DataStore', 'Firebase', 'Room', 'Paging 3'],
    category: 'Mobile App',
    features: [
      'Dual-app architecture (Client + Driver)',
      'Clean Architecture (domain/data/presentation layers)',
      'LocationServiceManager (singleton coordinator)',
      'Adaptive location tracking (5s foreground, 30s background)',
      'Pusher WebSocket integration (real-time ride events)',
      'RideTrackingService (timeline, distance, speed calculations)',
      'Sequential permission queue (Android 13+ compliance)',
      'AppUpdateManager (in-app updates)',
      'Arabic/RTL localization (LocaleUtils)',
      'GeoLink API integration (places, directions, geocoding)',
      'Service health checks and recovery',
      'Boot recovery with Android 15+ compatibility',
      'Dynamic UI scaling system',
      'Firebase integration (FCM, Firestore, Storage)',
      'Production apps: Rider v4.4, Driver v2.6',
    ],
    performanceMetrics: {
      loadTime: 'N/A',
      bundleSize: '12MB',
      lighthouseScore: null,
    },
    images: [
      // Add mobile screenshots to: public/images/projects/taxiarab-platform/mobile/
      // Example:
      // {
      //   url: '/images/projects/taxiarab-platform/mobile/client-home.png',
      //   type: 'mobile',
      //   alt: 'Taxiarab client app home screen',
      //   caption: 'Client app home screen with ride booking interface'
      // },
      // {
      //   url: '/images/projects/taxiarab-platform/mobile/driver-dashboard.png',
      //   type: 'mobile',
      //   alt: 'Taxiarab driver app dashboard',
      //   caption: 'Driver app dashboard with real-time ride tracking'
      // },
    ],
    liveDemoUrl: null,
    githubUrl: '#',
    isPrivate: true,
    appLinks: [
      {
        name: 'Rider App',
        displayName: 'تاكسي عرب',
        version: 'v4.4',
        versionCode: 17,
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.app.TaxiArabClient', // Update with actual package name
        description: 'Client-facing ride booking application - 10K+ downloads',
        icon: '👤',
        logo: '/images/projects/taxiarab-platform/logos/rider-logo.png', // Add logo image
        downloads: '10K+',
      },
      {
        name: 'Driver App',
        displayName: 'عرب للسائقين',
        version: 'v2.6',
        versionCode: 26,
        playStoreUrl: 'https://play.google.com/store/apps/details?id=com.app.TaxiArabDriver', // Update with actual package name
        description: 'Driver-facing ride management application - 1K+ downloads',
        icon: '🚗',
        logo: '/images/projects/taxiarab-platform/logos/driver-logo.png', // Add logo image
        downloads: '1K+',
      },
    ],
  },
  {
    id: 5,
    title: 'Hvar-Catalog',
    shortDescription: 'SEO-optimized product catalog site with AAA accessibility',
    longDescription: `Premium product catalog and marketing website featuring advanced SEO optimization and accessibility compliance. Built as a static React site for optimal performance and easy deployment.

The site includes comprehensive SEO implementation with meta tags, Open Graph, Twitter Cards, and structured data JSON-LD. WCAG 3 AAA compliance ensures accessibility with keyboard navigation, screen reader support, and high contrast modes.

Features product catalog (~20 SKUs) with categories (choppers, blenders, irons, stand mixers, ovens, grinders, vacuums, air fryers), advanced filtering (category, price range, search with Arabic diacritics-insensitive matching), and blogger reviews aggregation with YouTube/Instagram embeds.

Premium Arabic/RTL design system uses Almarai and Tajawal fonts with a carefully crafted 4px grid system for perfect alignment. Includes support & maintenance hub, quick view modal, promo banners, and contact integration (phone, email, WhatsApp).`,
    technologies: ['React', 'Vite', 'Tailwind CSS', 'SEO', 'JSON-LD', 'GitHub Pages', 'JavaScript', 'Accessibility', 'Framer Motion', 'Recharts', 'Leaflet'],
    category: 'Marketing Site',
    features: [
      'SEO optimized with structured data',
      'WCAG 3 AAA accessibility compliance',
      'Premium Arabic/RTL design system',
      'Product catalog with advanced filtering',
      'Arabic diacritics-insensitive search',
      'Blogger reviews aggregation',
      'Support & maintenance hub',
      'Quick view modal',
      'Promo banners system',
      'Lazy loading and code splitting',
      'GitHub Pages deployment',
    ],
    performanceMetrics: {
      loadTime: '< 2.5s LCP',
      bundleSize: '150KB',
      lighthouseScore: 98,
    },
    images: [
      // Add web screenshots to: public/images/projects/hvar-catalog/web/
      // Example:
      // {
      //   url: '/images/projects/hvar-catalog/web/homepage.png',
      //   type: 'web',
      //   alt: 'Hvar-Catalog homepage',
      //   caption: 'SEO-optimized homepage with product showcase'
      // },
      // {
      //   url: '/images/projects/hvar-catalog/web/catalog-view.png',
      //   type: 'web',
      //   alt: 'Product catalog view',
      //   caption: 'Product catalog with filtering and search functionality'
      // },
    ],
    liveDemoUrl: null,
    githubUrl: '#',
    isPrivate: true,
  },
]

export const projectCategories = [
  'All',
  'Full-Stack',
  'API Platform',
  'Mobile App',
  'Marketing Site',
]
