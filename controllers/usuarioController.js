const banco = require("../connecton")

module.exports = {
    async index(request , response){
        const result = []
        await banco.con.query(
            'SELECT * FROM usuario', 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado:`)
            });
            console.log('GET /agenda Agenda.index', result);
            return response.json(result)
                    })
    },
     async show (request, response, next){
        const result = []
        console.log(request.params.id)
        await banco.con.query(
            `SELECT * FROM usuario as u INNER JOIN PlanoUsuario as p ON p.idPlanoUsuario = u.idPlanoUsuario WHERE u.idUsuario = ${request.params.id}`, 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado: \n ${row.title} by ${row.name}, ${row.location}`)
            });
            console.log('GET /agenda:id Agenda.show', request.params);
            return response.json(result)
        })
     },

    async create (request, response){
        let { nomeUsuario, logradouro, numCasa, complemento, 
            cidade, estado, bairro, cep, cpf, email, dataNasc, senha, idPlanoUsuario} = request.body
        const newAgenda = {
            nomeUsuario: nomeUsuario,
            logradouro: logradouro,
            numCasa: numCasa,
            complemento: complemento, 
            cidade: cidade,
            estado: estado,
            bairro: bairro,
            cep: cep,
            cpf: cpf,
            email: email,
            dataNasc: dataNasc,
            senha: senha,
            idPlanoUsuario: idPlanoUsuario
        }

        await banco.con.query(
            'INSERT INTO usuario SET ?', newAgenda, (err, res) => {
                if (err) { 
                    return response.status(404).send(err) 
                }
            console.log('POST /filme/ Filme.create', res.insertId)
            return response.json(res.insertId)
        })
    },

    async update (req, response){
        console.log(req.body)
        let query = 'UPDATE usuario SET'

        let key = Object.keys(req.body)
        let value = Object.values(req.body)
        let primaryKey = ''
        for (let index = 0; index < key.length ; index++) {
            if(key[index] === 'idUsuario'){
                primaryKey = value[index]
            } else if (key[index] === 'idUsuario'){
                query += ` ${key[index]} = ${value[index]},`;    
            }
             else {
                query += ` ${key[index]} = '${value[index]}',`;    
            }          
        }
        query = query.slice(0, -1); 
        query += ' '

        query += `WHERE idUsuario = ${primaryKey};`

        console.log(query)
        await banco.con.query(query ,
         (err,ressult) => {
            if (err) { 
                return response.status(404).send(err) 
            }
            console.log('PUT /usuario/ Usuario.updte', ressult)
            return response.json(ressult)
        })
    },

    async destroy (request, response){
        await banco.con.query(
            'DELETE FROM usuario WHERE idUsuario = ?', [request.body.id], (err, res) => {
                if (err) { 
                    console.log(err)
                    return response.status(404).send(err) 
                }
                console.log(`Deleted ${res.affectedRows} row(s)`);
                return response.json(res.affectedRows)
        })
    }
}