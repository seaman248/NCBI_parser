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
						return abstract(null, abstractText);
					}
				});
			});
		}
	});
}

