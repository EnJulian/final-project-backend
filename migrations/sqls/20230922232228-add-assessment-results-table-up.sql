CREATE TABLE assessment_results(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    assessment_id SERIAL REFERENCES assessments(id) ON DELETE CASCADE,
    application_id SERIAL REFERENCES applications(id) ON DELETE CASCADE,
    image_url varchar(100),
    time_allocated varchar(100),
    responses JSON,
    time_spent integer,
    status boolean DEFAULT true,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
)
