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
					url: url + "/static.html",
					assets: [
						url + '/css/main.css',
						'http://google.com/some.css',
						url + '/abcd.jpg',
						url + '/static.html/abcd.svg',
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
					url: url + "/page1.html",
					assets: [
						url + '/css/main.css'
					]
				},
				{
					url: url + "/page2.html",
					assets: [
						url + '/css/main.css',
						url + '/page2.html/efgh.jpg'
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
					url: url + "/page3.html",
					assets: [
						url + '/css/main.css'
					]
				},
				{
					url: url + "/page4.html",
					assets: [
						url + '/css/main.css',
						url + '/page4.html/efgh.jpg'
					]	
				}
			]);
			done();
		});
	});

	it("Doesn't scrape the assets from 404 page", function(){
		crawl(url + "/page5.html", function(assets){
			expect(assets).to.deep.equal([
				{
					url: url + "/page5.html",
					assets: [
						url + "/some.mp3",
						url + "/some.mov"
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