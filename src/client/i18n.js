
var translations = {

	'welcome-presentation-homepage'

};

var defaultLocale = 'en'
	, currentLocale = defaultLocale;

function i18n(key) {

	if (translations[key][currentLocale] !== undefined)
		return translations[key][currentLocale];
	else if (translations[key][defaultLocale] !== undefined)
		return translations[key][defaultLocale];
	return key;
}

i18n.setCurrentLocale = function (locale) {
	currentLocale = locale;
};

module.exports = i18n;