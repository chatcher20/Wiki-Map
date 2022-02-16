-- Drop and recreate "pins" table

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  latitude VARCHAR(50),
  longitude VARCHAR(50)
);



-- CREATE TABLE points (
--   id SERIAL PRIMARY KEY NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   description TEXT NOT NULL,
--   image BYTEA
-- );
