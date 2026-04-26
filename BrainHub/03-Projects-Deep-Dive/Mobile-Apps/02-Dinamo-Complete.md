# Dinamo - Complete Ride-Sharing & Delivery Platform

> **Dual-app ride-sharing and delivery platform system with real-time location tracking, multi-brand support, and comprehensive service management**

**Timeline:** January 2021 - January 2025 (Initial development: Jan 2021, Active period: Jul 2023 - Jan 2025)  
**Status:** Production  
**Type:** Transportation & Delivery Platform  
**Architecture:** Dual-App System (Driver + User)

---

## Overview

Dinamo is a comprehensive dual-application ride-sharing and delivery platform consisting of two complementary Android applications that work together to provide transportation and delivery services. The system supports multiple brands through product flavors and includes sophisticated real-time location tracking, trip management, and multi-service delivery capabilities.

### Key Characteristics

- **Dual-App Architecture:** Separate applications for drivers and users/riders
- **Multi-Brand Support:** Product flavors for "go" and "wasalni" brands
- **Multi-Environment:** Dev and production environment configurations
- **Real-Time Tracking:** Advanced foreground location services with background trip fetching
- **Comprehensive Services:** Ride booking, delivery, buy-for-me, merchant integration
- **Production Ready:** versionCode 83 (Driver), 116 (User)

---

## Project Timeline & Evolution

### Phase 1: Initial Development (December 2020 - January 2021)

**Go_User:**
- December 2020: Initial commit
- December 2020 - January 2021: Kotlin conversion from Java (complete codebase migration)

**Go_Driver:**
- January 2021: Initial commit for go driver
- January 2021: Complete Kotlin conversion (fragments, activities, items, models)

### Phase 2: Core Features Development (February 2021 - August 2021)

**Major Features Implemented:**
- **Location Tracking Service** (August 2021): Foreground service implementation for continuous location updates
- **Firebase Cloud Messaging (FCM):** Real-time notifications for orders and trips
- **Wallet System** (September 2021): Top-up, withdrawal, transaction management
- **Buy-for-Me Service** (April 2021): Complete implementation with timer functionality
- **RTL Support** (October 2021): Full Arabic/RTL UI support
- **Chat System:** Voice notes, image sharing, real-time messaging
- **Order Management:** Multi-type order handling (ride, delivery, buy-for-me)

### Phase 3: Refinement & Stability (September 2021 - 2022)

**Improvements:**
- FCM refactoring iterations (multiple versions)
- Permission handling improvements (location, storage, camera)
- Android 10+ compatibility fixes (images, voice notes, notifications)
- Bug fixes and stability improvements
- UI/UX enhancements

### Phase 4: Active Enhancement Period (July 2023 - January 2025)

**Timeline Overview:**
This period represents the most active development phase, with continuous feature additions, refactoring, and improvements. The development followed a pattern of feature branches, pull requests, and regular merges to master.

**August 2023 - Major Feature Releases:**
- **Saved Places Feature** (August 26, 2023):
  - Complete saved places management system
  - Material Design chips for quick access
  - Cairo fonts for Arabic place names
  - Version: versionCode 84, versionName 9.3
  
- **Profile UX Refactoring** (August 23, 2023):
  - Improved profile management interface
  - Removed redundant code
  - Disabled phone number editing
  - Target SDK updated to 33
  
- **Search Enhancements** (August 20, 2023):
  - Enhanced app search method
  - Customized search functionality
  - Improved UI for search results
  
- **Registration Flow Updates** (August 12-31, 2023):
  - Flexible email registration (optional email)
  - FCM Token Reliability improvements (V2, V4)
  - Better error handling
  - Improved user experience

**September 2023 - API & Stability Improvements:**
- **Search API V2** (September 12, 2023):
  - Implemented app search API method V2
  - Addressed crash issues
  - Version: versionCode 88, versionName 9.7
  
- **App Crash Fixes** (September 4, 2023):
  - Removed unused RECORD_AUDIO permission
  - Added responsive sizing dependencies (SSP/SDP)
  - Improved UI handling for higher density screens
  - Enhanced camera listeners
  - Updated route handling with directionPolyLine
  - Version: versionName 9.6

**November-December 2023 - Code Quality:**
- **Code Maintainability Refactoring:**
  - Multiple refactoring commits (November 20-21, December 9, 20, 26)
  - Enhanced code structure
  - Improved maintainability
  - Better code organization

**2024 - Continuous Improvements:**
- **February-April 2024:**
  - Continued code maintainability refactoring
  - Enhanced code structure
  - Better error handling
  
- **July 2024:**
  - **Default Arabic Language** (July 9-11, 2024):
    - Locale metadata improvements
    - BaseActivity enhancements
    - Default Arabic language support
    - Better localization handling
  
