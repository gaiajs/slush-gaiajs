module.exports = {

	// session: {
	// 	keys: ['your-session-keys']
	// },
	<% if (hasView) { %>

	views: {
		// see koa-views https://github.com/queckezz/koa-views
		options: {
			<% if (templating == "jade") { %>default: 'jade'<% } %>
			<% if (templating == "ejs") { %>map: { html: 'ejs' }<% } %>
			<% if (templating == "handlebars") { %>map: { html: 'handlebars' }<% } %>
		}
	},
	<% }%>
	<% if (locales) { %>

	i18n: {
		directory: './locales',
		locales: ['fr', 'en'],
		query: true,
		subdomain: true,
		cookie: true,
		header: true,
		devMode: false
	},<% }%>

	port: <%= port %>
};
