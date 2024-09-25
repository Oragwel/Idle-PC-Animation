const pcCount = 8;
const pcStatus = Array(pcCount).fill('active'); // Initial status for each PC
const idleStartTimes = Array(pcCount).fill(0); // Track when each PC goes idle
const timers = []; // Array to hold timer intervals
const timerSeconds = Array(pcCount).fill(0); // Track seconds for each PC
const timerIntervals = Array(pcCount).fill(null); // Store timer intervals for each PC

// Create PC elements dynamically
const pcContainer = document.getElementById('pc-container');

for (let i = 0; i < pcCount; i++) {
    const pcElement = document.createElement('div');
    pcElement.classList.add('pc', 'active');
    pcElement.id = `pc-${i + 1}`;

    const screen = document.createElement('div');
    screen.classList.add('screen');
    screen.style.backgroundColor = getRandomGreenColor(); // Set random green color

    const base = document.createElement('div');
    base.classList.add('base');

    const statusDisplay = document.createElement('div');
    statusDisplay.classList.add('status');
    statusDisplay.innerText = 'Active'; // Default status

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer');
    timerDisplay.innerText = '0s'; // Initialize timer display

    const shutdownMessage = document.createElement('div');
    shutdownMessage.classList.add('shutdown-message');
    shutdownMessage.innerText = ''; // Empty initially

    // Create LED element
    const led = document.createElement('div');
    led.classList.add('led'); // Add LED class
    led.addEventListener('click', () => handleLEDClick(pcElement, i)); // Click event for LED

    pcElement.appendChild(screen);
    pcElement.appendChild(base);
    pcElement.appendChild(statusDisplay);
    pcElement.appendChild(timerDisplay);
    pcElement.appendChild(shutdownMessage);
    pcElement.appendChild(led); // Append the LED to the PC element
    pcContainer.appendChild(pcElement);

    // Start the timer for this PC
    startTimer(i);
}

// Function to get a random green color
function getRandomGreenColor() {
    const greenValue = Math.floor(Math.random() * 256); // Random value between 0 and 255
    return `rgb(0, ${greenValue}, 0)`; // RGB format for green
}

// Automatically set some PCs to idle after 30 seconds
setTimeout(() => {
    pcStatus.forEach((status, index) => {
        if (Math.random() < 0.5) { // 50% chance to set to idle
            const pcId = `PC${index + 1}`;
            reportIdleStatus(pcId, 'idle', index);
        }
    });
}, 30000); // 30 seconds after page load

// Report idle status when button is clicked
document.getElementById('reportIdleButton').addEventListener('click', () => {
    pcStatus.forEach((status, index) => {
        const pcId = `PC${index + 1}`;
        const newStatus = Math.random() < 0.5 ? 'idle' : 'active';
        reportIdleStatus(pcId, newStatus, index);
    });
});

// Function to report idle status and change animation
function reportIdleStatus(pcId, status, index) {
    const pcElement = document.getElementById(`pc-${index + 1}`);
    const screen = pcElement.querySelector('.screen');
    const statusDisplay = pcElement.querySelector('.status');
    const led = pcElement.querySelector('.led'); // Get LED element

    console.log(`Reporting ${pcId} as ${status}`);

    if (status === 'idle' && pcStatus[index] === 'active') {
        pcElement.classList.add('idle');
        pcElement.classList.remove('active');
        screen.style.backgroundColor = '#ffcc00'; // Set to orange for idle
        statusDisplay.innerText = 'Idle'; // Update status display
        pcStatus[index] = 'idle';
        idleStartTimes[index] = Date.now(); // Record when the PC went idle
    } else if (status === 'active' && pcStatus[index] === 'idle') {
        pcElement.classList.remove('idle');
        pcElement.classList.add('active');
        screen.style.backgroundColor = getRandomGreenColor(); // Set a new random green
        statusDisplay.innerText = 'Active'; // Update status display
        pcStatus[index] = 'active';
        idleStartTimes[index] = 0; // Reset idle start time
        resetTimer(index); // Restore timer when activating
        startTimer(index); // Start the timer again
    }
}

// Function to handle LED click
function handleLEDClick(pcElement, index) {
    const statusDisplay = pcElement.querySelector('.status');
    const led = pcElement.querySelector('.led'); // Get LED element

    if (pcStatus[index] === 'off') {
        bootUpPC(pcElement, statusDisplay, led, index);
    }
}