- **September 2024 (Driver App):**
  - **Background Trip Fetching Service:**
    - Complete TripFetchService + TripFetchWorker implementation
    - 30-second polling interval
    - Location-based trip fetching
    - Ignored orders management
  
  - **FCM Modernization:**
    - Updated FCM message structure
    - Removed deprecated FCM APIs
    - Improved notification handling
  
  - **Location Tracking Improvements:**
    - Enhanced location tracking reliability
    - Better driver status handling
    - Improved notification handling

- **September-December 2024 (User App):**
  - **Trip Data Fetching Enhancements:**
    - Multiple iterations (September 30, November 12, December 4)
    - Enhanced reliability
    - Better notification handling
    - Improved error handling

**January 2025 - Final Improvements:**
- **Error Handling Improvements** (January 13, 2025 - Driver App):
  - Enhanced error handling and logging
  - Better cancellation request handling
  - Improved code quality

---

## Architecture

### Dual-App System

```
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (Shared)                      │
│           dashboard.dinamo-app.com / wessalegy.com           │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
     ┌─────────▼─────────┐          ┌────────▼────────┐
     │   Go_Driver App   │          │   Go_User App   │
     │ (Driver-facing)   │          │ (User-facing)   │
     │                   │          │                 │
     │ - Location Track  │          │ - Ride Booking  │
     │ - Trip Management │          │ - Delivery      │
     │ - Order Acceptance│          │ - Buy-for-Me    │
     │ - Chat            │          │ - Chat          │
     │ - Wallet          │          │ - Wallet        │
     └───────────────────┘          └─────────────────┘
```

### Package Structure

**Go_Driver:**
- `com.starbugs.go_driver` (go brand)
- `com.starbugs.wasalni_driver` (wasalni brand)

**Go_User:**
- `com.starbugs.go_user` (go brand)
- `com.starbugs.wasalni_rider` (wasalni brand)

### Product Flavors Architecture

**Flavor Dimensions:**
1. **Apps Dimension:** Brand differentiation
   - `go`: Base brand (com.starbugs.go_driver / com.starbugs.go_user)
   - `wasalni`: Dinamo brand (com.starbugs.wasalni_driver / com.starbugs.wasalni_rider)

2. **Environment Dimension:** Deployment environment
   - `dev`: Development environment
   - `prod`: Production environment

**Build Variants:**
- `goDevDebug` / `goDevRelease`
- `goProdDebug` / `goProdRelease`
- `wasalniDevDebug` / `wasalniDevRelease`
- `wasalniProdDebug` / `wasalniProdRelease`

Each variant has:
- Different base URLs (dev vs prod endpoints)
- Different package names (go vs wasalni)
- Different Google Maps API keys
- Different app configurations

### Architecture Patterns

**Fragment-Based Navigation:**
- BottomNavigationView in Driver app (Home, Orders, History, Messages, Profile)
- Navigation Drawer in User app (Home, Favorites, History, Messages, Profile)
- Fragment-based UI architecture

**Service-Oriented Architecture:**
- `LocationTrackingService`: Foreground service for continuous location updates
- `TripFetchService`: Foreground service for periodic trip fetching
- `TripFetchWorker`: WorkManager worker for background trip checks
- `MessagingService`: FCM message handling

**BaseActivity Pattern:**
- Common functionality centralized in BaseActivity
- BaseViewModel for shared ViewModel logic (User app)
- Consistent error handling and navigation

**Repository Pattern:**
- Retrofit services for API calls
- ServiceGenerator for API client creation
- Separation of network logic from UI

---

## Technology Stack

### Core Framework

**Kotlin:**
- Primary language (converted from Java in 2021)
- Kotlin 1.6.21 (Driver), 1.6.10 (User)
- Kotlin Coroutines 1.7.3 (Driver lifecycle)
- Kotlin Serialization (Driver)

**Android SDK:**
- compileSdkVersion: 34
- targetSdkVersion: 34
- minSdkVersion: 21
- Build Tools: 30.0.3

### Firebase Services

**Both Apps:**
- Firebase Cloud Messaging (FCM) - Real-time notifications
- Firebase Authentication - User authentication
- Firebase Realtime Database - Real-time data sync
- Firebase Storage - Image and file storage
- Firebase Analytics - Usage analytics
- Firebase Crashlytics - Crash reporting

**Versions:**
- Firebase BoM: 26.0.0 (Driver), 31.2.3 (User)
- FCM: 20.1.0 (Driver), 23.4.0 (User)

### Google Services

**Maps & Location:**
- Google Maps SDK: 17.0.0
- Google Play Services Location: 18.0.0 (Driver), 19.0.1 (User)
- Google Places API: 2.2.0 (Driver), 2.3.0 (User)
- Google Maps Utils: 0.5 (User)

