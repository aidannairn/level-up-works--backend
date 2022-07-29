const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const { studentBuilderRouter } = require('./src/routes/studentBuilder.routes')

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/student-project-builder', studentBuilderRouter)

app.listen(process.env.PORT)
