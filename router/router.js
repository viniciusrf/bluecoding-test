const express = require('express');

const urlRouter = require('./domains/url/router');

const URL = require('./domains/url/service')

const mainRouter = (dbService) => {
    const router = express.Router();

    const urlService = new URL(dbService);

    router.get('/ping', (req, res) => {
        res.send({pong: true});
    });

    router.use('/url', urlRouter(urlService))

    return router;

}

module.exports = mainRouter;