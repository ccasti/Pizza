var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function () {
	var el = yo`<div class="col s12 seccion">
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h3 class="compraTit">RAGUSTINO FOOD EXPERIENCE</h3>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="detalleCompra">Detalle de tu compra</p>
			</div>
		</div>
		<div class="row">
			<div id="pintandoCompra" class="col s12 m6 offset-m3">
			</div>
		</div>
		<div class="row">
			<div class="col s12 m6 offset-m3">
				<div class="row itemComprando">
					<div class="col s9">
						Delivey
					</div>
					<div id="deliveryCost" class="col s3 right-align">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12 m6 offset-m3">
				<div class="row itemComprando totales">
					<div class="col s9">
						Total Compra
					</div>
					<div id="totalCompra" class="col s3 right-align">
					</div>
				</div>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="detalleCompra">Programa la Entrega</p>
			</div>
		</div>
		<div class="row">
			<div class="col s8 offset-s2 m4 offset-m4">
				<ul class="collapsible">
					<li>
						<div id="paraAhora" class="collapsible-header disabled">Tan pronto sea posible</div>
						<div id="templateParaAhora" class="collapsible-body center-align"></div>
					</li>
					<li>
						<div class="collapsible-header">Para más tarde</div>
						<div class="collapsible-body">
						</div>
					</li>
					<li>
						<div class="collapsible-header">Para otro día</div>
						<div class="collapsible-body">
						</div>
					</li>					
				</ul>
			</div>
		</div>
	</div>`;

	return layout(el);
}