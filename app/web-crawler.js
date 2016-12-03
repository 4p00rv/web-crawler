var request = require("request"),
	parser = require("./parser"),
	extractor = require("./extractor"),
	extractedAssets = {};

exports.crawl = function(url, callback) {
	var visitedPages = {}
	linksToCrawl = [],
	extractedContent = [];
	if(!url) {
		console.log("Usage: npm run crawler {url-to-crawl}");
		return;
	}

	linksToCrawl.push(url);
	
	start();

	function start() {
		if(linksToCrawl.length === 0){
			if(callback)
				callback(extractedContent);
			else
				console.log(extractedContent);

			return;
		}
		var currentUrl = linksToCrawl.shift();
		requestPage(currentUrl);
	}

	function requestPage(url) {
		if(visitedPages[url] === true){
			start();
			return;
		}
		request(url, function(error, response, body){
			visitedPages[url] = true;
			var contentType = response && response.headers['content-type'].split(";")[0];
			if(!error && response.statusCode === 200 && contentType === "text/html"){
				var htmlObject = parser.parse(body);
				var content = extractor.extract(htmlObject, url);
				if(content.links )
					linksToCrawl = linksToCrawl.concat(content.links);
				if(content.assets)
					extractedContent.push({url:url, assets:content.assets});
				//console.log(extractedContent[extractedContent.length-1]);
				start();
			}
			else {
				start();
			}
		});
	}
}

require("make-runnable");