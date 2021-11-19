const banco = require("../connecton")

module.exports = {
    async index(request , response){
        const result = []
        await banco.con.query(
            'SELECT * FROM PlanoUsuario', 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado:`)
            });
            console.log('GET /planoUsuario PlanoUsuario.index', result);
            return response.json(result)
                    })
    },
     async show (request, response, next){
        const result = []
        console.log(request.params.id)
        await banco.con.query(
            `SELECT * FROM PlanoUsuario p WHERE p.idPlanoUsuario = ${request.params.id}`, 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado: \n ${row.title} by ${row.name}, ${row.location}`)
            });
            console.log('GET /planoUsuario:id PlanoUsuario.show', request.params);
            return response.json(result)
        })
     },

    async create (request, response){
        let { idPlanoUsuario, nomePlano, descricaoPlano, precoPlano } = request.body
        const newAgenda = {
            nomePlano: nomePlano,
            descricaoPlano: descricaoPlano,
            precoPlano: precoPlano,
            idPlanoUsuario: idPlanoUsuario
        }

        await banco.con.query(
            'INSERT INTO usuario SET ?', newAgenda, (err, res) => {
                if (err) { 
                    return response.status(404).send(err) 
                }
            console.log('POST /planoUsuario/ PlanoUsuario.create', res.insertId)
            return response.json(res.insertId)
        })
    },

    async update (req, response){
        console.log(req.body)
        let query = 'UPDATE PlanoUsuario SET'

        let key = Object.keys(req.body)
        let value = Object.values(req.body)
        let primaryKey = ''
        for (let index = 0; index < key.length ; index++) {
            if(key[index] === 'idPlanoUsuario'){
                primaryKey = value[index]
            } else if (key[index] === 'idPlanoUsuario' || key[index] === 'precoPlano'){
                query += ` ${key[index]} = ${value[index]},`;    
            }
             else {
                query += ` ${key[index]} = '${value[index]}',`;    
            }          
        }
        query = query.slice(0, -1); 
        query += ' '

        query += `WHERE idPlanoUsuario = ${primaryKey};`

        console.log(query)
        await banco.con.query(query ,
         (err,ressult) => {
            if (err) { 
                return response.status(404).send(err) 
            }
            console.log('PUT /planoUsuario/ PlanoUsuario.updte', ressult)
            return response.json(ressult)
        })
    },

    async destroy (request, response){
        await banco.con.query(
            'DELETE FROM PlanoUsuario WHERE idPlanoUsuario = ?', [request.body.id], (err, res) => {
                if (err) { 
                    console.log(err)
                    return response.status(404).send(err) 
                }
                console.log(`Deleted ${res.affectedRows} row(s)`);
                return response.json(res.affectedRows)
        })
    }
}