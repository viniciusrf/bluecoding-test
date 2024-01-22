const express = require('express');
const router = express.Router();

module.exports = ( urlService ) => {
	router.get('/', urlService.verifyAuthentication(), async (req, res) => {
		const usage = req.query.usage;
        const url = req.query.url

		let filter = {};
        if (usage) filter.usage = usage;
		if (url) filter.url = url

		const urls = await urlService.getURL(filter);

		res.status(200).json(urls);
	});

	router.post('/',urlService.verifyAuthentication(), async (req, res) => {
		
		const url = req.body.url;
		 // url shortener logic

		const urlObject = await urlService.postURL(url_full, url_shortened, 1, title);

		res.status(200).json(urlObject.project());
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

 
