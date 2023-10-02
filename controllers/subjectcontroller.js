const SubjectModel = require('../models/SubjectModel');
async function getSubjects(req) {
  const uid = req.session.loginsession
  const subjects = await SubjectModel.find({ subjectManager: uid }, { subjectName: 1, subjectManager: 0 }).populate("subjectManager");
  return subjects

}
const addSubject = async(req, res) => {
  if (req.session.loginsession) {
    const subjects = await getSubjects(req);
    SubjectModel.create({
      subjectName: 'Ambassing',
      subjectManager: req.session.loginsession
    })
    res.render('AddSubject', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index" }, subjects: subjects })
  } else {
    res.redirect('/login')
  }

}


module.exports = {
  addSubject

}