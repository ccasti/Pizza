var yo = require('yo-yo');

module.exports = function pictureCard (pic) {
	var el;
	function render(picture) {
		return yo`<div class="card horizontal ${picture.liked ? 'liked' : ''}">
			<div class="card-image">
				<img src="${picture.packurl}">
		    </div>
		    <div class="card-stacked">
		        <div class="card-content">
		        	<p>${picture.packcontent}</p>
		        </div>
		        <div class="card-action">
		        	<a class="iconcard left" href="#" onclick=${like.bind(null, true)}><i class="material-icons favorite_border">favorite_border</i></a>
		        	<a class="iconcard left" href="#" onclick=${like.bind(null, false)}><i class="material-icons favorite">favorite</i></a>
		        	<span class="left likes">${picture.likes} me gusta</span>
		        	<span class="left likes blue-text text-darken-2">Valor: $${picture.packprice}</span>
		        	<a class="btn-floating right waves-effect waves-light blue darken-2"><i class="material-icons">add</i></a>
		        </div>
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