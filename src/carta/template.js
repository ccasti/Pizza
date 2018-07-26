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
		<div class="row">
			<div class="col s12 center-align topOf">
				<img class="pic-ini" src="oferta.png" />
			</div>
		</div>	
		<div class="row nobottom">
			<div class="col s8 offset-s2 m4 offset-m4 center-align">
				<ul class="collapsible popout" data-collapsible="accordion">
					<li class="nobottom">
					    <div class="collapsible-header blue darken-2 itemsOferta">
					    	<p class="menu-text padding1 white-text center-align">Comprar Oferta</p>
					    </div>
					    <div class="collapsible-body padding1">
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
						    	<div class="input-field col s12 offset-s2 btnOferta">
						    		<a href="#" id="addOferta" class="waves-effect waves-light btn blue darken-2">Confirmar</a>
						    	</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col s12">
				<ul class="collapsible popout" data-collapsible="accordion">
					<p class="menu-text pack-text grey-text text-darken-4 center-align">Conoce las recetas que hemos preparado especialmente para ti con productos de primera selección</p>
					<li>
					    <div class="collapsible-header grey lighten-2 itemsCarta">
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
						   					<p class="menu-text grey-text text-darken-4 center-align">Preparada en Masa Napolitana Clásica de Fermentación Lenta, más sanas y livianas para nuestro organismo. Para entregarte una verdadera experiencia gourmet, debes seleccionar entre 3 y 5 ingredientes, las especias no mestarán consideradas.</p>
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