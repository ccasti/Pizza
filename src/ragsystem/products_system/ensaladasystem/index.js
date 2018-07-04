var yo = require('yo-yo');

module.exports = function (pic) {
	return yo`<li class="collection-item avatar">
		<img src="${pic.ensaladaurl}" alt="" class="circle">
		<span class="title">${pic.ensaladaname}  $${pic.ensaladaprice}.- ${pic.likes} me gusta</span>
		<p>${pic.ensaladacontent}</p>
		<a href="#!" class="secondary-content"><i class="material-icons">edit</i></a>
	</li>`
}