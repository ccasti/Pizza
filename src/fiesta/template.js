var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function () {
	var el = yo`<div class="col s12">
		<p>aca los packs para armar la fiesta</p>
	</div>`;

	return layout(el);
}