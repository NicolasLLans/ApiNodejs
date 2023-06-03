const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema({
      content: String,
      date: Date,
      importante: Boolean
})

const Note= mongoose.model('Note', noteSchema)

module.exports = Note
