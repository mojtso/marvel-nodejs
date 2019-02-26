import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-hbs';
import fp from 'path';
import morgan from 'morgan';
import session from 'express-session';
import { createClient as createRedisClient } from'redis';
import connectRedis from 'connect-redis';
import { REDIS_HOST, SESS_NAME, SESS_SECRET, SESS_LIFETIME, IN_PROD } from './constants';

const app = express();

import indexRouter from './app/routes/pages';
import userRouter from './app/routes/api/user';



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

//Configure Redis
const redisClient = createRedisClient({
    host: 'redis',
    port: REDIS_HOST,
});

redisClient.on('connect', () => {
    console.log('App connected to Redis')
});

const RedisStore = connectRedis(session);
const store = new RedisStore({
    client: redisClient
});

app.use(session({
    // store,
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true, //strict
        secure: IN_PROD,
    }
}));


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

module.exports = app;