const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User.js')

userRouter.post('/', async (req, res) => {
  const { body } = req
  const { username, name, password } = body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = userRouter