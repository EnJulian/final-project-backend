/* Replace with your SQL commands */
DROP TYPE IF EXISTS role_enum;
CREATE TYPE role_enum AS ENUM('user', 'super_admin');
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30),
    email varchar(100) UNIQUE,
    phone_number varchar(100) UNIQUE,
    password varchar(100),
    salt varchar(100),
    role role_enum,
    test_taken BOOLEAN DEFAULT false,
    test_scores INTEGER DEFAULT 0,
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);
