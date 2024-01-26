const MD5 = require('crypto-js/md5')

class URL {

	constructor(DB){
		this.db = DB;
	}

	async getURL(filter = {}) {
		return this.db.URL.find(filter).exec();
	};

    async getFullURL(url_shortened) {
        const urlFull = await this.db.URL.findOne(url_shortened);
        return urlFull;
    }

    async postURL(url_full, url_shortened, usage, title) {

        return await this.db.URL({url_full, url_shortened, usage, title}).save();;
    };

    async updateTitle(url, title){
        const urlFound = await this.db.URL.find({url_full: url});
        if (!urlFound) throw new HTTPError("URL not found");

        urlFound.title = title;
        return await urlFound.save();
    }

    async idToShortURL(id)  
		{ 
		  
			// Map to store 62 possible characters 
			let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
			let shorturl = []; 
		  
			// Convert given integer id to a base 62 number 
			while (id)  
			{ 
				shorturl.push(map[id % 62]); 
				id = Math.floor(id / 62); 
			} 
		  
			// Reverse shortURL to complete base conversion 
			shorturl.reverse(); 
			return shorturl.join(""); 
		} 

    verifyAuthentication(required = true) {
        return async (req, res, next) => {
    
            try {
                
            } catch (ex) {
                next(ex);
                return;
            }
    
            next();
        };
    }
}

module.exports = URL;