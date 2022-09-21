const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config()
const connectionDB = require('../db/db')
connectionDB()
const userRoutes = require('../routes/users.routes')
const alumnsRoutes = require('../routes/alumns.routes')
const subjectRoutes = require('../routes/subject.routes')
const loginRoute = require('../routes/login.routes')
const port = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/users', userRoutes)
app.use('/alumns', alumnsRoutes)
app.use('/subjects', subjectRoutes)

app.use('/login', loginRoute)

app.listen(port, () => {
  console.log(`server en puerto ${port}`)
})