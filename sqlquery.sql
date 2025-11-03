SELECT * FROM "Coffee"
SELECT * FROM "User"
TRUNCATE TABLE "Coffee", "User" RESTART IDENTITY CASCADE

INSERT INTO "Coffee" ("name", "brand", "flavors", "coffeeType")
VALUES
('Flat White', 'Stumptown Coffee Roasters', ARRAY['Nutty', 'Cocoa', 'Creamy'], 'Hot'),
('Cold Brew', 'Blue Bottle Coffee', ARRAY['Chocolate', 'Molasses', 'Smooth'], 'Iced'),
('Americano', 'Intelligentsia Coffee', ARRAY['Bold', 'Smoky', 'Clean Finish'], 'Blended'),
('Cappuccino', 'La Colombe', ARRAY['Frothy Milk', 'Rich Espresso', 'Vanilla'], 'Hot'),
('Mocha', 'Philz Coffee', ARRAY['Dark Chocolate', 'Espresso', 'Sweet Cream'], 'Iced');

INSERT INTO "User" ("name", "phone", "email", "password")
VALUES
('John Doe', '1234567890', 'john@example.com', 'hashedpassword123'),
('Jane Smith', NULL, 'jane@example.com', 'hashedpassword456');