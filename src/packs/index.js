var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../layout/header');
var request = require('superagent');

page('/packs', header, loadPacks, function (ctx, next) {
	title('Ragustino - Packs');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.packs));
})

function loadPacks (ctx, next) {
	request
		.get('/api/packs')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.packs = res.body;
			next();
		})
}