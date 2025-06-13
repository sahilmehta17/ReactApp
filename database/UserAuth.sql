CREATE DATABASE UserAuth;
GO

USE UserAuth;
GO

CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY(1,1),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  otp_code VARCHAR(6),
  otp_expires DATETIME,
  is_verified BIT DEFAULT 0;
);

USE UserAuth;
GO

DELETE FROM Users WHERE email = 'sahilmehta0204@gmail.com';
GO
DELETE FROM Users WHERE email = 'smehta27@wisc.edu';
GO

SELECT username, email, is_verified FROM Users WHERE email = 'smehta27@wisc.edu';

SELECT * FROM Users;
GO