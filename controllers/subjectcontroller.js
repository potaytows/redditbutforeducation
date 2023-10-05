const SubjectModel = require('../models/SubjectModel');
const subjectMemberModel = require('../models/SubjectMember');
async function getSubjects(req) {
  const uid = req.session.loginsession
  const subjects = await SubjectModel.find({ subjectManager: uid }, { subjectName: 1, subjectManager: 0 }).populate("subjectManager");
  return subjects

}
const getSubject = async (req, res) => {
  if (req.session.loginsession) {
    const subjects = await getSubjects(req);
    const sid = req.params.id
    const subject = await SubjectModel.findOne({ _id: sid })
    console.log(subject)
    res.render('subjects/Subject', { pageInfo: { pageTitle: subject.subjectName, pageType: "Index", pageurl:'/subject/'+req.params.id }, subjects: subjects, subject: subject })
  } else {
    res.redirect('/login')
  }
}
const getSubjectMember = async (req, res) => {
  if (req.session.loginsession) {
    const subjects = await getSubjects(req);
    const sid = req.params.id
    const subject = await SubjectModel.findOne({ _id: sid })
    console.log(subject)
    res.render('subjects/Subject', { pageInfo: { pageTitle: subject.subjectName, pageType: "Index", pageurl:'/subject/'+req.params.id }, subjects: subjects, subject: subject })
  } else {
    res.redirect('/login')
  }
}

const addSubjectPage = async (req, res) => {
  if (req.session.loginsession) {
    const subjects = await getSubjects(req);
    res.render('AddSubject', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index" }, subjects: subjects })
  } else {
    res.redirect('/login')
  }

}

const addSubject = async (req, res) => {
  if (req.session.loginsession) {
    SubjectModel.create({
      subjectName: req.body.subjectName,
      subjectManager: req.session.loginsession,
      Description: req.body.Description
    }).then((result) => {
      subjectMemberModel.create({
        subject_id: result._id,
        user_id: req.session.loginsession._id

      })

    })

    res.redirect('/')
  } else {
    res.redirect('/login')
  }

}


module.exports = {
  addSubjectPage,
  addSubject,
  getSubject

}