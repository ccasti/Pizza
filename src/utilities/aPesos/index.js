var wNumb = require('./wNumb');

module.exports = function (val) {
	var formatoPesos = wNumb({
		decimals: 0,
		thousand: '.',
		prefix: '$ ',
	});
	
	return formatoPesos.to(val);
}