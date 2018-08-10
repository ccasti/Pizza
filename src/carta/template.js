var yo = require('yo-yo');
var layout = require('../layout');
var pizza = require('../products/pizza');
var calzon = require('../products/calzon');
var piadina = require('../products/piadina');
var ingrediente = require('../products/ingrediente');
var item = require('../products/item');
var pack = require('../products/pack');
var aPesos = require('../utilities/aPesos');
var wNumb = require('../utilities/aPesos/wNumb')

module.exports = function (pizzas, otros, ingredientes, packs, items) {
	let mixsIng = ingredientes;
	var quesos = mixsIng.filter(function(obj) {
		if(obj.tipo === 'queso') {
			return true;
		}else{
			return false;
		}
	});

	var carnes = mixsIng.filter(function(obj) {
		if(obj.tipo === 'carne') {
			return true;
		}else{
			return false;
		}
	});

	var embus = mixsIng.filter(function(obj) {
		if(obj.tipo === 'embus') {
			return true;
		}else{
			return false;
		}
	});

	var espec = mixsIng.filter(function(obj) {
		if(obj.tipo === 'espec') {
			return true;
		}else{
			return false;
		}
	});

	var marinos = mixsIng.filter(function(obj) {
		if(obj.tipo === 'mar') {
			return true;
		}else{
			return false;
		}
	});

	var veget = mixsIng.filter(function(obj) {
		if(obj.tipo === 'verdu') {
			return true;
		}else{
			return false;
		}
	});

	let mixsPac = packs;
	var single = mixsPac.filter(function(obj) {
		if(obj.tipo === 'single') {
			return true;
		}else{
			return false;
		}
	});

	var four = mixsPac.filter(function(obj) {
		if(obj.tipo === 'four') {
			return true;
		}else{
			return false;
		}
	});

	var six = mixsPac.filter(function(obj) {
		if(obj.tipo === 'six') {
			return true;
		}else{
			return false;
		}
	});

	var eight = mixsPac.filter(function(obj) {
		if(obj.tipo === 'eight') {
			return true;
		}else{
			return false;
		}
	});

	let mixsIte = items;
	var queso = mixsIte.filter(function(obj) {
		if(obj.tipo === 'queso') {
			return true;
		}else{
			return false;
		}
	});

	var aceitunas = mixsIte.filter(function(obj) {
		if(obj.tipo === 'aceit') {
			return true;
		}else{
			return false;
		}
	});

	var secos = mixsIte.filter(function(obj) {
		if(obj.tipo === 'secos') {
			return true;
		}else{
			return false;
		}
	});

	var papas = mixsIte.filter(function(obj) {
		if(obj.tipo === 'papas') {
			return true;
		}else{
			return false;
		}
	});

	var chocos = mixsIte.filter(function(obj) {
		if(obj.tipo === 'choco') {
			return true;
		}else{
			return false;
		}
	});

	var galletas = mixsIte.filter(function(obj) {
		if(obj.tipo === 'galle') {
			return true;
		}else{
			return false;
		}
	});

	var acces = mixsIte.filter(function(obj) {
		if(obj.tipo === 'acces') {
			return true;
		}else{
			return false;
		}
	});

	var latas = mixsIte.filter(function(obj) {
		if(obj.tipo === 'beblata') {
			return true;
		}else{
			return false;
		}
	});

	var medias = mixsIte.filter(function(obj) {
		if(obj.tipo === 'bebgra') {
			return true;
		}else{
			return false;
		}
	});

	var bigs = mixsIte.filter(function(obj) {
		if(obj.tipo === 'bebext') {
			return true;
		}else{
			return false;
		}
	});

	var cervezas = mixsIte.filter(function(obj) {
		if(obj.tipo === 'cerveza') {
			return true;
		}else{
			return false;
		}
	});

	var secos = mixsIte.filter(function(obj) {
		if(obj.tipo === 'secos') {
			return true;
		}else{
			return false;
		}
	});

	var aguas = mixsIte.filter(function(obj) {
		if(obj.tipo === 'agua') {
			return true;
		}else{
			return false;
		}
	});

	var jugos = mixsIte.filter(function(obj) {
		if(obj.tipo === 'jugo') {
			return true;
		}else{
			return false;
		}
	});

	var jugos = mixsIte.filter(function(obj) {
		if(obj.tipo === 'jugo') {
			return true;
		}else{
			return false;
		}
	});

	let mixsOtr = otros;
	var piadinas = mixsOtr.filter(function(obj) {
		if(obj.tipo === 'piadina') {
			return true;
		}else{
			return false;
		}
	});

	var calzones = mixsOtr.filter(function(obj) {
		if(obj.tipo === 'calzone') {
			return true;
		}else{
			return false;
		}
	});

	var el = yo`<div id="catalogo" class="col s12 seccion">
		<div class="row principal2">
			<div class="col s2 offset-s10 sp center-align">
				<a class="btn modal-trigger blue darken-2 chip-carro" href="#modal9"><i class="small material-icons left carrito">shopping_cart</i><span id="totalProductos">0</span></a>
			</div>
		</div>
		<div class="row">
			<div class="col s12 sp">
				<div class="slider hide-on-small-only">
					<ul class="slides">
						<li>
							<img src="slider1.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text">Aprovecha esta oferta</h3>
								<h5 class="light black-text">Costo del delivery incluido</h5>
								<a class="waves-effect waves-light btn modal-trigger blue darken-2 btnOferta" href="#modal7">Comprar Oferta</a>
							</div>
						</li>
						<li>
							<img src="slider4.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text">Super Promo Agosto</h3>
								<h5 class="light black-text">Costo del delivery incluido</h5>
								<a class="waves-effect waves-light btn modal-trigger blue darken-2 btnOferta" href="#modal6">Comprar Oferta</a>
							</div>
						</li>
						<li>
							<img src="slider2.png"> <!-- random image -->
							<div class="caption right-align">
								<h3 class="black-text">Agenda fácilmente el DIA y HORA que quieres recibir tu pedido.</h3>
								<h5 class="light black-text">PROGRAMA para el mismo día o cuando quieras</h5>
								<h5 class="light black-text">SIN COBROS ADICIONALES</h5>
							</div>
						</li>
						<li>
							<img src="slider3.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text">Disfruta de nuestras exquisitas Pizzas, Calzones y Piadinas</h3>
								<h5 class="light black-text">y muchas sorpresas más...</h5>
							</div>
						</li>
					</ul>
				</div>
				<div class="slider hide-on-med-and-up">
					<ul class="slides">
						<li>
							<img src="sliders1.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text sliderTit">Aprovecha esta oferta</h3>
								<h5 class="light black-text sliderMas">Costo del delivery incluido</h5>
								<a class="waves-effect waves-light btn modal-trigger blue darken-2 btnOferta" href="#modal7">Comprar Oferta</a>
							</div>
						</li>
						<li>
							<img src="sliders4.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text sliderTit">Super Promo Agosto</h3>
								<h5 class="light black-text sliderMas">Costo del delivery incluido</h5>
								<a class="waves-effect waves-light btn modal-trigger blue darken-2 btnOferta" href="#modal6">Comprar Oferta</a>
							</div>
						</li>
						<li>
							<img src="sliders2.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text sliderTit">Agenda fácilmente el DIA y HORA que quieres recibir tu pedido.</h3>
								<h5 class="light black-text sliderMas">PROGRAMA para el mismo día o cuando quieras</h5>
								<h5 class="light black-text sliderMas">SIN COBROS ADICIONALES</h5>
							</div>
						</li>
						<li>
							<img src="sliders3.png"> <!-- random image -->
							<div class="caption center-align">
								<h3 class="black-text sliderTit">Disfruta de nuestras exquisitas Pizzas, Calzones y Piadinas</h3>
								<h5 class="light black-text sliderMas">y muchas sorpresas más...</h5>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12">
				<ul class="collapsible popout" data-collapsible="accordion">
					<p class="menu-text pack-text grey-text text-darken-4 center-align">Conoce las recetas que hemos preparado especialmente para ti con productos de primera selección</p>
					<li>
					    <div id="collapPizzas" class="collapsible-header grey lighten-2 itemsCarta">
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
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
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
					    <div class="collapsible-header grey lighten-2 itemsCarta">
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
					    <div class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Arma tu Pizza</p>
					    </div>
					    <div class="collapsible-body">
					    	<div class="row" id="ingredientes">
						   		<div class="col s12 white">
						   			<div class="row principal2">
						   				<div class="col s12 separar">
						   					<p class="menu-text grey-text text-darken-4 center-align">Preparada en Masa Napolitana Clásica de Fermentación Lenta, más sanas y livianas para nuestro organismo. Para entregarte una verdadera experiencia gourmet, debes seleccionar entre 3 y 5 ingredientes, las especias no estarán consideradas. La base de esta pizza tiene un precio de $6.990.- e incluye nuestra salsa especial y queso mozzarella.</p>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Quesos</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${quesos.map(function (pic) {
						   							return ingrediente(pic);
						   						})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Carnes</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${carnes.map(function (pic) {
						   							return ingrediente(pic);
						   						})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Embutidos</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${embus.map(function (pic) {
						   							return ingrediente(pic);
						   						})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Pescados y Mariscos</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${marinos.map(function (pic) {
						   							return ingrediente(pic);
						   						})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Vegetales</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${veget.map(function (pic) {
						   							return ingrediente(pic);
						   						})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row ingContenedor">
						   				<div class="col s12 separar">
						   					<p class="menu-text paddingl grey-text text-darken-4">Especias</p>
						   				</div>
						   				<div class="row">
						   					<div class="col s12 ajuste-menu-store">
						   						${espec.map(function (pic) {
						   							return ingrediente(pic);
						   						})}
						   					</div>
						   				</div>
						   			</div>
						   			<div class="divider"></div>
						   			<div class="row top">
						   				<div class="col s10 offset-s1 m4 offset-m4 center-align">
						   					<a id="agPizzaCustom" class="waves-effect waves-light btn blue darken-2">Subir al carro</a>
						   				</div>
						   			</div>
						   		</div>
						   	</div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Para Beber</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
						       		<div class="row">
						       			<div class="col s12">
						       				<p class="menu-text">Bebidas en Lata</p>
						           		</div>	
						           	</div>
						           	<div class="row">
						       		   	${latas.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Bebida de 1,5 Litros</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${medias.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Bebida de 3,0 Litros</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${bigs.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Cervezas sin Alcohol</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${cervezas.map(function (pic) {
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
						       			${jugos.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		   <div class="row">
						       		   	<div class="col s12">
						       		   		<p class="menu-text">Aguas</p>
						       		   	</div>	
						       		</div>
						           	<div class="row">
						       			${aguas.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
						       		</div>
						       	</div>
						    </div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
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
					       		    	${queso.map(function (pic) {
						       		   		return item(pic);
						       		   	})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Aceitunas</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${aceitunas.map(function (pic) {
						       		  		return item(pic);
						       			})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Papas Fritas</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${papas.map(function (pic) {
						       		  		return item(pic);
						       			})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Frutos Secos</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${secos.map(function (pic) {
						       		  		return item(pic);
						       			})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Chocolates</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${chocos.map(function (pic) {
						       		  		return item(pic);
						       			})}
						       		</div>
						       		<div class="divider separar"></div>
						       		<div class="row">
						     			<div class="col s12">
						       				<p class="menu-text">Galletas</p>
						       			</div>	
						       		</div>
						           	<div class="row">
						       			${galletas.map(function (pic) {
						       		  		return item(pic);
						       			})}
						       		</div>
						       	</div>
						    </div>
					    </div>
					</li>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
					    	<p class="menu-text padding1 grey-text text-darken-4 center-align">Accesorios</p>
					    </div>
					    <div class="collapsible-body">
					       	<div class="row">
						       	<div class="col s12 white">
							       	<div class="row">
						       			<div class="col s12 ajuste-menu-store">
						       				${acces.map(function (pic) {
						       					return item(pic);
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
/*
<li>
    <div class="collapsible-header grey lighten-2 itemsCarta">
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
	       		    	${single.map(function (pic) {
	        		   		return pack(pic);
	        		   	})}
	        		</div>	
	       		</div>
	       	</div>
	    </div>
    </div>
</li>
<li>
    <div class="collapsible-header grey lighten-2 itemsCarta">
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
	       		    	${four.map(function (pic) {
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
	       		    	${six.map(function (pic) {
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
	       		    	${eight.map(function (pic) {
	        		   		return pack(pic);
	        		   	})}
	        		</div>	
	       		</div>
	       	</div>
	    </div>
    </div>
</li>
*/