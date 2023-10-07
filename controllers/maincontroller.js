const SubjectModel = require('../models/SubjectModel');
const subjectMemberModel = require('../models/SubjectMemberModel')
const {getSubjects} = require('../middleware/getSubjects');
const { authChecker } = require('../middleware/AuthChecker');

const page_index = async(req, res,) => {
  const subjects = await getSubjects(req);
  console.log(subjects)
  res.render('index', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "index", subjects: subjects }});

  

};
const page_login = (req, res,) => {
  if (!req.session.loginsession) {
    res.render('Auth/login', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Auth" } });

  } else {
    res.redirect('/')
  }

};

const page_register = (req, res,) => {
  if (!req.session.loginsession) {
    res.render('Auth/register', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Auth" } });

  } else {
    res.redirect('/')
  }

};
const logout = (req, res) => {
  req.session.destroy();
  res.cookie('isLoggedout', 'true', { maxAge: 1000 })
  res.redirect('/');
};

const addSubjectPage = async(req, res) => {
    const subjects = await getSubjects(req);
    res.render('AddSubject', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index", subjects: subjects  }})
  

}


module.exports = {
  page_index,
  page_login,
  page_register,
  logout,
  addSubjectPage

}