var mysql = require('mysql');
const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  port: 3306,
  database: 'CRM',
  multipleStatements: 'true'
});

con.connect((err) => {
  if(err){
    console.log('Error: ' + err);
    return;
  }
  console.log('Connection Established');
});

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});