// Function to boot up the PC
function bootUpPC(pcElement, statusDisplay, led, index) {
    statusDisplay.innerText = `PC${index + 1} booting up, please wait...`;
    led.style.backgroundColor = '#FFA500'; // Change LED to orange during booting

    // Simulate boot time of 5 seconds
    setTimeout(() => {
        // After 5 seconds, update the PC to active
        pcElement.classList.remove('off');
        pcElement.classList.add('active');
        pcElement.classList.remove('idle'); // Ensure it's not idle
        statusDisplay.innerText = 'Active'; // Update status display
        pcStatus[index] = 'active'; // Update status
        resetTimer(index); // Restore timer when booting
        startTimer(index); // Start the timer again
        led.style.backgroundColor = '#00ff00'; // LED flickering green after boot
        flickerLED(led, index); // Start flickering LED effect
    }, 5000); // 5 seconds boot time
}

// Function to reset the timer display
function resetTimer(index) {
    const pcElement = document.getElementById(`pc-${index + 1}`);
    const timerDisplay = pcElement.querySelector('.timer');
    timerDisplay.innerText = '0s'; // Reset timer display
    timerSeconds[index] = 0; // Reset the seconds counter
}

// Function to start the timer
function startTimer(index) {
    if (timerIntervals[index]) return; // Prevent multiple intervals
    timerIntervals[index] = setInterval(() => {
        if (pcStatus[index] === 'active' || pcStatus[index] === 'idle') { // Keep timer running for active and idle PCs
            timerSeconds[index]++;
            const pcElement = document.getElementById(`pc-${index + 1}`);
            const timerDisplay = pcElement.querySelector('.timer');
            timerDisplay.innerText = `${timerSeconds[index]}s`; // Update timer display
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer(index) {
    clearInterval(timerIntervals[index]); // Clear the interval
    timerIntervals[index] = null; // Reset the interval reference
}

// Function to flicker the LED
function flickerLED(led, index) {
    let flickerInterval = setInterval(() => {
        if (pcStatus[index] === 'active') {
            led.style.backgroundColor = led.style.backgroundColor === 'green' ? '#00ff00' : 'green'; // Flicker between colors
        } else if (pcStatus[index] === 'off') {
            clearInterval(flickerInterval); // Stop flickering if PC is off
            led.style.backgroundColor = 'red'; // Set LED to red if off
        }
    }, 500);
}

// Function to check for idle PCs and trigger shutdown if idle for 30 seconds
function checkForShutdown() {
    const currentTime = Date.now();

    pcStatus.forEach((status, index) => {
        if (status === 'idle' && currentTime - idleStartTimes[index] >= 30000) {
            const pcId = `PC${index + 1}`;
            handleShutdownCommand(pcId, index);
        }
    });
}

// Function to handle shutdown commands
function handleShutdownCommand(pcId, index) {
    const pcElement = document.getElementById(`pc-${index + 1}`);
    const statusDisplay = pcElement.querySelector('.status');
    const led = pcElement.querySelector('.led'); // Get LED element
    const shutdownMessage = pcElement.querySelector('.shutdown-message'); // Get shutdown message element
    const screen = pcElement.querySelector('.screen'); // Get the screen element

    console.log(`${pcId} has been idle for 30 seconds. Initiating shutdown...`);

    // Set PC to shutdown state
    pcElement.classList.remove('active');
    pcElement.classList.remove('idle');
    pcElement.classList.add('off');
    stopTimer(index); // Stop the timer for the off state
    statusDisplay.innerText = ''; // Clear status display
    led.style.backgroundColor = '#ff0000'; // LED turns red during shutdown
    screen.style.backgroundColor = 'black'; // Change screen color to black during shutdown
    pcStatus[index] = 'off'; // Update status to off

    // Show shutdown message and clear it after 2 seconds
    shutdownMessage.innerText = `${pcId} is shutting down...`; // Show shutdown message
    setTimeout(() => {
        shutdownMessage.innerText = ''; // Clear shutdown message after 2 seconds
    }, 2000);
}

// Set interval to check for idle PCs every second
setInterval(checkForShutdown, 1000);