**Other Google Services:**
- Google Play Services Auth: 17.0.0 (Driver), 18.0.0 (User)
- Google Play Services Base: 18.2.0 (User)
- Google SafetyNet: 18.0.1 (Driver)

### Networking

**Retrofit:**
- Driver: Retrofit 2.3.0, Converter Gson 2.1.0
- User: Retrofit 2.9.0, Converter Gson 2.9.0
- OkHttp: 3.10.0 (Driver), 3.x (User)
- OkHttp Logging Interceptor: 3.4.1

**Reactive Programming (User App Only):**
- RxJava 3: 3.1.3
- RxAndroid 3: 3.0.0
- Retrofit RxJava3 Adapter: 2.9.0

### Database

**Realm (Both Apps):**
- Realm Android: 10.15.1
- Local data persistence
- User session management
- Transaction data caching

**ObjectBox (Driver App Only):**
- ObjectBox: 3.1.2 (Gradle plugin), 2.5.1 (runtime)
- Additional local storage for driver-specific data
- Object model management

### UI Components

**Material Design:**
- Material Components: 1.5.0
- Material DateTime Picker: 3.2.0
- Material Search Bar: 0.8.1 (User)

**View Binding & Data Binding:**
- View Binding: Enabled (both apps)
- Data Binding: Enabled (User app only)

**UI Libraries:**
- ButterKnife: 10.2.3 (both apps)
- Picasso: 2.5.2 (both apps)
- Picasso Transformations: 2.2.1 (User)
- Circle ImageView: 2.1.0
- Shimmer: 0.1.0
- Rounded ImageView: 2.2.1

### Background Processing

**WorkManager:**
- Work Runtime KTX: 2.7.1 (Driver), 2.7.0 (User)
- Periodic work requests
- Background trip fetching

**Lifecycle:**
- Lifecycle Runtime KTX: 2.4.1
- Lifecycle ViewModel KTX: 2.4.1
- Lifecycle LiveData KTX: 2.4.0 (User)

### Additional Libraries

**Validation:**
- Android Saripaar: 2.0.3 (form validation)
- Easy Permissions: 3.0.0

**Utilities:**
- JSoup: 1.11.3 (Driver), 1.13.1 (User) - HTML parsing
- Country Picker: 1.0
- PinView: 1.4.4 (OTP input)
- Audio Wife: 0.1.0 (audio playback)
- EventBus: 3.0.0
- Guava: 24.1-jre (Driver)

**Navigation (User App):**
- Navigation Fragment KTX: 2.3.5
- Navigation UI KTX: 2.3.5

**Localization:**
- Locale Helper Android: 1.1.4 (User)

**Responsive Sizing (User App):**
- SSP Android: 1.1.0 (scalable sp)
- SDP Android: 1.1.0 (scalable dp)

---

## Features

### Driver App Features

**Core Functionality:**
- **Location Tracking:** Continuous foreground service with 5-second interval updates
- **Trip Management:** Accept, start, complete trips/orders
- **Real-Time Trip Fetching:** Background service with 30-second polling
- **Order History:** Complete trip and order history with details
- **Vehicle Management:** Edit vehicle information and documents

**Communication:**
- **Chat System:** Real-time chat with users
  - Text messages
  - Voice notes (audio recording and playback)
  - Image sharing
  - Gallery integration

**Financial:**
- **Wallet System:**
  - View balance and transactions
  - Top-up wallet (credit card integration)
  - Withdraw earnings (bank account integration)
  - Transaction history

**Authentication & Profile:**
- **Phone Number Authentication:** SMS/OTP verification
- **Profile Management:** Edit driver profile, documents, photos
- **Password Management:** Change password functionality

**Notifications:**
- **FCM Notifications:** Real-time order/trip notifications
- **Foreground Notifications:** Persistent notifications for active services

### User App Features

**Transportation Services:**
- **Ride Booking (Car):**
  - Pickup and destination selection
  - Real-time driver finding with countdown
  - Live driver tracking on map
  - Route visualization
  - Trip progress tracking
  - Rating system after trip completion

- **Delivery Service (Send):**
  - Package delivery booking
  - Pickup and drop-off location selection
  - Real-time delivery tracking
  - Delivery history

- **Buy-for-Me Service:**
  - Shopping service booking
  - Timer functionality for shopping duration
  - Order total calculation
  - Shopping history

**Location Services:**
- **Geolink API Integration (wasalni_rider):**
  - Text Search API for location search
  - Directions API for route calculation
  - Geocoding API for address conversion
  - Reverse Geocoding API for coordinate to address
  - Custom API key integration

