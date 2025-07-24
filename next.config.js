/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate');
const path = require('path');

const nextConfig = nextTranslate({
	output: 'standalone',
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	images: {
		domains: [process.env.NEXT_PUBLIC_BASE_URL, "https://textup-client.netlify.app", ""],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
		prependData: `
      @import "./src/styles/breakpoints.scss";
      @import "./src/styles/mixins.scss";
      @import "./src/styles/unit.scss";
    `,
	},
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve(__dirname, './src');
		return config;
	},
});

module.exports = nextConfig;
