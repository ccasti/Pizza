var yo = require('yo-yo');
var aPesos = require('../../../utilities/aPesos');
var single = require('../compras/single')
var custom = require('../compras/custom')
var oferta = require('../compras/oferta')

module.exports = function (pic) {
	var singles = pic.content.filter(function(obj) {
		if(!obj.custom && !obj.oferta) {
			return true;
		}else{
			return false;
		}
	});

	var customs = pic.content.filter(function(obj) {
		if(obj.custom) {
			return true;
		}else{
			return false;
		}
	});
	
	var ofertas = pic.content.filter(function(obj) {
		if(obj.oferta) {
			return true;
		}else{
			return false;
		}
	});

	return yo`<div class="col s12 left-align">
		<div class="row">
			<div class="col s12 m4">
				<p class="datoVenta">${pic.client}</p>
				<p class="datoVenta">${aPesos(pic.monto)}</p>
			</div>
			<div class="col s12 m5 left-align">
				${singles.map(function (picS) {
					return single(picS);
				})}
				${customs.map(function (picC) {
					return custom(picC);
				})}
				${ofertas.map(function (picO) {
					return oferta(picO);
				})}
			</div>
			<div id="admPedido" class="col s12 m3">
				<div id="cL${pic.id_compra}" class="row nobottom">
					<div class="col s10 offset-s1 center-align">
						<a href="#" id="cocinaListo" class="waves-effect waves-light btn blue darken-2" data-id="${pic.id_compra}">Listo !!</a>
					</div>
				</div>
				<div id="cocFue${pic.id_compra}" class="hide row nobottom">
					<div class="col s12 center-align">
						<i class="medium material-icons blue-text text-darken-2">check</i>
					</div>
				</div>
			</div>
		</div>
		<div class="divider separar black"></div>
	</div>`;
}