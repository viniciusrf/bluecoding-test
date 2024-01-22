const mongoose = require('mongoose');

const url_full = new mongoose.Schema({
    url_full: String,
    url_shortened: String,
    usage: Number,
    title: String
});

url_full.methods.project = function () {
    return {
        id: this._id,
        url_full: this.url_full,
        url_shortened: this.url_shortened,
        usage: this.usage,
        title: this.title
    };
};
 module.exports = url_full;