-- create database DBtables;
use DBtables;
-- drop database DBtables;

-- User table
-- table with simple user data, complex and composite get their own tables
CREATE TABLE User
(
    User_ID int AUTO_INCREMENT PRIMARY KEY,
    First_Name varchar(20) NOT NULL,
    Last_Name varchar(20) NOT NULL,
    Date_of_Birth date NOT NULL,
    ID_no VARCHAR(30) NOT NULL,
    User_password varchar(100) NOT NULL,
    Phone_no varchar(10) NOT NULL,
    Profile_Pic BLOB,
    Email VARCHAR(100),
    CONSTRAINT user_email UNIQUE (Email),
    CONSTRAINT email_format CHECK (Email LIKE '%@%.%')
);

-- User_Address
CREATE TABLE User_Address
(
    Address_ID int AUTO_INCREMENT PRIMARY KEY,
    Street_no int NOT NULL,
    Street_name varchar(20) NOT NULL,
    Suburb varchar(20) NOT NULL,
    City varchar(20) NOT NULL,
    Postal_code int NOT NULL,
    Province varchar(20),
    User_ID int,
    
    foreign key (User_ID) references User(User_ID)
);

-- Service_Profile
CREATE TABLE Service_Profile
(
    Service_ID int AUTO_INCREMENT PRIMARY KEY,
    Service_title varchar(20),
    Rating int,
    Service_Description varchar(100),
    User_ID int,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID)
);

-- Billing
CREATE TABLE Billing
(
    Billing_ID int AUTO_INCREMENT PRIMARY KEY,
    Acc_no int NOT NULL,
    Amount varchar(10) NOT NULL,
    Billing_Date date NOT NULL,
    Address_ID int,
    Service_ID int,
    User_ID int,
    FOREIGN KEY (Address_ID) REFERENCES User_Address(Address_ID),
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (Service_ID) REFERENCES Service_Profile(Service_ID)
);

-- Analytics
CREATE TABLE Analytics
(
    Analytics_ID int AUTO_INCREMENT PRIMARY KEY,
    Service_ID int,
    Income varchar(10),
    Billing_ID int,
    Profile_views int,
    Places_worked varchar(100),
    Hire int,
    FOREIGN KEY (Service_ID) REFERENCES Service_Profile(Service_ID),
    FOREIGN KEY (Billing_ID) REFERENCES Billing(Billing_ID)
);

-- Review
CREATE TABLE Review
(
    Review_ID int AUTO_INCREMENT PRIMARY KEY,
    User_ID int,
    Service_ID int,
    Review_Date date,
    Review_Content varchar(200),
    Star_Rating int,
    FOREIGN KEY (User_ID) REFERENCES User(User_ID),
    FOREIGN KEY (Service_ID) REFERENCES Service_Profile(Service_ID)
);














