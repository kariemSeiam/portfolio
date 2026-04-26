# Taxiarab_ANDROID - Modern Multi-Module Ride-Sharing Platform

> **Advanced dual-app ride-sharing platform with Clean Architecture, Jetpack Compose, and sophisticated service management**

**Timeline:** January 2024 - July 2025 (Initial development: Jan 2024, Active contributions: Dec 2024 - Jul 2025, ~8 months)  
**Status:** Production  
**Type:** Transportation Platform  
**Architecture:** Multi-Module Dual-App System (Client/Rider + Driver)

---

## Overview

Taxiarab_ANDROID is a modern, production-ready ride-sharing platform built with advanced Android development practices. The project demonstrates Clean Architecture principles, Jetpack Compose UI, sophisticated foreground service management, and real-time communication using Pusher WebSocket integration. The system consists of two complementary Android applications (client/rider and driver) sharing a common core architecture.

### Key Characteristics

- **Multi-Module Architecture:** Clean separation with `client`, `driver`, `core:data`, `core:domain`, `design_system` modules
- **Clean Architecture:** Domain/data/presentation layer separation with Use Cases and Repository pattern
- **Modern UI:** Jetpack Compose with Material Design 3 and dynamic scaling
- **Service-Oriented:** Advanced foreground service management for location tracking and WebSocket communication
- **Real-Time Communication:** Pusher WebSocket integration for ride events and driver location updates
- **Production Ready:** versionCode 17 (Rider), 26 (Driver)

---

## Project Timeline & Evolution

### Phase 1: Initial Development (January 2024 - November 2024)

**Team Development:**
- January 2024: Project initialization
- February - November 2024: Core feature development by team (Marwan Mahmoud, Ibrahim Fouda, Kamel, Hassan)
- Multi-module architecture setup
- Basic ride booking and driver management features

### Phase 2: Major Refactoring & Enhancement (December 2024 - May 2025)

**December 2024:**
- Initial contributions begin
- Map marker logic refactoring
- Camera interaction flow improvements
- Permission handling enhancements

**January 2025:**
- Comprehensive service lifecycle management implementation
- LocationForegroundService and LocationServiceManager architecture
- WebSocketForegroundService for Pusher connection management
- ServiceInitializer pattern for coordinated service lifecycle
- Boot receiver integration for service recovery
- Image compression utilities (ImageUtils, CompressImageUtils)
- Voice note recording improvements
- Chat screen refactoring with media handling
- Android 13+ permission compliance

**February 2025:**
- UI scaling system implementation (dynamic scaling for responsive design)
- TravelTypeCard design enhancements with animations
- API compatibility improvements
- X-API-SECRET header integration
- Error handling enhancements across ViewModels

**March 2025:**
- Pusher client integration for real-time ride updates
- RidePusherClient implementation for ride event handling
- Comprehensive Arabic locale support (LocaleUtils, setAppLocale)
- Battery optimization helper implementation
- GeoLink API integration for places search and directions
- Notification management improvements
- Driver status management enhancements

**April 2025:**
- App update management system (AppUpdateManager with in-app updates)
- UpdateDialog composable implementation
- API key updates and GeoLink service integration
- Place handling improvements
- Ride cancellation event binding

**May 2025:**
- **Major Architecture Overhaul:**
  - Sequential permission queue system in MainActivity
  - LocationServiceManager as single source of truth for driver/service state
  - Service health checks and recovery mechanisms
  - Advanced in-app update support
  - Ride invitation screen with timer and visual cues
  - Comprehensive permission flows for Android 13+
  - Background location tracking implementation
  - Unified notification management

### Phase 3: Stability & Optimization (June 2025 - July 2025)

**June 2025:**
- Service stability improvements
- Ride tracking enhancements
- Battery optimization handling across Android versions

**July 2025:**
- Background location tracking with smooth transitions
- App update mechanism improvements
- Service management refinements
- Permission cleanup and optimization
- Final stability improvements

---

## Architecture

### Multi-Module Structure

