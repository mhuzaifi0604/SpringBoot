
-- Commands for Initializing Databases and using them
show databases;
create database Springboot;
use Springboot;
show tables;

-- ====================================== Creating Tables in Database: SpringBoot ======================================--

-- Creating Table for Login Credentials
create table Login_Credentials(
username varchar(50) NOT NULL,
pass varchar(50) NOT NULL
);

-- Creating Table To Contain records of Users Signing Up
Create Table Users(
id int NOT NULL auto_increment,
username varchar(50) Not Null,
pass varchar(50) Not NULL,
first_name varchar(50) Not NULL,
last_name varchar(50) Not NULL,
email varchar(50) Not NULL,
Created_At datetime Not Null,
Updated_At datetime Not NULL,
primary key(id)
);

-- Create Table for Adding Students & their Grades into the Database
Create Table Students(
student varchar(50) Not Null,
class varchar(50) Not Null,
grade varchar(2) Not Null
);
-- =============================================================================================================== --

-- ================================= Inserting Records Into Created Tables ====================================== --

-- Inserting Records in Users Database to Create users who have signed up
Insert Into Users(username, pass, first_name, last_name, email, Created_At, Updated_At) Values
("huzaifi0604", "Abc@0604", "Muhammad", "Huzaifa", "huzzaifaasim@gmail.com", Now(), Now());

-- Inserting Records in Login_Credentials to Create Logged in users
Insert into Login_Credentials(username, pass) Values
("huzaifi0604", "Abc@0604"),
("anszeeshan", "Def@4321");

-- Inserting Records in Students to create Added Students in Database
Insert Into Students(student, class, grade) Values
("Huzaifa", "Graduate", "A+"),
("Ans", "Graduate", "A+");
-- =============================================================================================================== --

-- ================================= Displaying Inserted Records from each table ================================= --
Select * From Login_Credentials;
Select * From Users;
Select * From Students;
-- =============================================================================================================== --

-- ================================= Commands for Dropping Tables ================================= --
-- Drop Table Login_Credentials;
-- Drop Table Users;
-- Drop Table Students;
-- ================================================================================================ --

-- ========================== Commands for Deleting Records from Tables =========================== --
-- SET SQL_SAFE_UPDATES = 0;
-- DELETE FROM Users WHERE pass = "musab@1794";
-- SET SQL_SAFE_UPDATES = 1;
-- ================================================================================================ --