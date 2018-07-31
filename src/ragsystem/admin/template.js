var yo = require('yo-yo');
var nuevo = require('./nuevo')

module.exports = function (compra) {

	return yo`<div class="blue lighten-5">
		<div class="container grey lighten-2">
			<div class="row">
				<div class="col s12">
					<ul id="tabs" class="tabs blue darken-2">
						<li class="tab col s3"><a class="white-text" href="#test1">Pedidos</a></li>
						<li class="tab col s3"><a class="white-text" href="#test2">Otros</a></li>
						<li class="tab col s3"><a class="white-text" href="#test3">Otros</a></li>
					</ul>
					<div id="test1" class="col s12 grey lighten-2 systemView">
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
							${compra.map(function (pic) {
								return nuevo(pic);
							})}
						</div>
					</div>
					<div id="test2" class="col s12 grey lighten-2 systemView">
						Proximamente
					</div>
					<div id="test3" class="col s12 grey lighten-2 systemView">
						Proximamente
					</div>
				</div>
			</div>	
		</div>
	</div>`;
}