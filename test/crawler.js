var expect = require("chai").expect;
var server = require("../app/server");
var crawl = require("../app/web-crawler").crawl;
var url = "http://localhost:8080";

describe("Test crawler", function(){
	before(function(done){
		server.listen();
		done();
	});

	it("Extracts assets from static html", function(done){
		crawl(url + "/static.html", function(assets){
			expect(assets).to.deep.equal([
				{
					url: "http://localhost:8080/static.html",
					assets: [
						'http://localhost:8080/css/main.css',
						'http://google.com/some.css',
						'http://localhost:8080/abcd.jpg',
						'http://localhost:8080/static.html/abcd.svg',
						'https://yahoo.com/something.pdf'
					]
				}
			]);
			done();
		});
	});

	it("Extracts assets from linked html files", function(done){
		crawl(url + "/page1.html", function(assets){
			expect(assets).to.deep.equal([
				{
					url: "http://localhost:8080/page1.html",
					assets: [
						'http://localhost:8080/css/main.css'
					]
				},
				{
					url: "http://localhost:8080/page2.html",
					assets: [
						'http://localhost:8080/css/main.css',
						'http://localhost:8080/page2.html/efgh.jpg'
					]	
				}
			]);
			done();
		});
	});

	it("Extracts assets from html files linked to each other", function(done){
		crawl(url + "/page3.html", function(assets){
			expect(assets).to.deep.equal([
				{
					url: "http://localhost:8080/page3.html",
					assets: [
						'http://localhost:8080/css/main.css'
					]
				},
				{
					url: "http://localhost:8080/page4.html",
					assets: [
						'http://localhost:8080/css/main.css',
						'http://localhost:8080/page4.html/efgh.jpg'
					]	
				}
			]);
			done();
		});
	});

	after(function(){
		server.close();
	})
});