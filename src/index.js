// acá se incluirá toda la lógica del proyecto, las rutas, timeline, etc.
var page = require('page');

require('./homepage');
require('./clients/signup');
require('./clients/signin');
require('./carta');
require('./packs');
require('./fiesta');
require('./carro');
require('./ragsystem');
require('./ragsystem/estadisticas');
/*require('./ragsystem/adm_equipo');
require('./ragsystem/adm_productos');*/
require('./layout/footer');

page();