const mongoose = require('mongoose');

const Config = new mongoose.Schema({
    config_name: String,
    data: Object
});

Config.methods.project = function () {
    return {
        id: this._id,
        config_name: this.config_name,
        data: this.data
    };
};
 module.exports = Config;