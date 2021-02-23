const express = require('express')
const teachers = require('./teachers')
const routes = express.Router()

routes.get('/', (req, res) => {
  return res.redirect("/teachers")
})

routes.get('/teachers', (req, res) => {
  return res.render("teachers/index")
})

routes.get('/teachers/create', (req, res) => {
  return res.render("teachers/create")
})

routes.post('/teachers', teachers.post)

routes.get('/students', (req, res) => {
  return res.send("students")
})

module.exports = routes