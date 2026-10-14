-- =====================================================
--  Database: appdondep  (dich vu don ve sinh)
--  Chay file nay trong MySQL de tao database + bang
-- =====================================================

CREATE DATABASE IF NOT EXISTS appdondep
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE appdondep;

-- Bang vai tro nguoi dung
CREATE TABLE IF NOT EXISTS Roles (
    role_id   INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Bang nguoi dung
CREATE TABLE IF NOT EXISTS Users (
    user_id   INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email     VARCHAR(100) UNIQUE NOT NULL,
    password  VARCHAR(255) NOT NULL,          -- luu hash bcrypt, KHONG luu mat khau tho
    phone     VARCHAR(20),
    role_id   INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Du lieu vai tro mac dinh
INSERT IGNORE INTO Roles (role_id, role_name) VALUES
    (1, 'customer'),
    (2, 'admin');

-- Xem danh sach nguoi dung kem vai tro
SELECT
    U.user_id,
    U.full_name,
    U.email,
    U.phone,
    R.role_name,
    U.created_at
FROM Users U
JOIN Roles R ON U.role_id = R.role_id;
