const express = require('express')
const { getProjectItems } = require('../controllers/studentBuilder.controller')

const studentBuilderRouter = express.Router()

studentBuilderRouter.get('/:projectID', getProjectItems)

module.exports = { studentBuilderRouter }