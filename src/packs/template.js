var yo = require('yo-yo');
var layout = require('../layout');
var pack = require('../products/pack');

module.exports = function (packs) {
	var el = yo`<div class="col s12 seccion up">
		<div class="row">
			<div class="col s12 m10 offset-m1">
				<h2 class="menu-text padding1 grey-text text-darken-4 center-align">Nombre del Pack Individual</h2>
				<p class="pack-text grey-text text-darken-4 center-align">Descripción del pack o de la idea general del producto, ocasiones en que puedes regalarlo</p>
			</div>
		</div>
		<div class="row">
			<div class="col s12 m7 offset-m1">
				${packs.map(function (pic) {
					return pack(pic);
				})}
			</div>
		</div>
	</div>`;

	return layout(el);
}