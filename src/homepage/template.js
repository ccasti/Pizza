var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function () {

	var el = yo`<div class="content">
		
	</div>`;

	return layout(el);
}