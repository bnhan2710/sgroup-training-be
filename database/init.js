const connection = require('./connection');

const createDatabaseAndTables = `
CREATE DATABASE IF NOT EXISTS SGROUP_BE;
USE SGROUP_BE;

CREATE TABLE IF NOT EXISTS Customers (
    CustomerID INT AUTO_INCREMENT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PRIMARY KEY (CustomerID)
);

CREATE TABLE IF NOT EXISTS Products (
    ProductID INT AUTO_INCREMENT,
    ProductName VARCHAR(100),
    Price DECIMAL(10, 2),
    Stock INT,
    PRIMARY KEY (ProductID)
);

CREATE TABLE IF NOT EXISTS Orders (
    OrderID INT AUTO_INCREMENT,
    CustomerID INT,
    ProductID INT,
    OrderDate DATE,
    Quantity INT,
    PRIMARY KEY (OrderID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

INSERT INTO Customers (FirstName, LastName, Email) VALUES
('John', 'Doe', 'john.doe@example.com'),
('Jane', 'Smith', 'jane.smith@example.com'),
('Michael', 'Brown', 'michael.brown@example.com');

INSERT INTO Products (ProductName, Price, Stock) VALUES
('Laptop', 1000.00, 50),
('Smartphone', 500.00, 100),
('Tablet', 300.00, 75);

INSERT INTO Orders (CustomerID, ProductID, OrderDate, Quantity) VALUES
(1, 2, '2023-01-15', 1),
(1, 1, '2023-01-15', 1),
(2, 2, '2022-09-17', 2),
(3, 3, '2021-05-18', 1);
`;

connection.query(createDatabaseAndTables, (error, results, fields) => {
  if (error) {
    console.error('Error executing query:', error);
  } else {
    console.log('Database and tables created successfully');
  }
  connection.end();
});
