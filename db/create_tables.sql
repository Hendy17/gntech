CREATE TABLE geolocation_data (
  id SERIAL PRIMARY KEY,
  city VARCHAR(50),
  latitude FLOAT,
  longitude FLOAT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
