const express = require('express');

const urlRouter = require('./domains/url/router');
const configRouter = require('./domains/config/router');

const URL = require('./domains/url/service')
const Config = require('./domains/config/service');

const mainRouter = (dbService) => {
    const router = express.Router();

    const urlService = new URL(dbService);
    const configService = new Config(dbService);

    router.get('/ping', (req, res) => {
        res.send({pong: true});
    });

    router.use('/config/', configRouter(configService));

    router.use('/url', urlRouter(configService, urlService))

    return router;

}

module.exports = mainRouter;