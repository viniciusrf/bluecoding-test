const mongoose = require('mongoose');

const url_full = require('./url');

class mongoDB {
    constructor(url) {
        this.url = url;
    }

    async connect() {
        console.log("starting mongo");
        let options = {};
        try {
            this.connection = (await mongoose.connect(this.url, options)).connection;
            this.url_full = await this.connection.model('URL', url_full);
            
        } catch (error){
            throw new Error(error);
        }
    };

    async disconnect() {
        return await this.connection.disconnect();
    }
}

module.exports = mongoDB;