const mongoose = require('mongoose')
const password = require('./password.js')

const connectionString = `mongodb+srv://nico2:${password}@notasdb.7uxfec9.mongodb.net/?retryWrites=true&w=majority`

// conexión a mongoDB
mongoose.connect(connectionString).then(() => {
      console.log('Database conneted')
}).catch(err => {
      console.error(err)
})


// Note.find()
//       .then(result => {
//             console.log(result)
//             mongoose.connection.close()
//       }).catch(err => {
//             console.log(err)
// })

// const note= new Note({
//       content: "nota de mongo",
//       date: new Date(),
//       importante: true
// })

// note.save()
//       .then(result => {
//             console.log(result)
//             mongoose.connection.close()
//       }).catch(err => {
//             console.log(err)
// })