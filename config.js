const config = {
	host : process.env.HOST || 'localhost',
	port : process.env.PORT || process.env.HTTP_PORT || 3000,
	mongoUrl : (process.env.MONGO_URL || 'mongodb://localhost/bluecoding'),
	modeEnv : (process.env.NODE_ENV || 'development')
};

module.exports = config;