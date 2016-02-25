
module.exports = function (text) {
	text = text.replace(/(https?:\/\/[^\s]+)/g, function (url) {
		var ret = '<a href="' + url + '">';
		if (url.length > 28)
			ret += url.substr(0, 20) + '...' + url.substr(-15, 15);
		else
			ret += url;
		ret += '</a>';
		return ret;
	});
	return text;
};