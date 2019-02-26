export const {

    SESS_NAME='sid',
    SESS_SECRET='ssh!pass!',
    SESS_LIFETIME=1000 * 60 * 60 * 2, //two hours

    REDIS_HOST='0.0.0.0',
    REDIS_PORT=6379,
    REDIS_PASSWORD='',

    NODE_ENV = 'development',

} = process.env;

export const IN_PROD = NODE_ENV === 'production';