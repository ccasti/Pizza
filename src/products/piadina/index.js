var yo = require('yo-yo');
var aPesos = require('../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="card pizza-card-content">
		<div class="card-image waves-effect waves-block waves-light">
			<img class="activator responsive" src="${pic.url}">
		</div>
		<div class="card-content">
			<span class="pizza-text card-title activator grey-text text-darken-2">${pic.name}</span>
			<a class="btn-floating right waves-effect waves-light blue darken-2 botonAgregar"><i class="material-icons" id="addItem" data-id="${pic.id}">add</i></a>
		</div>
		<div class="card-reveal">
		    <span class="pizza-text card-title blue-text text-darken-2">${pic.name}<i class="material-icons right">close</i></span>
		    <p class="pizza-content-text">${pic.content}</p>
		    <span class="left likes blue-text text-darken-2">Valor: ${aPesos(pic.price)}.-</span>
		</div>
	</div>`
}