const express = require('express')
const db = require('./config/client')//connection to the database
const routes = require('./routes')//import routes


const PORT = 3001
const app = express()

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

//connect to the database
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`)
  })
})