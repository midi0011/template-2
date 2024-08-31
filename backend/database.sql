CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE template2;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_address TEXT NOT NULL,
    user_role TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payments_id uuid REFERENCES payments(id)
);

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

SELECT * FROM users;

INSERT INTO users (username, first_name, last_name, email, password, user_address, user_role) 
VALUES ('admin', 'hamidi', 'hasmar', 'hamidi15@gmail.com', 'asdas-123', '123 main street', 'admin');

INSERT INTO users (username, first_name, last_name, email, password, user_address, user_role) 
VALUES ('admin', 'hamidi', 'hasmar', 'hamidi15@gmail.com', 'asdas-123', '123 main street', 'admin');

--psql -U postgres
--\c template2
--\dt
--heroku pg:psql