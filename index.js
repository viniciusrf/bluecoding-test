
const mongoDB = require('./mongodb/mongo');
const config = require('./config');
const HTTPServer = require('./server');

    try {
        const dbService = new mongoDB(config.mongoUrl)

        dbService.connect();

        const server = new HTTPServer(dbService);

        server.listen(config.host, config.port);
        
    } catch(ex) {
        throw new Error(ex);
    }

