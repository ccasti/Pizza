var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');

page('/store', function (ctx, next) {
	title('Administración');
	var main = document.getElementById('main-container');

	var menuss = [
		{
			pizzaname: 'Pizza Primera',
			url: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 14,
			liked: true
		},
		{
			pizzaname: 'Pizza Segunda',
			url: 'pizza2.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 1,
			liked: false
		}
	];
	
	empty(main).appendChild(template);
})