import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-hbs';
import fp from 'path';
import morgan from 'morgan';
import session from 'express-session';
import { createClient } from'redis';
import connectRedis from 'connect-redis';
import { REDIS_HOST, SESS_NAME, SESS_SECRET, SESS_LIFETIME, IN_PROD } from './constants';
import http from 'http';
import models from './app/models';

const app = express();

import indexRouter from './app/routes/pages';
import userRouter from './app/routes/api/user';


(async() => {

    //Configure Redis
    const redisClient = createClient({
        host: '127.0.0.1',
        port: '6379',
        password: '',
    });

    const RedisStore = connectRedis(session);
    const store = new RedisStore({
        client: redisClient
    });

    app.use(session({
        store,
        name: SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: SESS_SECRET,
        cookie: {
            maxAge: SESS_LIFETIME,
            sameSite: true, //strict
            secure: false,
        }
    }));

    redisClient.on('connect', () => {
        console.log('Redis connected..');
    });

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
    app.use('/', indexRouter);
    app.use('/api', userRouter);


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

    const port = process.env.PORT || 3000;
    const server = await http.createServer(app);
    server.listen(port);

    

})();




// models.sequelize.sync({ }).then((results) => {
//     const port = process.env.PORT || 3000;
//     const server = http.createServer(app);
//     server.listen(port);
// });

