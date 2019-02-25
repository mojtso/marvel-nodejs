import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-hbs';
import fp from 'path';
import morgan from 'morgan';

const app = express();

import userRouter from './app/routes/api/user'


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin X-Requested-With, Content-Type, Accept, Authorization');
    
    if(req.header === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }

    next();
});

//PAGES CONFIG
function relative(path) {
    return fp.join(__dirname, path);
}

const viewsDir = relative('views');
app.use(express.static(relative('public_static')));
app.engine('hbs', exphbs.express4({
    defaultLayout: relative('views/index.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', viewsDir);
//END PAGES CONFIG


//Routes handling request
app.use('/', userRouter);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 400;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;