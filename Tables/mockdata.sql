-- Insert data into User table
INSERT INTO User (First_Name, Last_Name, Date_of_Birth, ID_no, User_password, Phone_no, Email, Profile_Pic)
VALUES
('John', 'Doe', '1990-01-01', 9001015800082, 'password123', '0723456789', 'john.doe@example.com', NULL),
('Jane', 'Smith', '1985-05-15', 8505154900081, 'password456', '0832345678', 'jane.smith@example.com', NULL),
('Thabo', 'Mokoena', '1978-10-23', 7810235600085, 'password789', '0741234567', 'thabo.mokoena@example.com', NULL),
('Naledi', 'Khoza', '1992-12-02', 9212025200083, 'password321', '0762345678', 'naledi.khoza@example.com', NULL),
('Sipho', 'Ngubane', '1980-03-11', 8003115700080, 'password654', '0823456789', 'sipho.ngubane@example.com', NULL);

-- Insert data into User_Address table
INSERT INTO User_Address (Street_no, Street_name, Suburb, City, Postal_code, Province, User_ID)
VALUES
(10, 'Main Street', 'Sandton', 'Johannesburg', 2196, 'Gauteng', 1),
(45, 'Church Street', 'Mowbray', 'Cape Town', 7700, 'Western Cape', 2),
(78, 'Nelson Mandela Drive', 'Sunnyside', 'Pretoria', 0002, 'Gauteng', 3),
(23, 'Victoria Road', 'Woodstock', 'Cape Town', 7925, 'Western Cape', 4),
(56, 'Rivonia Road', 'Rivonia', 'Johannesburg', 2128, 'Gauteng', 5);

-- Insert data into Service_Profile table
INSERT INTO Service_Profile (Service_title, Rating, Service_Description, User_ID)
VALUES
('Plumbing', 5, 'Residential and commercial plumbing services', 1),
('Electrician', 4, 'Electrical installations and repairs', 2),
('Gardening', 3, 'Garden maintenance and landscaping', 3),
('Cleaning', 4, 'Home and office cleaning services', 4),
('Tutoring', 5, 'Private tutoring in various subjects', 5);

-- Insert data into Billing table
INSERT INTO Billing (Acc_no, Amount, Billing_Date, Address_ID, Service_ID, User_ID)
VALUES
(123456789, '500', '2023-01-10', 1, 1, 1),
(987654321, '750', '2023-02-15', 2, 2, 2),
(123987456, '600', '2023-03-20', 3, 3, 3),
(789123456, '450', '2023-04-25', 4, 4, 4),
(456789123, '800', '2023-05-30', 5, 5, 5);

-- Insert data into Analytics table
INSERT INTO Analytics (Service_ID, Income, Billing_ID, Profile_views, Places_worked, Hire)
VALUES
(1, '5000', 1, 150, 'Sandton, Randburg, Rosebank', 10),
(2, '7500', 2, 200, 'Mowbray, Rondebosch, Claremont', 15),
(3, '6000', 3, 100, 'Sunnyside, Arcadia, Hatfield', 8),
(4, '4500', 4, 120, 'Woodstock, Observatory, Salt River', 12),
(5, '8000', 5, 180, 'Rivonia, Sunninghill, Bryanston', 20);

-- Insert data into Review table
INSERT INTO Review (User_ID, Service_ID, Review_Date, Review_Content, Star_Rating)
VALUES
(1, 1, '2023-06-01', 'Excellent plumbing service, highly recommended!', 5),
(2, 2, '2023-06-15', 'Professional and efficient electrician.', 4),
(3, 3, '2023-07-05', 'Good gardening service but a bit pricey.', 3),
(4, 4, '2023-07-20', 'Great cleaning service, very thorough.', 4),
(5, 5, '2023-08-01', 'Fantastic tutoring, my child improved a lot.', 5);