- **Saved Places Feature (August 2023):**
  - **Implementation:** Complete saved places management system
  - **Package:** `com.starbugs.wasalni_rider.ui.saved_places`
  - **Model:** `SavedPlace` data class with `name: String` and `latLng: LatLng`
  - **Adapter:** `SavedPlacesAdapter` - RecyclerView adapter for displaying saved places as chips
  - **UI Components:** Material Design Chips with custom styling
  - **Fonts:** Cairo fonts integration for Arabic place names
  - **Functionality:**
    - Save favorite locations with custom names
    - Quick access chips in location picker
    - Long-press to edit or delete saved places
    - Click to select saved place as pickup/destination
    - Persistent storage of saved places
  - **Version:** Introduced in versionCode 84, versionName 9.3
  - **Commit:** `684b8d1` (2023-08-26) - "Added Saved Places feature with icons, chips, dialogs, and optimizations"

**Merchant Integration:**
- **Merchant Browsing:**
  - Browse merchants by category
  - Merchant details and menus
  - Merchant location on map
  - Favorite merchants

- **Category System:**
  - Browse by categories
  - Category items
  - Merchant categorization

**Communication:**
- **Chat System:**
  - Real-time chat with drivers
  - Voice notes
  - Image sharing
  - Gallery integration

- **Chat Bot (2021-2022):**
  - Interactive chat bot
  - Previous orders action
  - Select merchant action
  - Delivery action
  - Category browsing

**Financial:**
- **Wallet System:**
  - View balance
  - Top-up wallet
  - Withdraw funds
  - Transaction history
  - Promo codes and discounts

**Additional Features:**
- **Order History:** Complete history of all services
- **Notifications:** Real-time trip/delivery progress notifications
- **Profile Management:** Edit profile, change password
- **Settings:** App settings and preferences
- **Account Deletion:** Request account deletion functionality

---

## Key Technical Implementations

### Location Tracking Service

**LocationTrackingService (Foreground Service):**

**LocationRequest Configuration:**
- **Interval:** 5 seconds (TimeUnit.SECONDS.toMillis(5))
- **Fastest Interval:** 3 seconds (TimeUnit.SECONDS.toMillis(3))
- **Priority:** PRIORITY_HIGH_ACCURACY
- **Smallest Displacement:** 10 meters (10f)

**Core Features:**
- Continuous location updates via FusedLocationProviderClient
- Foreground service with persistent notification (Arabic: "تتبع موقع السائق قيد التشغيل")
- Location persistence in SharedPreferences (`LocationPreferences` file)
- Broadcast location updates via LocalBroadcastManager
- LocationCallback-based update handling
- Kotlin Coroutines for async operations (CoroutineScope with Dispatchers.IO)

**Service Lifecycle:**
- **onCreate():** Initializes location services, sets up location callback
- **onStartCommand():** Starts foreground service and location updates based on intent flag
- **START_REDELIVER_INTENT:** Ensures service restarts with last intent
- **onBind():** Returns LocalBinder for activity-service communication

**Location Persistence:**
- SharedPreferences file: `LocationPreferences`
- Keys: `latitude` (Float), `longitude` (Float)
- Saves location on every update
- `getSavedLocation()` method returns Pair<Double, Double>? for retrieval

**Notification Management:**
- Notification channel: `location_tracking_channel_01`
- Notification ID: 12345678
- Arabic notification title: "دينامو للسائق"
- Arabic notification text: "تتبع موقع السائق قيد التشغيل"
- BigTextStyle for better visibility
- PendingIntent to MainActivity (FLAG_IMMUTABLE for Android 12+)
- Ongoing notification (non-dismissible)
- Public visibility

**Permission Handling:**
- **checkPermissions():** Verifies ACCESS_FINE_LOCATION and ACCESS_COARSE_LOCATION
- **checkForegroundServiceLocationPermission():** Checks FOREGROUND_SERVICE_LOCATION (Android 14+)
- Graceful service stop if permissions not granted
- SecurityException handling in location update methods

**Location Update Flow:**
1. LocationCallback receives location update
2. Current location stored in `currentLocation` property
3. `handleLocationUpdate()` called
4. Location saved to SharedPreferences
5. TimeDistanceCal updated (if active)
6. Location broadcasted via LocalBroadcastManager

**Broadcast System:**
- Action: `ACTION_LOCATION_UPDATE_BROADCAST`
- Extra: `EXTRA_LOCATION` (Location object)
- Uses LocalBroadcastManager for app-internal communication
- Activities/fragments can register broadcast receivers to get location updates

**Integration with TripFetchWorker:**
- TripFetchWorker reads saved location from SharedPreferences
- Enables location-based trip fetching
- Seamless coordination between services

**Error Handling:**
- SecurityException catching in location update methods
- Permission validation before service operations
- Comprehensive logging for debugging
- Service stop on permission denial

**TimeDistanceCal Integration:**
- Optional TimeDistanceCal object for distance/time calculations
- Updated on every location change (if not ended)
- Used for trip distance and time tracking

