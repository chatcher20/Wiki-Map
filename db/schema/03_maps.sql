DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  map_name VARCHAR(255) NOT NULL,
  is_favourite BOOLEAN DEFAULT false,
  has_contributed BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id),
  point_id INTEGER REFERENCES points(id)
);
