const SubjectModel = require('../models/SubjectModel');
const subjectMemberModel = require('../models/SubjectMemberModel')

async function getSubjects(req) {
    const uid = req.session.loginsession
    var list = []
    const subjects = await subjectMemberModel.find({ user_id: uid },{user_id:0,_id:0})
    subjects.forEach((subject)=>{
      list.push(subject.subject_id)
    })
    const subjectList = await SubjectModel.find({_id:{$in:list}},{subjectName:1})
    return subjectList
  
  }

  
module.exports= {
  getSubjects

}