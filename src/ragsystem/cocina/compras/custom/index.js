var yo = require('yo-yo');
var opcCustom = require('./opcCustom');

module.exports = function (picC) {
	return yo`<div class="row itemComprando nobottom">
		<div class="col s9">
			${picC.name}
		</div>
		<div class="col s12">
			${picC.ingredientes.map(function (picCu) {
				return opcCustom(picCu);
			})}
		</div>
	</div>`
}