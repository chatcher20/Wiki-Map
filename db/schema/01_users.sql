DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  is_authenticated BOOLEAN DEFAULT false
);


DROP TABLE IF EXISTS points CASCADE;
CREATE TABLE points (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image BYTEA
);

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  map_name VARCHAR(255) NOT NULL,
  is_favourite BOOLEAN DEFAULT false,
  has_contributed BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id),
  point_id INTEGER REFERENCES points(id)
);