**Binder Pattern:**
- LocalBinder inner class for activity-service binding
- Allows activities to access service instance directly
- Enables method calls from bound activities

### Background Trip Fetching System

**Architecture:** Two-layer background processing system using Foreground Service + WorkManager

**TripFetchService (Foreground Service):**
- Foreground service implementation for reliable execution
- Checks driver status before starting periodic work
- Conditionally starts/stops based on driver active status
- Triggers TripFetchWorker every 30 seconds using Handler
- Foreground notification for service visibility
- Auto-stops when driver becomes inactive
- Permission checking before service start
- Notification channel management for Android O+
- Service lifecycle: START_STICKY for automatic restart

**Implementation Details:**
- Uses SharedPreferences to check driver status (`status_driver` flag)
- Handler-based periodic execution (30-second interval)
- Proper cleanup on service destruction
- Notification cancellation when service stops
- Runs only when driver is marked as active

**TripFetchWorker (WorkManager CoroutineWorker):**
- Coroutine-based worker for async operations
- Fetches available trips from backend API
- URL: `https://dinamo.pythonanywhere.com/get_trips`
- Location-based trip fetching (uses saved location from LocationTrackingService)
- Driver status checking before processing
- Ignored orders tracking with timestamp management
- 30-second wait period for ignored orders (prevents duplicate notifications)
- FIFO order processing (first trip in array gets priority)
- Wake lock and WiFi lock management for reliable execution
- 10-minute wake lock timeout
- Trip eligibility checking (budget settings, notification preferences)
- Automatic order display via NewOrderActivity Intent

**Ignored Orders Management:**
- Tracks orders that have been shown but not accepted
- Timestamp-based tracking in SharedPreferences
- 30-second cooldown period to prevent duplicate notifications
- Automatic cleanup of expired ignored orders
- JSON-based storage format for ignored orders map

**Location Integration:**
- Retrieves saved location from LocationTrackingService SharedPreferences
- Uses saved latitude/longitude for location-based trip fetching
- Falls back to location-agnostic request if no saved location
- Location passed as query parameters to trip fetch API

**Driver Eligibility Checking:**
- Budget settings validation (Unlimited or specific amount)
- Notification preference checking
- Additional setting validation
- Only processes trips within budget and notification settings

**Error Handling:**
- Network error handling with retry logic
- JSON parsing error handling
- Graceful degradation on failures
- Comprehensive logging for debugging
- Result.retry() for transient failures
- Result.success() for completed work

**Integration with LocationTrackingService:**
- Reads location from shared SharedPreferences
- Location key: `LocationPreferences` with `latitude` and `longitude` keys
- Seamless coordination between location tracking and trip fetching

### Custom Geolink API Integration (wasalni_rider package)

**Package:** `com.starbugs.wasalni_rider.ui.main.car.geo_service`

**Architecture:**
The Geolink API integration is implemented as a separate service layer in the `wasalni_rider` package, demonstrating production use of custom geolocation API as an alternative to Google Places API.

**GeolinkApiService Class:**
- Service class that manages Geolink API interactions
- Dynamic API key retrieval from backend (`/api/Driver/geo_link` endpoint)
- Fallback to default API link and key if backend retrieval fails
- Retrofit-based HTTP client initialization
- Kotlin Flow support for reactive programming (reverseGeocode, direction)
- Callback-based methods for geocode and textSearch

**Default Configuration:**
- Default API Link: `https://kariemseiam.pythonanywhere.com/`
- Default API Key: `eea98fb2-8bc4-47f6-a2e0-3567cdafa4a9`
- Backend API Endpoint: `https://dashboard.dinamo-app.com/api/Driver/geo_link`

**GeolinkService Retrofit Interface:**
- RESTful API interface definition
- Four main endpoints:

1. **Geocode** (`/geocode`):
   - Query parameter: `query` (address string)
   - Returns: `GeocodeResponse`
   - Converts address to coordinates

2. **Reverse Geocode** (`/reverse_geocode`):
   - Query parameters: `latitude`, `longitude`
   - Returns: `ReverseGeocodeResponse` (Flow-based)
   - Converts coordinates to address
   - Uses Kotlin Flow for reactive programming

3. **Directions** (`/directions`):
   - Query parameters: `origin_latitude`, `origin_longitude`, `destination_latitude`, `destination_longitude`
   - Returns: `DirectionResponse` (Flow-based)
   - Calculates route between two points
   - Returns route details, distance, duration

4. **Text Search** (`/text_search`):
   - Query parameters: `query` (search string), `latitude`, `longitude` (optional location bias)
   - Returns: `TextSearchResponse`
   - Searches locations by text query
   - Location-biased search for better relevance

