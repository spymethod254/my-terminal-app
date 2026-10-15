const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

// Endpoint to fetch the filesystem list visually for the sidebar
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
    const conn = new Client();

    conn.on('ready', () => {
        conn.shell({ term: 'xterm-color', cols: 80, rows: 24 }, (err, stream) => {
            if (err) {
                ws.send('\r\n[App Error: Failed to open interactive shell]\r\n');
                return conn.end();
            }

            stream.on('data', (data) => ws.send(data.toString()));

            ws.on('message', (message) => {
                const msg = JSON.parse(message.toString());
                
                // Handle normal raw keyboard entry typing stream
                if (msg.type === 'input') {
                    stream.write(msg.data);
                } 
                // Handle automation shortcuts running from our Quick Commands panel
                else if (msg.type === 'command') {
                    stream.write(msg.data + '\r');
                }
            });

            ws.on('close', () => conn.end());
        });
    }).connect({
        host: '127.0.0.1',
        port: 8022,
        username: 'hamsogwiji',
        password: 'YOUR_PASSWORD_HERE' // ⚠️ REMEMBER TO PUT YOUR PASSWORD HERE!
    });
});

server.listen(3000, () => {
    console.log('==================================================');
    console.log(' 🚀 WORKSPACE IDE ENGINE WITH SIDEBARS IS LIVE!');
    console.log(' 👉 Open browser to: http://localhost:3000');
    console.log('==================================================\n');
});

