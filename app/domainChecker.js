// Note: Doesn't support SLD
exports.domainCheck = function(url1, url2){
	var domain1 = url1.replace(url1.match(/^https?:\/\//)[0],"").split("/").shift();
	var domain2 = url2.replace(url2.match(/^https?:\/\//)[0],"").split("/").shift();
	//Removing subdomain parts and also the ports from domains.
	domain1 = domain1.split(":")[0].split(".");
	domain1 = domain1[domain1.length-2] + domain1[domain1.length-1];

	domain2 = domain2.split(":")[0].split(".");
	domain2 = domain2[domain2.length-2] + domain2[domain2.length-1];
	
	return domain1 === domain2;
}