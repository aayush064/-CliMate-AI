// CliMate AI - Main Application Controller
// Orchestrates all components and handles user interactions

class ClimateAIApp {
    constructor() {
        this.currentSection = 'storyteller';
        this.userProfile = {
            location: '',
            interests: [],
            ageGroup: '16-18',
            actions: [],
            stats: {
                carbonSaved: 0,
                waterSaved: 0,
                energySaved: 0,
                ecoScore: 0
            }
        };
        
        this.init();
    }
    
    async init() {
        await this.loadUserProfile();
        this.setupEventListeners();
        this.initializeComponents();
        this.startLoadingSequence();
    }
    
    async loadUserProfile() {
        // Load user data from localStorage
        const savedProfile = localStorage.getItem('climate-ai-profile');
        if (savedProfile) {
            try {
                this.userProfile = { ...this.userProfile, ...JSON.parse(savedProfile) };
            } catch (e) {
                console.warn('Could not load user profile:', e);
            }
        }
    }
    
    saveUserProfile() {
        localStorage.setItem('climate-ai-profile', JSON.stringify(this.userProfile));
    }
    
    setupEventListeners() {
        // Navigation
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('.nav-btn').dataset.section;
                this.switchSection(section);
            });
        });
        
        // Welcome section CTA
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.startJourney();
            });
        }
        
        // Action tiles for impact tracking
        const actionTiles = document.querySelectorAll('.action-tile');
        actionTiles.forEach(tile => {
            tile.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                const impact = parseFloat(e.currentTarget.dataset.impact);
                this.logClimateAction(action, impact);
            });
        });
        
        // Learning category buttons
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.switchLessonCategory(category);
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        // Form input handlers
        this.setupFormInputs();
        
        // Window events
        window.addEventListener('beforeunload', () => {
            this.saveUserProfile();
        });
        
        // Language change handler
        document.addEventListener('languageChanged', (e) => {
            this.updateUserInterface(e.detail.language);
        });
    }
    
    setupFormInputs() {
        // Location input
        const locationInput = document.getElementById('user-location');
        if (locationInput) {
            locationInput.addEventListener('change', (e) => {
                this.userProfile.location = e.target.value;
                this.saveUserProfile();
            });
        }
        
        // Interests selection
        const interestsSelect = document.getElementById('user-interests');
        if (interestsSelect) {
            interestsSelect.addEventListener('change', (e) => {
                this.userProfile.interests = Array.from(e.target.selectedOptions).map(option => option.value);
                this.saveUserProfile();
            });
        }
        
        // Age group selection
        const ageGroupSelect = document.getElementById('age-group');
        if (ageGroupSelect) {
            ageGroupSelect.addEventListener('change', (e) => {
                this.userProfile.ageGroup = e.target.value;
                this.saveUserProfile();
            });
        }
    }
    
    initializeComponents() {
        // Initialize stats display
        this.updateStatsDisplay();
        
        // Set up section visibility
        this.switchSection(this.currentSection);
        
        // Initialize welcome section if first visit
        if (!localStorage.getItem('climate-ai-visited')) {
            this.showWelcomeSection();
            localStorage.setItem('climate-ai-visited', 'true');
        }
    }
    
    async startLoadingSequence() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        if (!loadingScreen || !app) return;
        
        // Simulate loading process
        const loadingSteps = [
            { message: 'Initializing Climate AI...', duration: 800 },
            { message: 'Loading climate data...', duration: 1000 },
            { message: 'Setting up personalization...', duration: 600 },
            { message: 'Preparing your experience...', duration: 400 }
        ];
        
        const loadingContent = loadingScreen.querySelector('.loading-content h2');
        
        for (let i = 0; i < loadingSteps.length; i++) {
            const step = loadingSteps[i];
            if (loadingContent) {
                loadingContent.textContent = step.message;
            }
            await this.delay(step.duration);
        }
        
        // Hide loading screen and show app
        loadingScreen.style.opacity = '0';
        await this.delay(500);
        loadingScreen.style.display = 'none';
        app.style.display = 'block';
        app.style.opacity = '0';
        app.style.transform = 'translateY(20px)';
        
        // Animate app entrance
        requestAnimationFrame(() => {
            app.style.transition = 'all 0.6s ease-out';
            app.style.opacity = '1';
            app.style.transform = 'translateY(0)';
        });
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === sectionName);
        });
        
        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.toggle('active', section.id === sectionName);
        });
        
        // Hide welcome section if switching to other sections
        const welcomeSection = document.getElementById('welcome-section');
        if (welcomeSection && sectionName !== 'welcome') {
            welcomeSection.style.display = 'none';
        }
        
        this.currentSection = sectionName;
        
        // Update page title
        const sectionTitles = {
            storyteller: 'AI Climate Storyteller',
            tracker: 'Impact Tracker', 
            learn: 'Learning Hub',
            community: 'Community'
        };
        
        document.title = `CliMate AI - ${sectionTitles[sectionName] || 'Climate Education'}`;
        
        // Track section changes
        this.trackEvent('section_change', { section: sectionName });
    }
    
    startJourney() {
        // Hide welcome section and show storyteller
        const welcomeSection = document.getElementById('welcome-section');
        if (welcomeSection) {
            welcomeSection.style.display = 'none';
        }
        
        this.switchSection('storyteller');
        
        // Focus on location input
        const locationInput = document.getElementById('user-location');
        if (locationInput) {
            locationInput.focus();
        }
        
        // Show tutorial overlay if first time
        if (!localStorage.getItem('climate-ai-tutorial-shown')) {
            this.showTutorial();
            localStorage.setItem('climate-ai-tutorial-shown', 'true');
        }
    }
    
    showWelcomeSection() {
        const welcomeSection = document.getElementById('welcome-section');
        if (welcomeSection) {
            welcomeSection.style.display = 'grid';
        }
        
        // Animate elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const ctaButton = document.querySelector('.cta-button');
        
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroTitle.style.transition = 'all 0.8s ease-out';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroSubtitle.style.transition = 'all 0.8s ease-out';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 500);
        }
        
        if (ctaButton) {
            ctaButton.style.opacity = '0';
            ctaButton.style.transform = 'translateY(30px)';
            setTimeout(() => {
                ctaButton.style.transition = 'all 0.8s ease-out';
                ctaButton.style.opacity = '1';
                ctaButton.style.transform = 'translateY(0)';
            }, 700);
        }
    }
    
    logClimateAction(actionType, impact) {
        const action = {
            id: Date.now(),
            type: actionType,
            impact: impact,
            date: new Date().toISOString(),
            location: this.userProfile.location
        };
        
        this.userProfile.actions.push(action);
        
        // Update stats
        this.userProfile.stats.carbonSaved += impact;
        this.userProfile.stats.ecoScore += Math.round(impact * 10);
        
        // Update water and energy based on action type
        if (actionType === 'water') {
            this.userProfile.stats.waterSaved += impact * 50; // 50L per kg CO2
        }
        if (actionType === 'energy') {
            this.userProfile.stats.energySaved += impact * 2.5; // 2.5 kWh per kg CO2
        }
        
        // Save to localStorage
        this.saveUserProfile();
        
        // Update UI
        this.updateStatsDisplay();
        this.showActionFeedback(actionType, impact);
        
        // Update visualizations
        if (climateVisualizations) {
            climateVisualizations.drawProgressChart();
        }
        
        // Track the action
        this.trackEvent('climate_action', { type: actionType, impact: impact });
    }
    
    updateStatsDisplay() {
        const stats = this.userProfile.stats;
        
        // Update impact cards
        const carbonElement = document.getElementById('carbon-saved');
        if (carbonElement) {
            this.animateNumber(carbonElement, stats.carbonSaved, 'kg');
        }
        
        const waterElement = document.getElementById('water-saved');
        if (waterElement) {
            this.animateNumber(waterElement, stats.waterSaved, 'L');
        }
        
        const energyElement = document.getElementById('energy-saved');
        if (energyElement) {
            this.animateNumber(energyElement, stats.energySaved, 'kWh');
        }
        
        const scoreElement = document.getElementById('eco-score');
        if (scoreElement) {
            this.animateNumber(scoreElement, stats.ecoScore, '');
        }
    }
    
    animateNumber(element, targetValue, unit) {
        const startValue = parseFloat(element.textContent) || 0;
        const difference = targetValue - startValue;
        const duration = 1000; // 1 second
        const steps = 60;
        const stepValue = difference / steps;
        const stepDuration = duration / steps;
        
        let currentValue = startValue;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            currentValue += stepValue;
            
            if (step >= steps) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            element.textContent = `${Math.round(currentValue * 10) / 10} ${unit}`;
        }, stepDuration);
    }
    
    showActionFeedback(actionType, impact) {
        // Create floating feedback animation
        const feedback = document.createElement('div');
        feedback.className = 'action-feedback';
        feedback.innerHTML = `
            <div class="feedback-icon">🌱</div>
            <div class="feedback-text">+${impact} kg CO₂ saved!</div>
        `;
        
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 1rem 2rem;
            border-radius: 2rem;
            box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
            transition: all 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
        
        // Animate out
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translate(-50%, -50%) scale(0.8) translateY(-20px)';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 2000);
    }
    
    switchLessonCategory(category) {
        // Update category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        // Update lesson content
        this.loadLessonContent(category);
    }
    
    loadLessonContent(category) {
        const lessonContent = document.getElementById('current-lesson');
        if (!lessonContent) return;
        
        const lessons = {
            basics: {
                title: 'Climate Basics: Understanding the Science',
                content: `Climate change refers to long-term shifts in global temperatures and weather patterns. 
                         While natural variations occur, scientific evidence shows that human activities since the 
                         Industrial Revolution have been the primary driver of recent climate changes.
                         
                         The greenhouse effect is fundamental to understanding climate change. Certain gases in our 
                         atmosphere trap heat from the sun, warming our planet. While this natural process makes 
                         Earth habitable, human activities have increased these greenhouse gases, intensifying the effect.`,
                interactive: true
            },
            solutions: {
                title: 'Climate Solutions: Technology and Innovation',
                content: `The transition to renewable energy is one of the most impactful solutions to climate change. 
                         Solar, wind, hydro, and geothermal energy sources are becoming increasingly cost-effective 
                         and efficient.
                         
                         Beyond energy, solutions include sustainable transportation, carbon capture technologies, 
                         reforestation, sustainable agriculture, and circular economy principles. Innovation in 
                         these areas is accelerating rapidly.`,
                interactive: false
            },
            impact: {
                title: 'Global Impact: How Climate Change Affects Our World',
                content: `Climate change impacts vary by region but affect every corner of our planet. Rising sea levels 
                         threaten coastal communities, changing precipitation patterns affect agriculture, and increasing 
                         temperatures alter ecosystems.
                         
                         These changes disproportionately affect vulnerable populations, making climate action also 
                         a matter of social justice. Understanding these impacts helps us prepare and adapt while 
                         working to reduce future risks.`,
                interactive: true
            },
            action: {
                title: 'Take Action: What You Can Do',
                content: `Individual actions, while important, are most powerful when combined with collective effort. 
                         You can reduce your carbon footprint through transportation choices, energy use, diet, 
                         and consumption patterns.
                         
                         Beyond personal actions, you can influence change through civic engagement, supporting 
                         sustainable businesses, educating others, and participating in community initiatives. 
                         Your voice and choices matter in building a sustainable future.`,
                interactive: false
            }
        };
        
        const lesson = lessons[category];
        if (!lesson) return;
        
        lessonContent.querySelector('h3').textContent = lesson.title;
        lessonContent.querySelector('.lesson-body p').textContent = lesson.content;
        
        // Show/hide interactive elements based on lesson
        const interactiveElement = lessonContent.querySelector('.interactive-element');
        if (interactiveElement) {
            interactiveElement.style.display = lesson.interactive ? 'flex' : 'none';
        }
    }
    
    showTutorial() {
        // Create tutorial overlay
        const tutorial = document.createElement('div');
        tutorial.className = 'tutorial-overlay';
        tutorial.innerHTML = `
            <div class="tutorial-content">
                <div class="tutorial-header">
                    <h2>Welcome to CliMate AI! 🌍</h2>
                    <button class="tutorial-close">&times;</button>
                </div>
                <div class="tutorial-body">
                    <div class="tutorial-step active" data-step="1">
                        <h3>🌟 Tell Your Story</h3>
                        <p>Enter your location and interests to get personalized climate stories powered by AI.</p>
                        <div class="tutorial-arrow"></div>
                    </div>
                    <div class="tutorial-step" data-step="2">
                        <h3>📊 Track Your Impact</h3>
                        <p>Log your daily climate actions and watch your positive impact grow over time.</p>
                    </div>
                    <div class="tutorial-step" data-step="3">
                        <h3>🎓 Learn & Explore</h3>
                        <p>Access interactive lessons about climate science, solutions, and global impacts.</p>
                    </div>
                    <div class="tutorial-step" data-step="4">
                        <h3>🤝 Join the Community</h3>
                        <p>Connect with other climate champions and participate in weekly challenges.</p>
                    </div>
                </div>
                <div class="tutorial-footer">
                    <button class="tutorial-prev" style="display: none;">Previous</button>
                    <div class="tutorial-dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <button class="tutorial-next">Next</button>
                </div>
            </div>
        `;
        
        tutorial.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(tutorial);
        
        // Animate in
        setTimeout(() => {
            tutorial.style.opacity = '1';
        }, 100);
        
        this.setupTutorialNavigation(tutorial);
    }
    
    setupTutorialNavigation(tutorial) {
        let currentStep = 1;
        const totalSteps = 4;
        
        const updateTutorial = () => {
            // Update steps
            tutorial.querySelectorAll('.tutorial-step').forEach((step, index) => {
                step.classList.toggle('active', index + 1 === currentStep);
            });
            
            // Update dots
            tutorial.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index + 1 === currentStep);
            });
            
            // Update buttons
            const prevBtn = tutorial.querySelector('.tutorial-prev');
            const nextBtn = tutorial.querySelector('.tutorial-next');
            
            prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
            nextBtn.textContent = currentStep === totalSteps ? 'Get Started!' : 'Next';
        };
        
        // Navigation handlers
        tutorial.querySelector('.tutorial-next').addEventListener('click', () => {
            if (currentStep < totalSteps) {
                currentStep++;
                updateTutorial();
            } else {
                this.closeTutorial(tutorial);
            }
        });
        
        tutorial.querySelector('.tutorial-prev').addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateTutorial();
            }
        });
        
        tutorial.querySelector('.tutorial-close').addEventListener('click', () => {
            this.closeTutorial(tutorial);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeTutorial(tutorial);
            }
        });
    }
    
    closeTutorial(tutorial) {
        tutorial.style.opacity = '0';
        setTimeout(() => {
            if (tutorial.parentNode) {
                tutorial.parentNode.removeChild(tutorial);
            }
        }, 300);
    }
    
    handleKeyboardShortcuts(e) {
        // Cmd/Ctrl + number keys for section navigation
        if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const sections = ['storyteller', 'tracker', 'learn', 'community'];
            const sectionIndex = parseInt(e.key) - 1;
            if (sections[sectionIndex]) {
                this.switchSection(sections[sectionIndex]);
            }
        }
        
        // Escape key to close modals/overlays
        if (e.key === 'Escape') {
            const chatWindow = document.getElementById('chat-window');
            if (chatWindow && chatWindow.classList.contains('open')) {
                chatWindow.classList.remove('open');
            }
        }
    }
    
    updateUserInterface(language) {
        // Update any dynamic content that needs language-specific formatting
        this.updateStatsDisplay();
        
        // Update date/time displays
        document.querySelectorAll('[data-timestamp]').forEach(element => {
            const timestamp = element.dataset.timestamp;
            if (translationManager) {
                element.textContent = translationManager.formatDate(timestamp);
            }
        });
    }
    
    trackEvent(eventName, data = {}) {
        // Basic analytics tracking (can be replaced with real analytics)
        const event = {
            name: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.log('Event tracked:', event);
        
        // Store events locally for demo purposes
        const events = JSON.parse(localStorage.getItem('climate-ai-events') || '[]');
        events.push(event);
        
        // Keep only last 100 events
        if (events.length > 100) {
            events.splice(0, events.length - 100);
        }
        
        localStorage.setItem('climate-ai-events', JSON.stringify(events));
    }
    
    // Export user data
    exportUserData() {
        const exportData = {
            profile: this.userProfile,
            events: JSON.parse(localStorage.getItem('climate-ai-events') || '[]'),
            stories: JSON.parse(localStorage.getItem('climate-ai-stories') || '[]'),
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `climate-ai-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
}

// Global functions for HTML onclick handlers
function startJourney() {
    if (climateApp) {
        climateApp.startJourney();
    }
}

function startQuiz() {
    alert('Quiz feature coming soon! 🎯');
}

function nextLesson() {
    alert('More lessons coming soon! 📚');
}

function shareUserStory() {
    const storyText = document.getElementById('user-story')?.value;
    if (storyText?.trim()) {
        // Simulate sharing to community
        alert('Your story has been shared with the community! 🌟');
        document.getElementById('user-story').value = '';
    } else {
        alert('Please write your story first! ✍️');
    }
}

// Initialize the main application
let climateApp;

document.addEventListener('DOMContentLoaded', async () => {
    // Small delay to ensure all other components are initialized
    setTimeout(() => {
        climateApp = new ClimateAIApp();
    }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (climateApp && document.hidden) {
        climateApp.saveUserProfile();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ClimateAIApp };
}