var request = require('request'); 
var cheerio = require('cheerio');
var fs = require('fs');



module.exports = function(searchTerm, abstract){
	var urlFourSearch = 'http://www.ncbi.nlm.nih.gov/pubmed/?term='+searchTerm;
	request(urlFourSearch, function (err, res, body) {
		if (err){console.log(err);}
		else{
			$ = cheerio.load(body);
			$('p.title a').each(function(){
				var urlEnd = $(this).attr('href');

				request('http://www.ncbi.nlm.nih.gov'+ urlEnd, function(err, res, body){
					if(err){console.log(err);}
					else{
						$ = cheerio.load(body);
						var abstractText = $('abstracttext').text();
						return abstract(abstractText);
					}
				});
			});
		}
	});
}

<<<<<<< HEAD:abstractor.js
=======
get20Abstract(process.argv[2], function(text){
	fs.appendFile('abstracts.txt', text, function(err){
		if(err){console.log(err);}
		else{
			console.log('done');
		}
	});
});
>>>>>>> 78cd49dae96e34f8830fd57c0dd75826d0048e73:get20abstract.js
