var yo = require('yo-yo');

module.exports = function () {
	return yo`<div class="col s12 seccion sp">
		<div class="row principal2">
			<div class="col s5 offset-s5 m3 offset-m7 l2 offset-l8 sp center-align contComH">
				<a class="btn blue darken-2 compraHome" href="/carta">Hacer Pedido</a>
			</div>
		</div>
		<div class="row sp nobottom">
			<div class="col s12 center-align picHomeL">
				<img class="pic-ini hide-on-small-only" src="home.png" />
				<img class="pic-ini hide-on-med-and-up" src="home-small.png" />
			</div>
		</div>
	</div>`;
}