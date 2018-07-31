var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');

page('/ragsystem', function (ctx, next) {
	title('Ragustino - System');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template());
})