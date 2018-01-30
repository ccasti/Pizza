var yo = require('yo-yo');
var layout = require('../layout');
/*var menu = require('../');*/

module.exports = function (menuss) {
	var el = yo`<div class="content">
		<div class="container">
			<div class="row">
				<div class="col s12">
					
				</div>		
			</div>
		</div>
	</div>`;

	return layout(el);
}