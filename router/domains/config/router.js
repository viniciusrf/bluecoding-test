const express = require('express');
const router = express.Router();

module.exports = ( configService ) => {
	router.get('/:config_name', configService.verifyAuthentication(), async (req, res) => {
		const config_name = req.params.config_name;
        
        const config_found = await configService.getConfig({config_name: config_name});
        res.status(200).json(config_found);
	});

    router.post('/setBasicConfig/', configService.verifyAuthentication(), async (req, res) => {        
        const config_found = await configService.db_parameter();
        res.status(200).json(config_found);
	});
    

	return router;
};

 
