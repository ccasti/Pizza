var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');

page('/ragsystem-cocina', loadCompras, function (ctx, next) {
	title('Ragustino - Cocina');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.compras));

	function Cocinando() {
		var compras = ctx.compras;
		this.nElementos = function() {
			var cocinas = compras.filter(function(obj) {
				if(obj.cocina == '1' && obj.reparto == '0') {
					return true;
				}else{
					return false;
				}
			});
			document.getElementById('qCocina').innerHTML = cocinas.length;
		}
	}

	var cocinando = new Cocinando();

	$(document).ready(function(){
		cocinando.nElementos();
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