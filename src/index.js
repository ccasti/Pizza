// acá se incluirá toda la lógica del proyecto, las rutas, timeline, etc.
var page = require('page');

require('./homepage');
require('./clients/signup');
require('./clients/signin');
require('./layout/footer');

page();