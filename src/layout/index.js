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
					<div class="col s12 titCarro">
						<div class="modal-content carritoV">
							<div class="row itemCarrito">
								<div class="col s8">
									<h4 class="tituloCarro">Tu Carro de Compras</h4>
								</div>
								<div class="col s4 right-align">
									<h4 class="tituloCarro" id="totalCarrito"></h4>
								</div>
							</div>
							<ul class="collection">
								<div class="row itemCarrito">
									<div class="col s12">
										<li class="collection-item arregloPad">
											<div class="row itemCarrito">
												<div class="col s3 m4 titCarro">
													Nombre
												</div>
												<div class="col s3 m2 right-align titCarro">
													Precio
												</div>
												<div class="col s2 m2 center-align titCarro">
													Cant.
												</div>
												<div class="col s2 m2 center-align titCarro">
													Total
												</div>
												<div class="col s2 m2 center-align titCarro">
													Quitar
												</div>
											</div>
										</li>
									</div>
								</div>
								<div class="row itemCarrito">
									<div id="productosCarrito" class="col s12">
									</div>
								</div>
							</ul>
						</div>
						<div class="modal-footer">
							<a id="comprando" class="waves-effect waves-light btn blue darken-2">Comprar</a>
							<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cerrar</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="modal8" class="modal">
			<div class="modal-content">
				<h4 class="armandoTit center-align">Nuestra Pizza a tu gusto</h4>
				<div class="row boxIng">
					<div class="col s12">
						<div class="row filaIng">
							<div class="col s8">
								Base
							</div>
							<div class="col s4 sp right-align">
								$ 6990.-
							</div>
						</div>
					</div>
					<div id="ingCustom" class="col s12">
					</div>
					<div class="col s12">
						<div class="row filaIng">
							<div class="col s6 totales">
								Total
							</div>
							<div class="col s6 sp right-align">
								<h4 class="totales" id="totalIngredientes"></h4>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="modal7" class="modal">
			<div class="modal-content">
				<h4 class="armandoTit center-align">Elije Pizza y Bebida</h4>
				<div class="row nobottom">
					<div class="input-field col s12">
						<select id="pizzaOferta">
							<option value="" disabled selected>Elije tu Pizza</option>
							<option value="101">Margherita</option>
							<option value="102">Caprese</option>
							<option value="103">Pollo al Pesto</option>
							<option value="104">Zuchinni Parmesano</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<select id="bebidaOferta">
							<option value="" disabled selected>Elije tu Bebida</option>
							<option value="201">Coca Cola Normal</option>
							<option value="202">Coca Cola zero</option>
							<option value="203">Fanta Normal</option>
							<option value="204">Fanta Zero</option>
							<option value="205">Sprite Normal</option>
							<option value="206">Sprite Zero</option>
						</select>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 offset-s2 btnOferta center-align">
						<a href="#" id="addOferta" class="waves-effect waves-light btn blue darken-2">Confirmar Compra</a>
					</div>
				</div>
			</div>
		</div>
		<div>
			<img class="pic-ini" src="abajo.png" />
		</div>
	</div>`;
}