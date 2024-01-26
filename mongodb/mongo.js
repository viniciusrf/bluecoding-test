const mongoose = require('mongoose');

const URL = require('./url');
const Config = require('./config');

class mongoDB {
    constructor(mongoUrl) {
        this.mongoUrl = mongoUrl;
    }

    async connect() {
        console.log("starting mongo");
        let options = {};
        try {
            this.connection = (await mongoose.connect(this.mongoUrl, options)).connection;
            this.URL = await this.connection.model('URL', URL);
            this.Config = await this.connection.model('Config', Config);
            
        } catch (error){
            throw new Error(error);
        }
    };

    async disconnect() {
        return await this.connection.disconnect();
    }
}

module.exports = mongoDB;