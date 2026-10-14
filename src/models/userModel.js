'use strict';

/**
 * Truy van lien quan den bang Users.
 * Tat ca dung prepared statement (?) de chong SQL Injection.
 */

const { pool } = require('../db/pool');

/** Tim nguoi dung theo email (dung cho dang nhap + kiem tra trung) */
async function findByEmail(email) {
    const [rows] = await pool.query(
        `SELECT U.user_id, U.full_name, U.email, U.password, U.phone,
                U.role_id, R.role_name
         FROM Users U
         LEFT JOIN Roles R ON U.role_id = R.role_id
         WHERE U.email = ?
         LIMIT 1`,
        [email]
    );
    return rows[0] || null;
}

/** Tim nguoi dung theo id */
async function findById(userId) {
    const [rows] = await pool.query(
        `SELECT U.user_id, U.full_name, U.email, U.phone,
                U.role_id, R.role_name
         FROM Users U
         LEFT JOIN Roles R ON U.role_id = R.role_id
         WHERE U.user_id = ?
         LIMIT 1`,
        [userId]
    );
    return rows[0] || null;
}

/**
 * Tao nguoi dung moi.
 * @param {{fullName:string,email:string,passwordHash:string,phone:string,roleId:number}} data
 * @returns {Promise<number>} user_id vua tao
 */
async function create({ fullName, email, passwordHash, phone, roleId }) {
    const [result] = await pool.query(
        `INSERT INTO Users (full_name, email, password, phone, role_id)
         VALUES (?, ?, ?, ?, ?)`,
        [fullName, email, passwordHash, phone || null, roleId]
    );
    return result.insertId;
}

module.exports = { findByEmail, findById, create };
