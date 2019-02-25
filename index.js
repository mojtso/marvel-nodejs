import http from 'http';
import app from './app';
import models from './app/models';


models.sequelize.sync({ }).then((results) => {
    const port = process.env.PORT || 3000;
    const server = http.createServer(app);
    server.listen(port);
});
