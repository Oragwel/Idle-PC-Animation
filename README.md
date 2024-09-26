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
Open index.html in your web browser to view the project.

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
## Technologies Used

    HTML5
    CSS3
    JavaScript
    Node.js (for backend, if applicable)


## Usage

Upon loading the page, multiple PC elements will be displayed, each showing its status.

Click the LED indicator on a PC to simulate booting it up from a shut down state.

Use the "Report Idle Status" button to randomly set PCs to idle or active.

PCs that remain idle for more than 30 seconds will automatically shut down and display a shutdown message.

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