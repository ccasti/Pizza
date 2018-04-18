var yo = require('yo-yo');
var layout = require('../../layout');

module.exports = function () {
	var el = yo`<div class="content">
		<div class="container">
			<div class="row">
				<div class="col s12">
					<p>ver aca las estadisticas</p>
				</div>
			</div>
		</div>	
	</div>`;

	return layout(el);
}