require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()

const User = require('./models/User')
const Note = require('./models/Note')
const notFound = require('./middleware/notFound.js')
const handleError = require('./middleware/handleError.js')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find({}).populate('user', {
    username:1,
    name:1
  }) 
  res.json(notes)
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.findById(id).then(note => {
    if (note) {
      return res.json(note)
    } else {
      res.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.put('/api/notes/:id', (req, res, next) => {
  const {id} = req.params
  const note = req.body

  const newNoteInfo = {
    content: note.content,
    importante: note.importante
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new : true})
  .then(result => {
    res.status(201).end()
  })
  .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  const {id} = req.params
  Note.findByIdAndDelete(id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/notes', async (req, res) => 
{
  const {
    content, 
    importante = false,
    userId
  } = req.body

  const user = await User.findById(userId)
  
  if(!content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content,
    date: new Date(),
    importante,
    user: user.id

  })

  // newNote.save().then(saveNote => {
  //   res.status(201).json(note)
  // })
  try{
    const savedNote = await newNote.save()

    user.notes = user.notes.concat(savedNote.id)
    await user.save()
    res.json(savedNote)
  }catch(error){
    next(error)
  }
})

app.use('/api/users', usersRouter )
app.use('/api/login', loginRouter )


app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running en port ${PORT}`)
})