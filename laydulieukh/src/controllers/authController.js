'use strict';

/**
 * Controller xu ly dang ky / dang nhap / dang xuat.
 *
 * LUONG HOAT DONG:
 *  - Dang ky  : validate -> kiem tra email trung -> hash mat khau (bcrypt)
 *               -> INSERT vao bang Users -> luu session.
 *  - Dang nhap: validate -> SELECT Users theo email -> bcrypt.compare mat khau
 *               -> luu session.
 */

const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const roleModel = require('../models/roleModel');

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Thong tin user luu vao session (KHONG luu password) */
function toSessionUser(user) {
    return {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role_id: user.role_id,
        role_name: user.role_name,
    };
}

/** POST /api/auth/register */
async function register(req, res) {
    try {
        const fullName = (req.body.fullName || '').toString().trim();
        const email = (req.body.email || '').toString().trim().toLowerCase();
        const password = (req.body.password || '').toString();
        const phone = (req.body.phone || '').toString().trim();

        // --- 1. Validate du lieu dau vao ---
        const errors = {};
        if (fullName.length < 2) errors.fullName = 'Ho ten toi thieu 2 ky tu.';
        if (!EMAIL_REGEX.test(email)) errors.email = 'Email khong hop le.';
        if (password.length < 6) errors.password = 'Mat khau toi thieu 6 ky tu.';
        if (phone && !/^[0-9+\-\s]{8,20}$/.test(phone)) errors.phone = 'So dien thoai khong hop le.';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ success: false, errors, message: 'Du lieu khong hop le.' });
        }

        // --- 2. Kiem tra email da ton tai chua ---
        const existed = await userModel.findByEmail(email);
        if (existed) {
            return res.status(409).json({
                success: false,
                errors: { email: 'Email nay da duoc dang ky.' },
                message: 'Email da ton tai.',
            });
        }

        // --- 3. Ma hoa mat khau bang bcrypt ---
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        // --- 4. Lay role_id cua 'customer' ---
        const role = await roleModel.findByName('customer');
        const roleId = role ? role.role_id : null;

        // --- 5. INSERT vao bang Users ---
        const userId = await userModel.create({
            fullName,
            email,
            passwordHash,
            phone,
            roleId,
        });

        const newUser = await userModel.findById(userId);

        // --- 6. Luu session -> coi nhu da dang nhap luon ---
        req.session.user = toSessionUser(newUser);

        return res.status(201).json({
            success: true,
            message: 'Dang ky thanh cong.',
            user: req.session.user,
        });
    } catch (err) {
        console.error('[register] Loi:', err);
        return res.status(500).json({ success: false, message: 'Loi server.' });
    }
}

/** POST /api/auth/login */
async function login(req, res) {
    try {
        const email = (req.body.email || '').toString().trim().toLowerCase();
        const password = (req.body.password || '').toString();

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui long nhap email va mat khau.',
            });
        }

        // --- 1. Lay du lieu tu bang Users theo email ---
        const user = await userModel.findByEmail(email);

        // Bao loi chung chung de tranh lo thong tin tai khoan nao ton tai
        if (!user) {
            return res.status(401).json({ success: false, message: 'Email hoac mat khau khong dung.' });
        }

        // --- 2. So sanh mat khau nguoi dung nhap voi hash trong DB ---
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ success: false, message: 'Email hoac mat khau khong dung.' });
        }

        // --- 3. Luu session ---
        req.session.user = toSessionUser(user);

        return res.json({
            success: true,
            message: 'Dang nhap thanh cong.',
            user: req.session.user,
        });
    } catch (err) {
        console.error('[login] Loi:', err);
        return res.status(500).json({ success: false, message: 'Loi server.' });
    }
}

/** POST /api/auth/logout */
function logout(req, res) {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Da dang xuat.' });
    });
}

/** GET /api/auth/me - lay thong tin nguoi dang dang nhap */
function me(req, res) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Chua dang nhap.' });
    }
    res.json({ success: true, user: req.session.user });
}

module.exports = { register, login, logout, me };