```
Taxiarab_ANDROID/
├── client/                    # Rider/Client application module
│   ├── src/main/java/com/app/TaxiArabClient/
│   │   ├── ui/               # Compose UI screens
│   │   ├── services/         # Client-specific services
│   │   └── util/            # Client utilities
│   └── build.gradle.kts
│
├── driver/                    # Driver application module
│   ├── src/main/java/com/app/TaxiArabDriver/
│   │   ├── ui/               # Compose UI screens
│   │   ├── services/         # Driver services (Location, WebSocket, RideTracking)
│   │   ├── util/            # Driver utilities (AppUpdateManager, etc.)
│   │   └── ServiceInitializer.kt
│   └── build.gradle.kts
│
├── core/
│   ├── domain/               # Domain layer (pure Kotlin)
│   │   ├── model/           # Domain models
│   │   ├── repository/      # Repository interfaces
│   │   └── usecase/        # Use cases
│   │
│   └── data/                 # Data layer (Android)
│       ├── network/         # API services, WebSocket clients
│       ├── geolink/         # GeoLink API integration
│       ├── repository/      # Repository implementations
│       ├── preferences/     # DataStore preferences
│       └── util/           # Data utilities
│
├── design_system/            # Shared UI components module
│   └── src/main/java/com/app/design_system/
│
└── buildSrc/                 # Build configuration
    └── src/main/kotlin/
        ├── ConfigData.kt
        ├── DependencyVersions.kt
        ├── Deps.kt
        └── BuildModules.kt
```

### Clean Architecture Implementation

**Domain Layer (`core:domain`):**
- Pure Kotlin (no Android dependencies)
- Domain models (User, Location, Place, Route, CarType, etc.)
- Repository interfaces (IAuthRepository, IPlacesRepository)
- Use cases (ManageAuthUseCase, ManageDirectionUseCase, ManageRideUseCase, ValidateAuthenticationUseCase)

**Data Layer (`core:data`):**
- Android-specific implementations
- Retrofit API services (TaxiArabApiService, UserApiService, DriverApiService, DirectionsService)
- WebSocket clients (DriverWebsocketClient, UserWebsocketClient, RidePusherClient)
- Repository implementations (AuthRepository, PlacesRepository)
- Data sources (RetrofitDataSource, FireBaseDataSource, PreferencesDataSource)
- DataStore for preferences
- GeoLink API service integration

**Presentation Layer (`client`/`driver`):**
- Jetpack Compose UI
- ViewModels with StateFlow/SharedFlow
- Navigation with Compose Navigation
- Hilt dependency injection

### Service Architecture

**LocationServiceManager (Singleton):**
- Central coordinator for location and WebSocket services
- Single source of truth for driver/service state
- Health checks and recovery mechanisms
- Service lifecycle management
- Background/foreground mode transitions
- Unified notification management

**LocationForegroundService:**
- Foreground service for continuous location tracking
- Adaptive interval management (5s foreground, 30s background)
- Speed calculation and smoothing
- Battery optimization handling
- Health monitoring
- Driver status-based behavior (AVAILABLE, ON_TRIP, OFFLINE)

**WebSocketForegroundService:**
- Foreground service for Pusher WebSocket connection
- Connection health monitoring
- Automatic reconnection with exponential backoff
- Wake lock management
- Network state awareness

**RideTrackingService:**
- Ride-specific location tracking
- Timeline tracking for trip intervals
- Distance and speed calculations
- Gap handling for app kills
- Realistic speed simulation
- Data persistence across sessions

**ServiceInitializer:**
- Lifecycle-aware service coordinator
- ProcessLifecycleOwner integration
- Login/logout service management
- Boot receiver coordination
- App foreground/background handling

---

## Technology Stack

### Core Framework

**Android SDK:**
- `compileSdkVersion`: 35
- `minSdkVersion`: 24
- `targetSdkVersion`: 35
- `JavaVersion`: 18

**Kotlin:**
- Kotlin 1.9.22+
- Coroutines 1.6.4
- Kotlin DSL for Gradle

### UI & Design

**Jetpack Compose:**
- Compose BOM: 2023.10.01
- Compose Compiler: 1.5.8
- Material Design 3: 1.2.0
- Material Icons Extended: 1.4.3
- Navigation Compose: 2.7.5
- Hilt Navigation Compose: 1.1.0
- Coil Compose: 2.4.0 (image loading)
- Lottie Compose: 6.2.0 (animations)
- Accompanist:
  - System UI Controller: 0.28.0
  - Permissions: 0.31.3-beta

