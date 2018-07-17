var yo = require('yo-yo');
var layout = require('../layout');
var pizza = require('../products/pizza');

module.exports = function (pizzas) {
	var el = yo`<div class="col s12 seccion">
		<div class="row">
			<div class="col s12" id="catalogo">
				<ul class="collapsible popout" data-collapsible="accordion">
					<p class="menu-text pack-text grey-text text-darken-4 center-align">Conoce las recetas que hemos preparado especialmente para ti con productos de primera selección</p>
					<li>
					    <div class="collapsible-header grey lighten-2">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Pizzas</p>
					    </div>
					    <div class="collapsible-body">
					    	<div class="row">
						    	<div class="col s12 white">
						    		<div class="row principal2">
						    			<div class="col s12 separar">
						    				<p class="menu-text grey-text text-darken-4 center-align">"Pizzas 100% artesanales, siguiendo la receta que aprendimos en Bagnoli, Nápoles.  Fermentamos la masa por más de 24 horas  para conseguir una pizza esponjosa, liviana y fácil de digerir.  Todas son cocinadas en horno de leña con ingredientes frescos y preparados con pasión, cariño y el toque RAGUSTINO."</p>
						    			</div>
						    		</div>
						    		<div class="row">
										<div class="col s12 ajuste-menu-store">
								    		${pizzas.map(function (pic) {
												return pizza(pic);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>`;

	return layout(el);
}