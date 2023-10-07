function authChecker(req, res, next) {
    if (req.session.loginsession) {
        next();
    } else {
        res.cookie('loginNotis', 'noAuth', { maxAge: 5000 })
        res.redirect("/login");
    }
}

module.exports = {
    authChecker
}