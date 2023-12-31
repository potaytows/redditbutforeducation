const {getSubjects} = require('../middleware/getSubjects');
const { authChecker } = require('../middleware/AuthChecker');
const UserModel = require('../models/UserModel');
const SubjectModel = require('../models/SubjectModel');
const subjectMemberModel = require('../models/SubjectMemberModel');

const PostModel = require('../models/PostModel');
const CommentModel = require('../models/CommentModel');

const page_index = async(req, res,) => {
  const uid = req.session.loginsession
  const subjects = await getSubjects(req);
  const subjectList = await subjectMemberModel.find({user_id:uid, role: { $in: ["admin", "creator","member"] }}).populate("subject_id");
  res.render('index', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "index", subjects: subjects },subjectList: subjectList});

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

const ViewPost = async (req, res) => {
  const subjects = await getSubjects(req);
  const postid = req.params.id
  const post = await PostModel.findOne({_id: postid}).populate("user_id",'-password')
  const comments = await CommentModel.find({post_id: postid}).populate("user_id",'-password')
  res.render('PostPage', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index", subjects: subjects  }, post: post, allcomments: comments })
}

const AddPost = async (req, res) => {
  const sid = req.params.id
  console.log(sid)
  await PostModel.create({
      subject_id: sid,
      post_title: req.body.post_title,
      content: req.body.content,
      user_id: req.session.loginsession._id,
  })
  res.redirect('/subject/'+sid)
};

const NewComment = async (req, res) => {
  const postid = req.params.id
  await CommentModel.create({
      post_id: postid,
      user_id: req.session.loginsession._id,
      comment: req.body.comment
  })
  res.redirect('/post/'+postid)
}
const aboutus = async(req, res) => {
  const subjects = await getSubjects(req);
  res.render('Auth/aboutus', { pageInfo: { pageTitle: 'Reddeetznuts', pageType: "Index", subjects:subjects}});

}
const DeletePost = async(req,res)=>{
  const postid = req.params.id
  const sid = req.params.sid
  const result = await PostModel.findByIdAndRemove({_id:postid})
  console.log(result)
  res.redirect('/subject/'+sid)
}



module.exports = {
  page_index,
  page_login,
  page_register,
  page_profile,
  page_editprofile,
  logout,
  addSubjectPage,
  newPostPage,
  ViewPost,
  AddPost,
  NewComment,
  aboutus,
  DeletePost
}