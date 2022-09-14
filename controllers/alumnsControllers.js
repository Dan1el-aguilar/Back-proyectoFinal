const CustomError = require("../helpers/customError");
const AlumnModel = require("../models/AlumnsModel")

const getAllAlumns = async (req, res) => {
  try {
    const alumns = await AlumnModel.find()
    res.status(200).json({alumns})
  } catch (error) {
    console.log(error);
  }
}

const addAlumn = async (req, res) => {
  try {
    const alumn =  new AlumnModel(req.body)
    await alumn.save()
    res.status(201).json({message : "alumno creado", alumn})
  } catch (error) {
    console.log(error);
  }
}

const getByIdAlumn = async (req, res) => {
  try {
    const { idAlumn } = req.params
    const alumn = await AlumnModel.findById(idAlumn)
    res.status(200).json({alumn}) 
  } catch (error) {
    console.log(error);
  }
}

const deleteAlumn = async (req, res) => {
  try {
    const { id } = req.params
    await AlumnModel.findByIdAndDelete(id)
    res.status(200).json({message : 'alumno eliminado'}) 
  } catch (error) {
    console.log(error);
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
  updateAlumn
}