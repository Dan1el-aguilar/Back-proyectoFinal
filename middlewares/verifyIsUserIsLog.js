
const verifyIsUserIsLog = (req, res, next) => {
 try {
  const { id } = req.params
  const idUser = req.id
  if (id == idUser) {
    return res.status(428).json({message:'No Puedes eliminar este usuario esta Logueado'})
  } else {
    next()
  }
 } catch (error) {
  res.status(403).json({message: error.message})
 }
}

module.exports = verifyIsUserIsLog