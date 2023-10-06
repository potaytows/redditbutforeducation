const SubjectModel = require('../models/SubjectModel');
const subjectMemberModel = require('../models/SubjectMemberModel');
const UserModel = require('../models/UserModel');

async function getSubjects(req) {
  const uid = req.session.loginsession
  const subjects = await SubjectModel.find({ subjectManager: uid }, { subjectName: 1, subjectManager: 0 }).populate("subjectManager");
  return subjects

}

async function MemberChecker(req,sid) {
  const uid = req.session.loginsession
  const isMember = await subjectMemberModel.find({ subject_id:sid,user_id:uid});
  console.log(isMember)
  if(isMember.length>0){
    return true;
  }else{
    return false;

  }

}
const getSubject = async (req, res) => {
  const subjects = await getSubjects(req);
  const sid = req.params.id
  const subject = await SubjectModel.findOne({ _id: sid })
  const isMember = await MemberChecker(req,sid);
  res.render('subjects/Subject', {subjects: subjects, pageInfo: { pageTitle: subject.subjectName, pageType: "Index", pageurl: '/subject/' + req.params.id },  subjectInfo: {Object :subject,isMember:isMember,isMod:'',isAdmin:'' }})
}

const getSubjectMembersPage = async (req, res) => {
  var list = []
  const subjects = await getSubjects(req);
  const sid = req.params.id
  const isMember = await MemberChecker(req,sid);
  const members = await subjectMemberModel.find({ subject_id: sid }, { subject: 0, _id: 0 })
  const subject = await SubjectModel.findOne({ _id: members[0].subject_id })
  members.forEach((member) => {
    list.push(member.user_id)
  })
  const membersList = await UserModel.find({ _id: { $in: list } }, { email: 1 })

  res.render('subjects/SubjectMember', { pageInfo: { pageTitle: members[0].subjectName, pageType: "Index", pageurl: '/subject/'+ req.params.id+'/members' }, subjects: subjects, subjectInfo: {Object :subject,membersList:membersList,isMember:isMember,isMod:'',isAdmin:'' } })
}

const addSubjectPage = async (req, res) => {
  const subjects = await getSubjects(req);
  res.render('AddSubject', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index" }, subjects: subjects })

}

const addSubject = async (req, res) => {

  SubjectModel.create({
    subjectName: req.body.subjectName,
    subjectManager: req.session.loginsession,
    Description: req.body.Description
  }).then((result) => {
    subjectMemberModel.create({
      subject_id: result._id,
      user_id: req.session.loginsession._id
    })
    res.cookie('addingSubject', 'Added', { maxAge: 5000 })
    res.redirect('/')
  })


}


module.exports = {
  addSubjectPage,
  addSubject,
  getSubject,
  getSubjectMembersPage

}