var expect = require("chai").expect;
var urlFormatter = require("../app/urlFormatter");

describe("Converts relative links to url", function(){
	it("Converts link pointing to base url to url", function(){
		var realtive_url = urlFormatter.format("/abcd.jpg","https://example.com/dir/");
		expect(realtive_url).to.equal("https://example.com/abcd.jpg");
	});
	it("Converts link under a directory to url", function(){
		var realtive_url = urlFormatter.format("abcd.jpg","https://example.com/dir/");
		expect(realtive_url).to.equal("https://example.com/dir/abcd.jpg");
	});
	it("Converts link containing '../' to url", function(){
		var realtive_url = urlFormatter.format("abcd/../../../abcd.jpg","https://example.com/dir/abcd");
		expect(realtive_url).to.equal("https://example.com/abcd.jpg");
	});
	it("returns the link already in correct format", function(){
		var realtive_url = urlFormatter.format("https://example.com/dir/abcd.jpg","https://example.com/dir/abcd");
		expect(realtive_url).to.equal("https://example.com/dir/abcd.jpg");
	});
	it("converts url starting with // to http://", function(){
		var realtive_url = urlFormatter.format("//google.com/dir/abcd.jpg","https://example.com/dir/abcd");
		expect(realtive_url).to.equal("https://google.com/dir/abcd.jpg");
	});
	it("returns null for javascript/data/mailto or any similar type of uris", function(){
		var realtive_url = urlFormatter.format("mailto:alert(1);","https://example.com/dir/abcd");
		expect(realtive_url).to.equal(null);
	});
});