// Plant Growth Chart Functions
function initializeGrowthChart() {
    const phases = [
        { name: 'Seeding Phase', week: 'Week 1', progress: 25, color: '#8b4513' },
        { name: 'Sprout Phase', week: 'Week 2', progress: 60, color: '#228b22' },
        { name: 'Final Growth', week: 'Week 3', progress: 100, color: '#006400' }
    ];
    
    updateGrowthPhases(phases);
    createTimelineMarks();
    animateGrowthLines();
}

function updateGrowthPhases(phases) {
    const growthPhases = document.querySelectorAll('.growth-phase');
    growthPhases.forEach((phase, index) => {
        if (phases[index]) {
            const phaseData = phases[index];
            const bubble = phase.querySelector('.phase-bubble');
            const name = bubble.querySelector('.phase-name');
            const week = bubble.querySelector('.phase-week');
            const line = phase.querySelector('.phase-line.vertical');
            
            name.textContent = phaseData.name;
            week.textContent = phaseData.week;
            
            // Animate line height based on progress
            if (line) {
                const height = Math.floor(phaseData.progress * 1.5); // Scale for visual effect
                line.style.height = height + 'px';
                line.style.background = `linear-gradient(to bottom, ${phaseData.color}, ${phaseData.color}80)`;
            }
        }
    });
}

function createTimelineMarks() {
    const timelineMarks = document.getElementById('timelineMarks');
    if (!timelineMarks) return;
    
    timelineMarks.innerHTML = '';
    for (let i = 0; i <= 21; i++) { // 3 weeks * 7 days
        const mark = document.createElement('div');
        mark.className = 'ruler-mark';
        
        if (i % 7 === 0) { // Weekly markers
            mark.classList.add('major');
            mark.setAttribute('data-week', `W${Math.floor(i/7) + 1}`);
        }
        
        timelineMarks.appendChild(mark);
    }
}

function animateGrowthLines() {
    const lines = document.querySelectorAll('.phase-line.vertical');
    lines.forEach((line, index) => {
        line.style.height = '0px';
        setTimeout(() => {
            line.style.transition = 'height 1.5s ease-out';
            const targetHeight = line.getAttribute('data-height') || '100';
            line.style.height = targetHeight + 'px';
        }, index * 500);
    });
}

// Soil Moisture Chart Functions
function initializeSoilMoistureChart() {
    const soilData = [
        { level: 'Low', value: 30, color: '#a0bce8' },
        { level: 'Optimal', value: 85, color: '#6be6d3' },
        { level: 'High', value: 65, color: '#a81e1e' }
    ];
    
    updateSoilMoistureChart(soilData);
}

function updateSoilMoistureChart(data) {
    const soilBars = document.querySelectorAll('.soil-bar');
    soilBars.forEach((bar, index) => {
        if (data[index]) {
            const barFill = bar.querySelector('.bar-fill');
            const barData = data[index];
            
            barFill.style.background = barData.color;
            barFill.style.height = '0%';
            
            setTimeout(() => {
                barFill.style.transition = 'height 1s ease-out';
                barFill.style.height = barData.value + '%';
            }, index * 200);
        }
    });
}

// Water Level Chart Functions
function initializeWaterLevelChart() {
    const waterData = [
        { time: '6AM', level: 75 },
        { time: '12PM', level: 65 },
        { time: '6PM', level: 85 },
        { time: '12AM', level: 55 }
    ];
    
    updateWaterLevelChart(waterData);
}

function updateWaterLevelChart(data) {
    const chartArea = document.querySelector('.chart-area svg');
    if (!chartArea) return;
    
    // Generate path based on data
    let pathData = `M0,${200 - data[0].level * 2}`;
    for (let i = 1; i < data.length; i++) {
        const x = (i / (data.length - 1)) * 300;
        const y = 200 - data[i].level * 2;
        pathData += ` L${x},${y}`;
    }
    
    const path = chartArea.querySelector('path');
    if (path) {
        path.setAttribute('d', pathData);
    }
    
    // Update data points
    const circles = chartArea.querySelectorAll('circle');
    circles.forEach((circle, index) => {
        if (data[index]) {
            const x = index === 0 ? 0 : (index / (data.length - 1)) * 300;
            const y = 200 - data[index].level * 2;
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
        }
    });
}

