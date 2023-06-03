require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()

const Note = require('./models/Note')

app.use(cors())
app.use(express.json())

let notes = []
// const App = http.createServer((req,res) => {
//       res.writeHead(200, { 'Content-Type': 'test/plain' })
//       res.end("hello word")
// })
app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
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

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    importante: note.importante || false
  })

  newNote.save().then(saveNote => {
    res.status(201).json(note)
  })
})

app.use((error,req,res,next) => {
  console.error(error)
  if(error.name === 'CastError') {
    res.status(400).send({error:'id used is malformed'})
  }else{
    res.status(500).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running en port ${PORT}`)
})