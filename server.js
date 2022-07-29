const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const { studentBuilderRouter } = require('./src/routes/studentProjectBuilder.routes')

dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/student-project-builder', studentBuilderRouter)

const app = express(process.env.PORT)
