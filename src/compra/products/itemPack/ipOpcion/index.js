var yo = require('yo-yo');
var opcionOk = require('./opcionCheck');

module.exports = function (picI) {
	return yo`<div class="row itemOk">
		<div class="col s12">
			${picI.items.map(function (picOk) {
				return opcionOk(picOk);
			})}
		</div>
	</div>`
}