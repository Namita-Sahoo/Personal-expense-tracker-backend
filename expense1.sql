show databases;

create database expense_tracker;

use expense_tracker;

CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  amount DECIMAL(10,2),
  date DATE,
  category VARCHAR(100),
  notes TEXT
);