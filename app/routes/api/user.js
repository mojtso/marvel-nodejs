import express from 'express';
const router = express.Router();
import { register, login, logout } from '../../controllers/user';


router.post('/sign',  register);

router.post('/login', (req, res)=> {
    const { body } = req;
    console.log(body);
    res.send({ message: 'please work...'});
});

router.post('/logout', logout);

module.exports = router;
