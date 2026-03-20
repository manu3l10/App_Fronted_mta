import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    es: {
        // Welcome Screen
        'welcome.title': 'My Travel Assistance',
        'welcome.subtitle': 'Tu compañero de aventuras',
        'welcome.description': 'Planifica viajes perfectos con el poder de la Inteligencia Artificial',
        'welcome.start': 'Comenzar ahora',
        'welcome.feature1': 'Itinerarios Inteligentes',
        'welcome.feature2': 'Recomendaciones en tiempo real',

        // Home Header
        'home.tagline': 'Tu compañero inteligente',

        // Side Menu
        'menu.profile': 'Perfil',
        'menu.calendar': 'Calendario',
        'menu.community': 'Comunidad',
        'menu.itineraries': 'Mis itinerarios',
        'menu.favorites': 'Favoritos',
        'menu.settings': 'Configuración',
        'menu.premium': 'Plan Premium',
        'menu.premiumFull': 'Despreocúpate de todo',
        'menu.stats.deptos': 'Deptos',
        'menu.stats.planes': 'Planes',
        'menu.stats.logros': 'Logros',
        'menu.user': 'Viajero',

        // AI Chat
        'chat.header': 'Asistente MTA',
        'chat.subheader': 'Siempre listo para ayudarte',
        'chat.inputPlaceholder': '¿A dónde quieres ir?',
        'chat.suggestion1': 'Plan en Cartagena',
        'chat.suggestion2': 'Medellín y Guatapé',
        'chat.suggestion3': 'Eje Cafetero (Salento)',
        'chat.suggestion4': 'Parque Tayrona',
        'chat.aiResponsePrefix': '¡Excelente elección! Colombia tiene lugares increíbles. He preparado esta propuesta para ti:',

        // Settings
        'settings.title': 'Configuración',
        'settings.account': 'Cuenta',
        'settings.language': 'Idioma',
        'settings.notifications': 'Notificaciones',
        'settings.darkMode': 'Modo oscuro',
        'settings.privacy': 'Privacidad y Seguridad',
        'settings.privacyLabel': 'Privacidad',
        'settings.payment': 'Métodos de pago',
        'settings.support': 'Soporte',
        'settings.help': 'Centro de ayuda',
        'settings.version': 'Versión',
        'home.notificationsTitle': 'Notificaciones',
        'home.noNotifications': 'No tienes notificaciones pendientes',
        'home.logout': 'Cerrar sesión',
        'calendar.title': 'Mi Calendario',
        'calendar.noEvents': 'No tienes eventos para este día',
        'calendar.days.mon': 'Lun',
        'calendar.days.tue': 'Mar',
        'calendar.days.wed': 'Mié',
        'calendar.days.thu': 'Jue',
        'calendar.days.fri': 'Vie',
        'calendar.days.sat': 'Sáb',
        'calendar.days.sun': 'Dom',
    },
    en: {
        // Welcome Screen
        'welcome.title': 'My Travel Assistance',
        'welcome.subtitle': 'Your adventure companion',
        'welcome.description': 'Plan perfect trips with the power of Artificial Intelligence',
        'welcome.start': 'Get Started',
        'welcome.feature1': 'Smart Itineraries',
        'welcome.feature2': 'Real-time recommendations',

        // Home Header
        'home.tagline': 'Your smart companion',

        // Side Menu
        'menu.profile': 'Profile',
        'menu.calendar': 'Calendar',
        'menu.community': 'Community',
        'menu.itineraries': 'My itineraries',
        'menu.favorites': 'Favorites',
        'menu.settings': 'Settings',
        'menu.premium': 'Premium Plan',
        'menu.premiumFull': 'No worries for you',
        'menu.stats.deptos': 'States',
        'menu.stats.planes': 'Plans',
        'menu.stats.logros': 'Achievements',
        'menu.user': 'Traveler',

        // AI Chat
        'chat.header': 'MTA Assistant',
        'chat.subheader': 'Always ready to help',
        'chat.inputPlaceholder': 'Where do you want to go?',
        'chat.suggestion1': 'Cartagena Trip',
        'chat.suggestion2': 'Medellin & Guatape',
        'chat.suggestion3': 'Coffee Region',
        'chat.suggestion4': 'Tayrona Park',
        'chat.aiResponsePrefix': 'Excellent choice! Colombia has amazing places. I have prepared this proposal for you:',

        // Settings
        'settings.title': 'Settings',
        'settings.account': 'Account',
        'settings.language': 'Language',
        'settings.notifications': 'Notifications',
        'settings.darkMode': 'Dark Mode',
        'settings.privacy': 'Privacy & Security',
        'settings.privacyLabel': 'Privacy',
        'settings.payment': 'Payment Methods',
        'settings.support': 'Support',
        'settings.help': 'Help Center',
        'settings.version': 'Version',
        'home.notificationsTitle': 'Notifications',
        'home.noNotifications': 'You have no pending notifications',
        'home.logout': 'Logout',
        'calendar.title': 'My Calendar',
        'calendar.noEvents': 'You have no events for this day',
        'calendar.days.mon': 'Mon',
        'calendar.days.tue': 'Tue',
        'calendar.days.wed': 'Wed',
        'calendar.days.thu': 'Thu',
        'calendar.days.fri': 'Fri',
        'calendar.days.sat': 'Sat',
        'calendar.days.sun': 'Sun',
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Language>(() => {
        const saved = localStorage.getItem('app_lang');
        return (saved as Language) || 'es';
    });

    useEffect(() => {
        localStorage.setItem('app_lang', lang);
    }, [lang]);

    const t = (key: string): string => {
        return (translations[lang] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
