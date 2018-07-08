var yo = require('yo-yo');
var option = require('./option');

module.exports = function (optt) {
	return yo`<div class="col s12 opt-pizza">
		<ul>
			<li class="itemOpt"><a href="#" class="elegirOpcion" id="${optt.id}">- Selecciona tu ${optt.tipo}<i class="material-icons right">arrow_drop_down</i></a>
				<ul class="list" id="${optt.id}${optt.id}">	
					${optt.items.map(function (item) {
						return option(item);
					})}
				</ul>		
			</li>
		</ul>
	</div>`
}