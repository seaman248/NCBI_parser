var //getAbstracts = require('./get20abstract.js'),
	async = require('async'),
	fs = require('fs');

module.exports = function(doneCb){
	async.waterfall([
		function (cb) {
			fs.readFile('inputText.txt', function (err, text) {
				if (err) console.log(err);
				cb(null, text.toString())
			});
		},function (inputText, cb) {
			var wArray = inputText.split(' ');
			cb(wArray.map(function (item) {
				if(item.length >=5) return item.replace(',', '').replace(')', '').replace('.', '').replace('(', ''); 
				//Возвращаем строки более 5 символов в длину и без лишних символов
				else return null;
				//А если они меньше 5 символов, то null
			})); 
		}],function (err, result) {
			if (err) console.log(err);
			//console.log(result);
			doneCb(result);
		});
}