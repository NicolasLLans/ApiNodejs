const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
      const authoritazion = req.get('authorization')
  let token = null
  if( authoritazion && authoritazion.toLowerCase().startsWith('bearer')){
    token = authoritazion.substring(7)
  }

  let decodedToken={}
  try{
    decodedToken = jwt.verify(token, process.env.SECRET)
  }catch{}

  if(!token || !decodedToken.id){
    return res.status(401).json({error: 'token missing or inavlid' })
  }

  const {id: userId} = decodedToken
  
  req.userId = userId

  next()
}