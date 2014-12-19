var getAbstract = require('./abstractor.js'),
	generator = require('./generator.js'),
	fs = require('fs');


getAbstract('cell', function (abstract) {
	console.log(abstract);
})