const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    "id": 1,
    "content": "Tengo una tarea por hacer",
    "date": "2019-05-30",
    "importante": true
  },
  {
    "id": 2,
    "content": "Tengo una tarea por hacer",
    "date": "2019-05-30",
    "importante": true
  },
  {
    "id": 3,
    "content": "Tengo una tarea por hacer",
    "date": "2019-05-30",
    "importante": true
  }
]
// const App = http.createServer((req,res) => {
//       res.writeHead(200, { 'Content-Type': 'test/plain' })
//       res.end("hello word")
// })
app.get('/', (req, res) => {
  res.send('<h1>Hola mundo</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
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
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id:maxId + 1,
    content: note.content,
    important: typeof note.important  !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = notes.concat(newNote)

  res.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running en port ${PORT}`)
})