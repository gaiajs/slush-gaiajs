var gaiajs = require('gaiajs');

<% if (addHooks) { %>
hooks = {};
hooks.beforeDatabase = function *(){};
hooks.afterDatabase = function *(){};
hooks.beforeMiddlewares = function *(){};
hooks.afterMiddlewares = function *(){};
hooks.beforeRoute = function *(){};
hooks.afterRoute = function *(){};
<% } %>

var gaiajs = gaiajs.create(__dirname<% if (addHooks) { %>, hooks<% } %>).start();
