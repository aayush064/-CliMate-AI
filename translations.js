// CliMate AI - Multilingual Translation System
// Comprehensive translation data for climate education platform

const translations = {
    // English (Default)
    en: {
        // Navigation and Header
        'nav.stories': 'Stories',
        'nav.impact': 'Impact',
        'nav.learn': 'Learn',
        'nav.community': 'Community',
        
        // Hero Section
        'hero.title': 'Discover Your Climate Story with AI',
        'hero.subtitle': 'Get personalized climate education, track your environmental impact, and join a community of climate champions',
        'hero.cta': 'Start Your Climate Journey',
        
        // Storyteller Section
        'storyteller.title': 'AI Climate Storyteller',
        'storyteller.description': 'Get personalized climate stories based on your location and interests',
        'storyteller.location.label': 'Your Location',
        'storyteller.location.placeholder': 'Enter your city or allow location access',
        'storyteller.interests.label': 'What interests you most?',
        'storyteller.age.label': 'Age Group',
        'storyteller.generate': 'Generate My Climate Story',
        'storyteller.placeholder': 'Your personalized climate story will appear here...',
        'storyteller.loading': 'Creating your personalized climate story...',
        'storyteller.error': 'Sorry, I couldn\'t generate your story right now. Please try again.',
        
        // Interests
        'interests.renewable': 'Renewable Energy',
        'interests.ocean': 'Ocean Conservation',
        'interests.forest': 'Forest Protection',
        'interests.sustainable': 'Sustainable Living',
        'interests.science': 'Climate Science',
        'interests.wildlife': 'Wildlife Protection',
        
        // Age Groups
        'age.young': '13-15 years',
        'age.teen': '16-18 years',
        'age.young-adult': '19-25 years',
        'age.educator': 'I\'m an educator',
        
        // Actions
        'actions.share': 'Share Story',
        'actions.save': 'Save Story',
        'actions.more': 'More Stories',
        'actions.walked': 'Walked instead of driving',
        'actions.recycled': 'Recycled waste',
        'actions.energy': 'Used energy-efficient appliances',
        'actions.water': 'Conserved water',
        'actions.plant': 'Planted a tree',
        'actions.public': 'Used public transport',
        
        // Impact Tracker
        'tracker.title': 'Your Climate Impact',
        'tracker.description': 'Track your daily actions and see their environmental impact',
        'tracker.carbon': 'CO₂ Saved Today',
        'tracker.water': 'Water Conserved',
        'tracker.energy': 'Energy Saved',
        'tracker.score': 'Eco Score',
        'tracker.log.title': 'Log Your Climate Actions',
        'tracker.progress': 'Your Weekly Progress',
        
        // Learning Section
        'learn.title': 'Climate Learning Hub',
        'learn.description': 'Interactive lessons and quizzes powered by AI',
        'learn.basics': 'Climate Basics',
        'learn.solutions': 'Climate Solutions',
        'learn.impact': 'Global Impact',
        'learn.action': 'Take Action',
        'learn.current.title': 'Introduction to Climate Change',
        'learn.current.intro': 'Climate change refers to long-term shifts in global temperatures and weather patterns. While natural variations occur, scientific evidence shows that human activities since the Industrial Revolution have been the primary driver of recent climate changes.',
        'learn.quiz': 'Take Quiz',
        'learn.next': 'Next Lesson',
        
        // Community Section
        'community.title': 'Climate Champions Community',
        'community.description': 'Connect with peers and share your climate journey',
        'community.leaderboard': '🏆 Top Climate Champions',
        'community.challenges': '🎯 Weekly Challenges',
        'community.share': 'Share Your Story',
        'community.share.placeholder': 'Share your climate action story with the community...',
        'community.share.btn': 'Share Story',
        
        // Challenges
        'challenges.bike': 'Bike to School Week',
        'challenges.bike.desc': 'Cycle instead of taking motorized transport',
        'challenges.plant': 'Plant for the Planet',
        'challenges.plant.desc': 'Help plant 1000 trees this month',
        
        // Chat Assistant
        'chat.welcome': 'Hi! I\'m your Climate AI assistant. Ask me anything about climate change, sustainability, or environmental action!',
        'chat.placeholder': 'Ask me about climate change...',
        'chat.thinking': 'Thinking...',
        'chat.error': 'Sorry, I couldn\'t process your message. Please try again.',
        
        // Weather and Climate Data
        'weather.temperature': 'Temperature',
        'weather.humidity': 'Humidity',
        'weather.condition': 'Condition',
        'weather.loading': 'Loading weather data...',
        'weather.error': 'Unable to load weather data',
        
        // Success Messages
        'success.story.shared': 'Your story has been shared with the community!',
        'success.story.saved': 'Story saved to your collection!',
        'success.action.logged': 'Great job! Your climate action has been logged.',
        'success.location.found': 'Location detected successfully!',
        
        // Error Messages
        'error.location.denied': 'Location access denied. Please enter your city manually.',
        'error.location.unavailable': 'Unable to determine your location.',
        'error.network': 'Network error. Please check your connection.',
        'error.general': 'Something went wrong. Please try again.',
    },
    
    // Spanish
    es: {
        // Navegación y Encabezado
        'nav.stories': 'Historias',
        'nav.impact': 'Impacto',
        'nav.learn': 'Aprender',
        'nav.community': 'Comunidad',
        
        // Sección Principal
        'hero.title': 'Descubre Tu Historia Climática con IA',
        'hero.subtitle': 'Obtén educación climática personalizada, rastrea tu impacto ambiental y únete a una comunidad de campeones del clima',
        'hero.cta': 'Comienza Tu Viaje Climático',
        
        // Sección del Narrador
        'storyteller.title': 'Narrador Climático con IA',
        'storyteller.description': 'Obtén historias climáticas personalizadas basadas en tu ubicación e intereses',
        'storyteller.location.label': 'Tu Ubicación',
        'storyteller.location.placeholder': 'Ingresa tu ciudad o permite acceso a ubicación',
        'storyteller.interests.label': '¿Qué te interesa más?',
        'storyteller.age.label': 'Grupo de Edad',
        'storyteller.generate': 'Generar Mi Historia Climática',
        'storyteller.placeholder': 'Tu historia climática personalizada aparecerá aquí...',
        'storyteller.loading': 'Creando tu historia climática personalizada...',
        'storyteller.error': 'Lo siento, no pude generar tu historia ahora. Por favor intenta de nuevo.',
        
        // Intereses
        'interests.renewable': 'Energía Renovable',
        'interests.ocean': 'Conservación Oceánica',
        'interests.forest': 'Protección Forestal',
        'interests.sustainable': 'Vida Sostenible',
        'interests.science': 'Ciencia Climática',
        'interests.wildlife': 'Protección de Vida Silvestre',
        
        // Grupos de Edad
        'age.young': '13-15 años',
        'age.teen': '16-18 años',
        'age.young-adult': '19-25 años',
        'age.educator': 'Soy educador',
        
        // Acciones
        'actions.share': 'Compartir Historia',
        'actions.save': 'Guardar Historia',
        'actions.more': 'Más Historias',
        'actions.walked': 'Caminé en lugar de conducir',
        'actions.recycled': 'Reciclé desechos',
        'actions.energy': 'Usé electrodomésticos eficientes',
        'actions.water': 'Conservé agua',
        'actions.plant': 'Planté un árbol',
        'actions.public': 'Usé transporte público',
        
        // Rastreador de Impacto
        'tracker.title': 'Tu Impacto Climático',
        'tracker.description': 'Rastrea tus acciones diarias y ve su impacto ambiental',
        'tracker.carbon': 'CO₂ Ahorrado Hoy',
        'tracker.water': 'Agua Conservada',
        'tracker.energy': 'Energía Ahorrada',
        'tracker.score': 'Puntuación Eco',
        'tracker.log.title': 'Registra Tus Acciones Climáticas',
        'tracker.progress': 'Tu Progreso Semanal',
        
        // Sección de Aprendizaje
        'learn.title': 'Centro de Aprendizaje Climático',
        'learn.description': 'Lecciones interactivas y cuestionarios impulsados por IA',
        'learn.basics': 'Conceptos Básicos del Clima',
        'learn.solutions': 'Soluciones Climáticas',
        'learn.impact': 'Impacto Global',
        'learn.action': 'Tomar Acción',
        'learn.current.title': 'Introducción al Cambio Climático',
        'learn.current.intro': 'El cambio climático se refiere a cambios a largo plazo en las temperaturas globales y los patrones climáticos. Aunque ocurren variaciones naturales, la evidencia científica muestra que las actividades humanas desde la Revolución Industrial han sido el principal impulsor de los cambios climáticos recientes.',
        'learn.quiz': 'Tomar Cuestionario',
        'learn.next': 'Siguiente Lección',
        
        // Sección de Comunidad
        'community.title': 'Comunidad de Campeones Climáticos',
        'community.description': 'Conéctate con compañeros y comparte tu viaje climático',
        'community.leaderboard': '🏆 Mejores Campeones Climáticos',
        'community.challenges': '🎯 Desafíos Semanales',
        'community.share': 'Comparte Tu Historia',
        'community.share.placeholder': 'Comparte tu historia de acción climática con la comunidad...',
        'community.share.btn': 'Compartir Historia',
        
        // Desafíos
        'challenges.bike': 'Semana de Bicicleta a la Escuela',
        'challenges.bike.desc': 'Usa bicicleta en lugar de transporte motorizado',
        'challenges.plant': 'Plantar por el Planeta',
        'challenges.plant.desc': 'Ayuda a plantar 1000 árboles este mes',
        
        // Asistente de Chat
        'chat.welcome': '¡Hola! Soy tu asistente de IA climática. ¡Pregúntame cualquier cosa sobre cambio climático, sostenibilidad o acción ambiental!',
        'chat.placeholder': 'Pregúntame sobre cambio climático...',
        'chat.thinking': 'Pensando...',
        'chat.error': 'Lo siento, no pude procesar tu mensaje. Por favor intenta de nuevo.',
        
        // Datos Climáticos y del Tiempo
        'weather.temperature': 'Temperatura',
        'weather.humidity': 'Humedad',
        'weather.condition': 'Condición',
        'weather.loading': 'Cargando datos del tiempo...',
        'weather.error': 'No se pueden cargar los datos del tiempo',
        
        // Mensajes de Éxito
        'success.story.shared': '¡Tu historia ha sido compartida con la comunidad!',
        'success.story.saved': '¡Historia guardada en tu colección!',
        'success.action.logged': '¡Excelente trabajo! Tu acción climática ha sido registrada.',
        'success.location.found': '¡Ubicación detectada exitosamente!',
        
        // Mensajes de Error
        'error.location.denied': 'Acceso a ubicación denegado. Por favor ingresa tu ciudad manualmente.',
        'error.location.unavailable': 'No se puede determinar tu ubicación.',
        'error.network': 'Error de red. Por favor verifica tu conexión.',
        'error.general': 'Algo salió mal. Por favor intenta de nuevo.',
    },
    
    // French
    fr: {
        // Navigation et En-tête
        'nav.stories': 'Histoires',
        'nav.impact': 'Impact',
        'nav.learn': 'Apprendre',
        'nav.community': 'Communauté',
        
        // Section Principale
        'hero.title': 'Découvrez Votre Histoire Climatique avec l\'IA',
        'hero.subtitle': 'Obtenez une éducation climatique personnalisée, suivez votre impact environnemental et rejoignez une communauté de champions du climat',
        'hero.cta': 'Commencez Votre Parcours Climatique',
        
        // Section du Narrateur
        'storyteller.title': 'Narrateur Climatique IA',
        'storyteller.description': 'Obtenez des histoires climatiques personnalisées basées sur votre localisation et vos intérêts',
        'storyteller.location.label': 'Votre Localisation',
        'storyteller.location.placeholder': 'Entrez votre ville ou autorisez l\'accès à la localisation',
        'storyteller.interests.label': 'Qu\'est-ce qui vous intéresse le plus ?',
        'storyteller.age.label': 'Groupe d\'Âge',
        'storyteller.generate': 'Générer Mon Histoire Climatique',
        'storyteller.placeholder': 'Votre histoire climatique personnalisée apparaîtra ici...',
        'storyteller.loading': 'Création de votre histoire climatique personnalisée...',
        'storyteller.error': 'Désolé, je n\'ai pas pu générer votre histoire maintenant. Veuillez réessayer.',
        
        // Intérêts
        'interests.renewable': 'Énergie Renouvelable',
        'interests.ocean': 'Conservation Océanique',
        'interests.forest': 'Protection Forestière',
        'interests.sustainable': 'Vie Durable',
        'interests.science': 'Science Climatique',
        'interests.wildlife': 'Protection de la Faune',
        
        // Groupes d\'Âge
        'age.young': '13-15 ans',
        'age.teen': '16-18 ans',
        'age.young-adult': '19-25 ans',
        'age.educator': 'Je suis éducateur',
        
        // Actions
        'actions.share': 'Partager l\'Histoire',
        'actions.save': 'Sauvegarder l\'Histoire',
        'actions.more': 'Plus d\'Histoires',
        'actions.walked': 'Marché au lieu de conduire',
        'actions.recycled': 'Recyclé des déchets',
        'actions.energy': 'Utilisé des appareils économes',
        'actions.water': 'Conservé l\'eau',
        'actions.plant': 'Planté un arbre',
        'actions.public': 'Utilisé les transports publics',
        
        // Suivi d\'Impact
        'tracker.title': 'Votre Impact Climatique',
        'tracker.description': 'Suivez vos actions quotidiennes et voyez leur impact environnemental',
        'tracker.carbon': 'CO₂ Économisé Aujourd\'hui',
        'tracker.water': 'Eau Conservée',
        'tracker.energy': 'Énergie Économisée',
        'tracker.score': 'Score Éco',
        'tracker.log.title': 'Enregistrez Vos Actions Climatiques',
        'tracker.progress': 'Votre Progrès Hebdomadaire',
        
        // Section d\'Apprentissage
        'learn.title': 'Centre d\'Apprentissage Climatique',
        'learn.description': 'Leçons interactives et quiz alimentés par l\'IA',
        'learn.basics': 'Bases du Climat',
        'learn.solutions': 'Solutions Climatiques',
        'learn.impact': 'Impact Global',
        'learn.action': 'Passer à l\'Action',
        'learn.current.title': 'Introduction au Changement Climatique',
        'learn.current.intro': 'Le changement climatique fait référence aux changements à long terme des températures mondiales et des modèles météorologiques. Bien que des variations naturelles se produisent, les preuves scientifiques montrent que les activités humaines depuis la révolution industrielle ont été le principal moteur des changements climatiques récents.',
        'learn.quiz': 'Faire le Quiz',
        'learn.next': 'Leçon Suivante',
        
        // Section Communauté
        'community.title': 'Communauté des Champions Climatiques',
        'community.description': 'Connectez-vous avec vos pairs et partagez votre parcours climatique',
        'community.leaderboard': '🏆 Meilleurs Champions Climatiques',
        'community.challenges': '🎯 Défis Hebdomadaires',
        'community.share': 'Partagez Votre Histoire',
        'community.share.placeholder': 'Partagez votre histoire d\'action climatique avec la communauté...',
        'community.share.btn': 'Partager l\'Histoire',
        
        // Défis
        'challenges.bike': 'Semaine du Vélo à l\'École',
        'challenges.bike.desc': 'Utilisez le vélo au lieu du transport motorisé',
        'challenges.plant': 'Planter pour la Planète',
        'challenges.plant.desc': 'Aidez à planter 1000 arbres ce mois-ci',
        
        // Assistant Chat
        'chat.welcome': 'Bonjour ! Je suis votre assistant IA climatique. Posez-moi n\'importe quelle question sur le changement climatique, la durabilité ou l\'action environnementale !',
        'chat.placeholder': 'Posez-moi des questions sur le changement climatique...',
        'chat.thinking': 'Réflexion...',
        'chat.error': 'Désolé, je n\'ai pas pu traiter votre message. Veuillez réessayer.',
        
        // Données Météorologiques et Climatiques
        'weather.temperature': 'Température',
        'weather.humidity': 'Humidité',
        'weather.condition': 'Condition',
        'weather.loading': 'Chargement des données météo...',
        'weather.error': 'Impossible de charger les données météo',
        
        // Messages de Succès
        'success.story.shared': 'Votre histoire a été partagée avec la communauté !',
        'success.story.saved': 'Histoire sauvegardée dans votre collection !',
        'success.action.logged': 'Excellent travail ! Votre action climatique a été enregistrée.',
        'success.location.found': 'Localisation détectée avec succès !',
        
        // Messages d\'Erreur
        'error.location.denied': 'Accès à la localisation refusé. Veuillez entrer votre ville manuellement.',
        'error.location.unavailable': 'Impossible de déterminer votre localisation.',
        'error.network': 'Erreur réseau. Veuillez vérifier votre connexion.',
        'error.general': 'Quelque chose s\'est mal passé. Veuillez réessayer.',
    }
};

