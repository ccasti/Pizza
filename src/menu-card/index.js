var yo = require('yo-yo');

module.exports = function (pic) {
	return yo`<div class="carousel-item card">
		<div class="card-image waves-effect waves-block waves-light">
		    <img class="activator responsive-img" src="${pic.url}">
		</div>
		<div class="card-reveal">
		    <span class="card-title blue-text text-darken-2">${pic.pizzaname}<i class="material-icons right">close</i></span>
		    <p>${pic.pizzacontent}</p>
		    <a class="waves-effect waves-light btn"><i class="material-icons left">shopping_cart</i>Pedir en Línea</a>
		    <p class="center-align bottom">
				<a class="left" href="#"><i class="material-icons">favorite_border</i></a>
				<span class="left likes">${pic.likes} me gusta</span>
			</p>
		</div>
	</div>`;
}