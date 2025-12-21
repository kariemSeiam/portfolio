// Featured projects data - Structure from BrainHub

export const featuredProjects = [
  {
    id: 1,
    title: 'Hvar-Hub (MCRM)',
    shortDescription: 'Complete service management and inventory system with Arabic/RTL support',
    longDescription: `Production-ready service management system featuring complete stock management, customer workflows, and integrated shipping solutions. Built with a modern full-stack architecture using Flask backend and React frontend.

The system includes service ticket workflows for replacements, maintenance, and returns, along with comprehensive stock management featuring Bill of Materials (BOM) tracking and three-tier inventory control.

Native Arabic/RTL support with Cairo and Tajawal fonts ensures first-class localization for the MENA market, while PWA capabilities and QR scanning integration provide seamless mobile experiences.`,
    technologies: ['Flask', 'React', 'MySQL', 'Vite', 'Tailwind CSS', 'PWA', 'Python', 'JavaScript'],
    category: 'Full-Stack',
    features: [
      'Service ticket workflows (replacement, maintenance, return)',
      'Stock management with BOM tracking',
      'Arabic/RTL native support',
      'Bosta shipping API integration',
      'QR scanning with camera',
      'PWA with service worker',
    ],
    performanceMetrics: {
      loadTime: '< 2s',
      bundleSize: '245KB',
      lighthouseScore: 92,
    },
    liveDemoUrl: null,
    githubUrl: '#',
    isPrivate: true,
  },
  {
    id: 2,
    title: 'Geolink API',
    shortDescription: 'Production geolocation API platform with credit-based billing',
    longDescription: `Full-featured geolocation API platform providing text search, directions, and reverse geocoding services. Built with Flask and SQLAlchemy, featuring a comprehensive admin dashboard and credit-based billing system.

The platform includes API key management with rate limiting, ensuring fair usage and preventing abuse. A React-based admin dashboard provides user management, payment tracking, and analytics.

Deployed in production with Docker containerization support, serving real users through dev.geolink-eg.com and geolink-eg.com domains.`,
    technologies: ['Flask', 'SQLAlchemy', 'React', 'Vite', 'Docker', 'PostgreSQL', 'Python', 'REST API'],
    category: 'API Platform',
    features: [
      'Credit-based billing system',
      'API key management with rate limiting',
      'Admin dashboard with analytics',
      'Text search and directions API',
      'Reverse geocoding services',
      'Docker containerization',
    ],
    performanceMetrics: {
      loadTime: '< 1.5s',
      bundleSize: '180KB',
      lighthouseScore: 95,
    },
    liveDemoUrl: 'https://geolink-eg.com',
    githubUrl: 'https://github.com/kariemSeiam/Geolink',
    isPrivate: false,
    stars: 8,
  },
  {
    id: 3,
    title: 'Areo',
    shortDescription: 'Professional pilot & driver trip management Android app',
    longDescription: `Modern Android application for professional pilots and drivers to manage trips with real-time location tracking. Built with Kotlin and Material Design, featuring MVVM architecture and Firebase integration.

The app includes a custom compass using accelerometer and magnetometer sensors, dual-role system (PILOT/DRIVER) with role-specific behaviors, and real-time location tracking with Geofire at optimized intervals.

Background LocationService runs in a separate process with wake locks and battery optimization, ensuring reliable tracking even when the app is in the background.`,
    technologies: ['Kotlin', 'Material Design', 'Firebase', 'Google Maps SDK', 'Jetpack', 'Coroutines', 'MVVM', 'Geofire'],
    category: 'Mobile App',
    features: [
      'Real-time location tracking',
      'Custom compass with sensor fusion',
      'Dual-role system (PILOT/DRIVER)',
      'Background location service',
      'Geolink API integration',
      'Boot auto-start receiver',
    ],
    performanceMetrics: {
      loadTime: 'N/A',
      bundleSize: '8.5MB',
      lighthouseScore: null,
    },
    liveDemoUrl: null,
    githubUrl: 'https://github.com/kariemSeiam/Areo',
    isPrivate: false,
    stars: 2,
  },
  {
    id: 4,
    title: 'Taxiarab Platform',
    shortDescription: 'Modern multi-module ride-sharing platform with dual apps',
    longDescription: `Complete ride-sharing solution featuring separate Client and Driver applications built with Jetpack Compose and Material Design 3. Implements Clean Architecture with multi-module structure for scalability.

The platform includes sophisticated service management with LocationServiceManager for central coordination, LocationForegroundService with adaptive intervals, and WebSocketForegroundService for real-time Pusher integration.

Sequential permission queue system ensures Android 13+ compliance, while AppUpdateManager provides seamless in-app updates. Full Arabic/RTL localization serves the MENA market.`,
    technologies: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Hilt', 'Retrofit', 'Pusher', 'Google Maps', 'Clean Architecture'],
    category: 'Mobile App',
    features: [
      'Dual-app architecture (Client + Driver)',
      'Real-time ride tracking',
      'Clean Architecture pattern',
      'WebSocket integration with Pusher',
      'Arabic/RTL localization',
      'In-app updates system',
    ],
    performanceMetrics: {
      loadTime: 'N/A',
      bundleSize: '12MB',
      lighthouseScore: null,
    },
    liveDemoUrl: null,
    githubUrl: '#',
    isPrivate: true,
  },
  {
    id: 5,
    title: 'Hvar-Catalog',
    shortDescription: 'SEO-optimized product catalog with WCAG 3 AAA compliance',
    longDescription: `Premium product catalog and marketing website featuring advanced SEO optimization and accessibility compliance. Built as a static React site for optimal performance and easy deployment.

The site includes comprehensive SEO implementation with meta tags, Open Graph, Twitter Cards, and structured data JSON-LD. WCAG 3 AAA compliance ensures accessibility with keyboard navigation, screen reader support, and high contrast modes.

Premium Arabic/RTL design system uses Almarai and Tajawal fonts with a carefully crafted 4px grid system for perfect alignment.`,
    technologies: ['React', 'Vite', 'Tailwind CSS', 'SEO', 'JSON-LD', 'GitHub Pages', 'JavaScript', 'Accessibility'],
    category: 'Marketing Site',
    features: [
      'SEO optimized with structured data',
      'WCAG 3 AAA accessibility compliance',
      'Premium Arabic/RTL design system',
      'Product showcase with filtering',
      'Lazy loading and code splitting',
      'GitHub Pages deployment',
    ],
    performanceMetrics: {
      loadTime: '< 2.5s LCP',
      bundleSize: '150KB',
      lighthouseScore: 98,
    },
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