**API Key Management:**
- Dynamic retrieval from backend on service initialization
- Backend returns API link and key via `/api/Driver/geo_link` endpoint
- Response format: `GeolinkApiInfoResponse` with code, message, and data (api, key)
- Graceful fallback to defaults on failure
- Error handling with logging

**Usage in CarViewModel:**
- Integrated as `private val apiService = GeolinkApiService()`
- Used for location search in ride booking flow
- Text search for pickup/destination selection
- Route calculation for trip visualization
- Geocoding for address display on map
- Reverse geocoding for displaying current location address

**Usage in Other Activities:**
- `ProgressActivity`: Route calculation and address display
- `NotificationProgressActivity`: Location services during trip progress
- `DetailsHistoryActivity`: Displaying historical trip locations

**Response Models:**
- `GeocodeResponse`: Address to coordinates conversion result
- `ReverseGeocodeResponse`: Coordinates to address conversion result
- `DirectionResponse`: Route calculation result with waypoints, distance, duration
- `TextSearchResponse`: Location search results
- `GeolinkApiInfoResponse`: Backend API configuration response
- `GeolinkApiData`: API link and key container

**Integration Pattern:**
- Production-ready custom API integration
- Alternative to Google Places API (cost-effective, customized for Egyptian market)
- Seamless integration with existing Google Maps SDK usage
- Caching support for route calculations (in CarViewModel)
- Error handling with user-friendly fallbacks

**Why Custom Geolink API:**
- Cost optimization (alternative to Google Places API pricing)
- Customized for Egyptian market requirements
- Better Arabic location name handling
- Custom routing optimized for local roads
- Full control over API features and responses

### Real-Time Communication

**Firebase Cloud Messaging:**
- Push notifications for orders/trips
- Real-time message delivery
- Topic subscriptions (driver, user, ouride)
- Token management and refresh

**Chat System:**
- Firebase Realtime Database for messages
- Image upload to Firebase Storage
- Voice note recording and playback
- Real-time message synchronization

### Database Usage

**Realm (Both Apps):**
- User session persistence
- Transaction data caching
- Local data storage
- Schema versioning

**ObjectBox (Driver App Only):**
- Additional local storage
- Object model management
- Performance optimization for driver-specific data

---

## Product Flavors Configuration

### Brand Flavors

**go:**
- Package: `com.starbugs.go_driver` / `com.starbugs.go_user`
- Base URLs:
  - Dev: `http://test.wessalegy.com/`
  - Prod: `http://wessalegy.com/`
- Main Screen: HOME (Driver), HOME (User)
- Google API Key: Specific to go brand

**wasalni:**
- Package: `com.starbugs.wasalni_driver` / `com.starbugs.wasalni_rider`
- Base URLs:
  - Dev: `https://dashboard.dinamo-app.com/`
  - Prod: `https://dashboard.dinamo-app.com/`
- Main Screen: RIDE (Driver), CAR (User)
- Google API Key: Specific to wasalni brand
- Additional features: Chat gallery option control

### Environment Flavors

**dev:**
- Development endpoints
- Debug configurations
- Test data access

**prod:**
- Production endpoints
- Release configurations
- Production data access

---

## Comprehensive Git Commit History Analysis (July 2023 - January 2025)

### Go_Driver Repository - Active Enhancement Period

**Major Feature Implementations:**

**September 2024 - Location Tracking & Notification Improvements:**
- `19d84ba` (2024-09-29): Fix driver status and location tracking handling
- `7ddefbb` (2024-09-29): Improve location tracking and notification handling
- `171bcf8` (2024-09-29): Refactor - Remove deprecated FCM API and update notification structure
- `98fc645` (2024-09-29): Update FCM message structure and dependencies
- `ba47be4` (2024-09-29): Implement background trip fetching service (TripFetchService + TripFetchWorker)

**Background Trip Fetching Implementation (Sep 2024):**
- Created `TripFetchService` - Foreground service for periodic trip checks
- Created `TripFetchWorker` - WorkManager worker for background execution
- 30-second polling interval for trip availability
- Conditional execution based on driver status
- Integration with `LocationTrackingService` for location-based trip fetching
- Ignored orders tracking with timestamp management
- Wake lock and WiFi lock management for reliable execution

**January 2025 - Error Handling Improvements:**
- `3da8c6c` (2025-01-13): Refactor code to improve error handling and logging for cancellation requests
- Enhanced error handling in OrderDetailActivity, OrderFragment
- Improved logging in LocationTrackingService, TripFetchService
- Better error messages in RequestHandler

**FCM Refactoring Branch (refactor-fcm):**
- Multiple merge commits from master (Mar 2024, Apr 2024, May 2024, Sep 2023)
- FCM message structure modernization
- Notification handling improvements
- Deprecated API removal

