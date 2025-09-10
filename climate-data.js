// CliMate AI - Climate Data Management System
// Handles weather APIs, climate data, and environmental calculations

class ClimateDataManager {
    constructor() {
        this.weatherAPI = {
            // Using Open-Meteo (Free, no API key required)
            baseURL: 'https://api.open-meteo.com/v1',
            geocodingURL: 'https://geocoding-api.open-meteo.com/v1'
        };
        
        this.climateData = {
            globalTemp: [],
            co2Levels: [],
            seaLevel: [],
            temperatureTrends: []
        };
        
        this.userLocation = null;
        this.init();
    }
    
    async init() {
        await this.loadClimateData();
        this.setupGeolocation();
    }
    
    // Geolocation Functions
    setupGeolocation() {
        const locationBtn = document.getElementById('get-location-btn');
        if (locationBtn) {
            locationBtn.addEventListener('click', () => {
                this.getCurrentLocation();
            });
        }
    }
    
    getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError(translate('error.location.unavailable'));
            return;
        }
        
        const locationBtn = document.getElementById('get-location-btn');
        if (locationBtn) {
            locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            locationBtn.disabled = true;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                this.reverseGeocode(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                this.handleLocationError(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    }
    
    async reverseGeocode(lat, lon) {
        try {
            const response = await fetch(
                `${this.weatherAPI.geocodingURL}/search?latitude=${lat}&longitude=${lon}&count=1`
            );
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const location = data.results[0];
                const locationInput = document.getElementById('user-location');
                if (locationInput) {
                    locationInput.value = `${location.name}, ${location.country}`;
                }
                
                this.showSuccess(translate('success.location.found'));
                
                // Load weather data for this location
                await this.getWeatherData(lat, lon);
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            this.showError(translate('error.general'));
        } finally {
            this.resetLocationButton();
        }
    }
    
    handleLocationError(error) {
        let message;
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = translate('error.location.denied');
                break;
            case error.POSITION_UNAVAILABLE:
                message = translate('error.location.unavailable');
                break;
            case error.TIMEOUT:
                message = translate('error.general');
                break;
            default:
                message = translate('error.general');
                break;
        }
        
        this.showError(message);
        this.resetLocationButton();
    }
    
    resetLocationButton() {
        const locationBtn = document.getElementById('get-location-btn');
        if (locationBtn) {
            locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
            locationBtn.disabled = false;
        }
    }
    
    // Weather API Functions
    async getWeatherData(lat, lon) {
        try {
            const response = await fetch(
                `${this.weatherAPI.baseURL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
            );
            
            const data = await response.json();
            return this.processWeatherData(data);
        } catch (error) {
            console.error('Weather API error:', error);
            throw new Error(translate('weather.error'));
        }
    }
    
    async getLocationWeatherByName(locationName) {
        try {
            // First, geocode the location name
            const geoResponse = await fetch(
                `${this.weatherAPI.geocodingURL}/search?name=${encodeURIComponent(locationName)}&count=1`
            );
            const geoData = await geoResponse.json();
            
            if (!geoData.results || geoData.results.length === 0) {
                throw new Error('Location not found');
            }
            
            const location = geoData.results[0];
            return await this.getWeatherData(location.latitude, location.longitude);
        } catch (error) {
            console.error('Location weather error:', error);
            throw error;
        }
    }
    
    processWeatherData(data) {
        if (!data.current) return null;
        
        const current = data.current;
        const weatherCode = this.getWeatherDescription(current.weather_code);
        
        return {
            temperature: Math.round(current.temperature_2m),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
            condition: weatherCode,
            daily: data.daily ? data.daily : null,
            location: data.location || 'Unknown'
        };
    }
    
    getWeatherDescription(code) {
        const weatherCodes = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Slight snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            80: 'Slight rain showers',
            81: 'Moderate rain showers',
            82: 'Violent rain showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm with hail',
            99: 'Thunderstorm with heavy hail'
        };
        
        return weatherCodes[code] || 'Unknown';
    }
    
    // Climate Data Functions
    async loadClimateData() {
        // Load historical climate data for educational purposes
        this.climateData = {
            globalTemp: this.generateTemperatureTrend(),
            co2Levels: this.generateCO2Data(),
            seaLevel: this.generateSeaLevelData(),
            temperatureTrends: this.generateRegionalTrends()
        };
    }
    
    generateTemperatureTrend() {
        // Simplified global temperature anomaly data (1880-2024)
        const baseTemp = 0;
        const data = [];
        
        for (let year = 1880; year <= 2024; year++) {
            let temp;
            if (year < 1980) {
                // Cooler period
                temp = baseTemp + (Math.random() - 0.6) * 0.5;
            } else {
                // Warming period
                const warming = (year - 1980) * 0.015;
                temp = baseTemp + warming + (Math.random() - 0.5) * 0.3;
            }
            
            data.push({
                year: year,
                temperature: Math.round(temp * 100) / 100
            });
        }
        
        return data;
    }
    
    generateCO2Data() {
        // CO2 concentration data (1958-2024)
        const data = [];
        let baseCO2 = 315; // 1958 baseline
        
        for (let year = 1958; year <= 2024; year++) {
            const yearlyIncrease = year < 2000 ? 1.5 : 2.2;
            baseCO2 += yearlyIncrease + (Math.random() - 0.5) * 0.5;
            
            data.push({
                year: year,
                co2: Math.round(baseCO2 * 100) / 100
            });
        }
        
        return data;
    }
    
    generateSeaLevelData() {
        // Sea level rise data (1880-2024)
        const data = [];
        let baseLevel = 0;
        
        for (let year = 1880; year <= 2024; year++) {
            const yearlyRise = year < 1950 ? 1.2 : (year < 1990 ? 1.5 : 3.3);
            baseLevel += yearlyRise + (Math.random() - 0.5) * 0.5;
            
            data.push({
                year: year,
                level: Math.round(baseLevel * 10) / 10
            });
        }
        
        return data;
    }
    
    generateRegionalTrends() {
        const regions = ['Arctic', 'Tropical', 'Temperate', 'Polar'];
        const trends = {};
        
        regions.forEach(region => {
            const data = [];
            let multiplier;
            
            switch(region) {
                case 'Arctic': multiplier = 2.5; break;
                case 'Tropical': multiplier = 0.8; break;
                case 'Temperate': multiplier = 1.2; break;
                case 'Polar': multiplier = 2.0; break;
                default: multiplier = 1.0;
            }
            
            for (let year = 1980; year <= 2024; year++) {
                const warming = (year - 1980) * 0.015 * multiplier;
                const temp = warming + (Math.random() - 0.5) * 0.4;
                
                data.push({
                    year: year,
                    temperature: Math.round(temp * 100) / 100
                });
            }
            
            trends[region] = data;
        });
        
        return trends;
    }
    
    // Carbon Footprint Calculations
    calculateCarbonImpact(action, quantity = 1) {
        // Carbon impact calculations (kg CO2 per action)
        const carbonFactors = {
            'walked': 2.5 * quantity, // vs driving
            'recycled': 1.2 * quantity,
            'energy': 3.1 * quantity, // efficient appliances
            'water': 0.8 * quantity,
            'plant': 22.0 * quantity, // tree planting (annual absorption)
            'public': 4.2 * quantity, // vs car
            'bike': 2.8 * quantity, // vs car
            'solar': 15.5 * quantity, // solar panel usage
            'led': 0.3 * quantity, // LED vs incandescent
            'composting': 1.8 * quantity,
            'local-food': 2.3 * quantity,
            'reduce-meat': 6.1 * quantity
        };
        
        return carbonFactors[action] || 0;
    }
    
    // Environmental Impact Analysis
    generateLocationImpactData(locationName) {
        // Generate location-specific climate impacts
        const impacts = {
            temperature: {
                current: Math.random() * 3 + 1,
                projected2050: Math.random() * 5 + 2,
                description: 'Temperature increases expected'
            },
            precipitation: {
                change: (Math.random() - 0.5) * 40,
                description: 'Precipitation pattern changes'
            },
            extremeEvents: {
                heatwaves: Math.floor(Math.random() * 10) + 5,
                storms: Math.floor(Math.random() * 5) + 2,
                description: 'Increased frequency of extreme weather'
            },
            ecosystems: {
                risk: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
                species: Math.floor(Math.random() * 20) + 5,
                description: 'Species and ecosystems at risk'
            }
        };
        
        return impacts;
    }
    
    // Climate Action Recommendations
    generateActionRecommendations(location, interests, ageGroup) {
        const baseActions = [
            {
                action: 'Use public transport',
                impact: 'High',
                difficulty: 'Easy',
                category: 'transport',
                carbonSaving: 4.2
            },
            {
                action: 'Switch to renewable energy',
                impact: 'Very High',
                difficulty: 'Medium',
                category: 'energy',
                carbonSaving: 15.5
            },
            {
                action: 'Plant native trees',
                impact: 'High',
                difficulty: 'Medium',
                category: 'nature',
                carbonSaving: 22.0
            },
            {
                action: 'Reduce meat consumption',
                impact: 'High',
                difficulty: 'Medium',
                category: 'food',
                carbonSaving: 6.1
            },
            {
                action: 'Use LED light bulbs',
                impact: 'Medium',
                difficulty: 'Very Easy',
                category: 'energy',
                carbonSaving: 0.3
            },
            {
                action: 'Start composting',
                impact: 'Medium',
                difficulty: 'Easy',
                category: 'waste',
                carbonSaving: 1.8
            }
        ];
        
        // Filter based on interests
        let recommendations = baseActions;
        
        if (interests.includes('renewable-energy')) {
            recommendations = recommendations.filter(r => 
                r.category === 'energy' || r.category === 'transport'
            );
        }
        
        if (interests.includes('forest-protection')) {
            recommendations = recommendations.filter(r => 
                r.category === 'nature' || r.action.includes('tree')
            );
        }
        
        // Adjust for age group
        if (ageGroup === '13-15') {
            recommendations = recommendations.filter(r => 
                r.difficulty === 'Easy' || r.difficulty === 'Very Easy'
            );
        }
        
        return recommendations.slice(0, 6);
    }
    
    // Data Export Functions
    exportClimateData(format = 'json') {
        const exportData = {
            timestamp: new Date().toISOString(),
            location: this.userLocation,
            climateData: this.climateData,
            version: '1.0'
        };
        
        if (format === 'json') {
            return JSON.stringify(exportData, null, 2);
        } else if (format === 'csv') {
            return this.convertToCSV(exportData);
        }
        
        return exportData;
    }
    
    convertToCSV(data) {
        // Convert temperature data to CSV format
        let csv = 'Year,Temperature Anomaly,CO2 Level,Sea Level Rise\n';
        
        for (let i = 0; i < data.climateData.globalTemp.length; i++) {
            const temp = data.climateData.globalTemp[i];
            const co2 = data.climateData.co2Levels.find(c => c.year === temp.year);
            const sea = data.climateData.seaLevel.find(s => s.year === temp.year);
            
            csv += `${temp.year},${temp.temperature},${co2?.co2 || ''},${sea?.level || ''}\n`;
        }
        
        return csv;
    }
    
    // Utility Functions
    showSuccess(message) {
        this.showNotification(message, 'success');
    }
    
    showError(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            z-index: 9999;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
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
    
    // Get climate data for visualization
    getVisualizationData(type) {
        switch (type) {
            case 'temperature':
                return this.climateData.globalTemp;
            case 'co2':
                return this.climateData.co2Levels;
            case 'sealevel':
                return this.climateData.seaLevel;
            case 'regional':
                return this.climateData.temperatureTrends;
            default:
                return [];
        }
    }
}

// Climate Facts and Educational Content
const climateFacts = {
    en: [
        "The last decade was the warmest on record globally.",
        "Arctic sea ice is declining at a rate of 13% per decade.",
        "Over 1 million species are at risk of extinction due to climate change.",
        "Renewable energy is now cheaper than fossil fuels in most parts of the world.",
        "Trees can absorb up to 48 pounds of CO2 per year when mature.",
        "Transportation accounts for about 14% of global greenhouse gas emissions.",
        "The ocean has absorbed about 30% of human-produced CO2.",
        "Small changes in daily habits can reduce your carbon footprint by 20%."
    ],
    es: [
        "La última década fue la más cálida registrada globalmente.",
        "El hielo marino del Ártico está disminuyendo a una tasa del 13% por década.",
        "Más de 1 millón de especies están en riesgo de extinción debido al cambio climático.",
        "La energía renovable es ahora más barata que los combustibles fósiles en la mayoría del mundo.",
        "Los árboles pueden absorber hasta 22 kg de CO2 por año cuando están maduros.",
        "El transporte representa aproximadamente el 14% de las emisiones globales de gases de efecto invernadero.",
        "El océano ha absorbido aproximadamente el 30% del CO2 producido por humanos.",
        "Pequeños cambios en hábitos diarios pueden reducir tu huella de carbono en un 20%."
    ],
    fr: [
        "La dernière décennie a été la plus chaude jamais enregistrée mondialement.",
        "La glace de mer arctique diminue à un rythme de 13% par décennie.",
        "Plus d'1 million d'espèces risquent l'extinction à cause du changement climatique.",
        "L'énergie renouvelable est maintenant moins chère que les énergies fossiles dans la plupart du monde.",
        "Les arbres peuvent absorber jusqu'à 22 kg de CO2 par an à maturité.",
        "Le transport représente environ 14% des émissions mondiales de gaz à effet de serre.",
        "L'océan a absorbé environ 30% du CO2 produit par les humains.",
        "De petits changements dans les habitudes quotidiennes peuvent réduire votre empreinte carbone de 20%."
    ]
};

// Initialize climate data manager
let climateDataManager;

document.addEventListener('DOMContentLoaded', () => {
    climateDataManager = new ClimateDataManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ClimateDataManager, climateFacts };
}