var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../headersystem');

page('/ragsystem', header, function (ctx, next) {
	title('Sistema Interno');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template());
})