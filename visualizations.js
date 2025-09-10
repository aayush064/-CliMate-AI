// CliMate AI - Data Visualizations System
// Canvas-based charts and interactive climate visualizations

class ClimateVisualizations {
    constructor() {
        this.charts = {};
        this.colors = {
            primary: '#2563eb',
            secondary: '#059669',
            accent: '#f59e0b',
            danger: '#ef4444',
            light: '#f8fafc',
            dark: '#1e293b',
            gradient: ['#2563eb', '#059669', '#f59e0b', '#ef4444']
        };
        this.init();
    }
    
    init() {
        this.setupCanvases();
        this.startAnimations();
    }
    
    setupCanvases() {
        // Setup all canvas elements with proper scaling
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            this.setupCanvas(canvas);
        });
    }
    
    setupCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        // High DPI support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
    }
    
    // Animated Climate Globe
    drawClimateGlobe() {
        const canvas = document.getElementById('climate-globe');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / (2 * (window.devicePixelRatio || 1));
        const centerY = canvas.height / (2 * (window.devicePixelRatio || 1));
        const radius = Math.min(centerX, centerY) - 20;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Create gradient for Earth
        const earthGradient = ctx.createRadialGradient(
            centerX - 30, centerY - 30, 0,
            centerX, centerY, radius
        );
        earthGradient.addColorStop(0, '#4ade80');
        earthGradient.addColorStop(0.4, '#22c55e');
        earthGradient.addColorStop(0.7, '#059669');
        earthGradient.addColorStop(1, '#064e3b');
        
        // Draw Earth sphere
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = earthGradient;
        ctx.fill();
        
        // Add atmosphere glow
        const glowGradient = ctx.createRadialGradient(
            centerX, centerY, radius - 10,
            centerX, centerY, radius + 20
        );
        glowGradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
        glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 20, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Draw continents (simplified shapes)
        ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
        this.drawContinents(ctx, centerX, centerY, radius);
        
        // Add floating particles
        this.drawFloatingParticles(ctx, centerX, centerY, radius);
    }
    
    drawContinents(ctx, centerX, centerY, radius) {
        const scale = radius / 100;
        
        // North America
        ctx.beginPath();
        ctx.ellipse(centerX - 40 * scale, centerY - 20 * scale, 25 * scale, 35 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // South America
        ctx.beginPath();
        ctx.ellipse(centerX - 30 * scale, centerY + 40 * scale, 15 * scale, 25 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Europe/Africa
        ctx.beginPath();
        ctx.ellipse(centerX + 10 * scale, centerY, 20 * scale, 40 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Asia
        ctx.beginPath();
        ctx.ellipse(centerX + 50 * scale, centerY - 10 * scale, 30 * scale, 25 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawFloatingParticles(ctx, centerX, centerY, radius) {
        const time = Date.now() * 0.001;
        const particles = 20;
        
        for (let i = 0; i < particles; i++) {
            const angle = (i / particles) * Math.PI * 2 + time * 0.5;
            const distance = radius + 30 + Math.sin(time + i) * 10;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            const particleRadius = 2 + Math.sin(time * 2 + i) * 1;
            
            ctx.beginPath();
            ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + Math.sin(time + i) * 0.3})`;
            ctx.fill();
        }
    }
    
    // Temperature Trend Chart
    drawTemperatureTrend() {
        const canvas = document.getElementById('temperature-trend');
        if (!canvas || !climateDataManager) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        
        ctx.clearRect(0, 0, width, height);
        
        const data = climateDataManager.getVisualizationData('temperature');
        if (!data || data.length === 0) return;
        
        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        
        // Find data bounds
        const years = data.map(d => d.year);
        const temps = data.map(d => d.temperature);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        const minTemp = Math.min(...temps);
        const maxTemp = Math.max(...temps);
        
        // Draw background
        ctx.fillStyle = this.colors.light;
        ctx.fillRect(margin.left, margin.top, chartWidth, chartHeight);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 1;
        
        // Vertical grid lines (years)
        for (let i = 0; i <= 5; i++) {
            const year = minYear + (i / 5) * (maxYear - minYear);
            const x = margin.left + (i / 5) * chartWidth;
            
            ctx.beginPath();
            ctx.moveTo(x, margin.top);
            ctx.lineTo(x, margin.top + chartHeight);
            ctx.stroke();
            
            // Year labels
            ctx.fillStyle = this.colors.dark;
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(Math.round(year).toString(), x, height - 10);
        }
        
        // Horizontal grid lines (temperature)
        for (let i = 0; i <= 4; i++) {
            const temp = minTemp + (i / 4) * (maxTemp - minTemp);
            const y = margin.top + chartHeight - (i / 4) * chartHeight;
            
            ctx.beginPath();
            ctx.moveTo(margin.left, y);
            ctx.lineTo(margin.left + chartWidth, y);
            ctx.stroke();
            
            // Temperature labels
            ctx.fillStyle = this.colors.dark;
            ctx.font = '12px Inter';
            ctx.textAlign = 'right';
            ctx.fillText(temp.toFixed(1) + '°C', margin.left - 5, y + 4);
        }
        
        // Draw temperature line
        ctx.beginPath();
        ctx.strokeStyle = this.colors.primary;
        ctx.lineWidth = 3;
        
        data.forEach((point, index) => {
            const x = margin.left + ((point.year - minYear) / (maxYear - minYear)) * chartWidth;
            const y = margin.top + chartHeight - ((point.temperature - minTemp) / (maxTemp - minTemp)) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Add data points
        data.forEach(point => {
            const x = margin.left + ((point.year - minYear) / (maxYear - minYear)) * chartWidth;
            const y = margin.top + chartHeight - ((point.temperature - minTemp) / (maxTemp - minTemp)) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.colors.primary;
            ctx.fill();
        });
        
        // Chart title
        ctx.fillStyle = this.colors.dark;
        ctx.font = 'bold 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Global Temperature Anomalies', width / 2, 15);
    }
    
    // Progress Chart
    drawProgressChart() {
        const canvas = document.getElementById('progress-chart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        
        ctx.clearRect(0, 0, width, height);
        
        // Get user progress data from localStorage
        const progressData = this.getUserProgressData();
        
        const margin = { top: 30, right: 30, bottom: 50, left: 50 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        
        // Draw background
        ctx.fillStyle = this.colors.light;
        ctx.fillRect(margin.left, margin.top, chartWidth, chartHeight);
        
        // Draw bars
        const barWidth = chartWidth / progressData.length;
        const maxValue = Math.max(...progressData.map(d => d.value));
        
        progressData.forEach((day, index) => {
            const barHeight = (day.value / maxValue) * chartHeight;
            const x = margin.left + index * barWidth + barWidth * 0.1;
            const y = margin.top + chartHeight - barHeight;
            const barWidthActual = barWidth * 0.8;
            
            // Create gradient for bars
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, this.colors.primary);
            gradient.addColorStop(1, this.colors.secondary);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidthActual, barHeight);
            
            // Add value labels
            ctx.fillStyle = this.colors.dark;
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(day.value.toString(), x + barWidthActual / 2, y - 5);
            
            // Add day labels
            ctx.fillText(day.day, x + barWidthActual / 2, height - 20);
        });
        
        // Y-axis label
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = this.colors.dark;
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('CO₂ Saved (kg)', 0, 0);
        ctx.restore();
        
        // Chart title
        ctx.fillStyle = this.colors.dark;
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Your Weekly Climate Impact', width / 2, 20);
    }
    
    getUserProgressData() {
        // Get actual user data or generate sample data
        const savedActions = JSON.parse(localStorage.getItem('climate-ai-actions') || '[]');
        
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const progressData = [];
        
        days.forEach((day, index) => {
            // Calculate actual impact for each day or use sample data
            const dayActions = savedActions.filter(action => {
                const actionDate = new Date(action.date);
                const dayOfWeek = actionDate.getDay();
                return dayOfWeek === (index + 1) % 7; // Adjust for Monday start
            });
            
            const totalImpact = dayActions.reduce((sum, action) => {
                return sum + (climateDataManager?.calculateCarbonImpact(action.type) || 0);
            }, 0);
            
            progressData.push({
                day: day,
                value: Math.round(totalImpact * 10) / 10 || (Math.random() * 5 + 2).toFixed(1)
            });
        });
        
        return progressData;
    }
    
    // Interactive Impact Visualization
    drawImpactVisualization(canvasId, data) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw circular progress indicators
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 80;
        
        // Background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.colors.light;
        ctx.lineWidth = 10;
        ctx.stroke();
        
        // Progress circle
        const progress = data.progress || 0.7; // 70% progress
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (progress * Math.PI * 2);
        
        const gradient = ctx.createLinearGradient(0, centerY - radius, 0, centerY + radius);
        gradient.addColorStop(0, this.colors.primary);
        gradient.addColorStop(1, this.colors.secondary);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Center text
        ctx.fillStyle = this.colors.dark;
        ctx.font = 'bold 24px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(progress * 100) + '%', centerX, centerY);
        
        ctx.font = '12px Inter';
        ctx.fillText(data.label || 'Progress', centerX, centerY + 20);
    }
    
    // Animated Carbon Footprint Visualization
    drawCarbonFootprint(actions) {
        const canvas = document.getElementById('carbon-footprint');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw footprint shape
        const footprintPath = new Path2D();
        const scale = 2;
        const offsetX = width / 2 - 50;
        const offsetY = height / 2 - 40;
        
        // Simplified footprint shape
        footprintPath.ellipse(offsetX, offsetY, 30 * scale, 40 * scale, 0, 0, Math.PI * 2);
        footprintPath.ellipse(offsetX - 20 * scale, offsetY - 30 * scale, 15 * scale, 15 * scale, 0, 0, Math.PI * 2);
        footprintPath.ellipse(offsetX - 10 * scale, offsetY - 35 * scale, 12 * scale, 12 * scale, 0, 0, Math.PI * 2);
        footprintPath.ellipse(offsetX + 5 * scale, offsetY - 35 * scale, 10 * scale, 10 * scale, 0, 0, Math.PI * 2);
        footprintPath.ellipse(offsetX + 15 * scale, offsetY - 30 * scale, 8 * scale, 8 * scale, 0, 0, Math.PI * 2);
        
        // Fill based on impact level
        const totalImpact = actions.reduce((sum, action) => sum + action.impact, 0);
        const impactLevel = Math.min(totalImpact / 50, 1); // Normalize to 0-1
        
        const impactColor = this.interpolateColor(
            { r: 16, g: 185, b: 129 }, // Green
            { r: 239, g: 68, b: 68 },  // Red
            impactLevel
        );
        
        ctx.fillStyle = `rgb(${impactColor.r}, ${impactColor.g}, ${impactColor.b})`;
        ctx.fill(footprintPath);
        
        // Add glow effect
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 20;
        ctx.fill(footprintPath);
        ctx.shadowBlur = 0;
        
        // Add impact text
        ctx.fillStyle = this.colors.dark;
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`${totalImpact.toFixed(1)} kg CO₂`, width / 2, height - 20);
    }
    
    interpolateColor(color1, color2, factor) {
        return {
            r: Math.round(color1.r + factor * (color2.r - color1.r)),
            g: Math.round(color1.g + factor * (color2.g - color1.g)),
            b: Math.round(color1.b + factor * (color2.b - color1.b))
        };
    }
    
    // Animation Loop
    startAnimations() {
        const animate = () => {
            this.drawClimateGlobe();
            requestAnimationFrame(animate);
        };
        animate();
        
        // Update other charts periodically
        setInterval(() => {
            this.drawTemperatureTrend();
            this.drawProgressChart();
        }, 5000); // Update every 5 seconds
    }
    
    // Responsive canvas handling
    handleResize() {
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            this.setupCanvas(canvas);
        });
        
        // Redraw all visualizations
        this.drawClimateGlobe();
        this.drawTemperatureTrend();
        this.drawProgressChart();
    }
    
    // Export chart as image
    exportChart(canvasId, filename = 'climate-chart.png') {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL();
        link.click();
    }
    
    // Create interactive hover effects
    setupCanvasInteractions() {
        const canvases = document.querySelectorAll('canvas[data-interactive="true"]');
        
        canvases.forEach(canvas => {
            canvas.addEventListener('mousemove', (e) => {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Add hover effects based on canvas type
                this.handleCanvasHover(canvas, x, y);
            });
            
            canvas.addEventListener('mouseleave', () => {
                this.clearCanvasHover(canvas);
            });
        });
    }
    
    handleCanvasHover(canvas, x, y) {
        // Implement hover effects for interactive charts
        const ctx = canvas.getContext('2d');
        // Add hover indicators, tooltips, etc.
    }
    
    clearCanvasHover(canvas) {
        // Clear hover effects
        this.drawChartForCanvas(canvas);
    }
    
    drawChartForCanvas(canvas) {
        // Determine which chart to redraw based on canvas ID
        const canvasId = canvas.id;
        
        switch (canvasId) {
            case 'climate-globe':
                this.drawClimateGlobe();
                break;
            case 'temperature-trend':
                this.drawTemperatureTrend();
                break;
            case 'progress-chart':
                this.drawProgressChart();
                break;
        }
    }
}

// Initialize visualizations
let climateVisualizations;

document.addEventListener('DOMContentLoaded', () => {
    climateVisualizations = new ClimateVisualizations();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (climateVisualizations) {
            climateVisualizations.handleResize();
        }
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ClimateVisualizations };
}