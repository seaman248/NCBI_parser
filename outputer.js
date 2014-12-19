var getAbstract = require('./abstractor.js'),
	generator = require('./generator.js'),
	fs = require('fs');


// getAbstract('cell', function (err, abstract) {
// 	if (err) console.log(err);
// 	console.log(abstract); 
// });

// generator('inputText.txt', function (wordArr) {
// 	console.log(wordArr);
// });
generator('inputText.txt', function (err, searchWords) {
	for (var i = 20; i < 40; i++) {
		getAbstract(searchWords[i], function (err, abstract) {
			fs.appendFile('output.txt', abstract ,function (err) {
				if (err) console.log(err);
				console.log('OK' +i);
			})
		})
	};
});