const express = require('express');
const mysql = require('mysql');

const port = 3000;
const app = express();

const people = [];

const connection = mysql.createConnection({
  host: 'db',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'challengedb'
});

let sql = `CREATE TABLE IF NOT EXISTS people(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
)`;
connection.query(sql);

sql = `INSERT IGNORE  INTO people(name) values('Lucas')`;
connection.query(sql);

sql = `INSERT IGNORE  INTO people(name) values('Ramon')`;
connection.query(sql);

sql = `INSERT IGNORE  INTO people(name) values('Roberto')`;
connection.query(sql);

sql = `SELECT * FROM people`;
connection.query(sql, (error, results, fields) => {
  if (error) throw error;
  results.forEach(result => {
    people.push(result.name);
  });
});

connection.end();


app.get('/', (req, res) => {
  res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${people.map(person => `<li> - ${person}</li>`).join('')}
    </ul>
  `);
});


app.listen(port, () => {
  console.log('Server started on port: ' + port);
});