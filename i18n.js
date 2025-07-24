module.exports = {
	locales: ['ru', 'en', 'uz'],
	defaultLocale: 'uz',
	defaultNS: 'common',
	loadLocaleFrom: (lang) => {
		return import(`@/locales/${lang}.json`).then((m) => m.default)
	},
	pages: {
		'*': ['common'],
	},
	localeDetection: false,
};
