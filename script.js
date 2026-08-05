// Inventory State
let inventory = {
    tree: 454,
    flower: 501,
    solar: 12,
    solarArea: 24 // in m2
};

// Admin State
let isAdmin = false;

// DOM Elements
const treeCountEl = document.getElementById('tree-count');
const flowerCountEl = document.getElementById('flower-count');
const solarCountEl = document.getElementById('solar-count');
const solarAreaEl = document.getElementById('solar-area');
const co2AbsorbedEl = document.getElementById('co2-absorbed');
const o2ProducedEl = document.getElementById('o2-produced');

const adminControls = document.querySelectorAll('.admin-controls');
const adminTrigger = document.getElementById('admin-trigger');
const adminModal = document.getElementById('admin-modal');
const adminPassword = document.getElementById('admin-password');
const loginError = document.getElementById('login-error');
const adminStatusBadge = document.getElementById('admin-status-badge');

// Initialize DOM
function updateDisplay() {
    treeCountEl.textContent = inventory.tree;
    flowerCountEl.textContent = inventory.flower;
    solarCountEl.textContent = inventory.solar;
    solarAreaEl.textContent = inventory.solarArea;
    calculateAirQualityImpact();
}

// Calculate Air Quality Impact
function calculateAirQualityImpact() {
    // Assumptions (kg per day)
    // 1 Tree = 0.06 kg CO2 absorbed, 0.32 kg O2 produced
    // 1 Flower = 0.005 kg CO2 absorbed, 0.02 kg O2 produced
    const co2Trees = inventory.tree * 0.06;
    const co2Flowers = inventory.flower * 0.005;
    const totalCo2 = co2Trees + co2Flowers;

    const o2Trees = inventory.tree * 0.32;
    const o2Flowers = inventory.flower * 0.02;
    const totalO2 = o2Trees + o2Flowers;

    // Update UI with 1 decimal place
    co2AbsorbedEl.textContent = totalCo2.toFixed(1);
    o2ProducedEl.textContent = totalO2.toFixed(1);

    // Add brief animation
    [co2AbsorbedEl, o2ProducedEl].forEach(el => {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    });
}

// Update Functions used by admin
function updateInventory(type, amount) {
    if (!isAdmin) return;

    if (inventory[type] !== undefined) {
        inventory[type] += amount;
        if (inventory[type] < 0) inventory[type] = 0; // Prevent negative counts
        updateDisplay();

        // Add a small animation to the updated number
        let el;
        if (type === 'tree') el = treeCountEl;
        else if (type === 'flower') el = flowerCountEl;
        else el = solarCountEl;

        el.style.transform = 'scale(1.2) translateY(-10px)';
        el.style.color = '#fff';
        setTimeout(() => {
            el.style.transform = '';
            el.style.color = '';
        }, 300);
    }
}

function editSolarArea() {
    if (!isAdmin) return;
    const newArea = prompt("Enter new total Solar Panel area (m²):", inventory.solarArea);
    if (newArea !== null && !isNaN(newArea) && newArea >= 0) {
        inventory.solarArea = parseFloat(newArea);
        updateDisplay();
    }
}

// Admin Mode Secrets
let clickCount = 0;
let clickTimer;

// Triple click the invisible top-left corner to trigger admin modal
adminTrigger.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);

    if (clickCount >= 3) {
        openAdminModal();
        clickCount = 0;
    } else {
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 600); // Reset after 600ms
    }
});

function openAdminModal() {
    if (isAdmin) {
        // Toggle off if already admin
        disableAdminControls();
        alert('Developer Mode Disabled.');
        return;
    }
    adminModal.classList.remove('hidden');
    adminPassword.value = '';
    loginError.classList.add('hidden');

    // Slight delay to allow display block before focus
    setTimeout(() => adminPassword.focus(), 100);
}

function closeAdminModal() {
    adminModal.classList.add('hidden');
}

function verifyAdmin() {
    const pwd = adminPassword.value;
    if (pwd === 'eco2026') {
        closeAdminModal();
        enableAdminControls();
    } else {
        loginError.classList.remove('hidden');
        adminPassword.value = '';
        adminPassword.focus();
    }
}

