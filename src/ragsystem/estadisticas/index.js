var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../headersystem');

page('/estadisticas', header, function (ctx, next) {
	title('Estadisticas');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template());
})