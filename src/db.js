const mysql = require('mysql');
const database = {
    host: 'bkadqushs2wki2aopydc-mysql.services.clever-cloud.com',
    user: 'u4xuiwjq5jvknnsc',
    password: 'CruRTdQVJQeLR9y3DPIU',
    database: 'bkadqushs2wki2aopydc'
}
const pool = mysql.createPool(database);
const { promisify } = require('util'); //final


pool.getConnection((err, conn) =>{
    if (err) {
        if (err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXIONES DE LA BASE DE DATOS FUE CERRADA');
        }
       if(err.code == 'ER_CON_COUNT_ERROR') {
            console.error('LA BASE DE DATOS TIENE MUCHAS CONEXIONES');
       }
       if (err.code == 'ECONNREFUSED') {
           console.error('LA CONEXIONES DE LA BASE DE DATOS FUE RECHAZADA');
       }
    }
    if (conn) conn.release();
    console.log('BD is Connected');
    return;
});
pool.query = promisify(pool.query); // final

module.exports = pool;