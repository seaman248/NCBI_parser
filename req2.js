//Get some href's form NCBI result of search. Then get abstract from every href's

var request = require('request'); 
var cheerio = require('cheerio'); 

var urlFourSearch = 'http://www.ncbi.nlm.nih.gov/pubmed/?term=sdh';

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
					console.log(abstractText);
				}
			});
		});
	}
});