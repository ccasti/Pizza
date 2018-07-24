var yo = require('yo-yo');
var aPesos = require('../../utilities/aPesos');

module.exports = function (pic) {
	return yo`<div class="col s12 m6 contItem">
		<div class="row">
			<div class="col s2 l2 offset-l1 contItem">
				<img src="${pic.url}" class="imagenItem" />
			</div>
			<div class="col s6 l5 col-text">
				<div class="row fila-nombre">
					<div class="col s12">
						<P class="item-text">${pic.name}</p>
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<P class="detalle-text">${pic.content}</p>
					</div>
				</div>
			</div>
			<div class="col s2 contItem">
				<span class="precioItem">${aPesos(pic.price)}.-</span>
			</div>
			<div class="col s2">
				<a class="btn-floating left waves-effect waves-light blue darken-2"><i class="material-icons" id="addItem" data-id="${pic.id}">add</i></a>
			</div>
		</div>
	</div>`
}