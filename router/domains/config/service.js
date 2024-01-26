const MD5 = require('crypto-js/md5')

class Config {

	constructor(DB){
		this.db = DB;
	}
    async db_parameter() {
        const config_counter = await  this.db.Config.findOne({config_name: "counter"});
        if (!config_counter) return await this.db.Config({config_name: "counter", data: { url_counter: 1, last_title_checked: ''}}).save();
        return config_counter;
     }
	async getConfig(filter = {}) {
		return this.db.Config.find(filter).exec();
	};

    async getUrlCounting() {
        let count = 0;
        const config_counter = await  this.db.Config.findOne({config_name: "counter"});
        if (!config_counter) {
            this.db_parameter();
            count = 1;
        } else {
            count = config_counter.data.url_counter;
        }

        return count;
    } 

    async urlCountPlusOne() {
        let count = 0;
        let config_counter = await  this.db.Config.findOne({config_name: "counter"});
        if (!config_counter) throw new HTTPError("URL not found");
        
        config_counter.data.url_counter++;
        return  config_counter.save();
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

module.exports = Config;