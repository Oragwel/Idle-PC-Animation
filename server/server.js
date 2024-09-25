const express = require('express');
const path = require('path'); // Import path
const app = express();
const port = 3000;
const pcStatus = {}; // Store PC statuses and idle times

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client'))); // Serve static files from the client directory

// Endpoint to report idle status from the client
app.post('/reportIdle', (req, res) => {
    const { pcId, status } = req.body;

    if (status === 'idle') {
        // Store the time when the PC went idle
        pcStatus[pcId] = {
            status: 'idle',
            idleStart: Date.now() // Record idle start time
        };
        console.log(`PC ${pcId} is idle. Idle time started.`);
    } else {
        // Remove from idle tracking if it becomes active
        delete pcStatus[pcId];
        console.log(`PC ${pcId} is active.`);
    }

    res.json({ message: `PC ${pcId} status updated to ${status}.` });
});

// Function to check for idle PCs and trigger shutdown after 30 seconds
function checkIdlePCsForShutdown() {
    const currentTime = Date.now();

    Object.keys(pcStatus).forEach(pcId => {
        const pc = pcStatus[pcId];

        // Check if the PC has been idle for 30 seconds
        if (pc.status === 'idle' && currentTime - pc.idleStart >= 30000) {
            console.log(`PC ${pcId} has been idle for 30 seconds. Initiating shutdown...`);
            pcStatus[pcId].status = 'off'; // Mark as 'off'
            console.log(`PC ${pcId} has been shut down.`);
        }
    });
}

// Endpoint to get shutdown commands
app.get('/getShutdownCommands', (req, res) => {
    const commands = Object.keys(pcStatus)
        .filter(pcId => pcStatus[pcId].status === 'off')
        .map(pcId => ({ pcId, action: 'shutdown' }));

    res.json(commands); // Respond with JSON
});

// Periodically check for idle PCs and trigger shutdown after 30 seconds
setInterval(checkIdlePCsForShutdown, 5000); // Check every 5 seconds

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
