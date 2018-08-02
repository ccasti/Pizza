var yo = require('yo-yo');
var nuevo = require('./nuevo')

module.exports = function (compra) {
	var pedidoAhora = compra.filter(function(obj) {
		if(obj.delivery == '1') {
			return true;
		}else{
			return false;
		}
	});

	var pedidoHoy = compra.filter(function(obj) {
		if(obj.delivery == '2') {
			return true;
		}else{
			return false;
		}
	});

	var pedidoOtro = compra.filter(function(obj) {
		if(obj.delivery == '3') {
			return true;
		}else{
			return false;
		}
	});

	return yo`<div class="blue lighten-5">
		<div class="container grey lighten-2">
			<div id="admPedido" class="row">
				<div class="col s12">
					<ul id="tabs" class="tabs blue darken-2">
						<li class="tab col s3"><a class="white-text" href="#test1">AHORA<div id="qAhora" class="chipN chip"></div></a></li>
						<li class="tab col s3"><a class="white-text" href="#test2">HOY...<div id="qHoy" class="chipN chip"></div></a></li>
						<li class="tab col s3"><a class="white-text" href="#test3">OTRO DIA<div id="qOtro" class="chipN chip"></div></a></li>
					</ul>
					<div id="test1" class="col s12 grey lighten-2">
						<h3 class="systemTitulo">Pedidos en Proceso</h3>
						<div class="row nobottom">
							<div class="col s12 m4 left-align">
								<p>Datos</p>
							</div>
							<div class="col s12 m5 left-align">
								<p>Detalle</p>				
							</div>
							<div class="col s12 m3 center-align">
								<p>Acciones</p>		
							</div>
						</div>
						<div class="row nobottom">
							${pedidoAhora.map(function (pic) {
								return nuevo(pic);
							})}
						</div>
					</div>
					<div id="test2" class="col s12 grey lighten-2 systemView">
						<h3 class="systemTitulo">Pedidos en Proceso</h3>
						<div class="row nobottom">
							<div class="col s12 m4 left-align">
								<p>Datos</p>
							</div>
							<div class="col s12 m5 left-align">
								<p>Detalle</p>				
							</div>
							<div class="col s12 m3 center-align">
								<p>Acciones</p>		
							</div>
						</div>
						<div class="row nobottom">
							${pedidoHoy.map(function (pic) {
								return nuevo(pic);
							})}
						</div>
					</div>
					<div id="test3" class="col s12 grey lighten-2 systemView">
						<h3 class="systemTitulo">Pedidos en Proceso</h3>
						<div class="row nobottom">
							<div class="col s12 m4 left-align">
								<p>Datos</p>
							</div>
							<div class="col s12 m5 left-align">
								<p>Detalle</p>				
							</div>
							<div class="col s12 m3 center-align">
								<p>Acciones</p>		
							</div>
						</div>
						<div class="row nobottom">
							${pedidoOtro.map(function (pic) {
								return nuevo(pic);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>`;
}