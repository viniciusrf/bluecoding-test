const MD5 = require('crypto-js/md5')

class URL {

	constructor(DB){
		this.db = DB;
	}

	async getURL(filter = {}) {
		return this.db.url_full.find(filter).exec();
	};

    async getFullURL(url_shortened) {
        const urlFull = await this.db.url_full.findOne(url_shortened);
        return urlFull;
    }

    async postURL(url_full, url_shortened, usage, title) {
        return this.db.url_full({url_full, url_shortened, usage, title}).save();
    };

    async updateTitle(url, title){
        const urlFound = await this.db.url_full.find({url_full: url});
        if (!urlFound) throw new HTTPError("URL not found");

        urlFound.title = title;
        return urlFound.save();
    }

    async urlUsagePlusOne(url) {
        const urlFound = await this.db.url_full.find({url_full: url});

        urlFound.usage = urlFound.usage + 1;
        return urlFound.save();
    }

    async urlToShortURL(url)  
		{ 
		  
			// Map to store 62 possible characters 
			let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
            let n = 0
            url = MD5(url).toString();
            while (url.length > 0) {
                let lastChar = url.substr(-1);
                n += map.indexOf(lastChar);
                url = url.substr(0, (url.length - 1))
            }
			let shorturl = []; 
		  
			// Convert given integer id to a base 62 number 
			while (n)  
			{ 
				// use above map to store actual character 
				// in short url 
				shorturl.push(map[n % 62]); 
				n = Math.floor(n / 62); 
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