CREATE TABLE assessments(
    id SERIAL PRIMARY KEY,
    application_batch_id INTEGER DEFAULT '1',
    image_url varchar(100),
    time_allocated INTEGER DEFAULT '30',
    questions JSON,
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
)
