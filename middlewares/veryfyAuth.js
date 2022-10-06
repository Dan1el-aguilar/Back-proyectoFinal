const jwt = require('jsonwebtoken')


const veryfyAuth = (req, res, next) => {
  try {
    const token = req.header('authorization')
    if(!token) throw new Error('Credenciales invalidas, JTW')
    const { id } = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
    if(!id) throw new Error('Credenciales invalidas, id')
    req.id = id
    next()
  } catch (error) {
    res.status(401).json({error: error.message})
  }
    
}

module.exports = veryfyAuth