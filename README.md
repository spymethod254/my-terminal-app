# Gwiji Linux Workspace IDE 🛠️

A beautiful, high-performance, and fully interactive web-based Linux Terminal and Workspace IDE. This application runs a persistent **Pseudo-Terminal (PTY)** cloud engine backend built with Node.js, combined with a responsive, multi-panel front-end dashboard featuring **Xterm.js**.

It is fully optimized as a **Progressive Web App (PWA)**, allowing you to install it directly onto your mobile home screen or tablet as a standalone, fullscreen application.

---

## 🌟 Key Features

- **⚡ Full Interactive PTY Shell:** Supports real-time text layouts, screen redraws, and interactive CLI programs like `nano`, `vim`, `top`, or `htop`.
- **📁 Integrated File Explorer:** A live sidebar that updates dynamically. Clicking any directory navigates into it, and clicking any file automatically opens it inside `nano` on your screen.
- **🚀 Automation Panel (Quick Run Macros):** Pre-configured click buttons to immediately fire off complex terminal tasks (`ls -la`, system monitoring, clearing canvas logs).
- **📱 Responsive Mobile Toolbars:** A customizable sticky shortcut key strip providing touch access to special modifiers missing from phone keyboards (`ESC`, `TAB`, `CTRL`, `ALT`, Arrow Keys).
- **🎨 Live Theme Engine Changer:** On-the-fly skin swapping between layouts like *Classic Termux*, *Matrix Green*, *Cyberpunk Neon*, and *Ubuntu Purple*.
- **📦 Independent Deployment:** Automatically switches environment parameters to host natively inside private local wrappers (like **Termux**) or scale seamlessly onto public clouds (**Railway**).

---

## 🏗️ Project Architecture Tree

```text
my-terminal-app/
├── package.json         # Production script configurations & dependency maps
├── server.js           # Core Node.js server streaming WebSockets & PTY channels
└── public/             # Visual asset layouts served down to the client viewport
    ├── index.html      # High-performance main dashboard layout wrapper & styles
    ├── manifest.json   # Web application framework descriptor mapping standalone view configurations
    └── sw.js           # Empty Service Worker caching layer mapping home screen triggers
```

---

## 🚀 Quick Setup & Installation

### Local Deployment (Termux / Linux)

1. **Clone the repository and enter the directory:**
   ```bash
   git clone https://github.com/spymethod254/my-terminal-app.git
   cd my-terminal-app
   ```

2. **Install development environments & build components:**
   ```bash
   pkg install nodejs git openssh -y
   npm install
   ```

3. **Fire up the background server pipeline listener:**
   ```bash
   node server.js
   ```

4. **Access your dashboard workspace:**
   Open your browser and navigate to: `http://localhost:3000`

---

## ☁️ Cloud Deployment (Railway)

This repository is pre-configured for instant **one-click deployment** on Railway.

1. Push this project code directly to your personal GitHub profile.
2. Open your **Railway Dashboard** account space and link your repository branch tracking.
3. Railway will read the `start` script inside `package.json`, securely build out native dependencies, and deploy the application.
4. Navigate to your project **Settings ⚙️ -> Networking**, and click **Generate Domain** to claim your free encrypted `.up.railway.app` production link!

---

## 📱 Installing as a Fullscreen Standalone App

1. Launch your working URL inside **Google Chrome** on your mobile device.
2. Open the Chrome option drawer list (the three vertical dots in the upper right quadrant).
3. Scroll down and click **Add to Home screen** or **Install App**.
4. Close your browser and open it using the new desktop icon to load up into a clean, borderless standalone frame.

---

## 🛠️ Built With

- **Node.js** - High-performance server framework pipeline handler
- **Express** - Fast, lightweight local file routing controller
- **ws** - Immersive, low-latency client-to-server WebSocket protocols
- **Xterm.js** - Frontend terminal rendering environment emulator engine
- **node-pty** - Native backend operating system fork connector mapping hooks
