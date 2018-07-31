var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');

page('/ragsystem-admin', loadCompras, function (ctx, next) {
	title('Ragustino - Cocina');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.compras));

	function Administrando() {
		this.constructor = function() {
			if(!localStorage.getItem("administrando")){
				localStorage.setItem('administrando','[]');
			}
		}

		this.getAdministrando = JSON.parse(localStorage.getItem("administrando"));
	}

	var administrando = new Administrando();

	$(document).ready(function(){
		$('ul.tabs').tabs();
		administrando.constructor();
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