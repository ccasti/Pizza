var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');

page('/compra', header, footer, function (ctx, next) {
	title('Ragustino - Carro');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template());

	function Carrito() {
		this.getCarrito = JSON.parse(localStorage.getItem("carrito"));

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
								${i.price}
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

	function Comprando() {
		this.getDelivey = function() {
			var delivery = 0;
			var checkear = carrito.getTotal();
			if(checkear < 30000) {
				delivery += 1500;
			}
			return parseFloat(delivery);
		}
	}

	function Comprando_View() {
		this.renderCompra = function() {
			if(carrito.getCarrito.length <= 0) {
				templateNoItemsCompra = `<div class="row center-align">
					<div class="col s12">
						No tienes productos en tu carro
					</div>
				</div>`;
				document.getElementById('pintandoCompra').innerHTML = templateNoItemsCompra;
			}else{
				templateComprando = ``;
				for(i of carrito.getCarrito) {
					if(i.excep) {
						let opcionPack = i;
						console.log(i);
						templateComprando += `<div class="row itemComprando">
							<div class="col s9">
								${opcionPack.name}
							</div>
							<div class="col s3 right-align">
								$ ${opcionPack.price}
							</div>
							<div class="col s9">
								${opcionPack.contents.opciones.map(function (pic) {
									if(pic.idpack === opcionPack.id) {
										for(p of pic.items) {
											if(p.selected) {
												console.log(p.itemname);
												document.innerHTML = p.itemname;
											}
										}
									}
								})}
							</div>
						</div>`;
					}else{
						templateComprando += `<div class="row itemComprando">
							<div class="col s9">
								${i.name}
							</div>
							<div class="col s3 right-align">
								$ ${i.price}
							</div>
						</div>`;
					}
				}
				document.getElementById('pintandoCompra').innerHTML = templateComprando;
			}
			document.getElementById('deliveryCost').innerHTML = "$ "+comprando.getDelivey();
			let total = carrito.getTotal() + comprando.getDelivey();
			document.getElementById('totalCompra').innerHTML = "$ "+total;
		}
	}

	function Programando_Compra() {
		this.determinarAbierto = function() {
			var hoy = new Date();
			var dia = hoy.getDay();
			var hora = hoy.getHours();
			if(dia === 1 || dia === 2 || dia === 3) {
				document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, hoy no atendemos :-(</p>`;
			}else{
				if(dia === 0) {
					if(hora > 13 && hora < 20) {
						document.getElementById('templateParaAhora').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;
					}else{
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, atendemos de 13:00 a 21:00 horas</p>`;
					}
				}
				if(dia === 4) {
					if(hora > 18 && hora < 24) {
						document.getElementById('templateParaAhora').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;
					}else{
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, atendemos de 18:00 a 00:00 horas</p>`;
					}
				}
				if(dia === 5) {
					if(hora > 0 && hora < 18) {
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, atendemos de 18:00 a 00:00 horas</p>`;
					}else{
						document.getElementById('templateParaAhora').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;	
					}
				}
				if(dia === 5) {
					if(hora > 0 && hora < 18) {
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, atendemos de 18:00 a 00:00 horas</p>`;
					}else{
						document.getElementById('templateParaAhora').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;	
					}
					
				}
			}
			
			/*console.log(hoy);
			console.log(hoy.getDate());
			console.log(hoy.getDay());
			console.log(hoy.getHours());*/
		}
	}


	var carrito = new Carrito();
	var carrito_view = new Carrito_View();
	var comprando = new Comprando();
	var comprando_view = new Comprando_View();
	var programando_compra = new Programando_Compra();

	$(document).ready(function(){
		carrito_view.renderCarrito();
		carrito_view.totalProductos();
		comprando_view.renderCompra();

		document.getElementById('productosCarrito').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "deleteItem") {
				carrito.eliminarItem(ev.target.dataset.id);
				Materialize.toast('Se eliminó un producto', 2500, 'rounded')
				carrito_view.totalProductos();
				carrito_view.renderCarrito();
				comprando.getDelivey();
				comprando_view.renderCompra();
			}
		});

		document.getElementById('paraAhora').addEventListener("click", function() {
			programando_compra.determinarAbierto();
		})
	});
});