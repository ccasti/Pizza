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
	loadVegetales,
	loadCarnes,
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
		ctx.vegetales,
		ctx.carnes,
		ctx.calzones,
		ctx.piadinas,
		ctx.packs,
		ctx.items
	));

	function Carrito() {
		var catalogo = [];
		
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

			registroPack.cantidad = 1;
			this.getCarrito.push(registroPack);
			localStorage.setItem("carrito",JSON.stringify(this.getCarrito));
			console.log(carrito.getCarrito);
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
									console.log(eleccion);
									console.log(idOpt);
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
			registro.cantidad = 1;
			this.getCarrito.push(registro);
			localStorage.setItem("carrito",JSON.stringify(this.getCarrito));
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
		
	var carrito = new Carrito();
	var carrito_view = new Carrito_View();

	$(document).ready(function(){
		$('.collapsible').collapsible();
		$('select').material_select();
		
		carrito_view.renderCarrito();
		carrito_view.totalProductos();
		carrito.constructor();

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
				Materialize.toast('Se agregó un producto al carro', 2500, 'rounded')
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
				Materialize.toast('Se agregó un producto al carro', 2500, 'rounded')
				carrito_view.totalProductos();
				carrito_view.renderCarrito();
				$('#modal9').modal('open');
			}
		});

		document.getElementById('productosCarrito').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "deleteItem") {
				carrito.eliminarItem(ev.target.dataset.id);
				Materialize.toast('Se eliminó un producto del carro', 2500, 'rounded')
				carrito_view.totalProductos();
				carrito_view.renderCarrito();
			}
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

function loadVegetales (ctx, next) {
	request
		.get('/api/vegetales')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.vegetales = res.body;
			next();
		})
}

function loadCarnes (ctx, next) {
	request
		.get('/api/carnes')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.carnes = res.body;
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