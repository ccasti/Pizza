var yo = require('yo-yo');
var aPesos = require('../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="col s12 m6 contIng">
		<div class="row cursorHover">
			<div id="addIngrediente" data-id="${pic.id}" class="col s1 checkbox">
				<span id="${pic.id}" class=""><i id="addIngrediente" data-id="${pic.id}" class="small material-icons">check_box_outline_blank</i></span>
				<span id="${pic.id}${pic.id}" class="hide"><i id="addIngrediente" data-id="${pic.id}" class="small material-icons iconoCheck">check_box</i></span>
			</div>
			<div id="addIngrediente" data-id="${pic.id}" class="col s2 imgCont">
				<img src="${pic.url}" id="addIngrediente" data-id="${pic.id}" class="vegetal" />
			</div>
			<div id="addIngrediente" data-id="${pic.id}" class="col s7 m6 nameCont">
				<p id="addIngrediente" data-id="${pic.id}" class="ingName">${pic.name}</p>
			</div>
			<div id="addIngrediente" data-id="${pic.id}" class="col s2 precioIng">
				<p id="addIngrediente" data-id="${pic.id}" class="ingName">${aPesos(pic.price)}.-</p>
			</div>
		</div>
	</div>`
}