const mongoose = require('mongoose');

const URL = new mongoose.Schema({
    url_full: String,
    url_shortened: String,
    usage: Number,
    title: String,
    numberID: Number
});

URL.methods.project = function () {
    return {
        id: this._id,
        url_full: this.url_full,
        url_shortened: this.url_shortened,
        usage: this.usage,
        title: this.title,
        numberID: this.numberID
    };
};
 module.exports = URL;