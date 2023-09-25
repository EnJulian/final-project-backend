CREATE TABLE timer_config(
    id SERIAL PRIMARY KEY,
    time integer,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
)