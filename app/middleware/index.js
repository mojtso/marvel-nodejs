const redirectLogin = (req, res, next) => {
    if(!req.session.userId) {
        res.redirect('/');
    } else {
        next();
    }
};

const redirectHome = (req, res, next) => {
    if(req.session.userId) {
        res.redirect("home");
    } else {
        next();
    }
};

export { redirectLogin, redirectHome };