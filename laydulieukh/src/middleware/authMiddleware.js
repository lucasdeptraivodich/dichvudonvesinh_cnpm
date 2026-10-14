'use strict';

/** Chan truy cap neu chua dang nhap (dung cho API) */
function requireLogin(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ success: false, message: 'Ban can dang nhap.' });
    }
    next();
}

/** Chan truy cap trang HTML, chuyen huong ve trang dang nhap */
function requireLoginPage(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.redirect('/login.html');
    }
    next();
}

module.exports = { requireLogin, requireLoginPage };
