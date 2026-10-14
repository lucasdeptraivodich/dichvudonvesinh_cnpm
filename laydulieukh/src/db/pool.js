'use strict';

/**
 * Ket noi MySQL bang connection pool (mysql2/promise).
 * Cau hinh lay tu file .env
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'appdondep',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4_unicode_ci',
});

/** Kiem tra ket noi khi khoi dong server */
async function testConnection() {
    const conn = await pool.getConnection();
    try {
        await conn.query('SELECT 1');
        console.log(`[DB] Ket noi MySQL thanh cong -> ${process.env.DB_NAME || 'appdondep'}`);
    } finally {
        conn.release();
    }
}

module.exports = { pool, testConnection };
