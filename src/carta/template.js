var yo = require('yo-yo');
var layout = require('../layout');
var pizza = require('../products/pizza');
var vegetal = require('../products/vegetal');
var carne = require('../products/carne');
var calzon = require('../products/calzon');
var piadina = require('../products/piadina');
var item = require('../products/item');
var pack = require('../products/pack');

module.exports = function (pizzas, vegetales, carnes, calzones, piadinas, packs, items) {

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
					<li>
					    <div class="collapsible-header grey lighten-2">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Pizzas Calzones</p>
					    </div>
					    <div class="collapsible-body">
					    	<div class="row">
						   		<div class="col s12 white">
						   			<div class="row">
						   				<div class="col s12">
						   					<p class="menu-text">Pizza Calzones (2 Unidades)</p>
						   				</div>	
						   			</div>
						   			<div class="row">
						   				<div class="col s12 ajuste-menu-store">
						   	    			${calzones.map(function (pic) {
						   						return calzon(pic);
						   					})}
						   				</div>
						   			</div>
						   		</div>
						   	</div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Piadinas</p>
					    </div>
					    <div class="collapsible-body">
					    	<div class="row">
						   		<div class="col s12 white">
						   			<div class="row">
						   				<div class="col s12">
						   					<p class="menu-text">Piadinas (2 Unidades)</p>
						   				</div>	
						   			</div>
						   			<div class="row">
						   				<div class="col s12 ajuste-menu-store">
						   	    			${piadinas.map(function (pic) {
						   						return piadina(pic);
						   					})}
						   				</div>
						   			</div>
						   		</div>
						   	</div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Arma tu Pizza</p>
					    </div>
					    <div class="collapsible-body">
					    	<div class="row">
						   		<div class="col s12 white">
						   			<div class="row principal2">
						   				<div class="col s12">
						   					<p class="menu-text grey-text text-darken-4 center-align">Preparada en Masa Napolitana Clásica de Fermentación Lenta, más sanas y livianas para nuestro organismo.</p>
						   				</div>
						   			</div>
						   			<form action="#">
						   				<div class="row">
						   					<div class="col s12">
						   						<p class="menu-text paddingl grey-text text-darken-4">Vegetales</p>
						   					</div>
						   				</div>
						   				<div class="row">
						   				    <div class="col s12 ajuste-menu-store">
						   						${vegetales.map(function (pic) {
						   					  		return vegetal(pic);
						   					   	})}
						   					</div>
						   				</div>
						   				<div class="divider"></div>
						   				<div class="row">
						   					<div class="col s12">
						   						<p class="menu-text paddingl grey-text text-darken-4">Carnes</p>
						   					</div>
						   				</div>
						   				<div class="row">
						   				    <div class="col s12 ajuste-menu-store">
						   				    	${carnes.map(function (pic) {
						   				    		return carne(pic);
						   				    	})}
						   					</div>
						   				</div>
						   				<div class="divider"></div>
						   				<div class="row top">
						   					<div class="col s10 offset-s1 m4 offset-m4 center-align">
						   						<a class="waves-effect waves-light btn blue darken-2">Subir al carro</a>
						   					</div>
						   				</div>
						   			</form>
						   		</div>
						   	</div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Para Beber</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
						       		<div class="row">
						       			<div class="col s12">
						       				<p class="menu-text">Bebidas</p>
						           		</div>	
						           	</div>
						           	<div class="row">
						       		   	${items.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Jugos</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${items.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
						       		</div>
						       	</div>
						    </div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Para Picar</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
						       		<div class="row">
						       			<div class="col s12">
					       					<p class="menu-text">Quesos</p>
						           		</div>	
					           		</div>
						           	<div class="row">
					       		    	${items.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Papas</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${items.map(function (pic) {
						       		  		return item(pic);
						       			})}
						       		</div>
						       	</div>
						    </div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Pack Regalo</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
						       		<div class="row">
						       			<div class="col s12 center-align">
					       					<p class="menu-text">Sorprende a quien tu quieras con nuestros packs preparados con exquisitos productos.</p>
						           		</div>	
					           		</div>
						           	<div class="row">
						           		<div class="col s12 ajuste-menu-store">
						       		    	${packs.map(function (pic) {
						        		   		return pack(pic);
						        		   	})}
						        		</div>	
						       		</div>
						       	</div>
						    </div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Pack Fiesta</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
						       		<div class="row">
						       			<div class="col s12 center-align">
					       					<p class="menu-text">No te preocupes de los preparativos, la fiesta la armamos nosotros...</p>
						           		</div>	
					           		</div>
						       		<div class="row">
						       			<div class="col s12">
					       					<p class="menu-text">Pack´s para 04 personas.</p>
						           		</div>	
					           		</div>
					           		<div class="row">
						           		<div class="col s12 ajuste-menu-store">
						       		    	${packs.map(function (pic) {
						        		   		return pack(pic);
						        		   	})}
						        		</div>	
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						       			<div class="col s12">
					       					<p class="menu-text">Pack´s para 06 personas.</p>
						           		</div>	
					           		</div>
					           		<div class="row">
						           		<div class="col s12 ajuste-menu-store">
						       		    	${packs.map(function (pic) {
						        		   		return pack(pic);
						        		   	})}
						        		</div>	
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						       			<div class="col s12">
					       					<p class="menu-text">Pack´s para 08 personas.</p>
						           		</div>	
					           		</div>
					           		<div class="row">
						           		<div class="col s12 ajuste-menu-store">
						       		    	${packs.map(function (pic) {
						        		   		return pack(pic);
						        		   	})}
						        		</div>	
						       		</div>
						       	</div>
						    </div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Accesorios</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
						       		<div class="row">
						       			<div class="col s12">
					       					<p class="menu-text">Accesorios</p>
						           		</div>	
					           		</div>
						           	<div class="row">
					       		    	${items.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
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