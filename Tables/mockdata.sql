-- Insert data into User
INSERT INTO User (First_Name, Last_Name, Date_of_Birth, ID_no, User_password, Phone_no, Email)
VALUES
('John', 'Doe', '1985-02-15', 8502151234085, 'password123', '0712345678', 'john.doe@example.com'),
('Jane', 'Smith', '1990-07-10', 9007101234087, 'password456', '0823456789', 'jane.smith@example.com'),
('Sipho', 'Khumalo', '1975-04-20', 7504201234089, 'password789', '0834567890', 'sipho.khumalo@example.com'),
('Nandi', 'Zulu', '1988-09-25', 8809251234091, 'password012', '0845678901', 'nandi.zulu@example.com'),
('Lerato', 'Mokoena', '1993-11-30', 9311301234093, 'password345', '0856789012', 'lerato.mokoena@example.com');

-- Insert data into User_Address
INSERT INTO User_Address (Street_no, Street_name, Suburb, City, Postal_code, Province, User_ID)
VALUES
(123, 'Main Street', 'Sandton', 'Johannesburg', 2196, 'Gauteng', 1),
(456, 'Church Street', 'Morningside', 'Durban', 4001, 'KwaZulu-Natal', 2),
(789, 'Beach Road', 'Sea Point', 'Cape Town', 8005, 'Western Cape', 3),
(101, 'Voortrekker Road', 'Bellville', 'Cape Town', 7530, 'Western Cape', 4),
(202, 'Nelson Mandela Drive', 'Mahikeng', 'Mahikeng', 2745, 'North West', 5);

-- Insert data into Service_Profile
INSERT INTO Service_Profile (Service_title, Rating, Service_Description, User_ID)
VALUES
('Kasi Upholstery', 4, 'High-quality upholstery services.', 1),
('House Cleaning', 5, 'Thorough and professional house cleaning.', 2),
('Garden Maintenance', 3, 'Expert garden maintenance and landscaping.', 3),
('Plumbing Services', 4, 'Reliable and efficient plumbing solutions.', 4),
('Electrical Repairs', 5, 'Professional electrical repair services.', 5);

-- Insert data into Billing
INSERT INTO Billing (Acc_no, Amount, Billing_Date, Address_ID, Service_ID, User_ID)
VALUES
(1001, '1500.00', '2024-01-15', 1, 1, 1),
(1002, '2000.00', '2024-02-20', 2, 2, 2),
(1003, '1200.00', '2024-03-25', 3, 3, 3),
(1004, '1800.00', '2024-04-30', 4, 4, 4),
(1005, '2200.00', '2024-05-05', 5, 5, 5);

-- Insert data into Analytics
INSERT INTO Analytics (Service_ID, Income, Billing_ID, Profile_views, Places_worked, Hire)
VALUES
(1, '1500.00', 1, 50, 'Johannesburg', 10),
(2, '2000.00', 2, 70, 'Durban', 15),
(3, '1200.00', 3, 30, 'Cape Town', 8),
(4, '1800.00', 4, 60, 'Cape Town', 12),
(5, '2200.00', 5, 80, 'Mahikeng', 20);

-- Insert data into Review
INSERT INTO Review (User_ID, Service_ID, Review_Date, Review_Content, Star_Rating)
VALUES
(1, 1, '2024-01-20', 'Excellent service!', 5),
(2, 2, '2024-02-25', 'Very satisfied with the cleaning.', 4),
(3, 3, '2024-03-30', 'Good job on the garden.', 4),
(4, 4, '2024-04-05', 'Plumbing work was great.', 5),
(5, 5, '2024-05-10', 'Electrical repairs were professional.', 5);
