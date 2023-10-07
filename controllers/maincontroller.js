const {getSubjects} = require('../middleware/getSubjects');
const { authChecker } = require('../middleware/AuthChecker');
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');
const SubjectModel = require('../models/SubjectModel');

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
    res.render('Auth/register', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Auth" } } );

  } else {
    res.redirect('/')
  }

};

const page_profile = async(req, res,) => {
  const subjects = await getSubjects(req);
  const user = await UserModel.findOne({_id:req.session.loginsession._id})
  res.render('Profile/viewProfile', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "index",subjects:subjects},user:user});
};
const page_editprofile = async(req, res,) => {
  const subjects = await getSubjects(req);
  const user = await UserModel.findOne({_id:req.session.loginsession._id})
  res.render('Profile/editProfile', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "index",subjects:subjects},user:user});
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

const newPostPage = async(req, res) => {
  const subjects = await getSubjects(req);
  const sid = req.params.id
  const subject = await SubjectModel.findOne({_id:sid})
  res.render('AddPost', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index", subjects: subjects  }, subject: subject})
}

const AddPost = async (req, res) => {
  const sid = req.params.id
  console.log(sid)
  await PostModel.create({
      subject_id: sid,
      post_name: req.body.postname,
      post_text: req.body.posttext,
      user_id: req.session.loginsession._id,
  })
  res.redirect('/')
};

module.exports = {
  page_index,
  page_login,
  page_register,
  page_profile,
  page_editprofile,
  logout,
  addSubjectPage,
  newPostPage,
  AddPost
}