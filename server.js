const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static HTML layout dashboard assets from the public directory
app.use(express.static('public'));

// Railway dynamically assigns a network port using process.env.PORT
const PORT = process.env.PORT || 3000;

// Determine the available terminal shell on the hosting environment
const shell = os.platform() === 'android' ? '/system/bin/sh' : '/bin/bash';

wss.on('connection', (ws) => {
    // Launch an internal bash terminal process directly inside the cloud container
    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME || process.cwd(),
        env: process.env
    });

    // Stream live bash terminal print outputs straight to the web layout canvas
    ptyProcess.onData((data) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
        }
    });

    // Listen for direct interactive keystrokes or shortcut macros coming from the web UI
    ws.on('message', (message) => {
        try {
            const msg = JSON.parse(message.toString());
            
            if (msg.type === 'input') {
                ptyProcess.write(msg.data);
            } else if (msg.type === 'command') {
                ptyProcess.write(msg.data \(+ '\r'\));
            }
        } catch (e) {
            // Fallback to handling raw text streams if format changes
            ptyProcess.write(message.toString());
        }
    });

    // Clean up container resources instantly when a browser session ends
    ws.on('close', () => {
        ptyProcess.kill();
    });
});

// Boot up the system listener
server.listen(PORT, () => {
    console.log('==================================================');
    console.log(` 🚀 STANDALONE CLOUD TERMINAL APP IS ACTIVE!`);
    console.log(` 👉 Server Listening on port: ${PORT}`);
    console.log('==================================================\n');
});