// Weather Data Functions
function initializeWeatherData() {
    const weatherData = {
        temperature: 24,
        metrics: [
            { label: 'Height', value: '4.6cm', min: 3.0, max: 8.0, unit: 'cm' },
            { label: 'Age', value: '2 Weeks', min: 1, max: 12, unit: ' Weeks' },
            { label: 'Wind N-E', value: '6-7km/h', min: 0, max: 15, unit: 'km/h' },
            { label: 'Precipitation', value: '0mm', min: 0, max: 50, unit: 'mm' },
            { label: 'Humidity', value: '56%', min: 30, max: 90, unit: '%' }
        ],
        soilTemp: 16
    };
    
    updateWeatherDisplay(weatherData);
}

function updateWeatherDisplay(data) {
    // Update temperature
    const tempValue = document.querySelector('.temp-value');
    if (tempValue) {
        tempValue.textContent = data.temperature;
    }
    
    // Update soil temperature
    const soilTempValue = document.querySelector('.soil-temp .metric-value');
    if (soilTempValue) {
        soilTempValue.textContent = data.soilTemp + '°';
    }
    
    // Update other metrics
    const metrics = document.querySelectorAll('.metric:not(.soil-temp)');
    metrics.forEach((metric, index) => {
        if (data.metrics[index]) {
            const valueElement = metric.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = data.metrics[index].value;
            }
        }
    });
}

function generateRandomWeatherData() {
    return {
        temperature: Math.floor(Math.random() * 15) + 18, // 18-32°C
        metrics: [
            { 
                label: 'Height', 
                value: (Math.random() * 3 + 3).toFixed(1) + 'cm',
                min: 3.0, max: 8.0, unit: 'cm' 
            },
            { 
                label: 'Age', 
                value: Math.floor(Math.random() * 3 + 1) + ' Weeks',
                min: 1, max: 12, unit: ' Weeks' 
            },
            { 
                label: 'Wind N-E', 
                value: Math.floor(Math.random() * 10 + 3) + 'km/h',
                min: 0, max: 15, unit: 'km/h' 
            },
            { 
                label: 'Precipitation', 
                value: Math.floor(Math.random() * 5) + 'mm',
                min: 0, max: 50, unit: 'mm' 
            },
            { 
                label: 'Humidity', 
                value: Math.floor(Math.random() * 30 + 40) + '%',
                min: 30, max: 90, unit: '%' 
            }
        ],
        soilTemp: Math.floor(Math.random() * 10) + 12 // 12-22°C
    };
}

// Update all data function
function updateAllData() {
    // Update weather data
    const newWeatherData = generateRandomWeatherData();
    updateWeatherDisplay(newWeatherData);
    
    // Update soil moisture with random values
    const newSoilData = [
        { level: 'Low', value: Math.floor(Math.random() * 40 + 20), color: '#a0bce8' },
        { level: 'Optimal', value: Math.floor(Math.random() * 30 + 70), color: '#6be6d3' },
        { level: 'High', value: Math.floor(Math.random() * 40 + 40), color: '#a81e1e' }
    ];
    updateSoilMoistureChart(newSoilData);
    
    // Update water level with random values
    const newWaterData = [
        { time: '6AM', level: Math.floor(Math.random() * 30 + 60) },
        { time: '12PM', level: Math.floor(Math.random() * 30 + 50) },
        { time: '6PM', level: Math.floor(Math.random() * 30 + 70) },
        { time: '12AM', level: Math.floor(Math.random() * 30 + 40) }
    ];
    updateWaterLevelChart(newWaterData);
}

