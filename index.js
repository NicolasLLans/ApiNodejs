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

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) {
    res.json(note)
  }else{
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if(!note || !note.content){
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id:maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    importante: typeof note.importante  !== 'undefined' ? note.importante : false
  }

  notes = notes.concat(newNote)

  res.status(201).json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running en port ${PORT}`)
})