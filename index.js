const express = require('express')
const routes = require('./routes')
const app = express()

require('dotenv').config()
const port =  process.env.port

app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})