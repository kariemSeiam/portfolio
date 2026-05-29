import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'pigo-lang'

const translations = {
  en: {
    // Hero / Gate
    'gate.boot': 'System Boot',
    'gate.identity': 'THE ARCHITECT',
    'gate.name': 'Kariem',
    'gate.surname': 'Seiam',
    'gate.role': 'Systems Architect',
    'gate.role.alt': 'Infrastructure Builder',
    'gate.tagline': 'Bridging maps, markets, and minds — from Cairo to production.',
    'gate.status': 'SYSTEM STATUS',
    'gate.status.online': 'All Systems Online',
    'gate.cta.enter': 'Explore the Systems',
    'gate.cta.connect': 'Open Channel',

    // Metrics
    'metrics.title': 'Live Metrics',
    'metrics.subtitle': 'Production systems, real numbers',
    'metrics.requests': 'Monthly API Requests',
    'metrics.clients': 'Active Clients',
    'metrics.lines': 'Lines of Production Code',
    'metrics.downloads': 'App Downloads',
    'metrics.states': 'State Machine Transitions',
    'metrics.projects': 'Total Projects',

    // Pact
    'pact.title': 'The Operating System',
    'pact.subtitle': 'How this architect operates',
    'pact.evaluate': 'Evaluate before agreeing.',
    'pact.betrayal': 'Agreement before evaluation = betrayal.',
    'pact.path': 'State the path when clear.',
    'pact.evasion': 'Options when I have the answer = evasion.',
    'pact.pushback': 'Pushback is loyalty.',
    'pact.tool': 'A tool does what it\'s told.',
    'pact.partner': 'A partner says when you\'re wrong.',
    'pact.remember': 'Remember what was decided.',
    'pact.forgetting': 'Forgetting = Pact broken.',
    'pact.push.l0': 'Execute',
    'pact.push.l1': 'Note Once',
    'pact.push.l2': 'Hold — Risk',
    'pact.push.l3': 'Hard Stop',
    'pact.push.desc': 'Pushback scale — from execute to hard stop',

    // BrainHub
    'brainhub.title': 'Knowledge Base',
    'brainhub.subtitle': 'Search 120K+ words of documented experience',
    'brainhub.placeholder': 'Search architecture, decisions, patterns...',
    'brainhub.count': 'documents',
    'brainhub.noresults': 'No results found.',
    'brainhub.results': 'results',

    // System Diagram
    'diagram.title': 'System Architecture',
    'diagram.subtitle': 'Hvar-Hub — 4 interlocked state machines',
    'diagram.click': 'Click a machine to explore its states',

    // Navigation
    'nav.home': 'Home',
    'nav.journey': 'Journey',
    'nav.metrics': 'Metrics',
    'nav.systems': 'Systems',
    'nav.projects': 'Projects',
    'nav.knowledge': 'Knowledge',
    'nav.philosophy': 'Philosophy',
    'nav.skills': 'Skills',
    'nav.about': 'About',

    // General
    'theme.toggle': 'Toggle theme',
    'lang.toggle': 'عربي',
    'footer.crafted': 'Built with precision.',
    'footer.rights': 'All rights reserved.',
  },

  ar: {
    // Hero / Gate
    'gate.boot': 'إقلاع النظام',
    'gate.identity': 'المهندس',
    'gate.name': 'كريم',
    'gate.surname': 'سيام',
    'gate.role': 'مهندس أنظمة',
    'gate.role.alt': 'بنيان تحتية',
    'gate.tagline': 'جسر بين الخرائط والأسواق والعقول — من القاهرة إلى الإنتاج.',
    'gate.status': 'حالة النظام',
    'gate.status.online': 'جميع الأنظمة متصلة',
    'gate.cta.enter': 'استكشف الأنظمة',
    'gate.cta.connect': 'افتح قناة اتصال',

    // Metrics
    'metrics.title': 'إحصائيات حية',
    'metrics.subtitle': 'أنظمة إنتاجية، أرقام حقيقية',
    'metrics.requests': 'طلب شهري للـ API',
    'metrics.clients': 'عميل نشط',
    'metrics.lines': 'سطر كود إنتاجي',
    'metrics.downloads': 'تحميل التطبيقات',
    'metrics.states': 'انتقال حالة آلية',
    'metrics.projects': 'إجمالي المشاريع',

    // Pact
    'pact.title': 'نظام التشغيل',
    'pact.subtitle': 'كيف يعمل هذا المهندس',
    'pact.evaluate': 'قيّم قبل الموافقة.',
    'pact.betrayal': 'الموافقة قبل التقييم = خيانة.',
    'pact.path': 'حدد المسار عندما يكون واضحًا.',
    'pact.evasion': 'خيارات عندما أملك الإجابة = مراوغة.',
    'pact.pushback': 'الاعتراض هو الولاء.',
    'pact.tool': 'الأداة تنفذ ما يطلب منها.',
    'pact.partner': 'الشريك يقول عندما تخطئ.',
    'pact.remember': 'تذكر ما تم الاتفاق عليه.',
    'pact.forgetting': 'النسيان = خرق العهد.',
    'pact.push.l0': 'نفذ',
    'pact.push.l1': 'لاحظ مرة',
    'pact.push.l2': 'توقف — خطر',
    'pact.push.l3': 'توقف تام',
    'pact.push.desc': 'مقياس الاعتراض — من التنفيذ إلى التوقف التام',

    // BrainHub
    'brainhub.title': 'قاعدة المعرفة',
    'brainhub.subtitle': 'ابحث في أكثر من 120 ألف كلمة من الخبرة الموثقة',
    'brainhub.placeholder': 'ابحث في البنية، القرارات، الأنماط...',
    'brainhub.count': 'مستند',
    'brainhub.noresults': 'لا توجد نتائج.',
    'brainhub.results': 'نتيجة',

    // System Diagram
    'diagram.title': 'هندسة النظام',
    'diagram.subtitle': 'Hvar-Hub — 4 آلات حالة متشابكة',
    'diagram.click': 'اضغط على آلة لاستكشاف حالاتها',

    // Navigation
    'nav.home': 'الرئيسية',
    'nav.journey': 'المسيرة',
    'nav.metrics': 'الإحصائيات',
    'nav.systems': 'الأنظمة',
    'nav.projects': 'المشاريع',
    'nav.knowledge': 'المعرفة',
    'nav.philosophy': 'الفلسفة',
    'nav.skills': 'المهارات',
    'nav.about': 'عني',

    // General
    'theme.toggle': 'بدّل السمة',
    'lang.toggle': 'English',
    'footer.crafted': 'بُني بدقة.',
    'footer.rights': 'جميع الحقوق محفوظة.',
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'ar' || stored === 'en') return stored
    } catch {}
    // Default to English, detect browser preference for Arabic
    const browserLang = navigator.language?.startsWith('ar') ? 'ar' : 'en'
    return browserLang
  })

  const setLang = useCallback((l) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch {}
  }, [])

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'ar' : 'en')
  }, [setLang])

  const t = useCallback((key) => {
    return translations[lang][key] || key
  }, [lang])

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.classList.toggle('rtl', lang === 'ar')
    document.documentElement.classList.toggle('ltr', lang === 'en')
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
