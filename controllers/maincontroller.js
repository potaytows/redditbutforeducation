const SubjectModel = require('../models/SubjectModel');
const subjectMemberModel = require('../models/SubjectMember');
const UserModel = require('../models/UserModel');

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
const page_index = async(req, res,) => {
  const subjects = await getSubjects(req);
  // console.log(subjects)
  res.render('index', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "index" }, subjects: subjects });

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
    res.render('Auth/register', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Auth" } } );

  } else {
    res.redirect('/')
  }

};

const page_profile = async(req, res,) => {
  const subjects = await getSubjects(req);
  const user = await UserModel.findOne({_id:req.session.loginsession._id})
  res.render('Profile/viewProfile', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "index" },subjects:subjects,user:user});
};
const page_editprofile = async(req, res,) => {
  const subjects = await getSubjects(req);
  const user = await UserModel.findOne({_id:req.session.loginsession._id})
  res.render('Profile/editProfile', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "index" },subjects:subjects,user:user});
};

const logout = (req, res) => {
  req.session.destroy();
  res.cookie('isLoggedout', 'true', { maxAge: 1000 })
  res.redirect('/');
};

const addSubjectPage = async(req, res) => {
  if (req.session.loginsession) {
    const subjects = await getSubjects(req);
    res.render('AddSubject', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index" }, subjects: subjects })
  } else {
    res.redirect('/login')
  }

}


module.exports = {
  page_index,
  page_login,
  page_register,
  page_profile,
  page_editprofile,
  logout,
  addSubjectPage,
}