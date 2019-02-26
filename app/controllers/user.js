import { SESS_NAME } from '../../constants';

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    
    // return home
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    //return home
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('index');
        }

        res.clearCookies(SESS_NAME);
        res.redirect('index');
    });
};