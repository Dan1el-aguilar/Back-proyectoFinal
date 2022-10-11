const CustomError = require("../helpers/customError")
const SubjectModel = require("../models/SubjectModel")

const getAllSubjects = async (req, res) => {
  try {
    const { limit = 15, page = 1} = req.query
    const [ subjectCount, subjects] = await Promise.all([
      SubjectModel.count(),
      SubjectModel.find().skip((limit * page) - limit).limit(limit).populate('students teacher')
    ])
    res.status(200).json({total : subjectCount, page, subjects})
  } catch (error) {
    res.status(404).json({message : error.message})
  }
}

const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params
    const subjectById = await SubjectModel.findById(id)
    if(!subjectById) throw new CustomError('materia no encontrada', 404)
    res.status(200).json(subjectById)
  } catch (error) {
    res.status(error.code || 400).json({message : error.message})
  }
}

const addSubject = async (req, res) => {
  try {
    const subject = new SubjectModel(req.body)
    await subject.save()
    res.status(201).json({message : `materia ${req.body.name} agregada`})
  } catch (error) {
    res.status(400).json({message : error.message})
  }
}

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params
    const subjectDelete = await SubjectModel.findByIdAndDelete(id)
    if(!subjectDelete) throw new CustomError('materia inexistente', 404)
    res.status(200).json({message : 'materia eliminada'})
  } catch (error) {
    res.status(error.code || 400).json({message : error.message})
  }
}

const updateByIdSubjects = async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body
    const updateSubject = await SubjectModel.findByIdAndUpdate(id, body, {new: true})
    if(!updateSubject) throw new CustomError('materia no encontrada', 404)
    res.status(200).json(updateSubject)
  } catch (error) {
    res.status(error.code || 400).json({message : error.message})
  }
}

const addStudentToSubject = async (req, res) => {
  try {
    const { id, idSubject } = req.body
    const subject = await SubjectModel.findById(idSubject)
    subject.students.push(id)
    const subjectUpdate = await SubjectModel.findByIdAndUpdate(idSubject, {students: subject.students}, {new: true})
    res.status(200).json({message: 'Estudiante agregado', subjectUpdate})
  } catch (error) {
    res.status(error.code || 400).json({message : error.message})
  }
}

module.exports = {
  addSubject,
  getAllSubjects,
  deleteSubject,
  getSubjectById,
  updateByIdSubjects,
  addStudentToSubject
}