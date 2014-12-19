var //getAbstracts = require('./get20abstract.js'),
	async = require('async'),
	fs = require('fs');

module.exports = function(inputTxtFile, doneCb){
	async.waterfall([
		function (cb) {
			fs.readFile(inputTxtFile, function (err, text) {
				if (err) console.log(err);
				cb(null, text.toString())
			});
		},function (inputText, cb) {
			var wArray = inputText.split(' ');
			var cleanArr = [];
			for (var i = 0; i < wArray.length; i++) {
				if(wArray[i].length >= 5){
					cleanArr.push(wArray[i]
						.replace(',', '')
						.replace(')', '')
						.replace('.', '')
						.replace('-', '')
						.replace('(', ''));
				}
			};
			cb(null, cleanArr);
		}],function (err, result) {
			if (err) console.log(err);
			doneCb(null, result);
		});
}