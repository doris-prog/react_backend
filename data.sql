use petsShop;

INSERT INTO products (name, price, image) VALUES
('Automatic Pet Feeder', 99.00, '/images/AutomaticPetFeeder.png'),
('Pet Travel Carrier', 119.99, '/images/products/PetTravelCarrier.png'),
('Pet GPS Tracker', 55.59, '/images/products/PetGPSTracker.png'),
('Pet Seat Cover for Car', 119.99, '/images/products/PetSeatCoverforCar.png'),
('Portable Pet Water Bottle', 18.43, '/images/PortablePetWaterBottle.png');

INSERT INTO marketing_preferences (id, preference) VALUES (1, 'email');  -- Email Marketing
INSERT INTO marketing_preferences (id, preference) VALUES (2, 'sms');    -- SMS Marketing

-- ('Automatic Pet Feeder', 99.00, '/images/Automatic Pet Feeder.png', 'Smart pet feeder offers convenient app-controlled feeding, precise portioning, generous 4L storage, dual power options, and hassle-free cleaning with an intelligent sensor system for seamless, reliable pet care.' ),
-- ('Pet Travel Carrier', 119.99, '/images/products/Pet Travel Carrier.png', 'Sturdy, expandable pet carrier with steel frame, comfort pads, 5 carrying options, and visibility features, making it perfect for travel, vet visits, and home use.'),
-- ('Pet GPS Tracker', 55.59, '/images/products/Pet GPS Tracker.png', 'Bluetooth 4.0 tracker safeguards pets, kids, valuables with alerts, search, photography in 25-meter range with long lasting batter of over six months.'),
-- ('Pet Seat Cover for Car', 119.99, '/images/products/Pet Seat Cover for Car.png', 'Foldable and waterproof dog car seat cover is made of durable, scratch-resistant materials with a built-in waterproof layer, offering comfort and protection for large and medium-sized pets while fitting all car models.'),
-- ('Portable Pet Water Bottle', 18.43, '/images/Portable Pet Water Bottle.png', 'Portable and leak-proof dog water bottle that features a 19oz capacity, a one-hand operation, a water-recycling design, and is made from safe, durable materials, making it perfect for outdoor adventures with your pet.');