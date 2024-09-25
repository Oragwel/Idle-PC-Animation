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

    // Show shutdown message on screen
    shutdownMessage.innerText = `${pcId} is shutting down...`;
    shutdownMessage.style.opacity = '1'; // Show the message

    // Fade out the message after 3 seconds and then clear the text
    setTimeout(() => {
        shutdownMessage.style.opacity = '0'; // Hide the message smoothly
        setTimeout(() => {
            shutdownMessage.innerText = ''; // Clear the message text
        }, 1000); // Wait for opacity transition to complete before clearing the text
    }, 3000);
}

// Periodically check for idle PCs
setInterval(checkForShutdown, 1000); // Check every second


//  function to generate PC Status Report
const reportWindow = document.getElementById('log-messages');

function logMessage(message) {
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    reportWindow.appendChild(logEntry);
}

// Example function to handle idle PC status
function handleIdleStatus(pc) {
    const idleTime = calculateIdleTime(pc); // Implement this function to get idle time
    logMessage(`PC ${pc.id} has been idle for ${idleTime} minutes.`);
}

// Example function to handle PC shutdown
function handleShutdown(pc) {
    logMessage(`PC ${pc.id} is shutting down.`);
    // Remove the PC or perform other actions as needed
}

// Update existing functions where you handle idle status and shutdown
function updatePCStatus(pc) {
    if (pc.isIdle) {
        handleIdleStatus(pc);
    }
    // Other status updates...
}

// Call logMessage function appropriately
// For example:
logMessage('PC' `${pc.id}`);
setTimeout(() => handleIdleStatus({id: 'PC001', isIdle: true}), 60000); // Simulate idle after 1 min
setTimeout(() => handleShutdown({id: 'PC001'}), 120000); // Simulate shutdown after 2 mins








// function to draw lines between pcs
// function drawLines() {
//     const svg = document.getElementById('line-svg');
//     svg.innerHTML = ''; // Clear existing lines

//     const pcs = document.querySelectorAll('.pc'); // Get all PC elements
//     const pcCount = pcs.length;

//     const rows = Math.ceil(Math.sqrt(pcCount)); // Calculate rows for a square layout
//     const cols = Math.ceil(pcCount / rows); // Calculate columns based on rows

//     pcs.forEach((pc, index) => {
//         const x = (index % cols) * (pc.offsetWidth + 40) + pc.offsetWidth / 2; // 40 is the margin for PCs
//         const y = Math.floor(index / cols) * (pc.offsetHeight + 40) + pc.offsetHeight; // Adjust for height
        
//         if (index < cols) {
//             // Connect to the PC below
//             if (index + cols < pcCount) {
//                 const x2 = (index % cols) * (pcs[index + cols].offsetWidth + 40) + pcs[index + cols].offsetWidth / 2;
//                 const y2 = (Math.floor(index / cols) + 1) * (pcs[index + cols].offsetHeight + 40);

//                 const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//                 line.setAttribute('x1', x);
//                 line.setAttribute('y1', y);
//                 line.setAttribute('x2', x2);
//                 line.setAttribute('y2', y2);
//                 line.setAttribute('stroke', 'black');
//                 line.setAttribute('stroke-width', '2');
//                 svg.appendChild(line);
//             }
//         }

//         // Connect to the right PC
//         if ((index + 1) % cols !== 0 && index + 1 < pcCount) {
//             const x2 = (index + 1) % cols * (pcs[index + 1].offsetWidth + 40) + pcs[index + 1].offsetWidth / 2;
//             const y2 = Math.floor((index + 1) / cols) * (pcs[index + 1].offsetHeight + 40) + pcs[index + 1].offsetHeight;

//             const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//             line.setAttribute('x1', x);
//             line.setAttribute('y1', y);
//             line.setAttribute('x2', x2);
//             line.setAttribute('y2', y2);
//             line.setAttribute('stroke', 'black');
//             line.setAttribute('stroke-width', '2');
//             svg.appendChild(line);
//         }
//     });
// }

// // Call drawLines whenever you need to update the lines
// drawLines(); // Initial call to draw lines
// window.addEventListener('resize', drawLines); // Redraw on window resize

