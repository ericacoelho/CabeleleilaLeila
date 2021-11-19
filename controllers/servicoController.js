const banco = require("../connecton")
const { connect } = require("../routes")

module.exports = {
    async index(request , response){
        const result = []
        await banco.con.query(
            'SELECT * FROM servico', 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado:`)
            });
            console.log('GET /servico Servico.index', result);
            return response.json(result)
                    })
    },
     async show (request, response, next){
        const result = []
        console.log(request.params.id)
        await banco.con.query(
            `SELECT * FROM servico WHERE idServico = ${request.params.id}`, 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado: \n ${row.title} by ${row.name}, ${row.location}`)
            });
            console.log('GET /servico:id Servico.show', request.params);
            return response.json(result)
        })
     },

    async create (request, response){
        let { descricaoServico, valorServico, tituloServico, valorServicoMin, valorServicoMax } = request.body
        const newServico = {
            descricaoServico: descricaoServico,
            valorServico: valorServico,
            tituloServico: tituloServico,
            valorServicoMin: valorServicoMin,
            valorServicoMax: valorServicoMax
        }

        await banco.con.query(
            'INSERT INTO servico SET ?', newServico, (err, res) => {
                if (err) { 
                    return response.status(404).send(err) 
                }
            console.log('POST /servico/ Servico.create', res.insertId)
            return response.json(res.insertId)
        })
    },

    async update (req, response){
        console.log(req.body)
        let query = 'UPDATE agenda SET'

        let key = Object.keys(req.body)
        let value = Object.values(req.body)
        let primaryKey = ''
        for (let index = 0; index < key.length ; index++) {
            if(key[index] === 'idServico'){
            } else if (key[index] === 'valorServico'
                    || key[index] === 'valorServicoMin'
                    || key[index] === 'valorServicoMax'){
                query += ` ${key[index]} = ${value[index]},`;    
            }
             else {
                query += ` ${key[index]} = '${value[index]}',`;    
            }          
        }
        query = query.slice(0, -1); 
        query += ' '

        query += `WHERE idServico = ${primaryKey};`

        console.log(query)
        await banco.con.query(query ,
         (err,ressult) => {
            if (err) { 
                return response.status(404).send(err) 
            }
            console.log('PUT /filme/ Filme.updte', ressult)
            return response.json(ressult)
        })
    },

    async destroy (request, response){
        await banco.con.query(
            'DELETE FROM servico WHERE idServico = ?', [request.body.id], (err, res) => {
                if (err) { 
                    console.log(err)
                    return response.status(404).send(err) 
                }
                console.log(`Deleted ${res.affectedRows} row(s)`);
                return response.json(res.affectedRows)
        })
    }
}