**Responsive Design:**
- Dynamic scaling system (`scaleFactor()`)
- ConstraintLayout Compose: 1.0.1
- Screen-size adaptive UI

### Dependency Injection

**Hilt (Dagger):**
- Hilt Android: 2.46.1
- Hilt Compiler: 2.46.1
- Dagger 2: 2.46.1

### Networking

**Retrofit & OkHttp:**
- Retrofit: 2.9.0
- Retrofit Gson Converter: 2.9.0
- OkHttp: 4.12.0
- OkHttp Logging Interceptor: 4.11.0
- Gson: 2.10.1

**Real-Time Communication:**
- Pusher Java Client: 2.2.1
- Custom WebSocket clients (DriverWebsocketClient, UserWebsocketClient, RidePusherClient)

### Data Persistence

**DataStore:**
- DataStore Preferences: 1.0.0

**Room Database:**
- Room Runtime: 2.6.1
- Room Compiler: 2.6.1
- Paging 3: 3.3.0 (with Compose support)

**Firebase:**
- Firebase BOM: 33.1.2
- Firestore: 25.0.0
- Firebase Storage
- Firebase Messaging: 24.0.0
- Firebase Crashlytics

### Location & Maps

**Google Maps:**
- Maps Compose: 4.3.0
- Maps Compose Utils: 4.3.0
- Maps Compose Widgets: 4.3.0
- Google Play Services Location
- Google Places API: 3.3.0

**Custom GeoLink API:**
- Text Search
- Geocoding
- Reverse Geocoding
- Directions

### Lifecycle & Architecture

**Lifecycle Components:**
- Lifecycle ViewModel Compose: 2.6.2
- Lifecycle Runtime Compose: 2.6.2
- Lifecycle Saved State: 2.6.2

**Architecture Patterns:**
- MVVM with StateFlow/SharedFlow
- Repository Pattern
- Use Case Pattern
- Clean Architecture

### Build System

**Gradle:**
- Gradle Kotlin DSL
- Version Catalog pattern (buildSrc)
- Multi-module project structure
- Build configuration centralization

---

## Features

### Driver App Features

**Core Functionality:**
- **Location Tracking:** Continuous foreground service with adaptive intervals (5s foreground, 30s background)
- **Service Management:** LocationServiceManager for coordinated service lifecycle
- **Ride Management:** Accept, start, complete rides with real-time tracking
- **Ride Tracking Service:** Detailed trip tracking with timeline, distance, speed calculations
- **Driver Status Management:** AVAILABLE, ON_TRIP, OFFLINE states

**Real-Time Communication:**
- **Pusher WebSocket Integration:** Real-time ride invitations and updates
- **DriverWebsocketClient:** Handles ride invitations, cancellations, connection management
- **WebSocketForegroundService:** Persistent WebSocket connection with health monitoring

**Service Architecture:**
- **ServiceInitializer:** Lifecycle-aware service coordination
- **Boot Receiver:** Automatic service recovery on device boot
- **Health Checks:** Service health monitoring and automatic recovery
- **Battery Optimization:** Handling across Android versions

**UI/UX:**
- **Jetpack Compose:** Modern declarative UI
- **Material Design 3:** Contemporary design system
- **Dynamic Scaling:** Responsive design for different screen sizes
- **Arabic/RTL Support:** Complete localization with LocaleUtils
- **Permission Management:** Sequential permission queue system
- **App Updates:** In-app update support with UpdateDialog

**Notifications:**
- **Unified Notifications:** Single notification for all services
- **Foreground Service Notifications:** Persistent notifications for active services
- **Ride Invitation Notifications:** Critical notifications for new ride requests

### Client/Rider App Features

**Ride Booking:**
- **Place Search:** GeoLink API integration for place search
- **Map Integration:** Google Maps with route visualization
- **Real-Time Driver Tracking:** Live driver location updates via Pusher
- **Ride States:** Invitation, accepted, at pickup, started, ended
- **Ride Monitoring:** RideMonitoringForegroundService for active ride tracking

**Communication:**
- **Chat System:** Real-time chat with drivers
- **Voice Notes:** Audio recording and playback
- **Image Sharing:** Image compression and upload
- **Media Handling:** Camera and gallery integration

**Real-Time Updates:**
- **RidePusherClient:** Pusher integration for ride events
- **Event Types:** Ride invitation, acceptance, driver at pickup, ride started/ended, tracking events
- **Presence Channels:** Real-time driver location updates

