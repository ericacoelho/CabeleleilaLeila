const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'tcc-gi.c0u8hz9ijhva.us-east-2.rds.amazonaws.com', // O host do banco. Ex: localhost
    user: 'root', // Um usuário do banco. Ex: user 
    port: 3306,
    password: 'batata123', // A senha do usuário. Ex: user123
    database: 'cabeleleila' // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
})

function conection() {
    con.connect((err) => {
        if (err) {
            console.log('Erro connecting to database...', err)
            return
        }
        console.log('Connection established!')
    })
}

function encerrar() {
    con.end((err) => {
        if(err) {
            console.log('Erro to finish connection...', err)
            return 
        }
        console.log('The connection was finish...')
    })
}


module.exports = { 
    con,
    conection,
    encerrar
}
