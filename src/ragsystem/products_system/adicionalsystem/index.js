var yo = require('yo-yo');

module.exports = function (pic) {
	return yo`<li class="collection-item avatar">
		<img src="${pic.adicionalurl}" alt="" class="circle">
		<span class="title">${pic.adicionalname}  $${pic.adicionalprice}.- ${pic.likes} me gusta</span>
		<p>${pic.adicionalcontent}</p>
		<a href="#!" class="secondary-content"><i class="material-icons">edit</i></a>
	</li>`
}