var yo = require('yo-yo');
var pizza = require('../products_system/pizzasystem');
/*var vegetal = require('../products_system/vegetalsystem');
var carne = require('../products_system/carnesystem');*/
var ensalada = require('../products_system/ensaladasystem');
var adicional = require('../products_system/adicionalsystem');
/*var pack = require('../products_system/packsystem');
var fiesta = require('../products_system/fiestasystem');*/

module.exports = function (pizzas, /*vegetales, carnes, */ensaladas, adicionales) {
	return yo`<div class="content">
		<div class="container">
			<div class="row">
				<div class="col s12">
					<ul class="collapsible popout" data-collapsible="accordion">
						<p class="pack-text grey-text text-darken-4 center-align">Administación de Productos Ragustino</p>
						<li>
					    	<div class="collapsible-header grey lighten-2">
					    		<p class="menu-text padding1 grey-text text-darken-4 center-align">Pizzas</p>
					        </div>
					    	<div class="collapsible-body">
					    		<div class="col s12 white">
					    			<form action="#">
						    			<div class="row">
											<div class="col s12">
												<ul class="collection">
													<div class="row">
														<div class="col s6 center-align">
															<span>Agregar Pizza <i class="material-icons edit-item">add_circle</i></span>
														</div>
														<div class="col s6 center-align">
															<span class="edit-item">Eliminar Pizza <i class="material-icons">remove_circle</i></span>
														</div>
													</div>
									    			${pizzas.map(function (pic) {
														return pizza(pic);
													})}
												</ul>
											</div>
										</div>
										<div class="divider separar"></div>
									</form>
								</div>
							</div>
					    </li>
						<li>
					    	<div class="collapsible-header grey lighten-2">
					    		<p class="menu-text padding1 grey-text text-darken-4 center-align">Ensaladas</p>
					        </div>
					    	<div class="collapsible-body">
					    		<div class="col s12 white">
					    			<form action="#">
						    			<div class="row">
											<div class="col s12">
												<ul class="collection">
									    			${ensaladas.map(function (pic) {
														return ensalada(pic);
													})}
												</ul>
											</div>
										</div>
										<div class="divider separar"></div>
									</form>
								</div>
							</div>
					    </li>
						<li>
					    	<div class="collapsible-header grey lighten-2">
					    		<p class="menu-text padding1 grey-text text-darken-4 center-align">Acompañamientos</p>
					        </div>
					    	<div class="collapsible-body">
					    		<div class="col s12 white">
					    			<form action="#">
						    			<div class="row">
											<div class="col s12">
												<ul class="collection">
									    			${adicionales.map(function (pic) {
														return adicional(pic);
													})}
												</ul>
											</div>
										</div>
										<div class="divider separar"></div>
									</form>
								</div>
							</div>
					    </li>
					</ul>
				</div>
			</div>
		</div>
	</div>`;
}