const mysql = require('mysql');
const user = require('./config').user;
const databaseName = require('./config').databaseName;
const DBConfig = require('./config').DBConfig;
let connection = mysql.createConnection(DBConfig);


connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database');
    throw err;
  }
  console.log('Connected to database');
  connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err) => {
    if (err) throw err;
  });
  connection.query(`USE ${databaseName}`, (err) => {
    if (err) throw err;
  });

  connection.query("CREATE TABLE IF NOT EXISTS users (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    FName VARCHAR(255) NOT NULL,\
    LName VARCHAR(255) NOT NULL,\
    email VARCHAR(255) NOT NULL UNIQUE\
  );", (err) => {
    if (err) throw err;
  });

  connection.query("CREATE TABLE IF NOT EXISTS messages (\
    id INT AUTO_INCREMENT PRIMARY KEY,\
    senderId INT NOT NULL,\
    receiverId INT NOT NULL,\
    title VARCHAR(255),\
    body TEXT,\
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY (senderId) REFERENCES users(id),\
    FOREIGN KEY (receiverId) REFERENCES users(id)\
  );", (err) => {
    if (err) throw err;
  });

  connection.query("INSERT IGNORE INTO users (FName, LName, email) VALUES (?, ?, ?);", 
    [user.FName, user.LName, user.email], 
    (err) => {
      if (err) throw err;
    });
});

module.exports = connection;