// Animation functions
function initializeAnimations() {
    // Animate weather card metrics on load
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach((metric, index) => {
        metric.style.opacity = '0';
        metric.style.transform = 'translateY(20px)';
        setTimeout(() => {
            metric.style.transition = 'all 0.5s ease';
            metric.style.opacity = '1';
            metric.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animate growth phases
    const growthPhases = document.querySelectorAll('.growth-phase');
    growthPhases.forEach((phase, index) => {
        phase.style.opacity = '0';
        phase.style.transform = 'translateX(-30px)';
        setTimeout(() => {
            phase.style.transition = 'all 0.6s ease';
            phase.style.opacity = '1';
            phase.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

// Interactive functions
function initializeInteractions() {
    // Navigation interactions
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });

    // Weather card temperature click
    const temperature = document.querySelector('.temperature');
    if (temperature) {
        temperature.addEventListener('click', function() {
            const tempValue = this.querySelector('.temp-value');
            const currentTemp = parseInt(tempValue.textContent);
            const newTemp = currentTemp === 24 ? 75 : 24; // Toggle between Celsius and Fahrenheit
            const unit = newTemp === 24 ? '°C' : '°F';
            
            tempValue.textContent = newTemp;
            this.querySelector('.temp-unit').textContent = unit;
        });
    }

    // Soil moisture bar interactions
    const soilBars = document.querySelectorAll('.soil-bar');
    soilBars.forEach((bar, index) => {
        bar.addEventListener('click', function() {
            // Animate bar height change
            const barFill = this.querySelector('.bar-fill');
            const heights = ['40%', '80%', '60%'];
            const newHeight = heights[Math.floor(Math.random() * heights.length)];
            
            barFill.style.transition = 'height 0.5s ease';
            barFill.style.height = newHeight;
        });
    });

    // Growth phase interactions
    const phaseIcons = document.querySelectorAll('.phase-icon');
    phaseIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Add ripple effect
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Utility functions
function updateDateTime() {
    const dateInfo = document.querySelector('.date-info');
    if (dateInfo) {
        const now = new Date();
        const options = { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        };
        const formattedDate = now.toLocaleDateString('en-US', options);
        dateInfo.innerHTML = `📅 ${formattedDate}`;
    }
}

function updateWeatherData() {
    const metrics = [
        { selector: '.metric:nth-child(1) .metric-value', values: ['4.6cm', '5.1cm', '4.8cm'] },
        { selector: '.metric:nth-child(2) .metric-value', values: ['2 Weeks', '2.5 Weeks', '3 Weeks'] },
        { selector: '.metric:nth-child(3) .metric-value', values: ['6-7km/h', '5-8km/h', '7-9km/h'] },
        { selector: '.metric:nth-child(4) .metric-value', values: ['0mm', '2mm', '1mm'] },
        { selector: '.metric:nth-child(5) .metric-value', values: ['56%', '62%', '58%'] }
    ];

    metrics.forEach(metric => {
        const element = document.querySelector(metric.selector);
        if (element) {
            const randomValue = metric.values[Math.floor(Math.random() * metric.values.length)];
            element.textContent = randomValue;
        }
    });
}

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Adjust layouts on resize if needed
    const dashboardGrid = document.querySelector('.dashboard-grid');
    if (window.innerWidth <= 768) {
        dashboardGrid.style.gridTemplateColumns = '1fr';
    } else if (window.innerWidth <= 1200) {
        dashboardGrid.style.gridTemplateColumns = '1fr 1fr';
    } else {
        dashboardGrid.style.gridTemplateColumns = '1fr 2fr 1fr';
    }
});

// User management removed - dashboard now runs without authentication

// Enhanced growth chart initialization
function initializeGrowthChart() {
    const phases = [
        { name: 'Seeding Phase', week: 'Week 1', progress: 25, color: '#8b4513', height: '30%' },
        { name: 'Sprout Phase', week: 'Week 2', progress: 60, color: '#228b22', height: '70%' },
        { name: 'Final Growth', week: 'Week 3', progress: 100, color: '#006400', height: '100%' }
    ];
    
    updateGrowthPhases(phases);
    animateGrowthBars();
}

function animateGrowthBars() {
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach((bar, index) => {
        const targetHeight = bar.getAttribute('data-height') + '%';
        bar.style.height = '0%';
        
        setTimeout(() => {
            bar.style.height = targetHeight;
        }, 500 + index * 300);
    });
}

// Header auto-hide functionality
function initializeHeaderBehavior() {
    const header = document.getElementById('mainHeader');
    const hoverTrigger = document.getElementById('headerHoverTrigger');
    let lastScrollY = window.scrollY;
    let isHovering = false;
    
    // Handle scroll behavior
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const body = document.body;
        
        if (currentScrollY <= 50) {
            // At top of page - always show header
            header.classList.remove('hidden', 'hover-visible');
            hoverTrigger.classList.remove('active');
            body.classList.remove('header-hidden');
        } else {
            // Scrolled down - hide header and activate hover trigger
            if (currentScrollY > lastScrollY && !isHovering) {
                // Scrolling down
                header.classList.add('hidden');
                header.classList.remove('hover-visible');
                body.classList.add('header-hidden');
            }
            hoverTrigger.classList.add('active');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Handle hover on trigger area
    hoverTrigger.addEventListener('mouseenter', function() {
        if (window.scrollY > 50) {
            isHovering = true;
            header.classList.remove('hidden');
            header.classList.add('hover-visible');
            document.body.classList.remove('header-hidden');
        }
    });
    
    hoverTrigger.addEventListener('mouseleave', function() {
        if (window.scrollY > 50) {
            isHovering = false;
            setTimeout(() => {
                if (!isHovering && window.scrollY > 50) {
                    header.classList.add('hidden');
                    header.classList.remove('hover-visible');
                    document.body.classList.add('header-hidden');
                }
            }, 500); // Small delay before hiding
        }
    });
    
    // Handle hover on header itself
    header.addEventListener('mouseenter', function() {
        isHovering = true;
    });
    
    header.addEventListener('mouseleave', function() {
        isHovering = false;
        if (window.scrollY > 50) {
            setTimeout(() => {
                if (!isHovering && window.scrollY > 50) {
                    header.classList.add('hidden');
                    header.classList.remove('hover-visible');
                    document.body.classList.add('header-hidden');
                }
            }, 500);
        }
    });
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Dashboard Interactive Elements - Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    // Dashboard initialization - no authentication required
    
    // Initialize dashboard components
    initializeGrowthChart();
    initializeSoilMoistureChart();
    initializeWaterLevelChart();
    initializeWeatherData();
    initializeAnimations();
    initializeInteractions();
    updateDateTime();
    addClickableElements();
    initializeHeaderBehavior();
    
    // Update data every 30 seconds
    setInterval(updateAllData, 30000);
    // Update date/time every minute
    setInterval(updateDateTime, 60000);
});

// Plant Growth Animations
function animateGrowthStage(stage) {
    const plantStages = document.querySelectorAll('.plant-stage');
    const clickedItem = event.target.closest('.status-item');
    
    // Add click animation to the status item
    clickedItem.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clickedItem.style.transform = '';
    }, 150);
    
    // Reset all stages
    plantStages.forEach(s => s.classList.remove('active'));
    
    // Activate specific stage
    setTimeout(() => {
        if (stage <= plantStages.length) {
            plantStages[stage - 1].classList.add('active');
            
            // Add growing animation
            const stageElement = plantStages[stage - 1];
            stageElement.style.transform = 'scale(1.2)';
            stageElement.style.filter = 'brightness(1.3)';
            
            setTimeout(() => {
                stageElement.style.transform = '';
                stageElement.style.filter = '';
            }, 600);
        }
    }, 200);
    
    // Show growth effects
    showGrowthEffects();
}

function animateWatering() {
    const button = event.target.closest('.action-btn');
    const plantContainer = document.querySelector('.plant-container');
    
    // Button animation
    button.style.transform = 'scale(0.9)';
    setTimeout(() => button.style.transform = '', 200);
    
    // Create water droplets effect
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createWaterDroplet(plantContainer);
        }, i * 100);
    }
    
    // Plant growth boost
    setTimeout(() => {
        const plant = document.querySelector('.plant-stage.active');
        if (plant) {
            plant.style.transform = 'scale(1.1)';
            plant.style.filter = 'hue-rotate(10deg) saturate(1.2)';
            setTimeout(() => {
                plant.style.transform = '';
                plant.style.filter = '';
            }, 1000);
        }
    }, 800);
}

function animateFertilizing() {
    const button = event.target.closest('.action-btn');
    const plantContainer = document.querySelector('.plant-container');
    
    // Button animation
    button.style.transform = 'scale(0.9)';
    setTimeout(() => button.style.transform = '', 200);
    
    // Create sparkle effects
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createSparkleEffect(plantContainer);
        }, i * 80);
    }
    
    // Enhance plant appearance
    setTimeout(() => {
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach((leaf, index) => {
            setTimeout(() => {
                leaf.style.transform = 'scale(1.2) rotate(10deg)';
                leaf.style.filter = 'brightness(1.3) saturate(1.4)';
                setTimeout(() => {
                    leaf.style.transform = '';
                    leaf.style.filter = '';
                }, 800);
            }, index * 200);
        });
    }, 500);
}

