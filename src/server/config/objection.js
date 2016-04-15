
const objection = require('objection')
import knex from './knex'

objection.Model.knex(knex)
module.exports = objection