**July 2023 Updates:**
- `447027a` (2023-07-30): Finish update - Gradle, manifest, location fragment improvements
- `663094a` (2023-07-30): Finish update - LoginActivity improvements
- `0aad0b0` (2023-07-26): Finish update - Build config, manifest, OrderFragment updates
- `f9e392b` (2023-07-12): Finish update - NewOrderActivity, OrderFragment, MessagingService improvements
- `fc62c85` (2023-07-12): Finish update - LoginActivity, OrderFragment, transaction price response
- `fe590f5` (2023-07-12): Finish update - Build config, MainActivity, SplashActivity, OrderFragment

### Go_User Repository - Active Enhancement Period

**Major Feature Branches:**

**feature/saved-places (August 2023):**
- `7027679` (2023-08-26): Merge pull request #5 - Saved Places feature
- `684b8d1` (2023-08-26): Added Saved Places feature with:
  - Icons, chips, dialogs implementation
  - Cairo fonts integration
  - SavedPlace model and SavedPlacesAdapter
  - Version updates (versionCode 84, versionName 9.3)
- User favorite locations management
- Quick access chips with long-press for editing/deleting
- Integration with location picker for saved places

**refactor/search-api (September 2023):**
- `b51cdf9` (2023-09-12): Merge pull request #7 - Search API refactoring
- `888e689` (2023-09-12): Implemented app search API method V2
- Addressed crash issues up to versionCode 88 (Version 9.7)
- Enhanced search functionality with improved API methods
- Better error handling and UI updates

**feature/search-enhancements (August 2023):**
- `3ac3393` (2023-08-20): Merge pull request #3 - Search enhancements
- `5694018` (2023-08-20): Enhance app search method, customize search, improve UI
- Geolink API integration improvements
- Better search result handling
- Custom search UI components

**refactor/profile-ux (August 2023):**
- `2f32995` (2023-08-23): Merge pull request #4 - Profile UX refactoring
- `244e4ef` (2023-08-23): Remove redundant code and disable phone number editing
- `b61a881` (2023-08-23): Updated targetSdkVersion to 33 with necessary adjustments
- Improved profile management interface
- Better user experience in profile editing

**enhancement/registration-flow-updates (August 2023):**
- `f9f6270` (2023-08-20): Merge pull request #2 - Registration flow updates
- `57916e7` (2023-08-12): Flexible Email in Registration & FCM Token Reliability V2
- `7bb83ee` (2023-08-12): Flexible Email in Registration & FCM Token Reliability
- `8ea11e7` (2023-08-31): FCM Token Reliability V4
- Improved registration flow with flexible email handling
- Enhanced FCM token management and reliability
- Better error handling in registration process

**refactor/default-arabic-language (July 2024):**
- `452befc` (2024-07-09): Merge branch 'master' into refactor/default-arabic-language
- `0788aee` (2024-07-11): Update storeFile path, add locale metadata, and improve BaseActivity
- `f64da43` (2024-07-09): Update storeFile path, add locale metadata, and improve BaseActivity
- Default Arabic language implementation
- Locale metadata improvements
- BaseActivity enhancements for language handling

**bugfix/app-crash (September 2023):**
- `75b5cf6` (2023-09-04): Merge pull request #6 - App crash fixes
- `9f79561` (2023-09-04): Removed unused RECORD_AUDIO permission, updated versionName to 9.6
- Added new dependencies: ssp-android:1.1.0, sdp-android:1.1.0
- Improved UI handling for screens with higher density
- Enhanced camera listeners for efficient address geocoding
- Updated route handling, added directionPolyLine
- Handled API errors properly
- Introduced ic_tech_support.png icon

**Ongoing Code Maintainability Refactoring (2023-2024):**
- `d65fb96` (2024-05-12): Enhance code for better maintainability
- `2b78caf` (2024-04-21): Enhance code for better maintainability
- `2a3be69` (2024-02-19): Enhance code for better maintainability
- `2650188` (2023-12-26): Enhance code for better maintainability (2 commits)
- `fd7abdf` (2023-12-20): Enhance code for better maintainability (2 commits)
- `3cb6532` (2023-12-09): Enhance code for better maintainability
- `5f369a0` (2023-11-21): Enhance code for better maintainability
- `ddbeffc` (2023-11-20): Enhance code for better maintainability
- `36d343e` (2023-09-12): Enhance code for better maintainability (3 commits)
- Continuous improvements in code quality, structure, and maintainability

**Trip Data Fetching Enhancements (2024):**
- `762e732` (2024-12-04): Enhance trip data fetching and notification handling
- `f1c8b5a` (2024-11-12): Enhance trip data fetching and notification handling
- `6293402` (2024-09-30): Enhance trip data fetching and notification handling
- Improved background trip fetching reliability
- Better notification handling for trip updates
- Enhanced error handling and retry logic