function enableAdminControls() {
    isAdmin = true;
    adminControls.forEach(el => el.classList.remove('hidden'));
    adminStatusBadge.innerHTML = '<i class="fa-solid fa-unlock"></i> Dev Mode Active';
    adminStatusBadge.classList.add('unlocked');
    alert('Developer / Admin Mode Unlocked!\nYou can now edit the inventory counts.');
}

function disableAdminControls() {
    isAdmin = false;
    adminControls.forEach(el => el.classList.add('hidden'));
    adminStatusBadge.innerHTML = '<i class="fa-solid fa-user-lock"></i> Guest Mode';
    adminStatusBadge.classList.remove('unlocked');
}

// Educational Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.animation = 'none'; // reset animation
    });

    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Trigger reflow to restart animation
    void slides[currentSlide].offsetWidth;

    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.animation = 'slideIn 0.5s forwards';
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Add event listener for Enter key on password input
adminPassword.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        verifyAdmin();
    }
});

// Close modal if clicked outside
adminModal.addEventListener('click', function (e) {
    if (e.target === adminModal) {
        closeAdminModal();
    }
});

// ------------------------------------
// Dynamic Eco-Alert System (15+ Threats)
// ------------------------------------
const alertsData = [
    { title: 'Plastic Pollution!', desc: 'By 2050, there will be more plastic in the ocean than fish. Use reusable bottles!', icon: 'fa-bottle-water', type: 'danger', cta: 'Pledge to Reduce Plastic' },
    { title: 'Nature Needs You', desc: 'Nature doesn\'t need people, people need nature. Every action counts.', icon: 'fa-leaf', type: 'success', cta: 'Learn How to Help' },
    { title: 'Stop Wasting Water!', desc: 'A dripping tap wastes 15 liters of water a day. Report leaks immediately.', icon: 'fa-faucet-drip', type: 'warning', cta: 'Report Leaks' },
    { title: 'Daraxt kesish — nafasni bo\'g\'ishdir!', desc: 'Daraxtlar bizning o\'pkamiz. Ularni asrash - hayotni asrash demakdir.', icon: 'fa-tree', type: 'danger', cta: 'O\'rmonlarni asrang' },
    { title: 'Energy Waste Alert!', desc: 'Leaving lights on in empty classrooms wastes massive electricity. Turn them off!', icon: 'fa-lightbulb', type: 'warning', cta: 'Save Electricity' },
    { title: 'The Power of One', desc: 'The greatest threat to our planet is the belief that someone else will save it.', icon: 'fa-globe', type: 'info', cta: 'Take Action Now' },
    { title: 'E-Waste Crisis!', desc: 'Electronic waste is the fastest-growing waste stream. Recycle old gadgets properly.', icon: 'fa-battery-quarter', type: 'warning', cta: 'Recycle E-Waste' },
    { title: 'Plant a Seed', desc: 'He that plants trees loves others beside himself.', icon: 'fa-seedling', type: 'success', cta: 'Join Tree Planting' },
    { title: 'Air Emissions', desc: 'Idling cars near the school gate increase harmful pollutants. Turn off your engine.', icon: 'fa-smog', type: 'danger', cta: 'Stop Idling' },
    { title: 'Ona tabiatni asraylik!', tabiat: 'Biz tabiatni ajdodlardan meros qilib olmaganmiz, uni farzandlarimizdan qarzga olganmiz.', icon: 'fa-hand-holding-heart', type: 'info', cta: 'Harakatni boshlang' },
    { title: 'Food Waste Crisis', desc: '1/3 of all food produced globally goes to waste. Take only what you can eat today.', icon: 'fa-burger', type: 'warning', cta: 'Zero-Waste Lunch' },
    { title: 'Chemical Pollution', desc: 'Harsh chemicals wash into our rivers. Support eco-friendly cleaning alternative actions.', icon: 'fa-flask-vial', type: 'danger', cta: 'Use Eco-Cleaners' },
    { title: 'Protect Biodiversity!', desc: 'Urbanization threatens local insect populations. Help us plant native flowers.', icon: 'fa-bug', type: 'warning', cta: 'Plant Native Flora' },
    { title: 'Reduce, Reuse, Recycle', desc: 'There is no such thing as \'away\'. When we throw anything away it must go somewhere.', icon: 'fa-recycle', type: 'success', cta: 'Sort Your Trash' },
    { title: 'Fast Fashion Waste', desc: 'The fashion industry is responsible for 10% of global carbon emissions. Swap, don\'t shop!', icon: 'fa-shirt', type: 'info', cta: 'Join Clothing Swap' }
];

