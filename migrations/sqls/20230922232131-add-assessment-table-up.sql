CREATE TABLE assessments(
    id SERIAL PRIMARY KEY,
    application_batch_id SERIAL REFERENCES application_batches(id) ON DELETE CASCADE,
    image_url varchar(100),
    time_allocated varchar(100),
    questions JSON,
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
)