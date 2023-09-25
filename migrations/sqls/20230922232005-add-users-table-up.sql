/* Replace with your SQL commands */
CREATE TYPE role_type AS ENUM('user', 'super_admin');
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30),
    email varchar(100) UNIQUE,
    phone_number varchar(100) UNIQUE,
    password varchar(100),
    salt varchar(100),
    role role_type,
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);
