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
		setTimeout('document.location.reload()',90000);
		cocinando.nElementos();

		document.getElementById('areaCocina').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "cocinaListo") {
				var id = ev.target.dataset.id;
				document.getElementById('cL'+id).classList.toggle('hide');
				document.getElementById('cocFue'+id).classList.toggle('hide');
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