-- Tạo database
CREATE DATABASE IF NOT EXISTS appdondep 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE appdondep;

-- Tạo bảng Roles
CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Tạo bảng Users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

SELECT 
    U.user_id, 
    U.full_name, 
    U.email, 
    U.phone, 
    R.role_name
FROM Users U
JOIN Roles R ON U.role_id = R.role_id;
