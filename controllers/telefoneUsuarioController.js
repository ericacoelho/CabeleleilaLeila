const banco = require("../connecton")

module.exports = {
    async index(request , response){
        const result = []
        await banco.con.query(
            'SELECT * FROM TelefoneUsuario', 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado:`)
            });
            console.log('GET /TelefoneUsuario TelefoneUsuario.index', result);
            return response.json(result)
                    })
    },
     async show (request, response, next){
        const result = []
        console.log(request.params.id)
        await banco.con.query(
            `SELECT * FROM TelefoneUsuario t WHERE t.idTelUsuario = ${request.params.id}`, 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado: \n ${row.title} by ${row.name}, ${row.location}`)
            });
            console.log('GET /idTelUsuario:id idTelUsuario.show', request.params);
            return response.json(result)
        })
     },

    async create (request, response){
        let { numUsuario, ddd, idUsuario } = request.body
        const newTelefone = {
            ddd: ddd,
            numUsuario: numUsuario,
            idUsuario: idUsuario
        }

        await banco.con.query(
            'INSERT INTO TelefoneUsuario SET ?', newTelefone, (err, res) => {
                if (err) { 
                    return response.status(404).send(err) 
                }
            console.log('POST /TelefoneUsuario/ TelefoneUsuario.create', res.insertId)
            return response.json(res.insertId)
        })
    },

    async update (req, response){
        console.log(req.body)
        let query = 'UPDATE TelefoneUsuario SET'

        let key = Object.keys(req.body)
        let value = Object.values(req.body)
        let primaryKey = ''
        for (let index = 0; index < key.length ; index++) {
            if(key[index] === 'idTelUsuario'){
                primaryKey = value[index]
            } else if (key[index] === 'ddd' || key[index] === 'numUsuario'  || key[index] === 'idUsuario'){
                query += ` ${key[index]} = ${value[index]},`;    
            }
             else {
                query += ` ${key[index]} = '${value[index]}',`;    
            }          
        }
        query = query.slice(0, -1); 
        query += ' '

        query += `WHERE idTelUsuario = ${primaryKey};`

        console.log(query)
        await banco.con.query(query ,
         (err,ressult) => {
            if (err) { 
                return response.status(404).send(err) 
            }
            console.log('PUT /TelefoneUsuario/ TelefoneUsuario.updte', ressult)
            return response.json(ressult)
        })
    },

    async destroy (request, response){
        await banco.con.query(
            'DELETE FROM TelefoneUsuario WHERE idTelUsuario = ?', [request.body.id], (err, res) => {
                if (err) { 
                    console.log(err)
                    return response.status(404).send(err) 
                }
                console.log(`Deleted ${res.affectedRows} row(s)`);
                return response.json(res.affectedRows)
        })
    }
}