import express from 'express';
const router = express.Router()
import { redirectLogin, redirectHome } from '../../middleware';


router.get('/', redirectHome,(req, res) => {
    res.render("index");
});

router.get('/home', redirectLogin, (req, res) => {
    res.send('You are home');
});


module.exports = router;