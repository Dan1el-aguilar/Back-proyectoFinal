const CustomError = require("../helpers/customError");
const AlumnModel = require("../models/AlumnsModel")

const getAllAlumns = async (req, res) => {
  try {
    const { limit = 15, page = 1 } = req.query
    const [alumnsCount, alumns] = await Promise.all([
      AlumnModel.count(),
      AlumnModel.find().skip((limit * page) - limit).limit(limit).populate('subjects')
    ])
    if(alumns.length === 0) throw new CustomError('no hay alumnos', 404)
    res.status(200).json({alumnsCount, alumns})
  } catch (error) {
    res.status(400 || error.code).json({message : error.message})
  }
}

const addAlumn = async (req, res) => {
  try {
    const alumn =  new AlumnModel(req.body)
    const alumnSave = await alumn.save()
    res.status(201).json({message : "alumno creado", alumnSave})
  } catch (error) {
    res.status(400 || error.code).json({message : error.message})
  }
}

const getByIdAlumn = async (req, res) => {
  try {
    const { id } = req.params
    const alumn = await AlumnModel.findById(id)
    if(!alumn) throw new CustomError('Alumno no encontrado', 404)
    res.status(200).json({alumn}) 
  } catch (error) {
    res.status(400 || error.code).json({message : error.message})
  }
}

const searchAlumn = async (req, res) => {
  try {
    const { q } = req.query
    const alumns = await AlumnModel.find({nameCompleted: { $regex: q, $options: 'i'}})
    if(alumns.length === 0) throw new CustomError('el alumno no existe', 404)
    res.status(200).json({alumns})
  } catch (error) {
    res.status(error.code || 400).json({message : error.message})
  }
}

const deleteAlumn = async (req, res) => {
  try {
    const { id } = req.params
    const alumnDelete = await AlumnModel.findByIdAndDelete(id)
    if(!alumnDelete) throw new CustomError('Alumno no encontrado', 404)
    res.status(200).json({message : 'alumno eliminado'}) 
  } catch (error) {
    res.status(400 || error.code).json({message : error.message})
  }
}

const updateAlumn = async (req, res) => {
  try {
    const body = req.body
    const { id } = req.params
    const alumnUpdate = await AlumnModel.findByIdAndUpdate(id, body, {new : true})
    if(!alumnUpdate) throw new CustomError('usuario no encontrado', 404)
    res.status(200).json({alumnUpdate})
  } catch (error) {
    res.status(error.code || 400).json({message : error.message})
  }
}

module.exports = {
  getAllAlumns,
  addAlumn,
  getByIdAlumn,
  deleteAlumn,
  updateAlumn,
  searchAlumn
}