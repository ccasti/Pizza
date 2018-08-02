var yo = require('yo-yo');
var nuevo = require('./nuevo')

module.exports = function (compras) {
	var cocinas = compras.filter(function(obj) {
		if(obj.cocina == '1' && obj.reparto == '0') {
			return true;
		}else{
			return false;
		}
	});
	
	return yo`<div class="blue lighten-5">
		<div class="container grey lighten-2">
			<div id="areaCocina" class="row">
				<div class="col s12">
					<div id="horno" class="col s12 grey lighten-2">
						<h3 class="systemTitulo">Pedidos en Proceso<div id="qCocina" class="chipC chip white-text blue darken-2"></div></h3>
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
							${cocinas.map(function (pic) {
								return nuevo(pic);
							})}
						</div>
					</div>
				</div>
			</div>	
		</div>
	</div>`;
}