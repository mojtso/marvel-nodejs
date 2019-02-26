import express from 'express';
const router = express.Router()
import { redirectLogin, redirectHome } from '../../middleware';


router.get('/', (req, res) => {
    
    try {
        if(req.session.userId) {
            res.send('home');
        }
        res.render('index');
    } catch (e) {
        res.render('index');
    }
    
});

router.get('/home', (req, res) => {
    try {
        if(!req.session.userId) {
            res.render('index');
        }

        res.send('You are home');
    } catch(e) {
        res.render('index');
    }
});


module.exports = router;