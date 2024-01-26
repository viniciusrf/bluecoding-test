const express = require('express');
const router = express.Router();

module.exports = ( configService, urlService ) => {
	router.get('/', urlService.verifyAuthentication(), async (req, res) => {
		const usage = req.query.usage;
        const url = req.query.url

		let filter = {};
        if (usage) filter.usage = usage;
		if (url) filter.url_full = url

		const urls = await urlService.getURL(filter);

		res.status(200).json(urls);
	});

	router.get('/:shortened', urlService.verifyAuthentication(), async (req, res) => {

        const shortened = req.params.shortened;

		const url_full = await urlService.getFullURL(shortened);

		res.status(200).json(url_full);
	});

	router.post('/', urlService.verifyAuthentication(), async (req, res) => {
		
		const url_full = req.body.urlFull;
		urlFound = await urlService.getURL({url_full: url_full});
		if (urlFound.length === 0) {
			const numberID = await configService.getUrlCounting();
			const url_shortened = await urlService.idToShortURL(numberID)
			const usage = 1
			const title = '' // will be add by worker
			const urlObject = await urlService.postURL(url_full, url_shortened, usage, title, numberID);
			await configService.urlCountPlusOne();
			res.status(200).json(urlObject);
		} else {
			res.status(200).json(urlFound);
		}
		
	});

    router.put('/', urlService.verifyAuthentication(), async (req, res) => {
        const url = req.body.url;
        
        //lógica para pegar titulo
        title = '';

        const urlTitleSaved = await urlService.updateTitle(url, title)

        res.status(200).json(urlTitleSaved.project());

    })

	return router;
};

 