function animateSunlight() {
    const button = event.target.closest('.action-btn');
    const plantContainer = document.querySelector('.plant-container');
    
    // Button animation
    button.style.transform = 'scale(0.9)';
    setTimeout(() => button.style.transform = '', 200);
    
    // Create sunlight rays effect
    plantContainer.style.background = 'linear-gradient(to bottom, #fff9e6 0%, #f0f8ff 100%)';
    plantContainer.style.boxShadow = 'inset 0 0 30px rgba(255, 215, 0, 0.3)';
    
    // Add glowing effect to plant
    const allStages = document.querySelectorAll('.plant-stage');
    allStages.forEach(stage => {
        stage.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))';
    });
    
    // Reset after animation
    setTimeout(() => {
        plantContainer.style.background = '';
        plantContainer.style.boxShadow = '';
        allStages.forEach(stage => {
            stage.style.filter = '';
        });
    }, 2000);
}

function createWaterDroplet(container) {
    const droplet = document.createElement('div');
    droplet.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: #3b82f6;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        top: 20px;
        left: ${Math.random() * 200 + 50}px;
        z-index: 10;
        pointer-events: none;
        animation: waterDrop 1s ease-out forwards;
    `;
    
    container.appendChild(droplet);
    
    setTimeout(() => {
        if (droplet.parentNode) {
            droplet.parentNode.removeChild(droplet);
        }
    }, 1000);
}

function createSparkleEffect(container) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: absolute;
        font-size: 16px;
        top: ${Math.random() * 200 + 50}px;
        left: ${Math.random() * 200 + 50}px;
        z-index: 10;
        pointer-events: none;
        animation: sparkleFloat 1.5s ease-out forwards;
    `;
    
    container.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1500);
}

