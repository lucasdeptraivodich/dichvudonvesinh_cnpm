'use strict';

/**
 * Server chinh: Express + session + API dang ky/dang nhap.
 * Chay: npm install  ->  npm run init-db  ->  npm start
 */

require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const { testConnection } = require('./db/pool');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// ---- Middleware chung ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
        name: 'connect.sid',
        secret: process.env.SESSION_SECRET || 'secret_tam_thoi',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24, // 1 ngay
        },
    })
);

// ---- API ----
app.use('/api/auth', authRoutes);

// ---- Trang HTML tinh ----
// Cac trang giao dien (index.html, style.css, script.js...) nam trong public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// Moi duong dan khac (tru API) deu tra ve trang chinh Cleanova
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ---- Khoi dong ----
/** Lay danh sach dia chi IPv4 cua may de in ra cho tien truy cap */
function getLocalIps() {
    const os = require('os');
    const result = [];
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name] || []) {
            if (net.family === 'IPv4' && !net.internal) {
                result.push(net.address);
            }
        }
    }
    return result;
}

(async () => {
    try {
        await testConnection();
    } catch (err) {
        console.error('[DB] Khong ket noi duoc MySQL:', err.message);
        console.error('     Kiem tra lai file .env va MySQL da chay chua.');
        process.exit(1);
    }

    app.listen(PORT, HOST, () => {
        console.log(`[Server] Dang chay tai http://localhost:${PORT}`);
        if (HOST === '0.0.0.0') {
            const ips = getLocalIps();
            if (ips.length === 0) {
                console.log('     Khong tim thay dia chi IPv4 nao.');
            } else {
                console.log('     May khac trong cung WiFi vao bang dia chi:');
                for (const ip of ips) {
                    console.log(`       http://${ip}:${PORT}`);
                }
            }
            console.log('     (Nho mo firewall cho port ' + PORT + ' voi TCP)');
        }
    });
})();
