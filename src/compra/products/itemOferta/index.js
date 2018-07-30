var yo = require('yo-yo');
var aPesos = require('../../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="row itemComprando">
		<div class="col s9">
			${pic.name}
		</div>
		<div class="col s3 right-align">
			${aPesos(pic.price)}.-
		</div>
		<div class="col s12">
			<p class="itemPackOk">- ${pic.pizname}</p>
			<p class="itemPackOk">- ${pic.bebname}</p>
		</div>
	</div>`
}