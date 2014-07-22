var gaiajs = require('gaiajs');

var options = {};
<% if (addHooks) { %>
options.hooks = {};
options.hooks.beforeDatabase = function *(){};
options.hooks.afterDatabase = function *(){};
options.hooks.beforeMiddlewares = function *(){};
options.hooks.afterMiddlewares = function *(){};
options.hooks.beforeRoute = function *(){};
options.hooks.afterRoute = function *(){};
<% } %>

new gaiajs(options).start();