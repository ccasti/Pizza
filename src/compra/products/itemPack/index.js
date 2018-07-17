var yo = require('yo-yo');
var opcionI = require('./ipOpcion');

module.exports = function (pic) {
	return yo`<div class="row itemComprando">
		<div class="col s9">
			${pic.name}
		</div>
		<div class="col s3 right-align">
			$ ${pic.price}
		</div>
		<div class="col s12">
			${pic.contents.opciones.map(function (picI) {
				return opcionI(picI);
			})}
		</div>
	</div>`
}