let currentAlertIndex = 0;
const alertWrapper = document.getElementById('dynamic-alert-wrapper');
const alertProgressBar = document.getElementById('alert-progress');
let alertRotationInterval;

function renderCurrentAlert() {
    const alert = alertsData[currentAlertIndex];
    alertWrapper.innerHTML = `
        <div class="dynamic-alert-card ${alert.type}">
            <div class="alert-visual">
                <i class="fa-solid ${alert.icon}"></i>
            </div>
            <div class="alert-content">
                <h3>${alert.title}</h3>
                <p>${alert.desc || alert.tabiat}</p>
                <button class="action-btn">${alert.cta}</button>
            </div>
        </div>
    `;

    // Reset and trigger progress bar animation (30s)
    alertProgressBar.style.transition = 'none';
    alertProgressBar.style.width = '0%';

    // Slight delay to allow transition reset, then start 30s fill
    setTimeout(() => {
        alertProgressBar.style.transition = 'width 30s linear';
        alertProgressBar.style.width = '100%';
    }, 50);
}

function rotateAlert() {
    alertWrapper.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        currentAlertIndex = (currentAlertIndex + 1) % alertsData.length;
        renderCurrentAlert();
        alertWrapper.style.transition = 'none';
        alertWrapper.style.transform = 'translateX(100%)';

        setTimeout(() => {
            alertWrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            alertWrapper.style.transform = 'translateX(0)';
        }, 50);
    }, 800);
}

function initEcoAlerts() {
    renderCurrentAlert();
    // Rotate every 30 seconds
    alertRotationInterval = setInterval(rotateAlert, 30000);
}

// ------------------------------------
// Standalone Eco-Calculator Logic
// ------------------------------------
const calcTreesInput = document.getElementById('calc-trees');
const calcFlowersInput = document.getElementById('calc-flowers');
const calcSolarCountInput = document.getElementById('calc-solar-count');
const calcSolarAreaInput = document.getElementById('calc-solar-area');
const calcDynamicCo2 = document.getElementById('calc-dynamic-co2');
const calcDynamicO2 = document.getElementById('calc-dynamic-o2');
const calcDynamicEnergy = document.getElementById('calc-dynamic-energy');

function updateEcoCalculator() {
    const trees = parseFloat(calcTreesInput.value) || 0;
    const flowers = parseFloat(calcFlowersInput.value) || 0;
    const solarCount = parseFloat(calcSolarCountInput.value) || 0;
    const solarArea = parseFloat(calcSolarAreaInput.value) || 0;

    // Flora logic (kg per day)
    const co2Trees = trees * 0.06;
    const co2Flowers = flowers * 0.005;
    const totalCo2 = co2Trees + co2Flowers;

    const o2Trees = trees * 0.32;
    const o2Flowers = flowers * 0.02;
    const totalO2 = o2Trees + o2Flowers;

    // Solar Energy generation logic (kWh per day)
    // Formula approximation: Area (m2) * panel efficiency (18%) * average sun hours (5h)
    // The panel count is kept for demonstration or UI scaling, but area is primary factor for formula
    const dailyKwh = solarArea * 0.18 * 5;

    // Output formatting
    calcDynamicCo2.textContent = totalCo2.toFixed(2);
    calcDynamicO2.textContent = totalO2.toFixed(2);
    calcDynamicEnergy.textContent = dailyKwh.toFixed(1);
}

