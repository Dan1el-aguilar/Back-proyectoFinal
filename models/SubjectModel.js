const { Schema, model } = require('mongoose')

const SubjectModel = new Schema({
  name : {
    type : String,
    trim : true,
    required : true
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Alumn'
  }],
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  versionKey : false,
  timestamps : true
})

module.exports = model('Subject', SubjectModel)
