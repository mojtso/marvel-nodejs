import express from 'express';
const router = express.Router();
import UserController from '../../controllers/user';


router.get('/sign',  UserController.register);

module.exports = router;
