import express from 'express';
const router = express.Router()
import { redirectLogin, redirectHome } from '../../middleware';


router.get('/', (req, res) => {
    
    try {
        if(req.session.userId) {
            res.render('layout/home');
        }
        res.render('layout/entry');
    } catch (e) {
        res.render('layout/index');
    }
    
});

router.get('/home', (req, res) => {
    try {
        if(!req.session.userId) {
            res.render('layout/index'); 
        }

        res.render('layout/home');
    } catch(e) {
        res.render('layout/index');
    }
});


module.exports = router;