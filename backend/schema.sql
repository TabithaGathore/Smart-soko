-- Smart Soko MySQL Database Schema

CREATE DATABASE IF NOT EXISTS smart_soko;
USE smart_soko;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('trader', 'consumer') NOT NULL
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  trader VARCHAR(50) NOT NULL,
  FOREIGN KEY (trader) REFERENCES users(username) ON DELETE CASCADE
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('safety', 'sanitation') NOT NULL,
  description TEXT NOT NULL,
  status ENUM('open', 'in progress', 'closed') NOT NULL DEFAULT 'open'
);

-- Market info table
CREATE TABLE IF NOT EXISTS market_info (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  description TEXT NOT NULL
);

-- Insert initial market info
INSERT INTO market_info (name, location, description) VALUES
('Smart Soko Market', 'City Center', 'Modernizing traditional markets for safety, sanitation, sustainability, and economic opportunities.');
