'use strict';

const { pool } = require('../db/pool');

/** Lay role_id theo ten vai tro (vd: 'customer') */
async function findByName(roleName) {
    const [rows] = await pool.query(
        'SELECT role_id, role_name FROM Roles WHERE role_name = ? LIMIT 1',
        [roleName]
    );
    return rows[0] || null;
}

module.exports = { findByName };
