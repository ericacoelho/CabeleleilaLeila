const banco = require("../connecton")

module.exports = {
    async index(request , response){
        const result = []
        await banco.con.query(
            'SELECT * FROM comanda', 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado:`)
            });
            console.log('GET /comanda comanda.index', result);
            return response.json(result)
                    })
    },
     async show (request, response, next){
        const result = []
        console.log(request.params.id)
        await banco.con.query(
            `SELECT * FROM comanda WHERE c.idComanda = ${request.params.id}`, 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado: \n ${row.title} by ${row.name}, ${row.location}`)
            });
            console.log('GET /comanda:id Comanda.show', request.params);
            return response.json(result)
        })
     },

    async create (request, response){
        let { idUsuario, idAgenda, idFormaPagamento, dataComanda, totalComanda } = request.body
        const newComanda = {
            idUsuario: idUsuario,
            idAgenda: idAgenda,
            idFormaPagamento: idFormaPagamento,
            dataComanda: dataComanda, 
            totalComanda: totalComanda
        }

        await banco.con.query(
            'INSERT INTO comanda SET ?', newComanda, (err, res) => {
                if (err) { 
                    return response.status(404).send(err) 
                }
            console.log('POST /comanda/ Comanda.create', res.insertId)
            return response.json(res.insertId)
        })
    },

    async update (req, response){
        console.log(req.body)
        let query = 'UPDATE comanda SET'

        let key = Object.keys(req.body)
        let value = Object.values(req.body)
        let primaryKey = ''
        for (let index = 0; index < key.length ; index++) {
            if(key[index] === 'idComanda'){
                primaryKey = value[index]
            } else if (key[index] === 'dataComanda'){
                query += ` ${key[index]} = '${value[index]}',`;    
            }
             else {
                query += ` ${key[index]} = ${value[index]},`;    
            }          
        }
        query = query.slice(0, -1); 
        query += ' '

        query += `WHERE idComanda = ${primaryKey};`

        console.log(query)
        await banco.con.query(query ,
         (err,ressult) => {
            if (err) { 
                return response.status(404).send(err) 
            }
            console.log('PUT /comanda/ Comanda.updte', ressult)
            return response.json(ressult)
        })
    },

    async destroy (request, response){
        await banco.con.query(
            'DELETE FROM comanda WHERE idComanda = ?', [request.body.id], (err, res) => {
                if (err) { 
                    console.log(err)
                    return response.status(404).send(err) 
                }
                console.log(`Deleted ${res.affectedRows} row(s)`);
                return response.json(res.affectedRows)
        })
    }
}