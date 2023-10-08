const subjectMemberModel = require('../models/SubjectMemberModel')

async function isAdmin(req, res, next) {
    const uid = req.session.loginsession
    const role = await subjectMemberModel.findOne({ subject_id: req.params.id, user_id: uid });
    if (role.role=="admin"||role.role=="creator") {
        next();
    } else {
        res.cookie('notAdmin', 'notAdmin', { maxAge: 5000 })
        res.redirect("/");
    }

   
}

module.exports = {
    isAdmin
}