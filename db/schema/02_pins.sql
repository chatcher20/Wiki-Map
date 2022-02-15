-- Drop and recreate "pins" table

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (id SERIAL PRIMARY KEY,
title VARCHAR(255),
description VARCHAR(255),
image VARCHAR(255)
);
