var yo = require('yo-yo');

module.exports = function (pic) {
	return yo`<div class="card pizza-card-content">
		<div class="card-image waves-effect waves-block waves-light">
			<img class="activator responsive" src="${pic.url}">
		</div>
		<div class="card-content">
			<span class="pizza-text card-title activator grey-text text-darken-4">${pic.pizzaname}</span>
			<a class="btn-floating right waves-effect waves-light blue darken-2"><i class="material-icons">add</i></a>
			<p class="likes-content">
				<a class="left" href="#!"><i class="material-icons">favorite_border</i></a>
				<span class="left likes">${pic.likes} me gusta</span>
			</p>
		</div>
		<div class="card-reveal">
		    <span class="pizza-text card-title blue-text text-darken-2">${pic.pizzaname}<i class="material-icons right">close</i></span>
		    <p class="pizza-content-text">${pic.pizzacontent}</p>
		    <span class="left likes blue-text text-darken-2">Valor: $${pic.price}</span>
		</div>
	</div>`;
}