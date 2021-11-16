const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const app = express()

app.use(cors())

require('dotenv').config()
const port =  process.env.port

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})