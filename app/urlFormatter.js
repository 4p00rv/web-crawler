exports.format = function(link, currentUrl){
	//Link is already in required format.
	if(link.match(/^https?:\/\//g) && link.match(/^https?:\/\//g).length === 1){
		return link;
	}

	var protocol = currentUrl.match(/^https?:\/\//g)[0];
	currentUrl = currentUrl.replace(protocol,"");
	var urlParts = currentUrl.split('/').concat(link.split('/'));
	var domain = urlParts.shift();
	// Remove extra '/' from url
	urlParts = urlParts.filter(function(e){
		return e;
	});

	if(link.startsWith("//")){
		return link.replace("//",protocol);
	}

	if(link.startsWith("/")){
		return protocol + domain + link;
	}

	//checks data/javascript/mailto or any similar type of uri
	var uri = link.match(/^(\w+):/);
	if(uri && (uri[1].toLowerCase() !== "http" || uri[1].toLowerCase() !=="https")){
		return null;
	}

	//convert https://domain.com/abcd/../abcd.jpg to https://domain.com/abcd.jpg
	for(i=0;i<urlParts.length;i++){
		if(i===0 && urlParts[i]===".."){
			urlParts.splice(0,1);
			continue;
		}
		if(urlParts[i]===".."){
			urlParts.splice(i-1,2);
			i=i-2;
		}
	}

	return protocol + domain + "/" + urlParts.join("/");

}