const redirectLogin = (req, res, next) => {
    const { userId } = req.session.userId;
    if(userId == null || userId == undefined) {
        res.redirect('/');
    } else {
        next();
    }
};

const redirectHome = (req, res, next) => {
    const { userId } = req.session.userId;
    if(userId != null || userId !== undefined) {
        res.redirect("home");
    } else {
        next();
    }
};

export { redirectLogin, redirectHome };