var expect = require("chai").expect;
var parser = require("../app/parser");
var extractor = require("../app/extractor");

describe("Extracts content from parsed html", function(){
	it("Extracts content from parsed html and returns links and assets", function(){
		var htmlObject = parser.parse("\
			<html>\
				<body>\
					<a href='/abcd'>Abcd</a>'\
					<img src='/abcd.jpg'>\
					<script src='/abcd.js'></script>\
				</body>\
			</html>\
			");
		var content = extractor.extract(htmlObject, "https://example.com/dir");
		expect(content).to.deep.equal({ links: [ 'https://example.com/abcd' ], assets: [ 'https://example.com/abcd.jpg', 'https://example.com/abcd.js' ] });
	});

	it("Extracts content from parsed html and returns links which belong to same domain", function(){
		var htmlObject = parser.parse("\
			<html>\
				<body>\
					<a href='/abcd'>Abcd</a>'\
					<a href='https://google.com/abcd'>Abcd</a>'\
					<img src='/abcd.jpg'>\
					<script src='/abcd.js'></script>\
				</body>\
			</html>\
			");
		var content = extractor.extract(htmlObject, "https://example.com/dir");
		expect(content).to.deep.equal({ links: [ 'https://example.com/abcd' ], assets: [ 'https://example.com/abcd.jpg', 'https://example.com/abcd.js' ] });
	});

	it("extracting assets from localhost domain", function(){
		var htmlObject = parser.parse("\
			<html>\
				<body>\
					<a href='/abcd'>Abcd</a>'\
					<a href='https://localhost:3000/efgh'>Abcd</a>'\
					<img src='/abcd.jpg'>\
					<script src='/abcd.js'></script>\
				</body>\
			</html>\
			");
		var content = extractor.extract(htmlObject, "https://localhost:3000");
		expect(content).to.deep.equal({ links: [ 'https://localhost:3000/abcd','https://localhost:3000/efgh' ], assets: [ 'https://localhost:3000/abcd.jpg', 'https://localhost:3000/abcd.js' ] });
	});
});