const SubjectModel = require('../models/SubjectModel');
const subjectMemberModel = require('../models/SubjectMemberModel');
const UserModel = require('../models/UserModel');
const JoinRequestModel = require('../models/JoinRequestModel');
const { getSubjects } = require('../middleware/getSubjects')

async function getMemberRole(req, sid) {
  const uid = req.session.loginsession
  const role = await subjectMemberModel.findOne({ subject_id: sid, user_id: uid });
  if (role) {
    return role.role
  } else {
    return "isNotMember"
  }


}
const getSubject = async (req, res) => {
  const subjects = await getSubjects(req);
  const sid = req.params.id
  const subject = await SubjectModel.findOne({ _id: sid })
  if (subject) {
    const name = subject.subjectName
    const role = await getMemberRole(req, sid);
    res.render('subjects/Subject', { subjects: subjects, pageInfo: { pageTitle: name, pageType: "Index", pageurl: '/subject/' + req.params.id, subjects: subjects, }, subjectInfo: { Object: subject, role: role } })

  }else{
    res.redirect('/')
  }

}

const getSubjectMembersPage = async (req, res) => {
  const subjects = await getSubjects(req);
  const sid = req.params.id
  const role = await getMemberRole(req, sid);
  const members = await subjectMemberModel.find({ subject_id: sid,role:"member" }, { subject: 0, _id: 0 }).populate("user_id")
  const mods = await subjectMemberModel.find({subject_id:sid,role:{$in:["admin","creator"]}}).populate("user_id")
  const requests = await subjectMemberModel.find({subject_id:sid,role:"pending"}).populate("user_id")
  const subject = await SubjectModel.findOne({ _id: sid })

  res.render('subjects/SubjectMember', { pageInfo: { pageTitle: subject.subjectName, pageType: "Index", pageurl: '/subject/' + req.params.id + '/members', subjects: subjects }, subjectInfo: { Object: subject, membersList:{mods:mods,members:members,requests:requests}, role: role } })
}

const addSubjectPage = async (req, res) => {
  const subjects = await getSubjects(req);
  res.render('AddSubject', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index", subjects: subjects } })

}

const addSubject = async (req, res) => {
  SubjectModel.create({
    subjectName: req.body.subjectName,
    subjectManager: req.session.loginsession,
    Description: req.body.Description
  }).then((result) => {
    subjectMemberModel.create({
      subject_id: result._id,
      user_id: req.session.loginsession._id,
      role: "creator"
    })
    res.cookie('addingSubject', 'Added', { maxAge: 5000 })
    res.redirect('/')
  })


}

const addJoinRequest = async (req, res) => {
  const sid = req.params.id
  await subjectMemberModel.create({
    subject_id: sid,
    user_id: req.session.loginsession._id,
    role: "pending"
  })
  res.cookie('addRequest', 'Added', { maxAge: 5000 })
  res.redirect('/subject/' + sid)
}
const deleteRequest = async (req, res) => {
  const sid = req.params.id

  await subjectMemberModel.findOneAndDelete({
    subject_id: sid,
    user_id: req.session.loginsession._id,
    role: "pending"
  })
  res.cookie('addRequest', 'Deleted', { maxAge: 5000 })
  res.redirect('/subject/' + sid)
}


module.exports = {
  addSubjectPage,
  addSubject,
  getSubject,
  getSubjectMembersPage,
  addJoinRequest,
  deleteRequest

}