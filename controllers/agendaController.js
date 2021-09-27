const banco = require("../connecton")
const { connect } = require("../routes")

module.exports = {
    async index(request , response){
        const result = []
        await banco.con.query(
            'SELECT a.idAgenda, a.dataHora, a.valorTotal, a.location, b.idServico, b.descricaoServico, b.valorServico FROM servico as b INNER JOIN agenda as a ON a.idServico = b.idServico', 
            (err, rows) => {
            if (err) { 
                return response.status(404).send(err) 
            }
        
            rows.forEach(row => {
                result.push(row)
                console.log(`Esse foi o resultado: \n ${row.title} by ${row.name}, ${row.location}`)
            });
            console.log('GET /agenda Agenda.index', result);
            return response.json(result)
        })
    },
     async show (request, response, next){
        const result = []
        console.log(request.params.id)
        await banco.con.query(
            `SELECT b.id, b.title, a.name, a.location FROM book as b INNER JOIN author as a ON b.author = a.id WHERE b.id = ${request.params.id}`, 
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

    // async create (request, response){
    //     let { title, director, release_date, rt_score, people, species, description, image } = request.body
    //     const filme = await Filme.create({
    //         title,
    //         director,
    //         release_date,
    //         rt_score,
    //         people,
    //         species,
    //         description,
    //         image
    //     })
    //     console.log('POST /filme/ Filme.create', request.body)
    //     return response.json(filme)
    // },

    // async update (req, response){
    //     var _id = req.body._id
    //     console.log('entrou aqui', _id)


    //     Filme.findById(_id, function(err, doc) {
    //         if (err){
    //             console.error('error, no entry found');  
    //         }
    //         doc.title = req.body.title,
    //         doc.director = req.body.director,
    //         doc.release_date = req.body.release_date,
    //         doc.description = req.body.description,
    //         doc.rt_score = req.body.rt_score,
    //         doc.people = req.body.people,
    //         doc.species = req.body.species,
    //         doc.image = req.body.image,
    //         doc.save();
    //     })
    //     console.log('PUT /filme Filme.update', req.body)
    //     return response.json(req.body)
    // },

    // async updatePatch (request, response){
    //     console.log('Ta entrando aqui?')

    //     var id = request.params.id

    //     Filme.findByIdAndUpdate(id, function(err, doc) {
    //         if (err){
    //             console.error('error, no entry found');  
    //             return response.status(500).send('error, no entry found!');
    //         }

    //         const title = request.body.title || doc.title
    //         const director = request.body.director || doc.director
    //         const release_date = request.body.release_date || doc.release_date
    //         const rt_score = request.body.rt_score || doc.rt_score
    //         const description = request.body.description || doc.description
    //         const people = request.body.people || doc.people
    //         const species = request.body.species || doc.species
    //         const image = request.body.image || doc.image

    //         doc.title = title,
    //         doc.director = director,
    //         doc.release_date = release_date,
    //         doc.rt_score = rt_score,
    //         doc.description = description,
    //         doc.people = people,
    //         doc.species = species,
    //         doc.image = image,
    //         console.log(doc)
    //         doc.save();
    //     })
    //     console.log('PUT /filme Filme.update', request.body)
    //     return response.json(request.body)
    // },

    // async destroy (request, response){
    //     const params = request.params
    //     await Filme.findByIdAndDelete(params._id)
    //     console.log('DELETE /filme Filme.destroy')
    //     return response.send('Destroy')
    // }
}