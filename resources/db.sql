CREATE DATABASE News

CREATE TABLE IF NOT EXISTS account
(
    `username` VARCHAR(32),
    `password` VARCHAR(32),
    `is_login` BIT,
    `level` INT,
    `ID` VARCHAR(255) AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS article_pending
(
    `header` VARCHAR(255),
    `content` VARCHAR(1000),
    `abstract` VARCHAR(255),
    `image` VARCHAR(255),
    `writerId` VARCHAR(255),
)

CREATE TABLE IF NOT EXISTS article
(
    `header` VARCHAR(255),
    `content` VARCHAR(1000),
    `abstract` VARCHAR(255),
    `image` VARCHAR(255),
    `view` INT,
    `date` DATETIME,
    `ID` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS comment
(
    `date` DATETIME,
    `content` VARCHAR(255),
    `articleID` VARCHAR(255),
    `ID` VARCHAR(20) PRIMARY KEY,
    `username` VARCHAR(32)

)
CREATE TABLE IF NOT EXISTS category
(
    `name` VARCHAR(255),
    `ID` INT AUTO_INCREMENT PRIMARY KEY
)

CREATE TABLE IF NOT EXISTS tag
(
    `name` VARCHAR(255),
    `ID` INT AUTO_INCREMENT PRIMARY KEY
)