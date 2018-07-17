var yo = require('yo-yo');
var opcionC = require('./customOp');

module.exports = function (pic) {
	return yo`<div class="row itemComprando">
		<div class="col s9">
			${pic.name}
		</div>
		<div class="col s3 right-align">
			$ ${pic.price}
		</div>
		<div class="col s12">
			${pic.ingredientes.map(function (picC) {
				return opcionC(picC);
			})}
		</div>
	</div>`
}