**UI/UX:**
- **Jetpack Compose:** Modern UI with Material Design 3
- **Dynamic Scaling:** Responsive design
- **Arabic/RTL Support:** Complete localization
- **Travel Type Selection:** Animated cards with visual feedback

---

## Key Technical Implementations

### Service Lifecycle Management

**LocationServiceManager Pattern:**
- Singleton coordinator for all services
- StateFlow-based state management
- Health checks every 30 seconds
- Automatic recovery with exponential backoff
- Background/foreground mode transitions
- Unified notification management

**ServiceInitializer Pattern:**
- LifecycleObserver for ProcessLifecycleOwner
- Login/logout service coordination
- Boot receiver integration
- App foreground/background handling

### Permission Management

**Sequential Permission Queue:**
- Single-queue handler in MainActivity
- One permission at a time with explanations
- Android 13+ compliance
- Settings redirection for denied permissions
- Background location permission handling (Android 10+)

**Permission Types:**
- Basic permissions (Location, Notifications)
- Background location (Android 10+)
- Overlay permission (optional)
- Media permissions (Android 13+)
- Foreground service permissions

### Real-Time Communication

**Pusher Integration:**
- Pusher Java Client 2.2.1
- Presence channels for driver location
- Private channels for ride events
- Authentication provider implementation
- Connection state management
- Automatic reconnection

**Event Types:**
- `ride_invitation_sent`
- `ride_accepted`
- `driver_at_pickup`
- `ride_started`
- `end_ride`
- `cancel_ride`
- `RideTrackingEvent`
- `drivers.real_location`

### Location Services

**Adaptive Location Tracking:**
- 5-second interval (foreground)
- 30-second interval (background)
- 10-meter minimum displacement (foreground)
- 50-meter minimum displacement (background)
- Speed calculation and smoothing
- Battery optimization awareness

**Ride Tracking Service:**
- Timeline tracking (5-second intervals)
- Distance calculations (total and actual)
- Speed calculations with smoothing
- Gap handling for app kills
- Realistic speed simulation
- Data persistence

### App Update Management

**AppUpdateManager:**
- Google Play in-app updates
- Flexible and immediate update types
- UpdateDialog composable
- Fallback to Play Store
- Download progress tracking

### Image Handling

**Image Compression:**
- ImageUtils for compression
- EXIF data preservation
- Quality adjustments
- File size optimization

### Localization

**Arabic/RTL Support:**
- LocaleUtils for language management
- setAppLocale extension function
- RTL layout direction support
- Locale configuration

---

## Architecture Patterns

### Clean Architecture

**Layer Separation:**
- Domain layer (pure Kotlin, no Android)
- Data layer (Android-specific implementations)
- Presentation layer (Compose UI)

**Dependency Rule:**
- Domain layer has no dependencies
- Data layer depends on domain
- Presentation layer depends on data and domain

### MVVM Pattern

**ViewModels:**
- StateFlow for UI state
- SharedFlow for events
- Coroutines for async operations
- Repository pattern for data access

### Repository Pattern

**Abstraction:**
- Repository interfaces in domain layer
- Repository implementations in data layer
- Use cases orchestrate repository calls

### Service-Oriented Architecture

**Service Coordination:**
- LocationServiceManager as central coordinator
- ServiceInitializer for lifecycle management
- Foreground services for critical operations
- Health checks and recovery mechanisms

### Dependency Injection

**Hilt Integration:**
- Application-level modules
- Activity-level modules
- Service-level modules
- Repository and Use Case injection

---

## Performance Optimizations

### Location Services

- Adaptive intervals based on driver status
- Background mode optimization (30s intervals)
- Speed smoothing to reduce jitter
- Duplicate location prevention
- Battery optimization handling

### Network

- Connection pooling with OkHttp
- Request/response logging for debugging
- Pusher connection reuse
- Exponential backoff for reconnection

### UI

- Dynamic scaling for responsive design
- Lazy loading with Paging 3
- Image loading optimization with Coil
- Compose recomposition optimization

### Memory

- Service lifecycle management
- Proper cleanup on logout
- Coroutine scope management
- Resource disposal

---

## Security & Permissions

### Permissions

