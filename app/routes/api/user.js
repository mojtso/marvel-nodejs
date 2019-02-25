import express from 'express';
const router = express.Router();

import UserController from '../../controllers/user';

router.get('/', UserController.create_user);


module.exports = router;
