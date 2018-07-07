var yo = require('yo-yo');
var option = require('./option');

module.exports = function (optt) {
	return yo`<div class="col s12 opt-pizza">
		<ul>
			<li class="itemOpt">${optt.tipo}
				<ul>	
					${optt.items.map(function (item) {
						return option(item);
					})}
				</ul>		
			</li>
		</ul>
	</div>`
}