function showGrowthEffects() {
    const plantContainer = document.querySelector('.plant-container');
    
    // Add temporary growth glow
    plantContainer.style.boxShadow = 'inset 0 0 20px rgba(74, 222, 128, 0.3)';
    
    setTimeout(() => {
        plantContainer.style.boxShadow = '';
    }, 1000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes waterDrop {
        0% {
            transform: rotate(-45deg) translateY(0);
            opacity: 1;
        }
        100% {
            transform: rotate(-45deg) translateY(200px);
            opacity: 0;
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-20px) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced click interactions for dashboard elements
function addClickableElements() {
    // Make cards clickable with subtle animations
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.clickable, button')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Make metrics clickable
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach(metric => {
        metric.addEventListener('click', function() {
            // Animate metric value
            const value = this.querySelector('.metric-value');
            value.style.transform = 'scale(1.2)';
            value.style.color = '#4ade80';
            
            setTimeout(() => {
                value.style.transform = '';
                value.style.color = '';
            }, 300);
            
            // Generate random new value for demo
            const currentValue = value.textContent;
            if (currentValue.includes('cm')) {
                value.textContent = (Math.random() * 3 + 3).toFixed(1) + 'cm';
            } else if (currentValue.includes('%')) {
                value.textContent = Math.floor(Math.random() * 30 + 40) + '%';
            } else if (currentValue.includes('°')) {
                value.textContent = Math.floor(Math.random() * 10 + 12) + '°';
            }
        });
    });
    
    // Make chart elements interactive
    const chartCircles = document.querySelectorAll('circle');
    chartCircles.forEach(circle => {
        circle.style.cursor = 'pointer';
        circle.addEventListener('click', function() {
            this.style.transform = 'scale(1.5)';
            this.style.fill = '#22c55e';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.fill = '#4ade80';
            }, 300);
        });
    });
}

// Plant sidebar toggle functionality
function togglePlantSidebar() {
    const sidebar = document.querySelector('.plant-sidebar');
    sidebar.classList.toggle('active');
}

// Scroll to plant section functionality
function scrollToPlantSection() {
    const plantSidebar = document.querySelector('.plant-sidebar');
    if (plantSidebar) {
        plantSidebar.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'center'
        });
    }
}

// Add click listener to plant sidebar trigger
document.addEventListener('click', function(e) {
    if (e.target.closest('.plant-sidebar::before')) {
        togglePlantSidebar();
    }
});

// Export functions for potential external use
window.PlantoDashboard = {
    updateDateTime,
    updateWeatherData,
    initializeAnimations,
    initializeInteractions,
    initializeGrowthChart,
    initializeSoilMoistureChart,
    initializeWaterLevelChart,
    updateAllData,
    generateRandomWeatherData,
    animateGrowthStage,
    animateWatering,
    animateFertilizing,
    animateSunlight,
    togglePlantSidebar,
    scrollToPlantSection
};