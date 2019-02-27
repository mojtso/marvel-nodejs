import express from 'express';
const router = express.Router();
import { register, login, logout } from '../../controllers/user';


router.post('/sign',  register);

router.post('/login', login);

router.post('/logout', logout);

module.exports = router;
