var yo = require('yo-yo');
var layout = require('../layout');
var itemS = require('./products/itemSingle');
var itemP = require('./products/itemPack');
var itemC = require('./products/itemCustom');

module.exports = function (itemsCarrito) {
	var singles = itemsCarrito.filter(function(obj) {
		if(!obj.excep) {
			return true;
		}else{
			return false;
		}
	});
	var packs = itemsCarrito.filter(function(obj) {
		if(obj.excep) {
			return true;
		}else{
			return false;
		}
	});
	var customs = itemsCarrito.filter(function(obj) {
		if(obj.custom) {
			return true;
		}else{
			return false;
		}
	});
	
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
		<div class="row nobottom">
			<div id="pintandoCompra" class="col s12 center-align">
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${singles.map(function (pic) {
					return itemS(pic);
				})}
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${packs.map(function (pic) {
					return itemP(pic);
				})}
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${customs.map(function (pic) {
					return itemC(pic);
				})}
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
		<div class="row">
			<div class="col s12 center-align">
				<a href="http://localhost:3000/carta" class="waves-effect waves-light btn blue darken-2">Seguir Comprando</a>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="programarCompra">Programa la Entrega</p>
			</div>
		</div>
		<div class="row">
			<div class="col s8 offset-s2 m4 offset-m4">
				<ul class="collapsible" class="">
					<li id="listaAhora">
						<div class="collapsible-header">Tan pronto sea posible</div>
						<div id="templateParaAhora" class="collapsible-body center-align">
							<a href="#" id="paraAhora" class="waves-effect waves-light btn blue darken-2">Consultar ;-)</a>
						</div>
					</li>
					<li id="listaMasTarde" class="">
						<div class="collapsible-header">Para más tarde</div>
						<div id="templateMasTarde" class="collapsible-body">
							<div class="row nobottom">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Selecciona Hora y Minutos</p>
								</div>
							</div>
							<div class="row nobottom">
								<div class="col s12 center-align">
									<div id="sliderHora"></div>
									<div id="sliderMinutos"></div>
								</div>
							</div>
						</div>
					</li>
					<li id="listaOtroDia" class="">
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