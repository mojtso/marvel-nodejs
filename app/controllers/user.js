import { SESS_NAME } from '../utils/constants';
import models from '../models';
import { hash, compare } from 'bcryptjs';

const register = (req, res) => {
    const { username, email, password } = req.body;
    
    
    // return home
    res.send({ message: 'Recieved'});
};

const login = (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);
    // res.send({ message: 'ok'});
    //return home
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.redirect('entry');
        }

        res.clearCookies(SESS_NAME);
        res.redirect('entry');
    });
};

export { register, login, logout };