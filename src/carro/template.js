var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function () {
	var el = yo`<div class="content fondo base">
		<div class="container">
			<div class="row">
				<div class="col s12">
					<p>Este serà el carro de compras</p>
				</div>
			</div>
		</div>
	</div>`;

	return layout(el);
}