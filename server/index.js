const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config()
const connectionDB = require('../db/db')
connectionDB()
const userRoutes = require('../routes/users.routes')
const alumnsRoute = require('../routes/alumns.routes')
const port = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/users', userRoutes)
app.use('/alumns', alumnsRoute)

app.listen(port, () => {
  console.log(`server en puerto ${port}`)
})