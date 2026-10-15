const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static HTML/CSS files from your public asset folder
app.use(express.static('public'));

// Railway dynamically assigns a network port using process.env.PORT
const PORT = process.env.PORT || 3000;

// Determine the default terminal shell structure based on the host runtime
const shell = os.platform() === 'android' ? '/system/bin/sh' : '/bin/bash';

// Endpoint to fetch the filesystem list visually for the left sidebar panel
app.get('/api/files', (req, res) => {
    const targetPath = req.query.path || process.cwd();
    fs.readdir(targetPath, { withFileTypes: true }, (err, files) => {
        if (err) return res.status(500).json({ error: 'Cannot read directory' });
        
        const list = files.map(file => ({
            name: file.name,
            isDirectory: file.isDirectory(),
            path: path.join(targetPath, file.name)
        }));
        res.json({ currentDir: targetPath, files: list });
    });
});

wss.on('connection', (ws) => {
    // Launch a direct internal interactive terminal process sandbox session
    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: process.env.HOME || process.cwd(),
        env: process.env
    });

    // Instantly stream active shell layout draws back to the frontend canvas
    ptyProcess.onData((data) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
        }
    });

    // Listen for incoming structured packet strings tracking typing or automation macros
    ws.on('message', (message) => {
        try {
            const msg = JSON.parse(message.toString());
            
            if (msg.type === 'input') {
                ptyProcess.write(msg.data);
            } else if (msg.type === 'command') {
                ptyProcess.write(msg.data + '\r');
            }
        } catch (e) {
            // Fallback safety filter to keep text processing active if message mapping shifts
            ptyProcess.write(message.toString());
        }
    });

    // Instantly terminate background tasks when a client session terminates
    ws.on('close', () => {
        ptyProcess.kill();
    });
});

// Start the production listener port loop
server.listen(PORT, () => {
    console.log('==================================================');
    console.log(` 🚀 STANDALONE CLOUD TERMINAL ENGINE ACTIVE!`);
    console.log(` 👉 Server running on port framework: ${PORT}`);
    console.log('==================================================\n');
});
