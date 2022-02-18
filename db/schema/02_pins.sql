-- Drop and recreate "pins" table

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image VARCHAR(2000),
  latitude VARCHAR(255),
  longitude VARCHAR(255),
  latLng VARCHAR(255),
  mapID VARCHAR(50)
);






