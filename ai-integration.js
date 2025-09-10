// CliMate AI - AI Integration System
// Handles OpenAI API calls and AI-powered features

class AIIntegration {
    constructor() {
        // IMPORTANT: In production, use environment variables or server proxy
        // For hackathon demo, we'll use a client-side approach with rate limiting
        this.apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your API key
        this.baseURL = 'https://api.openai.com/v1/chat/completions';
        
        // Alternative: Use a free proxy service for demo purposes
        // this.useProxy = true;
        // this.proxyURL = 'https://api.pawan.krd/v1/chat/completions';
        
        this.rateLimiter = {
            calls: 0,
            resetTime: Date.now() + 3600000, // 1 hour
            maxCalls: 50 // Limit for demo
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeChat();
    }
    
    setupEventListeners() {
        // Story generation
        const generateBtn = document.getElementById('generate-story-btn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateClimateStory();
            });
        }
        
        // Chat functionality
        const chatSend = document.getElementById('chat-send');
        const chatInput = document.getElementById('chat-input');
        
        if (chatSend && chatInput) {
            chatSend.addEventListener('click', () => {
                this.sendChatMessage();
            });
            
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendChatMessage();
                }
            });
        }
        
        // Chat toggle
        const chatToggle = document.getElementById('chat-toggle');
        const chatWindow = document.getElementById('chat-window');
        const chatClose = document.getElementById('chat-close');
        
        if (chatToggle && chatWindow) {
            chatToggle.addEventListener('click', () => {
                chatWindow.classList.toggle('open');
            });
        }
        
        if (chatClose && chatWindow) {
            chatClose.addEventListener('click', () => {
                chatWindow.classList.remove('open');
            });
        }
    }
    
    // Rate Limiting
    canMakeRequest() {
        const now = Date.now();
        
        if (now > this.rateLimiter.resetTime) {
            this.rateLimiter.calls = 0;
            this.rateLimiter.resetTime = now + 3600000;
        }
        
        return this.rateLimiter.calls < this.rateLimiter.maxCalls;
    }
    
    incrementRateLimit() {
        this.rateLimiter.calls++;
    }
    
    // Core AI Functions
    async callOpenAI(prompt, systemMessage = null, maxTokens = 500, temperature = 0.7) {
        if (!this.canMakeRequest()) {
            throw new Error('Rate limit exceeded. Please try again later.');
        }
        
        const messages = [];
        
        if (systemMessage) {
            messages.push({ role: 'system', content: systemMessage });
        }
        
        messages.push({ role: 'user', content: prompt });
        
        const requestBody = {
            model: 'gpt-3.5-turbo', // Use GPT-3.5 for lower cost
            messages: messages,
            max_tokens: maxTokens,
            temperature: temperature,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
        };
        
        try {
            // For demo purposes, we'll simulate API calls if no key is provided
            if (!this.apiKey || this.apiKey === 'YOUR_OPENAI_API_KEY') {
                return await this.simulateAIResponse(prompt, systemMessage);
            }
            
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            this.incrementRateLimit();
            
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('OpenAI API Error:', error);
            // Fallback to simulated response
            return await this.simulateAIResponse(prompt, systemMessage);
        }
    }
    
    // Fallback simulation for demo purposes
    async simulateAIResponse(prompt, systemMessage = null) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
        
        const lowerPrompt = prompt.toLowerCase();
        
        // Story generation responses
        if (systemMessage && systemMessage.includes('climate story')) {
            return this.generateSimulatedStory(prompt);
        }
        
        // Chat responses
        if (lowerPrompt.includes('climate change')) {
            return this.getClimateChangeInfo();
        } else if (lowerPrompt.includes('renewable energy')) {
            return this.getRenewableEnergyInfo();
        } else if (lowerPrompt.includes('carbon footprint')) {
            return this.getCarbonFootprintInfo();
        } else if (lowerPrompt.includes('what can i do') || lowerPrompt.includes('how can i help')) {
            return this.getActionRecommendations();
        } else {
            return this.getGeneralClimateInfo();
        }
    }
    
    generateSimulatedStory(prompt) {
        const stories = [
            `🌍 **Your Climate Story**\n\nImagine waking up in your city 30 years from now. The morning sun feels different—warmer, more intense. As you look out your window, you notice the changes that have transformed your community.\n\nThe local park where you used to play now has drought-resistant plants and solar panels powering the playground equipment. Electric buses glide silently down streets lined with vertical gardens that help clean the air.\n\nYour neighbor, Maria, waves from her rooftop garden where she grows vegetables using rainwater collection systems. "Good morning!" she calls out. "The tomatoes are doing great this year!"\n\nThis isn't a distant dream—it's the result of choices made by people like you, starting today. Every action you take, from the way you travel to the energy you use, is writing this story.\n\n**Your chapter starts now. What will you write?**`,
            
            `🌊 **A Tale of Two Futures**\n\nIn your coastal town, two paths stretch ahead into the future...\n\n**Path One:** Without action, rising sea levels creep closer each year. Storms grow stronger, and your favorite beach becomes a memory. The fishing industry struggles as ocean temperatures rise.\n\n**Path Two:** Your community comes together. Renewable energy powers homes, coastal restoration protects shores, and sustainable fishing practices ensure abundance for generations. Young people like you lead the change, using technology and creativity to build resilience.\n\nThe remarkable thing? You're already on Path Two just by caring enough to learn. Your curiosity is the first step in a journey that will inspire others and create real change.\n\n**Which future are you helping to create?**`,
            
            `🌱 **The Forest Speaks**\n\nDeep in the forest near your home, an ancient oak tree has stories to tell. It has watched over your region for over 200 years, witnessing the Industrial Revolution, world wars, and the digital age.\n\n"I remember when the air was different," the oak whispers through rustling leaves. "Cleaner, cooler. But I also see hope in the young faces like yours who visit me now."\n\nThe tree tells you about its forest friends—how they work together to capture carbon, provide oxygen, and create homes for countless creatures. It shares the secret that forests like this one are some of our planet's greatest allies against climate change.\n\n"Every tree planted by caring hands like yours," the oak continues, "joins our ancient network of climate guardians. We're all connected, you know—your choices, my growth, the air we share."\n\n**What will you plant today to grow a better tomorrow?**`
        ];
        
        return stories[Math.floor(Math.random() * stories.length)];
    }
    
    getClimateChangeInfo() {
        return `🌍 Climate change refers to long-term shifts in global temperatures and weather patterns. While natural variations occur, human activities since the Industrial Revolution have been the primary driver.\n\nKey points:\n• Global temperatures have risen by about 1.1°C since pre-industrial times\n• Burning fossil fuels releases greenhouse gases like CO2\n• Effects include rising sea levels, extreme weather, and ecosystem disruption\n• The good news: We have solutions like renewable energy, reforestation, and sustainable practices!\n\nWhat specific aspect of climate change interests you most?`;
    }
    
    getRenewableEnergyInfo() {
        return `⚡ Renewable energy is power from sources that naturally replenish, like:\n\n🌞 **Solar**: Captures sunlight with photovoltaic panels\n💨 **Wind**: Uses turbines to generate electricity\n💧 **Hydro**: Harnesses flowing water power\n🌍 **Geothermal**: Taps Earth's internal heat\n🌱 **Biomass**: Energy from organic materials\n\n**Amazing fact**: Renewables are now the cheapest source of power in most of the world! They create jobs, reduce pollution, and help fight climate change.\n\nWant to know how you can support renewable energy in your area?`;
    }
    
    getCarbonFootprintInfo() {
        return `👣 Your carbon footprint is the total amount of greenhouse gases you produce through daily activities.\n\n**Main sources**:\n• Transportation (cars, planes, buses)\n• Energy use (electricity, heating, cooling)\n• Food production and consumption\n• Goods and services you buy\n\n**Easy ways to reduce it**:\n🚶 Walk or bike more\n💡 Use energy-efficient appliances\n🌱 Eat more plant-based meals\n♻️ Reduce, reuse, recycle\n🌳 Support reforestation projects\n\nSmall changes add up to make a big difference! What area would you like to start with?`;
    }
    
    getActionRecommendations() {
        return `🎯 Here are impactful actions you can take:\n\n**At Home**:\n• Switch to LED bulbs\n• Unplug devices when not in use\n• Use cold water for washing\n\n**Transportation**:\n• Walk, bike, or use public transport\n• Carpool with friends\n• Support electric vehicles\n\n**Food & Consumption**:\n• Eat less meat and dairy\n• Choose local, seasonal foods\n• Reduce food waste\n\n**Community**:\n• Join environmental groups\n• Plant trees or start a garden\n• Educate others about climate action\n\nRemember: You don't have to do everything at once. Pick one area to focus on first!`;
    }
    
    getGeneralClimateInfo() {
        return `🤖 I'm here to help you learn about climate change and environmental action! \n\nI can help you with:\n• Understanding climate science\n• Learning about renewable energy\n• Calculating your carbon footprint\n• Finding ways to take action\n• Connecting climate issues to your local area\n\nFeel free to ask me specific questions like:\n• "What causes climate change?"\n• "How can I reduce my carbon footprint?"\n• "What are renewable energy options?"\n• "How does climate change affect my region?"\n\nWhat would you like to explore?`;
    }
    
    // Story Generation
    async generateClimateStory() {
        const generateBtn = document.getElementById('generate-story-btn');
        const storyOutput = document.getElementById('story-output');
        const storyActions = document.getElementById('story-actions');
        
        if (!generateBtn || !storyOutput) return;
        
        // Get user inputs
        const location = document.getElementById('user-location')?.value || 'your area';
        const interests = Array.from(document.getElementById('user-interests')?.selectedOptions || [])
            .map(option => option.value);
        const ageGroup = document.getElementById('age-group')?.value || '16-18';
        
        // Validate inputs
        if (!location.trim() || location === 'your area') {
            this.showError(translate('storyteller.error'));
            return;
        }
        
        // Update UI
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + 
            translate('storyteller.loading');
        
        storyOutput.innerHTML = `
            <div class="story-placeholder">
                <i class="fas fa-magic"></i>
                <p>${translate('storyteller.loading')}</p>
            </div>
        `;
        
        try {
            // Create personalized prompt
            const prompt = this.createStoryPrompt(location, interests, ageGroup);
            const systemMessage = `You are a creative climate education storyteller. Create an engaging, personalized, and educational story about climate change that connects with the user's location and interests. Make it inspiring and actionable, not scary or overwhelming. Include specific local examples and positive solutions. Write in a narrative style that feels personal and relevant.`;
            
            const story = await this.callOpenAI(prompt, systemMessage, 600, 0.8);
            
            // Display the story with typewriter effect
            this.displayStoryWithEffect(story);
            
            // Show action buttons
            if (storyActions) {
                storyActions.style.display = 'flex';
            }
            
        } catch (error) {
            console.error('Story generation error:', error);
            storyOutput.innerHTML = `
                <div class="story-placeholder">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>${translate('storyteller.error')}</p>
                </div>
            `;
        } finally {
            // Reset button
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> ' + 
                translate('storyteller.generate');
        }
    }
    
    createStoryPrompt(location, interests, ageGroup) {
        const interestText = interests.length > 0 ? 
            `particularly interested in ${interests.join(', ')}` : 
            'interested in environmental issues';
        
        return `Create a personalized climate story for a ${ageGroup} year old person living in ${location} who is ${interestText}. 
        
        The story should:
        - Be engaging and narrative-driven
        - Connect to their specific location and local climate impacts
        - Include their interests naturally in the story
        - Be inspiring and empowering, not frightening
        - Show both challenges and solutions
        - End with actionable steps they can take
        - Be about 300-400 words
        - Use "you" to make it personal
        
        Make it feel like a story they're part of, not just information about climate change.`;
    }
    
    displayStoryWithEffect(story) {
        const storyOutput = document.getElementById('story-output');
        if (!storyOutput) return;
        
        storyOutput.innerHTML = '<div class="story-content"></div>';
        const contentDiv = storyOutput.querySelector('.story-content');
        
        let index = 0;
        const typeSpeed = 30; // milliseconds per character
        
        function typeWriter() {
            if (index < story.length) {
                contentDiv.innerHTML += story.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
                
                // Auto-scroll to keep up with typing
                contentDiv.scrollTop = contentDiv.scrollHeight;
            }
        }
        
        typeWriter();
    }
    
    // Chat Functionality
    initializeChat() {
        // Add welcome message if not already present
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages && !chatMessages.querySelector('.message')) {
            this.addMessage(translate('chat.welcome'), 'assistant');
        }
    }
    
    async sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        const userMessage = chatInput?.value.trim();
        
        if (!userMessage) return;
        
        // Add user message
        this.addMessage(userMessage, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Show thinking indicator
        const thinkingId = this.addMessage(translate('chat.thinking'), 'assistant', true);
        
        try {
            // Generate AI response
            const systemMessage = `You are a helpful AI assistant specializing in climate change education. 
            Provide accurate, engaging, and age-appropriate information about climate science, environmental issues, 
            and actionable solutions. Keep responses concise but informative. Be encouraging and solution-focused.`;
            
            const response = await this.callOpenAI(userMessage, systemMessage, 300, 0.7);
            
            // Remove thinking indicator and add real response
            this.removeMessage(thinkingId);
            this.addMessage(response, 'assistant');
            
        } catch (error) {
            console.error('Chat error:', error);
            this.removeMessage(thinkingId);
            this.addMessage(translate('chat.error'), 'assistant');
        }
    }
    
    addMessage(content, sender, temporary = false) {
        const chatMessages = document.getElementById('chat-messages');
        if (!chatMessages) return null;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        if (temporary) {
            messageDiv.id = `temp-message-${Date.now()}`;
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return temporary ? messageDiv.id : null;
    }
    
    removeMessage(messageId) {
        if (messageId) {
            const message = document.getElementById(messageId);
            if (message) {
                message.remove();
            }
        }
    }
    
    // Utility Functions
    showError(message) {
        // Create and show error notification
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            z-index: 9999;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Global story action functions
function shareStory() {
    if (navigator.share) {
        navigator.share({
            title: 'My Climate Story',
            text: 'Check out my personalized climate story from CliMate AI!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        const storyText = document.querySelector('#story-output .story-content')?.textContent;
        if (storyText) {
            navigator.clipboard.writeText(storyText).then(() => {
                if (translationManager) {
                    translationManager.showSuccess(translate('success.story.shared'));
                }
            });
        }
    }
}

function saveStory() {
    const storyText = document.querySelector('#story-output .story-content')?.textContent;
    if (storyText) {
        // Save to localStorage
        const savedStories = JSON.parse(localStorage.getItem('climate-ai-stories') || '[]');
        savedStories.push({
            id: Date.now(),
            text: storyText,
            date: new Date().toISOString(),
            location: document.getElementById('user-location')?.value
        });
        
        localStorage.setItem('climate-ai-stories', JSON.stringify(savedStories));
        
        if (translationManager) {
            translationManager.showSuccess(translate('success.story.saved'));
        }
    }
}

function getMoreStories() {
    // Generate a new story with the same inputs
    if (aiIntegration) {
        aiIntegration.generateClimateStory();
    }
}

// Initialize AI integration
let aiIntegration;

document.addEventListener('DOMContentLoaded', () => {
    aiIntegration = new AIIntegration();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIIntegration };
}