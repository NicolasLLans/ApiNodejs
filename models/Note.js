const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  importante: Boolean,
  user: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
