const express = require('express');
const mainRouter = require('./router/router');

class HTTPServer {
    constructor(dbService) {
        this.db = dbService;

        this.app = express();
        this.app.use(express.json({limit: '50mb'}));
        this.app.use('/api/', mainRouter(dbService));
    }

    listen(host, port){
        console.log('start listen')
        return new Promise((resolve, reject) => {
			this.server = this.app.listen(port, host, (err) => {
				if (err) reject(err);
				console.info(`Listening http on port: ${this.server.address().port}`);
			});
		});
    }

    stop() {
        // return new Promise((resolve, reject) = {
        //     this.server.close((err) => {
        //         if (err){
        //             console.log(err);
        //             reject(err);
        //         }
        //         console.info('Closing everything now...');
        //         resolve(this);
        //     })
        // })
    }
}

module.exports = HTTPServer