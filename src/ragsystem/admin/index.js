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
	}

	var administrando = new Administrando();

	$(document).ready(function(){
		$('ul.tabs').tabs();
		administrando.estadoActual();
		administrando.nElementos();
	});
})

function loadCompras (ctx, next) {
	request
		.get('/api/Compra')//https://www.ragustino.cl/js/...
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.compras = res.body;
			next();
		})
}