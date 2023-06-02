const express = require('express')
const app = express()

const notes = [
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

const PORT = 3001
app.listen(PORT)
console.log(`Server running en port ${PORT}`)