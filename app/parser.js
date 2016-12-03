var gumbo = require("gumbo-parser");

exports.parse = function(html){
	var fragments = gumbo(html);
	return fragments;
}