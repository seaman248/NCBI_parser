var https = require('https'),
	async = require('async'),
	fs = require('fs');

//dubug vars
var yaKey = 'trnsl.1.1.20141209T212612Z.19b578890e8a54e3.a219b05632b3e6de201436b7e14dd01bcaf90bd6';
var bigTextLimit = 5;
var outputFile = 'translations.json'

//translate function (Yandex API)
var yaTranslate = function (key, text, lang, callback) {
	var url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?'
		+'key='+key
		+'&text='+text
		+'&lang='+lang
		+'&format='+'plain';
	https.get(url, function (res) {
		var body = '';
		res.on('data', function (data) {
			body += JSON.parse(data.toString()).text;
		});
		res.on('end', function (err) {
			if (err) callback(err, null);
			callback(null, body);
			return body;
		})
	})	
}
//yaTranslate(yaKey, wordsArr[j], 'en-ru', function (err, text) {});

//polyfils
if (![].includes) {
  Array.prototype.includes = function(searchElement/*, fromIndex*/) {
    if (this === undefined || this === null) {
      throw new TypeError('Cannot convert this value to object');
    }
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) k = 0;
    }
    while (k < len) {
      var currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  }
}
async.waterfall([
		function readBigTextFile (doneCB) {
			console.log('Read big text...');
			fs.readFile('output.txt', function (err, text) {
				if (err) console.log(err);
				doneCB(null, text.toString().split('. ', bigTextLimit));
			})
		},
		// function cleanRepeat (dirtyEnArr, doneCB) {
		// 	var cleanRepeatArr = [];
		// 	for (var i = 0; i < dirtyEnArr.length; i++) {
		// 		if(!cleanRepeatArr.includes(dirtyEnArr[i])){
		// 			cleanRepeatArr[i] = dirtyEnArr[i]; 
		// 		}
		// 	};
		// 	doneCB(null, cleanRepeatArr);
		// },
		function resultArrayInitialize (enArr, doneCB) {
			console.log('Array initializating...');
			var resultArrInitializing = [];
			for (var i = 0; i < enArr.length; i++) {
				var wordsArr = enArr[i].split(' ');
				for (var j = 0; j < wordsArr.length; j++) {
					if (wordsArr[j].length >= 5){
						resultArrInitializing.push({
							enW: wordsArr[j],
							ruW: '',
							en: enArr[i],
							ru: '',  
						});
					}
				};
			};
			doneCB(null, resultArrInitializing);
		},
		function translateWords (resArr, doneCB) {
			console.log('Translate words...');
			async.map(resArr, function (item, thisDone) {
				yaTranslate(yaKey, item.enW, 'en-ru', function (err, text) {
					thisDone(null, text);
				});
			}, function (err, translationWords) {
				doneCB(null, resArr, translationWords);
			});			
		},
		function  (resArr, trWarr, doneCB) {
			console.log('Add to result Array');
			for (var i = 0; i < resArr.length; i++) {
				resArr[i].ruW = trWarr[i];
			};
			doneCB(null, resArr);
		},
		function (resArr, doneCB) {
			console.log('All text translate');
			async.map(resArr, function (item, thisDone) {
				yaTranslate(yaKey, item.en, 'en-ru', function (err, ru) {
					thisDone(null, ru);
				});
			}, function (err, translations) {
				doneCB(null, resArr, translations);
			});			
		},
		function (resArr, translations, doneCB) {
			console.log('Add to result Array');
			for (var i = 0; i < resArr.length; i++) {
				resArr[i].ru = translations[i];
			};
			doneCB(null, resArr);
		}
	], function (err, resArr) {
		if (err) console.log(err);
		fs.writeFile(outputFile, JSON.stringify(resArr), function (err) {
			if (err) console.log(err);
			console.log('Done! ' + resArr.length);
		});
});