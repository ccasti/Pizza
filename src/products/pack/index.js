var yo = require('yo-yo');
var itemopt = require('../item-opt');
var itemoptt = require('../item-opt-opt');

module.exports = function pictureCard (pic) {
	var el;
	function render(picture) {
		return yo`<div class="card pack-card-content ${picture.liked ? 'liked' : ''}">
			<div class="card-image waves-effect waves-block waves-light">
				<img class="activator responsive" src="${picture.url}">
			</div>
			<div class="card-content">
				<span class="pizza-text card-title activator grey-text text-darken-2">${picture.name}</span>
				<a class="btn-floating right waves-effect waves-light blue darken-2"><i class="material-icons" id="addItemPack" data-id="${picture.id}">add</i></a>
				<p class="likes-content">
					<a class="left" href="#" onclick=${like.bind(null, true)}><i class="material-icons favorite_border">favorite_border</i></a>
					<a class="left" href="#" onclick=${like.bind(null, false)}><i class="material-icons favorite">favorite</i></a>
					<span class="left likes">${picture.likes} me gusta</span>
				</p>
			</div>
			<div class="card-reveal">
			    <span class="pizza-text card-title blue-text text-darken-2">${picture.name}<i class="material-icons right">close</i></span>
			    ${picture.contents.opciones.map(function (optt) {
			    	return itemoptt(optt);
			    })}
			    ${picture.content.map(function (opt) {
			    	return itemopt(opt);
			    })}
				<span class="left pack-price blue-text text-darken-2">Valor: $${picture.price}</span>
			</div>
		</div>`
	}

	function like(liked) {
		pic.liked = liked;
		pic.likes += liked ? 1: -1; 
		var newEl = render(pic);
		yo.update(el, newEl);
		return false; 
	}

	el = render(pic);
	return el;
}