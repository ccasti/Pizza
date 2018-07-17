var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');
var request = require('superagent');

page('/carta',
	header,
	loadPizzas,
	loadIngredientes,
	loadCalzones,
	loadPiadinas,
	loadPacks,
	loadItems,
	footer,

	function (ctx, next) {
	title('Ragustino - Carta');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(
		ctx.pizzas,
		ctx.calzones,
		ctx.piadinas,
		ctx.ingredientes,
		ctx.packs,
		ctx.items
	));

	function Carrito() {
		var catalogo = [];
		var contChequeo = [];
		
		for (i of ctx.pizzas) {
			catalogo.push(i);
		}
		for (i of ctx.calzones) {
			catalogo.push(i);
		}
		for (i of ctx.piadinas) {
			catalogo.push(i);
		}
		for (i of ctx.packs) {
			catalogo.push(i);
		}
		for (i of ctx.items) {
			catalogo.push(i);
		}

		this.constructor = function() {
			if(!localStorage.getItem("carrito")){
				localStorage.setItem('carrito','[]');
			}
		}
			
		this.getCarrito = JSON.parse(localStorage.getItem("carrito"));

		this.mantenedorChequeo = function() {
			if(this.getCarrito.length > 0) {
				for(i of this.getCarrito) {
					var manChequeo = i;
					contChequeo.push({ id: manChequeo.id, price: manChequeo.price });
				}
			}
		}

		this.agregarItemPack = function(item) {
			for(i of catalogo) {
				if(i.id === item) {
					var registroPack = i
				}
			}
			if(!registroPack) {
				return
			}

			for(n of registroPack.contents.opciones) {
				if(n.selec === true) {
					for(i of n.items) {
						if(i.selected === false) {
							delete i.idpack;
							delete i.idopt;
							delete i.iditem;
							delete i.itemname;
							delete i.selected;
						}
					}
				}
				if(!n.selec) {
					alert("Debes Seleccionar tu Pizza y Líquido");
					return agregarItemPack(null);
				}	
			}

			contChequeo.push({ id: registroPack.id, price: registroPack.price });
			registroPack.cantidad = 1;
			this.getCarrito.push(registroPack);
			localStorage.setItem("carrito",JSON.stringify(this.getCarrito));
		}

		this.selectOption = function(idPack, idOpt, idItem) {
			for(p of catalogo) {
				if(p.id === idPack) {
					for(n of p.contents.opciones) {
						if(n.id === idOpt) {
							for(i of n.items) {
								if(i.selected === true) {
									i.selected = false;
									n.selec = false;
								}
								if(i.iditem === idItem) {
									i.selected = true;
									n.selec = true;
									let eleccion = i.itemname;
									let tipo = n.tipo;
									document.getElementById(idOpt).innerHTML = ('- ' + tipo + ': ' + eleccion);
									document.getElementById(idOpt + idOpt).style.display = "none";
								}
							}
						}
					}
				}
			}
		}
			
		this.agregarItem = function(item) {
			for(i of catalogo) {
				if(i.id === item) {
					var registro = i
				}
			}
			if(!registro) {
				return
			}

			for(i of this.getCarrito) {
				if(i.id === item) {
					i.cantidad++;
					localStorage.setItem("carrito",JSON.stringify(this.getCarrito))
					return;
				}
			}
			contChequeo.push({ id: registro.id, price: registro.price });
			registro.cantidad = 1;
			this.getCarrito.push(registro);
			localStorage.setItem("carrito",JSON.stringify(this.getCarrito));
		}

		this.agregarCustom = function() {
			let n = 0;
			for(i of armar_pizza.getIngredientes) {
				if(i.control) {
					n++;
				}
			}
			if(n < 3) {
				alert("Para ofrecerte una verdadera experiencia gourmet, debes seleccionar un mínimo de 3 ingredientes, recuerda que las especias no son consideradas ;-)");
				return
			}
			if(n > 5) {
				alert("Nuestra masa de fermentación lenta se romperá con más de 5 ingredientes, seleciona un máximo de 5 ingredientes ;-)");
				return
			}
			contChequeo.push({ id: '100100', price: armar_pizza.getTotal() });
			console.log(contChequeo);
			let itemCustom = { id: '100100', name: 'Pizza a tu gusto', price: armar_pizza.getTotal(), cantidad: 1, custom: true, ingredientes: armar_pizza.getIngredientes }
			this.getCarrito.push(itemCustom);
			localStorage.setItem("carrito",JSON.stringify(this.getCarrito));
			Materialize.toast('Se agregó un producto', 2500, 'rounded')
			localStorage.setItem('ingredientes','[]');
			carrito_view.totalProductos();
			carrito_view.renderCarrito();
			$('#modal9').modal('open');
			setTimeout('document.location.reload()',2000);
		}

		this.getTotal = function() {
			var total = 0;
			for(i of this.getCarrito) {
				total += parseFloat(i.cantidad) * parseFloat(i.price);
			}
			return total;
		}

		this.eliminarItem = function(item) {
			for(var i in this.getCarrito) {
				if(this.getCarrito[i].id === item) {
					this.getCarrito.splice(i,1);
				}
			}
			localStorage.setItem("carrito",JSON.stringify(this.getCarrito));
			for(var i in contChequeo) {
				if(contChequeo[i].id === item) {
					contChequeo.splice(i,1);
				}
			}
		}

		this.iraComprar = function() {
			if(this.getCarrito.length <= 0) {
				alert("No tienes productos en tu carrito :-(");
				return
			}else{
				var totalChequeo = 0;
				for(i of contChequeo) {
					totalChequeo += parseFloat(i.price);
				}
				if(totalChequeo === this.getTotal()) {
					$('#modal9').modal('close');
					page.redirect('/compra');
				}
			}
		}
	}

	function Carrito_View() {
		this.renderCarrito = function() {
			if(carrito.getCarrito.length <= 0) {
				templateNoItems = `<div class="row">
					<div class="col s12 center-align">
						No tienes productos en tu carro
					</div>
				</div>`;
				document.getElementById('productosCarrito').innerHTML = templateNoItems;
			}else{
				templateItems = ``;
				for(i of carrito.getCarrito) {
					templateItems += `<li class="collection-item">
						<div class="row itemCarrito">
							<div class="col s8 m4">
								${i.name}
							</div>
							<div class="col s4 m2 center-align">
								$${i.price}
							</div>
							<div class="col s3 offset-s3 m2 center-align">
								${i.cantidad}
							</div>
							<div class="col s3 m2 center-align">
								${i.cantidad * i.price}
							</div>
							<div class="col s3 m2 center-align">
								<a href="#"><i class="material-icons iconoBorrar" id="deleteItem" data-id="${i.id}">delete_forever</i></a>
							</div>
						</div>
					</li>`;
				}
				document.getElementById('productosCarrito').innerHTML = templateItems;
			}
			document.getElementById('totalCarrito').innerHTML = "$ "+carrito.getTotal();
		}

		this.totalProductos = function() {
			var total = carrito.getCarrito.length;
			document.getElementById('totalProductos').innerHTML = total;
		}
	}

	function Armar_Pizza() {
		var ingredientes = ctx.ingredientes;

		this.constructor = function() {
			if(!localStorage.getItem("ingredientes")){
				localStorage.setItem('ingredientes','[]');
			}else{
				if(this.getIngredientes.length > 0) {
					localStorage.setItem('ingredientes','[]');
				}
			}
		}
		
		this.getIngredientes = JSON.parse(localStorage.getItem("ingredientes"));
		
		this.cambiarIcono = function(item) {
			for(i of ingredientes) {
				if(i.id === item) {
					document.getElementById(item).classList.toggle('hide');
					document.getElementById(item + item).classList.toggle('hide');
				}
			}
		}

		this.agregarIngrediente = function(item) {
			for(var i in this.getIngredientes) {
				if(this.getIngredientes[i].id === item) {
					this.getIngredientes.splice(i,1);
					localStorage.setItem("ingredientes",JSON.stringify(this.getIngredientes));
					Materialize.toast('Se eliminó un ingrediente', 2500, 'rounded')
					return
				}
			}

			for(n of ingredientes) {
				if(n.id === item) {
					var ingrediente = n;
				}
			}
			if(!ingrediente) {
				return
			}
			this.getIngredientes.push(ingrediente);
			localStorage.setItem("ingredientes",JSON.stringify(this.getIngredientes));
			Materialize.toast('Se agregó un ingrediente', 2500, 'rounded')
		}

		this.getTotal = function() {
			var total = 6990;
			for(i of this.getIngredientes) {
				total += parseFloat(i.price);
			}
			return total;
		}
	}

	function Custom_View() {
		this.renderCustom = function() {
			templateIngredientes = ``;
			for(i of armar_pizza.getIngredientes) {
				templateIngredientes += `<div class="row filaIng">
					<div class="col s8">
						${i.name}
					</div>
					<div class="col s4">
						$ ${i.price}.-
					</div>
				</div>`;
			}
			document.getElementById('ingCustom').innerHTML = templateIngredientes;
			document.getElementById('totalIngredientes').innerHTML = "$ "+armar_pizza.getTotal()+".-";
		}
	}

	var carrito = new Carrito();
	var carrito_view = new Carrito_View();
	var armar_pizza = new Armar_Pizza();
	var custom_view = new Custom_View();

	$(document).ready(function(){
		$('.collapsible').collapsible();
		
		carrito.constructor();
		carrito.mantenedorChequeo();
		carrito_view.renderCarrito();
		carrito_view.totalProductos();
				
		document.getElementById('catalogo').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "itemSelect") {
				var idPack = ev.target.dataset.idpack;
				var idOpt = ev.target.dataset.idopt;
				var idItem = ev.target.dataset.id;
				carrito.selectOption(idPack, idOpt, idItem);
			}
		});
		
		document.getElementById('catalogo').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "addItem"){
				var id = ev.target.dataset.id;
				carrito.agregarItem(id);
				Materialize.toast('Se agregó un producto', 2500, 'rounded')
				carrito_view.totalProductos();
				carrito_view.renderCarrito();
				$('#modal9').modal('open');
			}
		});

		document.getElementById('catalogo').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "addItemPack"){
				var id = ev.target.dataset.id;
				carrito.agregarItemPack(id);
				Materialize.toast('Se agregó un producto', 2500, 'rounded')
				carrito_view.totalProductos();
				carrito_view.renderCarrito();
				$('#modal9').modal('open');
			}
		});

		document.getElementById('productosCarrito').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "deleteItem") {
				carrito.eliminarItem(ev.target.dataset.id);
				Materialize.toast('Se eliminó un producto', 2500, 'rounded')
				carrito_view.totalProductos();
				carrito_view.renderCarrito();
			}
		});

		document.getElementById('ingredientes').addEventListener("click", function(ev) {
			if(ev.target.id === "addIngrediente"){
				armar_pizza.constructor();
				var id = ev.target.dataset.id;
				armar_pizza.cambiarIcono(id);
				armar_pizza.agregarIngrediente(id);
				custom_view.renderCustom();
				$('#modal8').modal('open');
			}
		});

		document.getElementById('agPizzaCustom').addEventListener("click", function(ev) {
			ev.preventDefault();
			carrito.agregarCustom();
		});

		document.getElementById('comprando').addEventListener("click", function(ev) {
			ev.preventDefault();
			carrito.iraComprar();
		})
	});
});

function loadPizzas (ctx, next) {
	request
		.get('/api/pizzas')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.pizzas = res.body;
			next();
		})
}

function loadIngredientes (ctx, next) {
	request
		.get('/api/ingredientes')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.ingredientes = res.body;
			next();
		})
}

function loadCalzones (ctx, next) {
	request
		.get('/api/calzones')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.calzones = res.body;
			next();
		})
}

function loadPiadinas (ctx, next) {
	request
		.get('/api/piadinas')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.piadinas = res.body;
			next();
		})
}

function loadPacks (ctx, next) {
	request
		.get('/api/packs')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.packs = res.body;
			next();
		})
}

function loadItems (ctx, next) {
	request
		.get('/api/items')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.items = res.body;
			next();
		})
}