// Add event listeners for real-time calculation
[calcTreesInput, calcFlowersInput, calcSolarCountInput, calcSolarAreaInput].forEach(input => {
    input.addEventListener('input', updateEcoCalculator);
});

// Trigger initial calculation
updateEcoCalculator();

// ------------------------------------
// Startup Hub & AI Contest Logic
// ------------------------------------
const startupForm = document.getElementById('startup-form');
const successMsg = document.getElementById('startup-success-msg');
const projectNameInput = document.getElementById('project-name');
const fullNameInput = document.getElementById('full-name');
const phoneNumberInput = document.getElementById('phone-number');

// Array to store submissions
let startupSubmissions = [];

// DOM Elements for Timer and Modal
const countdownText = document.getElementById('countdown-timer');
const progressCircle = document.querySelector('.progress-ring__circle');
const devTimerInput = document.getElementById('dev-timer-input');
const winnerModal = document.getElementById('winner-modal');
const winnerNameEl = document.getElementById('winner-name');
const winnerProjectEl = document.getElementById('winner-project');

// Progress ring setup (Circumference calculation)
const circumference = 2 * Math.PI * 90; // r=90

// Handle Form Submission
startupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submission = {
        project: projectNameInput.value,
        name: fullNameInput.value,
        phone: phoneNumberInput.value
    };
    
    startupSubmissions.push(submission);
    
    // Show success message
    startupForm.reset();
    successMsg.classList.remove('hidden');
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 4000);
});

// Timer Logic
let contestTimerInterval;
let timerRunning = false;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

function startAIContest() {
    if (!isAdmin) {
        alert("You must be in Developer Mode to start the contest.");
        return;
    }
    
    if (timerRunning) return;
    
    const totalSeconds = parseInt(devTimerInput.value) || 10;
    if (totalSeconds <= 0) return;
    
    let currentSeconds = totalSeconds;
    timerRunning = true;
    
    // Initial display
    updateTimerDisplay(currentSeconds);
    setProgress(100);
    
    contestTimerInterval = setInterval(() => {
        currentSeconds--;
        
        updateTimerDisplay(currentSeconds);
        
        const percent = (currentSeconds / totalSeconds) * 100;
        setProgress(percent);
        
        // AI "Thinking" Simulation effect text
        if (currentSeconds > 0 && currentSeconds <= 3) {
            countdownText.textContent = "AI EVAL...";
            countdownText.style.color = "var(--sun-yellow)";
            countdownText.style.fontSize = "2rem";
        }
        
        if (currentSeconds <= 0) {
            clearInterval(contestTimerInterval);
            timerRunning = false;
            finishContest();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    countdownText.style.color = "#fff";
    countdownText.style.fontSize = "3rem";
    countdownText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function finishContest() {
    countdownText.textContent = "DONE";
    countdownText.style.color = "var(--emerald)";
    
    setTimeout(() => {
        announceWinner();
    }, 500);
}

function announceWinner() {
    // If no submissions, pick a fake default for demonstration
    let winner;
    if (startupSubmissions.length === 0) {
        winner = { name: "Alex Pioneer", project: "Solar Tech Synthesizer" };
    } else {
        // Randomly simulate AI selection
        const randomIndex = Math.floor(Math.random() * startupSubmissions.length);
        winner = startupSubmissions[randomIndex];
    }
    
    winnerNameEl.textContent = winner.name;
    winnerProjectEl.textContent = winner.project;
    
    // Show Modal
    winnerModal.classList.remove('hidden');
}

function closeWinnerModal() {
    winnerModal.classList.add('hidden');
    // Reset timer UI optionally
    updateTimerDisplay(0);
    setProgress(0);
    countdownText.textContent = "00:00";
}

// Ensure Admin controls apply to the dev timer too
// Modifying existing openAdminModal logic indirectly by ensuring periodic check or adding to adminControls NodeList
// It is already included in the .admin-controls class, so enableAdminControls() will reveal it.

// Init
updateDisplay();
initEcoAlerts();
