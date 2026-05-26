// Career history data - Structure from BrainHub

export const careerPositions = [
  {
    id: 1,
    company: 'Freelance',
    role: 'Full-Stack Architect & Geolocation Specialist',
    period: '2024 - Present',
    description: 'Building production infrastructure — geolocation APIs, business systems, agent bridges. Every project serves real users at real scale.',
    achievements: [
      'Three-way reconciliation engine connecting ERP, shipping, customers (79K+ lines, 56 atomic state transitions)',
      'Geolink API: 5M+ requests/month, 50+ clients, credit billing, 8 Flask Blueprints',
      'Plumb: A2A bridge with 8 adapters — the wire between CLI agents and the agent internet',
      'Arabic/RTL-native across every flagship. Not translated — built from day one.',
    ],
    isCurrent: true,
  },
  {
    id: 2,
    company: 'Android Development',
    role: 'Android Systems Developer',
    period: '2023 - 2024',
    description: 'Production mobile development with Clean Architecture, real-time systems, and battery-optimized background services.',
    achievements: [
      'Taxiarab: dual-app ecosystem (Rider 17 releases + Driver 26 releases), 5-module Clean Architecture',
      'LocationServiceManager singleton coordinating 3 foreground services',
      'Pusher WebSocket real-time ride events with adaptive tracking (5s/30s)',
      'Boot recovery, sequential permission queue, Android 15+ compatibility',
    ],
    isCurrent: false,
  },
  {
    id: 3,
    company: 'Learning & Growth',
    role: 'Software Developer',
    period: '2021 - 2023',
    description: 'Foundation building phase focused on Java and Kotlin development, exploring Android ecosystem and transitioning to modern development practices.',
    achievements: [
      'Built 13+ Android applications with Material Design',
      'Transitioned from Java to Kotlin development',
      'Created creative writing platform with Firebase backend',
      'Participated in hackathons and competitive programming',
    ],
    isCurrent: false,
  },
  {
    id: 4,
    company: 'Computer Science Student',
    role: 'Student Developer',
    period: '2019 - 2021',
    description: 'Started coding journey as Computer Science and Mathematics student, learning fundamentals and building first applications.',
    achievements: [
      'Created first marketplace application in Java',
      'Learned object-oriented programming principles',
      'Developed understanding of database concepts',
      'Built foundation for Android development career',
    ],
    isCurrent: false,
  },
]