// Translation Management Class
class TranslationManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = translations;
        this.init();
    }
    
    init() {
        // Detect browser language
        const browserLang = navigator.language.slice(0, 2);
        if (this.translations[browserLang]) {
            this.currentLanguage = browserLang;
        }
        
        // Check for saved language preference
        const savedLang = localStorage.getItem('climate-ai-language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        }
        
        // Set up language selector
        this.setupLanguageSelector();
        
        // Apply initial translations
        this.applyTranslations();
    }
    
    setupLanguageSelector() {
        const selector = document.getElementById('language-select');
        if (selector) {
            selector.value = this.currentLanguage;
            selector.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
    }
    
    setLanguage(languageCode) {
        if (this.translations[languageCode]) {
            this.currentLanguage = languageCode;
            localStorage.setItem('climate-ai-language', languageCode);
            this.applyTranslations();
            
            // Update language selector
            const selector = document.getElementById('language-select');
            if (selector) {
                selector.value = languageCode;
            }
            
            // Trigger custom event for other components
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: languageCode }
            }));
        }
    }
    
    translate(key, fallback = null) {
        const translation = this.translations[this.currentLanguage]?.[key] || 
                          this.translations['en']?.[key] || 
                          fallback || 
                          key;
        return translation;
    }
    
    applyTranslations() {
        // Translate elements with data-translate attribute
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translate(key);
            
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = translation;
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Translate placeholders with data-translate-placeholder attribute
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.translate(key);
            element.placeholder = translation;
        });
        
        // Update page title and meta description
        document.title = this.translate('meta.title', 'CliMate AI - Your Personal Climate Education Companion');
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.translate('meta.description', 'AI-powered personalized climate education platform');
        }
    }
    
    // Format numbers and dates according to locale
    formatNumber(number) {
        try {
            return new Intl.NumberFormat(this.getLocale()).format(number);
        } catch (e) {
            return number.toString();
        }
    }
    
    formatDate(date) {
        try {
            return new Intl.DateTimeFormat(this.getLocale()).format(new Date(date));
        } catch (e) {
            return date.toString();
        }
    }
    
    getLocale() {
        const localeMap = {
            'en': 'en-US',
            'es': 'es-ES',
            'fr': 'fr-FR'
        };
        return localeMap[this.currentLanguage] || 'en-US';
    }
    
    // Get current language code
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // Check if RTL language
    isRTL() {
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        return rtlLanguages.includes(this.currentLanguage);
    }
    
    // Get language name in native script
    getLanguageName(code = null) {
        const lang = code || this.currentLanguage;
        const names = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français'
        };
        return names[lang] || lang;
    }
}

// Initialize translation manager when DOM is loaded
let translationManager;

document.addEventListener('DOMContentLoaded', () => {
    translationManager = new TranslationManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TranslationManager, translations };
}

// Global function for easy access
function translate(key, fallback = null) {
    if (translationManager) {
        return translationManager.translate(key, fallback);
    }
    return fallback || key;
}

function setLanguage(languageCode) {
    if (translationManager) {
        translationManager.setLanguage(languageCode);
    }
}