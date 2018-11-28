const express = require('express');
const router = express.Router();
const Controller = require('../constrollers');

router.get('/', Controller.get_characters);

module.exports = router;