**Location:**
- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION
- ACCESS_BACKGROUND_LOCATION (Android 10+)
- FOREGROUND_SERVICE_LOCATION (Android 15+)

**Foreground Services:**
- FOREGROUND_SERVICE
- FOREGROUND_SERVICE_DATA_SYNC
- FOREGROUND_SERVICE_LOCATION
- FOREGROUND_SERVICE_CONNECTED_DEVICE

**Media & Storage:**
- READ_MEDIA_IMAGES (Android 13+)
- READ_MEDIA_VIDEO (Android 13+)
- READ_MEDIA_AUDIO (Android 13+)
- READ_EXTERNAL_STORAGE (Android 10 and below)

**Other:**
- POST_NOTIFICATIONS (Android 13+)
- RECORD_AUDIO
- CAMERA
- WAKE_LOCK
- RECEIVE_BOOT_COMPLETED

### Security Practices

- HTTPS for all network communication
- API secret headers (X-API-SECRET)
- Token-based authentication
- Secure preferences storage (DataStore)
- Firebase security rules

---

## Development Practices

### Code Organization

- Multi-module architecture
- Clean Architecture principles
- Separation of concerns
- Single Responsibility Principle

### Testing

- Unit test dependencies configured
- Android test dependencies
- Compose UI testing support

### Version Control

- Git with feature branches
- Commit message conventions
- Code review process

### Build Configuration

- Centralized version management (buildSrc)
- Dependency version catalog
- Build variants (debug/release)
- ProGuard rules for release builds

---

## Notable Contributions & Timeline

### December 2024 - January 2025

**Major Service Architecture:**
- LocationServiceManager implementation
- LocationForegroundService refactoring
- WebSocketForegroundService implementation
- ServiceInitializer pattern
- Boot receiver integration

**Features:**
- Image compression utilities
- Voice note recording improvements
- Chat screen refactoring
- Permission handling enhancements

### February - March 2025

**UI Improvements:**
- Dynamic scaling system
- TravelTypeCard animations
- UI responsiveness enhancements

**Real-Time Communication:**
- Pusher client integration
- RidePusherClient implementation
- WebSocket improvements

**Localization:**
- Complete Arabic/RTL support
- LocaleUtils implementation

### April - May 2025

**App Updates:**
- AppUpdateManager implementation
- In-app update support
- UpdateDialog composable

**Major Refactoring (May 2025):**
- Sequential permission queue system
- Service lifecycle overhaul
- Background location tracking
- Unified notification management
- Comprehensive permission flows

### June - July 2025

**Stability & Optimization:**
- Service stability improvements
- Battery optimization handling
- Background location transitions
- Final optimizations

---

## Production Status

**Version Information:**
- Rider App: versionCode 17, versionName "4.4"
- Driver App: versionCode 26, versionName "2.6"

**Deployment:**
- Google Play Store (production)
- Active development and maintenance

---

## Key Differentiators

1. **Modern Architecture:** Clean Architecture with multi-module structure
2. **Advanced Service Management:** Sophisticated foreground service coordination
3. **Real-Time Communication:** Pusher WebSocket integration for live updates
4. **Production Quality:** Comprehensive error handling, recovery mechanisms, and health checks
5. **User Experience:** Dynamic scaling, Material Design 3, Arabic/RTL support
6. **Android Compliance:** Full Android 13+ permission compliance, Android 15+ compatibility

---

## Related Projects

- **Dinamo (Go_Driver + Go_User):** Similar dual-app ride-sharing platform (different tech stack: Realm, ObjectBox, Fragment-based)
- **Areo:** Trip management app with location tracking
- **GeoLink:** Custom geolocation API used in Taxiarab

---

## Technical Highlights

- **Clean Architecture:** Complete domain/data/presentation separation
- **Jetpack Compose:** Modern declarative UI throughout
- **Service Coordination:** Advanced foreground service management
- **Real-Time Updates:** Pusher WebSocket for live ride events
- **Permission Management:** Sequential queue system with Android 13+ compliance
- **Localization:** Complete Arabic/RTL support
- **Dynamic Scaling:** Responsive UI for all screen sizes
- **App Updates:** In-app update support with Play Store integration

---

*Taxiarab_ANDROID represents a modern, production-ready ride-sharing platform demonstrating advanced Android development practices, Clean Architecture principles, and sophisticated service management.*

