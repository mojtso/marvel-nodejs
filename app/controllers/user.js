import { SESS_NAME } from '../utils/constants';
import models from '../models';
import { hash, compare } from 'bcryptjs';

const register = (req, res) => {
    const { email, password } = req.body;

    try {
        //find user if exist
        models.User.findOne({
            where: { email: email }
        }).then(user => {
            if(user) {
                res.status(409).json({ message: 'user already registered'});
            }

            //hash password
            const hashPassword = hash(password, 10);
            console.log(hashPassword);
            models.User.create(req.body).then(result => {
                if(result.email == email) { 
                    //success, assign user Id to session
                    req.session.userId = result.id;
                    
                    res.status(201).json({ error: null, message: 'User registered', data: result });
                } else {
                    //fail, something went wrong ..
                    res.status(400).json({ error: err, message: "Could not register user", data: null });
                }
            })
        });
    } catch (err) {
        res.status(400).json({ error: err, message: "Could not register user", data: null });
    }
    
};

const login = (req, res) => {

    const { email, password } = req.body;

    try {
        models.User.findOne({
            where: { email: email }
        }).then(user => {
            if(user.email == email) {
                req.session.userId = user.id;
                //compare passwords
                if(compare(password, user.password)) {
                    res.status(200).json({ error: null, message: 'User logged In', data: { email: user.email, username: user.username } });
                }
            } else {
                res.status(409).json({ error: null, message: 'Wrong Email and Password', data: null });
            }
        });
    } catch (err) {
        res.status(400).json({ error: err, message: 'User does not exist ', data: null })
    }

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