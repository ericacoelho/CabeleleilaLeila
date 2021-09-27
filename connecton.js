const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1', // O host do banco. Ex: localhost
    user: 'root', // Um usuário do banco. Ex: user 
    password: 'password', // A senha do usuário. Ex: user123
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
