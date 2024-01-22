
class URL {

	constructor(DB){
		this.db = DB;
	}

	async getURL(filter = {}) {
		return this.db.url_full.find(filter).exec();
	};

    async postURL(url_full, url_shortened, usage, title) {
        return this.db.URL({url_full, url_shortened, usage, title}).save();
    };

    async updateTitle(url, title){
        const urlFound = this.db.url_full.find({url_full: url});
        if (!urlFound) throw new HTTPError("URL not found");

        urlFound.title = title;
        return urlFound.save();
    }

    async urlUsagePlusOne(url) {
        const urlFound = this.db.url_full.find({url_full: url});

        urlFound.usage = urlFound.usage + 1;
        return urlFound.save();
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