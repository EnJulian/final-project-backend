CREATE TABLE application_batches(
    id SERIAL PRIMARY KEY,
    image_url varchar(100),
    link varchar(100),
    deadline varchar(100),
    batch_id SERIAL UNIQUE,
    instructions varchar(500),
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

CREATE TYPE status_enum AS ENUM('pending', 'declined', 'approved');
CREATE TABLE applications(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    application_batch_id SERIAL REFERENCES application_batches(id) ON DELETE CASCADE,
    first_name varchar(30),
    last_name varchar(30),
    cv_url varchar(100),
    image_url varchar(100),
    email varchar(30) UNIQUE,
    date_of_birth varchar(30) ,
    address varchar(50) ,
    university varchar(70) ,
    course varchar(50) ,
    cgpa varchar(10) ,
    status status_enum,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);