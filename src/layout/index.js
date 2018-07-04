var yo = require('yo-yo');

module.exports = function layout (content) {

	$(document).ready(function(){
		$('.modal').modal();
	});

	return yo`<div class="content fondo base">
		<div>
			<img class="pic-ini" src="arriba.png" />
		</div>
		<div class="container principal">
			<div class="row principal2">
				<div class="col s12 seccion">
					<div class="row">
						${content}
					</div>
				</div>
			</div>
		</div>
		<div id="modal9" class="modal bottom-sheet">
			<div class="container">
				<div class="row">
					<div class="col s12">
						<div class="modal-content">
							<h4>Tu Carro de Compras</h4>
							<ul class="collection">
								<li class="collection-item">
									<div class="row">
										<div class="col s8 m4">
											Nombre
										</div>
										<div class="col s4 m2 center-align">
											Precio
										</div>
										<div class="col s3 offset-s3 m2 center-align">
											Cantidad
										</div>
										<div class="col s3 m2 center-align">
											Total
										</div>
										<div class="col s3 m2 center-align">
											Quitar
										</div>
									</div>
								</li>
								<li class="collection-item">
									<div class="row">
										<div class="col s8 m4">
											Nombre
										</div>
										<div class="col s4 m2 center-align">
											Precio
										</div>
										<div class="col s3 offset-s3 m2 center-align">
											Cantidad
										</div>
										<div class="col s3 m2 center-align">
											Total
										</div>
										<div class="col s3 m2 center-align">
											Quitar
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="modal-footer">
							<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Comprar</a>
							<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<img class="pic-ini" src="abajo.png" />
		</div>
	</div>`;
}