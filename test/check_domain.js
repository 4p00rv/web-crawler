var expect = require("chai").expect;
var domainChecker = require("../app/domainChecker").domainCheck;

describe("Checks if domains are same", function(){
	it("Checks if one link is a subdomain of another", function(){
		var isSameDomain = domainChecker("https://example.com","https://some.example.com");
		expect(isSameDomain).to.equal(true);
	});
	it("Checks if link is the domain of another link on another subdomain", function(){
		var isSameDomain = domainChecker("https://abcd.example.com","https://example.com");
		expect(isSameDomain).to.equal(true);
	});
	it("Checks if both the subdomains belong to same domain", function(){
		var isSameDomain = domainChecker("https://abcd.example.com","https://some.example.com");
		expect(isSameDomain).to.equal(true);
	})
});

describe("Checks if two urls do not belong to same domain", function(){
	it("different domains", function(){
		var isSameDomain = domainChecker("https://abcd.example.com","https://google.com");
		expect(isSameDomain).to.equal(false);
	});
	it("same SLD but different TLD", function(){
		var isSameDomain = domainChecker("https://abcd.example.net","https://example.com");
		expect(isSameDomain).to.equal(false);
	});
});