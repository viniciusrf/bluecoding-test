
const mongoDB = require('./mongodb/mongo');
const HTTPServer = require('./server');

    try {
        console.log("its working!");
        const dbService = new mongoDB('mongodb://localhost/bluecoding')

        dbService.connect();

        const server = new HTTPServer(dbService);

        server.listen('localhost', '3000');
        
    } catch(ex) {
        throw new Error(ex);
    }
