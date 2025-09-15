-- MySQL Database Schema for Apartment Finder Application
-- Create database
CREATE DATABASE IF NOT EXISTS apartment_finder_db;
USE apartment_finder_db;

-- Create Admins table
CREATE TABLE admins (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Owners table
CREATE TABLE owners (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    business_name VARCHAR(255),
    business_license VARCHAR(255),
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL
);

-- Create Buildings table
CREATE TABLE buildings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    building_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    total_units INT NOT NULL,
    year_built INT,
    description TEXT,
    amenities JSON,
    photos JSON,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    owner_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

-- Create Employees table
CREATE TABLE employees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    position VARCHAR(255) NOT NULL,
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    building_id BIGINT NOT NULL,
    owner_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE,
    FOREIGN KEY (owner_id) REFERENCES owners(id) ON DELETE CASCADE
);

-- Create Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Units table
CREATE TABLE units (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    unit_number VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    square_feet INT,
    rent DECIMAL(10,2) NOT NULL,
    deposit DECIMAL(10,2),
    available_date DATE,
    pet_policy VARCHAR(255),
    parking_info VARCHAR(255),
    status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE') NOT NULL DEFAULT 'AVAILABLE',
    tenant_name VARCHAR(255),
    lease_end_date DATE,
    description TEXT,
    features JSON,
    images JSON,
    building_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE
);

-- Create Saved Units table (Many-to-Many relationship between Users and Units)
CREATE TABLE saved_units (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    unit_id BIGINT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_unit (user_id, unit_id)
);

-- Create indexes for better performance
CREATE INDEX idx_owners_status ON owners(status);
CREATE INDEX idx_owners_email ON owners(email);
CREATE INDEX idx_buildings_status ON buildings(status);
CREATE INDEX idx_buildings_owner ON buildings(owner_id);
CREATE INDEX idx_buildings_location ON buildings(district, city);
CREATE INDEX idx_employees_building ON employees(building_id);
CREATE INDEX idx_employees_owner ON employees(owner_id);
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_units_building ON units(building_id);
CREATE INDEX idx_units_status ON units(status);
CREATE INDEX idx_units_rent ON units(rent);
CREATE INDEX idx_units_bedrooms ON units(bedrooms);
CREATE INDEX idx_saved_units_user ON saved_units(user_id);
CREATE INDEX idx_saved_units_unit ON saved_units(unit_id);

-- Insert default admin account
INSERT INTO admins (name, email, password) VALUES 
('System Admin', 'admin@apartmentfinder.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
-- Note: The password above is 'password' hashed with BCrypt

-- Add constraints to limit employees per building (max 5)
-- This will be enforced in the application logic rather than database constraint
