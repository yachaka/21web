
require('fs').readdirSync(__dirname + '/').forEach(function(file) {
	if (file[0] !== '.' && file.match(/\.js$/) !== null && file !== 'index.js') {
		var req = require('./' + file);
		module.exports[file.substring(0, file.lastIndexOf('.js'))] = req.default || req;
	}
});