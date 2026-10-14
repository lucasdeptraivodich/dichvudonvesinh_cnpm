'use strict';

/**
 * Script tao database + bang cho app (chay: npm run init-db).
 * Dung khi ban khong muon chay file schema.sql bang tay trong MySQL.
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

async function initDb() {
    const dbName = process.env.DB_NAME || 'appdondep';

    // Ket noi KHONG kem database de co the CREATE DATABASE
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true,
    });

    try {
        console.log('[init-db] Dang tao database va bang...');

        await conn.query(
            `CREATE DATABASE IF NOT EXISTS \`${dbName}\`
             CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
        );
        await conn.query(`USE \`${dbName}\``);

        await conn.query(`
            CREATE TABLE IF NOT EXISTS Roles (
                role_id   INT AUTO_INCREMENT PRIMARY KEY,
                role_name VARCHAR(50) NOT NULL UNIQUE
            )
        `);

        await conn.query(`
            CREATE TABLE IF NOT EXISTS Users (
                user_id   INT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(100) NOT NULL,
                email     VARCHAR(100) UNIQUE NOT NULL,
                password  VARCHAR(255) NOT NULL,
                phone     VARCHAR(20),
                role_id   INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES Roles(role_id)
            )
        `);

        await conn.query(`
            INSERT IGNORE INTO Roles (role_id, role_name) VALUES
                (1, 'customer'),
                (2, 'admin')
        `);

        console.log('[init-db] Hoan tat! Database san sang su dung.');
    } finally {
        await conn.end();
    }
}

initDb().catch((err) => {
    console.error('[init-db] Loi:', err.message);
    process.exit(1);
});
