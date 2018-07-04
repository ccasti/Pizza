var yo = require('yo-yo');

module.exports = function (pic) {
	return yo`<li class="collection-item avatar">
		<img src="${pic.pizzaurl}" alt="" class="circle">
		<span class="title">${pic.pizzaname} / $${pic.pizzaprice}.- / ${pic.likes} me gusta</span>
		<p class="detalle-item">${pic.pizzacontent}</p>
		<a href="#!" class="secondary-content edit-item"><i class="material-icons">edit</i></a>
	</li>`
}