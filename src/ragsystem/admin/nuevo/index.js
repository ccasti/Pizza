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

	function tipoDelivery (val) {
		if(val === '1') {
			val = "ENTREGA INMEDIATA";
			return val
		}

		if(val === '2') {
			val = "PARA MAS TARDE";
			return val
		}

		if(val === '3') {
			val = "PARA OTRO DIA";
			return val
		}
	}

	function tipoPago (val) {
		if(val === '1') {
			val = "Pago en Efectivo";
			return val
		}

		if(val === '2') {
			val = "Pago con Redbank";
			return val
		}

		if(val === '3') {
			val = "Pago con Transferencia";
			return val
		}
	}

	return yo`<div class="col s12 left-align">
		<div class="row">
			<div class="col s12 m4">
				<p class="datoVenta">${pic.client}</p>
				<p class="datoVenta">${pic.address}</p>
				<p class="datoVenta">${pic.email}</p>
				<p class="datoVenta">${pic.fono}</p>
				<p class="datoVenta">${aPesos(pic.monto)}</p>
				<p class="datoVenta">${tipoPago(pic.pago)}</p>
				${tipoDelivery(pic.delivery)}
				<p class="datoVenta">Entregar a las ${pic.horap}:${pic.minutop}</p>
				<p class="datoVenta">Pedido a las ${pic.hora}:${pic.minuto}</p>
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
				<div class="row nobottom">
					<div class="col s10 offset-s1">
						<div id="eA${pic.id_compra}" class="row nobottom">
							<div class="col s12 center-align">
								<p class="estado">Actualmente en:</p>
								<p class="red darken-4 white-text estadoCiclo">ADMIN</p>
								<p class="pasar">Pasar a:</p>
								<a href="#" id="pasarCocina" class="waves-effect waves-light btn blue darken-2" data-id="${pic.id_compra}">COCINA</a>
							</div>
						</div>
						<div id="eC${pic.id_compra}" class="row nobottom">
							<div class="col s12 center-align">
								<p class="estado">Actualmente en:</p>
								<p class="blue darken-4 white-text estadoCiclo">COCINA</p>
								<p class="pasar">Pasar a:</p>
								<a href="#" id="pasarReparto" class="waves-effect waves-light btn blue darken-2" data-id="${pic.id_compra}">REPARTO</a>
							</div>
						</div>
						<div id="eR${pic.id_compra}" class="row nobottom">
							<div class="col s12 center-align">
								<p class="estado">Actualmente en:</p>
								<p class="green darken-4 white-text estadoCiclo">REPARTO</p>
								<p class="pasar">Pasar a:</p>
								<a href="#" id="finalFinal" class="waves-effect waves-light btn blue darken-2" data-id="${pic.id_compra}">CERRAR</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="divider separar black"></div>
	</div>`;
}