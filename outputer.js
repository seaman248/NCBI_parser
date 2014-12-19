var getAbstract = require('./abstractor.js'),
	generator = require('./generator.js'),
	fs = require('fs'),
	async = require('async');


// getAbstract('cell', function (abstract) {
// 	console.log(abstract); 
// })

// generator('inputText.txt', function (wordArr) {
// 	console.log(wordArr);
// });

generator('inputText.txt', function (searchWords) {
	async.map(searchWords, function (item, cb) {
		getAbstract(item, function (abstract) {
			cb(abstract);
		});
	}, function (err, result) {
		console.log(result);
	});
});