const SubjectModel = require('../models/SubjectModel');
const PostModel = require('../models/PostModel');
const subjectMemberModel = require('../models/SubjectMemberModel');
var fs = require('fs');
var path = require('path');
const { getSubjects } = require('../middleware/getSubjects')
const moment = require('moment');
const UserModel = require('../models/UserModel');

async function getMemberRole(req, sid) {
  const uid = req.session.loginsession
  const role = await subjectMemberModel.findOne({ subject_id: sid, user_id: uid });
  if (role) {
    return role.role
  } else {
    return "notMember"
  }
}


const getSubject = async (req, res) => {
  const subjects = await getSubjects(req);
  const sid = req.params.id
  const subject = await SubjectModel.findOne({ _id: sid })
  if (subject) {
    const name = subject.subjectName
    const role = await getMemberRole(req, sid);
    const posts = await PostModel.find({subject_id:sid}).populate("user_id","-password")
    res.render('subjects/Subject', { allposts : {posts,moment}, subjects: subjects, pageInfo: { pageTitle: name, pageType: "Index", pageurl: '/subject/' + req.params.id, subjects: subjects, }, subjectInfo: { Object: subject, role: role } })
  } else {
    res.redirect('/')
  }

}

const getSubjectMembersPage = async (req, res) => {
  const subjects = await getSubjects(req);
  const sid = req.params.id
  const role = await getMemberRole(req, sid);
  const members = await subjectMemberModel.find({ subject_id: sid, role: "member" }, { subject: 0, _id: 0 }).populate("user_id")
  const mods = await subjectMemberModel.find({ subject_id: sid, role: { $in: ["admin", "creator"] } }).populate("user_id")
  const requests = await subjectMemberModel.find({ subject_id: sid, role: "pending" }).populate("user_id")
  const subject = await SubjectModel.findOne({ _id: sid })

  res.render('subjects/SubjectMember', { pageInfo: { pageTitle: subject.subjectName, pageType: "Index", pageurl: '/subject/' + req.params.id + '/members', subjects: subjects }, subjectInfo: { Object: subject, membersList: { mods: mods, members: members, requests: requests }, role: role } })
}

const addSubjectPage = async (req, res) => {
  const subjects = await getSubjects(req);
  res.render('AddSubject', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index", subjects: subjects } })

}

const addSubject = async (req, res) => {
  await SubjectModel.create({
    subjectName: req.body.subjectName,
    subjectManager: req.session.loginsession,
    Description: req.body.Description,
    subjectIcon: {
      data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
      contentType: 'image/png'
    }

  }).then((result) => {
    subjectMemberModel.create({
      subject_id: result._id,
      user_id: req.session.loginsession._id,
      role: "creator"
    }).catch((err) => {
      console.log(err)
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
const approveRequest = async (req, res) => {
  const rid = req.params.id;
  await subjectMemberModel.findByIdAndUpdate({ _id: rid }, { $set: { role: "member" } }, { new: true }).then((result) => {
    res.cookie('approvedMember', 'approved', { maxAge: 3000 })
    res.redirect('/subject/' + result.subject_id)

  })
}
const disApprove = async (req, res) => {
  const rid = req.params.id
  await subjectMemberModel.findOneAndDelete({
    id: rid,
    role: "pending"
  }).then(() => {
    res.cookie('Disapproved', 'disapproved', { maxAge: 3000 })
    res.redirect('/subject/' + sid + '/members')

  })
}
const leaveSubject = async (req, res) => {
  const sid = req.params.id;
  await subjectMemberModel.findOneAndDelete({
    subject_id: sid,
    user_id: req.session.loginsession._id,
    role: "member"
  }).then(() => {
    res.cookie('Left', 'Left', { maxAge: 3000 })
    res.redirect('/subject/' + sid)

  })
}

const managementPage = async (req, res) => {
  const sid = req.params.id
  const role = await getMemberRole(req, sid);
  const subjects = await getSubjects(req);
  const subject = await SubjectModel.findOne({ _id: sid })
  res.render('subjects/SubjectManagement', { pageInfo: { pageTitle: subject.subjectName, pageType: "Index", pageurl: '/subject/' + req.params.id + '/management', subjects: subjects }, subjectInfo: { Object: subject, role: role } })


}
const EditSubject = async (req, res) => {
  const sid = req.params.id
  if(req.file){
    await SubjectModel.findByIdAndUpdate({ _id: sid }, {
      $set: {
        subjectName: req.body.subjectName, Description: req.body.Description, subjectIcon: {
          data: fs.readFileSync(path.join(__dirname + "/../uploads/" + req.file.filename)),
          contentType: 'image/png'
        }}})
  }else{
    await SubjectModel.findByIdAndUpdate({ _id: sid }, {
      $set: {
        subjectName: req.body.subjectName, Description: req.body.Description }})
    
  }
  res.redirect('/subject/' + sid)
}
const PromoteUser = async (req,res)=>{
  const uid = req.params.uid
  const sid = req.params.sid
  const result = await subjectMemberModel.findOneAndUpdate({user_id:uid,subject_id:sid},{$set:{role:'admin'}})
  console.log(result)
  res.redirect('/subject/'+sid+'/members') 
}
const DemoteUser = async (req,res)=>{
  const uid = req.params.uid
  const sid = req.params.sid
  const result = await subjectMemberModel.findOneAndUpdate({user_id:uid,subject_id:sid},{$set:{role:'member'}})
  console.log(result)
  res.redirect('/subject/'+sid+'/members') 
}
const KickUser = async (req,res)=>{
  const uid = req.params.uid
  const sid = req.params.sid
  const result = await subjectMemberModel.findOneAndDelete({user_id:uid,subject_id:sid})
  console.log(result)
  res.redirect('/subject/'+sid+'/members') 
}

module.exports = {
  addSubjectPage,
  addSubject,
  getSubject,
  getSubjectMembersPage,
  addJoinRequest,
  deleteRequest,
  approveRequest,
  leaveSubject,
  leaveSubject,
  managementPage,
  EditSubject,
  PromoteUser,
  DemoteUser,
  KickUser


}