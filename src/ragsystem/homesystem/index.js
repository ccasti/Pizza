var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
/*var request = require('superagent');*/

page('/ragsystem', function (ctx, next) {
	title('Ragustino - System');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template());

	/*$(document).ready(function(){
		document.getElementById('login').addEventListener("click", function(ev) {
			ev.preventDefault();
			if ($("#email").hasClass('invalid')) {
				alert("Debes ingresar un mail válido");
				return
			}
			var usuario = document.getElementById('email').value;
			var password = document.getElementById('password').value;
			
			request
				.post('https://www.ragustino.cl/js/login.php')
				.send('datos=' +usuario, +password)
				.end(function(err, res) {
					alert("Hubo un error");
				})
		})
	});*/
})