**Additional Improvements:**
- `473d0f2` (2023-08-14): Update Icon Home, Add Navigation Drawer Enhancements
- `e2f59e5` (2023-08-20): Replace Toast with Snackbar handling
- `57fed7a` (2024-06-26): Update Gradle build file and refactor SmsCodeActivity

### Branch Analysis Summary

**Go_Driver Branches:**
- `master`: Main production branch
- `refactor-fcm`: FCM message structure refactoring
- `refactor-otp`: OTP handling improvements
- `wessalny_go`: Brand-specific branch
- `zanati`: Additional feature branch
- Multiple detached branches for testing/experimentation

**Go_User Branches:**
- `master`: Main production branch
- `feature/saved-places`: Saved places feature implementation
- `feature/search-enhancements`: Search functionality improvements
- `enhancement/registration-flow-updates`: Registration flow improvements
- `refactor/default-arabic-language`: Arabic language default implementation
- `refactor/profile-ux`: Profile UX improvements
- `refactor/search-api`: Search API V2 implementation
- `refactor/init-geolink`: Geolink API integration initialization
- `refactor/google-sms`: Google SMS integration refactoring
- `bugfix/app-crash`: Critical crash fixes
- `refactor-ui`: UI refactoring branch
- `translation`: Translation work branch
- `v1`, `wessal`, `zanati`: Additional feature/environment branches

---

## Production Deployment

**Current Versions (as of January 2025):**
- **Driver App:** versionCode 83, versionName 8.2.2
- **User App:** versionCode 116, versionName 10.3.7

**Version Evolution Timeline:**

**User App Version History:**
- versionCode 84, versionName 9.3 (August 2023) - Saved Places feature
- versionName 9.6 (September 2023) - App crash fixes, responsive sizing
- versionCode 88, versionName 9.7 (September 2023) - Search API V2
- versionCode 116, versionName 10.3.7 (Current) - Latest production version

**Driver App Version History:**
- versionCode 83, versionName 8.2.2 (Current) - Latest production version
- Background trip fetching service (September 2024)
- FCM modernization (September 2024)

**Backend Endpoints:**
- Dinamo (wasalni): `https://dashboard.dinamo-app.com/`
- Wessal (go): `http://wessalegy.com/` (prod), `http://test.wessalegy.com/` (dev)

**Signing:**
- Release builds with keystore signing
- Separate keystores for each app
- Production-ready APK/AAB generation

---

## Development Insights

### Challenges Solved

1. **Real-Time Location Tracking:**
   - Implemented foreground service with proper permission handling
   - Battery optimization considerations
   - Background location restrictions compliance

2. **Multi-Brand Support:**
   - Product flavors for different brands
   - Shared codebase with brand-specific configurations
   - Environment-specific endpoint management

3. **Background Processing:**
   - WorkManager integration for reliable background tasks
   - Foreground services for critical operations
   - Driver status checking and trip fetching

4. **Kotlin Migration:**
   - Complete codebase conversion from Java to Kotlin
   - Gradual migration maintaining functionality
   - Modern Kotlin features adoption

### Architecture Decisions

1. **Dual-App Architecture:**
   - Separate apps for better separation of concerns
   - Different UI/UX for drivers vs users
   - Independent deployment cycles

2. **Fragment-Based Navigation:**
   - Modular UI components
   - Better state management
   - Easier navigation flow

3. **Service-Oriented Design:**
   - Background services for critical operations
   - WorkManager for periodic tasks
   - Foreground services for user visibility

4. **Custom Geolink Integration:**
   - Production use of custom Geolink API
   - Alternative to Google Places API
   - Custom routing and geocoding
   - Dynamic API key management from backend
   - Cost-effective solution for Egyptian market

5. **Background Processing Architecture:**
   - Two-layer system (Foreground Service + WorkManager)
   - Reliable trip fetching with wake locks
   - Location-based trip filtering
   - Smart ignored orders management
   - Conditional execution based on driver status

---

## Related Projects

- **Areo:** Similar transportation tracking system for pilots/drivers
- **GeoLink Backend:** Custom geolocation API service used in Dinamo

---

## Key Learnings

1. **Dual-App Development:**
   - Managing shared backend API
   - Coordinating features across apps
   - Maintaining code consistency

2. **Location Services:**
   - Foreground service implementation
   - Battery optimization handling
   - Background location restrictions

3. **Product Flavors:**
   - Multi-brand application management
   - Environment configuration
   - Build variant management

4. **Real-Time Features:**
   - FCM integration and optimization
   - Firebase Realtime Database usage
   - Real-time location synchronization

---

**Last Updated:** January 2025 (Comprehensive commit history analysis completed - Jul 2023 - Jan 2025)  
**Status:** Production - Active Development  
**Documentation Status:** Complete with comprehensive commit history, detailed technical implementations, and full timeline analysis

