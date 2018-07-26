var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');

page('/somos', header, footer, function (ctx, next) {
	title('Nuestra Filosofia');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template());
});