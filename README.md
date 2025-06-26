# Idle PC Animation Project

## Description

The Idle PC Animation project is designed to visualize the idle status of computers within a local area network (LAN). This web-based system detects PCs that have been idle for an extended period (more than 30 minutes) and initiates an automatic shutdown to conserve energy and resources. It provides real-time updates on the status of each PC, enhancing awareness of computer activity within the network.

## Background

Prolonged PC idleness can lead to several negative effects, including:

- Screen Flickering: When a PC is left idle for an extended period, the display settings may adjust, causing flickering when the user returns to active usage. This can be disruptive and strain the eyes.

- Hardware Degradation: Leaving a PC idle can result in components becoming less responsive over time, leading to potential hardware failure.

- Data Loss Risk: Idle systems may lose unsaved data if a crash occurs during inactivity, posing risks to important files.

- Network Vulnerability: An idle PC connected to the network can become a target for unauthorized access, increasing security risks.

- Software Updates Delays: Idle machines may not receive necessary software updates promptly, leaving them vulnerable to security threats.


The Idle PC Animation Project offers solutions to mitigate the negative impacts of prolonged PC idleness:

- Automated Shutdown: By automatically shutting down PCs that have been idle for more than 30 minutes, the project prevents potential hardware degradation and reduces energy consumption, minimizing risks associated with prolonged inactivity.
- Resource Management: Reducing the number of active machines can free up network resources, enhancing performance for active users and applications.

- User Engagement: The real-time status updates and animations encourage users to be more aware of their PC usage, reducing the likelihood of leaving machines idle for extended periods.

- Visual Feedback: The project provides immediate visual cues for PC status, including animations for active, idle, and shutdown states. This feedback helps users quickly assess the current state of their machines and take action if needed.

- Security Enhancements: By ensuring that idle machines are shut down, the project minimizes the risk of unauthorized access and data breaches, enhancing the overall security posture of the network.

## Features

- Dynamic PC Status Updates: PCs automatically transition between active, idle, and off states based on user interactions and idle time.
- Visual Feedback: The application provides visual cues, such as color changes and animations, to indicate PC status changes.
- Timer Functionality: Each PC displays a timer that tracks how long it has been active or idle.
- Reporting Window: A dedicated log section displays messages related to PC status changes, providing an overview of activity.

## Installation

Clone the repository:

```bash
git clone https://github.com/Oragwel/Idle-PC-Animation.git
```

Navigate to the project directory:

```bash
cd Idle-PC-Animation
```

Install the required dependencies:

```bash
npm install
```

## How to Run

### Method 1: Full Stack Application (Recommended)

This method runs both the backend server and frontend, providing complete functionality including automatic PC shutdown monitoring.

1. **Start the server**:
   ```bash
   npm start
   ```
   Or alternatively:
   ```bash
   node server/server.js
   ```

2. **Open your web browser** and navigate to:
   ```
   http://localhost:3000
   ```

The server will:
- Serve the client files automatically
- Monitor PC idle status in real-time
- Automatically shut down PCs that remain idle for more than 30 seconds
- Provide API endpoints for status reporting

### Method 2: Client-Only (Frontend Only)

If you want to view just the frontend animations without backend functionality:

1. **Navigate to the client directory**:
   ```bash
   cd client
   ```

2. **Open index.html directly in your browser**:
   - Double-click on `index.html`, or
   - Use a simple HTTP server:
     ```bash
     python3 -m http.server 8000
     ```
     Then visit `http://localhost:8000`

**Note**: Method 1 is recommended as it provides the full experience with automatic shutdown functionality.

## Project Structure

```bash
/Idle-PC-Animation
│
├── /client
│   ├── index.html        # Main HTML file for the project
│   ├── style.css         # CSS file for styling the project
│   └── script.js         # JavaScript file for managing PC statuses and interactions
│
├── /server
│   └── (server files)    # Backend server files (if applicable)
│
└── README.md             # Project documentation
```
## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- **Backend**:
  - Node.js
  - Express.js
  - WebSocket (ws)


## Usage

### Getting Started

1. **Start the application** using Method 1 from the "How to Run" section above
2. **Open your browser** to `http://localhost:3000`
3. You'll see the main dashboard with multiple PC elements

### Interactive Features

- **PC Status Visualization**: Each PC displays its current status with color-coded indicators:
  - 🟢 **Green**: Active/Running
  - 🟡 **Yellow**: Idle
  - 🔴 **Red**: Shut down/Off

- **Manual PC Control**:
  - Click the LED indicator on any PC to boot it up from a shut-down state
  - Watch the smooth animations as PCs transition between states

- **Idle Status Simulation**:
  - Use the "Report Idle Status" button to randomly set PCs to idle or active states
  - This simulates real-world network activity

- **Automatic Shutdown**:
  - PCs that remain idle for more than 30 seconds will automatically shut down
  - A shutdown message will be displayed in the log section
  - This helps conserve energy and resources

- **Real-time Monitoring**:
  - The status log shows all PC state changes in real-time
  - Timers display how long each PC has been in its current state

### API Endpoints

If you're developing or integrating with the system:

- `POST /reportIdle` - Report a PC's idle status
- `GET /getShutdownCommands` - Get list of PCs scheduled for shutdown

## Troubleshooting

### Common Issues

**Port 3000 already in use**:
```bash
Error: listen EADDRINUSE: address already in use :::3000
```
- Solution: Either stop the process using port 3000 or change the port in `server/server.js`

**Dependencies not installed**:
```bash
Error: Cannot find module 'express'
```
- Solution: Run `npm install` in the project directory

**Browser shows "Cannot GET /"**:
- Make sure you're running the server with `npm start`
- Check that you're accessing `http://localhost:3000` (not just opening the HTML file)

**PCs not shutting down automatically**:
- This feature only works when running the full-stack application (Method 1)
- Check the browser console and server logs for any error messages

### Getting Help

If you encounter issues:
1. Check the server console for error messages
2. Open browser developer tools (F12) and check the console
3. Ensure all prerequisites are installed
4. Try restarting the server

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any enhancements or bug fixes.
## License
This project is licensed under the [MIT](https://opensource.org/license/mit) License.
## Acknowledgments
Inspired by various idle detection systems and animations in web development.
Thanks to all contributors and mentors for their support.
## Authors
[Oragwel](https://github.com/Oragwel/)

[Joan2509](https://github.com/Joan2509/)