import Sequelize from 'sequelize';

var env = process.env.NODE_ENV || 'development';


if(process.env.NODE_ENV === 'production') {
    console.log("..running ", env);
    var sequelize = new Sequelize(process.env.DATABASE_URL);
}else {
    console.log("..running ", env);
    var sequelize = new Sequelize('user_db', 'root', 'MyNewPass', {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            underscored: true
        }
    });
}

const models = {
    User: sequelize.import('./user'),
};

Object.keys(models).forEach((modelName) => {
    if('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;