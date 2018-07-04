var yo = require('yo-yo');
var option = require('./option');

module.exports = function (optt) {
	return yo`<div class="input-field col s12 opt-pizza">
		<select>
			<option value="" disabled selected>${optt.opttipo}</option>
			${optt.optname.map(function (item) {
				return option(item);
			})}
		</select>
	</div>`
}









