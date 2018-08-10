var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');

page('/ragsystem-admin', loadCompras, function (ctx, next) {
	title('Ragustino - Admin');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.compras));

	function Administrando() {
		var compras = ctx.compras;
		this.estadoActual = function() {
			for (i of compras) {
				if(i.cocina == '0') {
					document.getElementById('eC'+i.id_compra).classList.toggle('hide');
					document.getElementById('eR'+i.id_compra).classList.toggle('hide');
				}

				if(i.cocina == '1' && i.reparto == '0') {
					document.getElementById('eA'+i.id_compra).classList.toggle('hide');
					document.getElementById('eR'+i.id_compra).classList.toggle('hide');
				}

				if(i.cocina == '1' && i.reparto == '1') {
					document.getElementById('eA'+i.id_compra).classList.toggle('hide');
					document.getElementById('eC'+i.id_compra).classList.toggle('hide');
				}
			}
		}

		this.nElementos = function() {
			var pedidoAhora = compras.filter(function(obj) {
				if(obj.delivery == '1') {
					return true;
				}else{
					return false;
				}
			});

			var pedidoHoy = compras.filter(function(obj) {
				if(obj.delivery == '2') {
					return true;
				}else{
					return false;
				}
			});

			var pedidoOtro = compras.filter(function(obj) {
				if(obj.delivery == '3') {
					return true;
				}else{
					return false;
				}
			});

			document.getElementById('qAhora').innerHTML = pedidoAhora.length;
			document.getElementById('qHoy').innerHTML = pedidoHoy.length;
			document.getElementById('qOtro').innerHTML = pedidoOtro.length;
		}

		this.pasarCocina = function(id) {
			document.getElementById('eA'+id).classList.toggle('hide');
			document.getElementById('eC'+id).classList.toggle('hide');
			request
				.post('https://www.ragustino.cl/js/AsignarCocina.php')
				.send('datos=' +id)
				.end(function(err, res) {
					alert("Asignado a cocina");
				})
		}

		this.pasarReparto = function(id) {
			document.getElementById('eC'+id).classList.toggle('hide');
			document.getElementById('eR'+id).classList.toggle('hide');
			request
				.post('https://www.ragustino.cl/js/AsignarRepartidor.php')
				.send('datos=' +id)
				.end(function(err, res) {
					alert("Asignado a reparto");
				})
		}

		this.terminarCompra = function(id) {
			document.getElementById('eR'+id).classList.toggle('hide');
			document.getElementById('seFue'+id).classList.toggle('hide');
			request
				.post('https://www.ragustino.cl/js/EliminarTemp.php')
				.send('datos=' +id)
				.end(function(err, res) {
					alert("Compra Finalizada");
				})
		}
	}

	var administrando = new Administrando();

	$(document).ready(function(){
		setTimeout('document.location.reload()',90000);
		$('ul.tabs').tabs();
		administrando.estadoActual();
		administrando.nElementos();

		document.getElementById('admPedido').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "pasarCocina") {
				var conf = confirm("Confirma el envío a cocina");
				if(conf == false) {
					return
				}else{
					var id = ev.target.dataset.id;
					administrando.pasarCocina(id);
				}
			}

			if(ev.target.id === "pasarReparto") {
				var conf = confirm("Confirma el envío a reparto");
				if(conf == false) {
					return
				}else{
					var id = ev.target.dataset.id;
					administrando.pasarReparto(id);
				}
			}

			if(ev.target.id === "finalFinal") {
				var conf = confirm("Confirma el cierre final");
				if(conf == false) {
					return
				}else{
					var id = ev.target.dataset.id;
					administrando.terminarCompra(id);
				}
			}
		})
	});
})

function loadCompras (ctx, next) {
	request
		.get('https://www.ragustino.cl/js/MostrarCompra.php')///api/Compra
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.compras = res.body;
			next();
		})
}