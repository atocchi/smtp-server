  
DROP DATABASE IF EXISTS email_db;

CREATE DATABASE email_db;

USE email_db;

CREATE TABLE files (
id INT NOT NULL AUTO_INCREMENT,
fro varchar(100) NOT NULL,
too varchar(100) NOT NULL, 
subject varchar(100) NOT NULL, 
text varchar(200) NOT NULL, 
date varchar(60) NOT NULL, 
PRIMARY KEY (id)
);

SELECT * FROM files ORDER BY id DESC;