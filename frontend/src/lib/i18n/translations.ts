export const translations = {
  en: {
    dashboard: 'Dashboard',
    sales: 'Sales',
    purchase: 'Purchase',
    inventory: 'Inventory',
    accounting: 'Accounting',
    hr: 'Human Resources',
    production: 'Production',
    assets: 'Assets',
    crm: 'CRM',
    welcome: 'Welcome back',
    logout: 'Logout',
    settings: 'Settings',
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    sales: 'বিক্রয়',
    purchase: 'ক্রয়',
    inventory: 'ইনভেন্টরি',
    accounting: 'অ্যাকাউন্টিং',
    hr: 'মানব সম্পদ',
    production: 'উৎপাদন',
    assets: 'সম্পদ',
    crm: 'সিআরএম',
    welcome: 'স্বাগতম',
    logout: 'লগআউট',
    settings: 'সেটিংস',
  }
};

export type Locale = 'en' | 'bn';
export type TranslationKey = keyof typeof translations.en;
