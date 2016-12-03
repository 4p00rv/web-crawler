var urlFormatter = require("./urlFormatter");
var domainCheck = require("./domainChecker").domainCheck;
exports.extract = function(htmlObject, currentUrl) {
	var nodes = [htmlObject.root],
		links = [],
		assets = [];

	var validExtensions = {
		"jpg": true, "png": true, "bmp": true, "png": true, "svg": true, "ico": true, "jpeg": true, "jif": true, 
		"webm": true, "ogg": true, "mp4": true, "mp3": true, "wav": true, "swf": true, "css": true, "js": true, "pdf":true
	}
	while(nodes.length > 0){
		var currentNode = nodes.shift();

		var attr = currentNode.attributes && currentNode.attributes.find(function(attr){
			return (attr.name==='href' || attr.name === 'src') && attr;
		});

		if(attr){
			var fileExtension = attr.value && attr.value.split("?")[0].split("#")[0].match(/\.[a-z0-9]+$/i);
			fileExtension = fileExtension && fileExtension[0].replace(".","");
			//if validExtention add to assets
			var link = urlFormatter.format(attr.value, currentUrl);
			if(validExtensions[fileExtension]){
				link && assets.push(link);
			} else{
				link && domainCheck(currentUrl,link) && links.push(link);
			}
		}
		/*
		if(currentNode.nodeName === 'a'){
			if(currentNode.attributes) {
				var attr = currentNode.attributes.find(function(attr){
					return attr.name==='href' && attr;
				});

				if(attr){
					var linkToBeAdded = urlFormatter.format(attr.value, currentUrl);
					domainCheck(currentUrl,linkToBeAdded) && links.push(linkToBeAdded);
				}
			}
		} else if(currentNode.nodeName==='script' || currentNode.nodeName==='img'){
			var attr;
			if(currentNode.attributes)
				attr = currentNode.attributes.find(function(attr){
						return attr.name==='src' && attr;
				});
			 attr && assets.push(urlFormatter.format(attr.value, currentUrl));
		} else if(currentNode.nodeName==='link'){
			var attr;
			if(currentNode.attributes)
				attr = currentNode.attributes.find(function(attr){
						return attr.name==='href' && attr;
				});
			 attr && assets.push(urlFormatter.format(attr.value, currentUrl));
		}*/
		currentNode.childNodes && currentNode.childNodes.forEach(function(elem){
			nodes.push(elem);
		});
	}
	return {links:links,assets:assets};
};