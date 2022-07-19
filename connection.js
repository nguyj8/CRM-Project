// JS connection with MySQL Database
const {createPool} = require('mysql'); 
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "#",
})

pool.query('select * from customer');

