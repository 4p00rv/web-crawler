var expect = require("chai").expect;
var parser = require("../app/parser");

describe("Parses html", function(){
	describe("Converts text to html nodes", function(){
		it("Converts html string to html object", function(){
			var htmlObject = parser.parse("\
				<html>\
				<body></body>\
				</html>\
				");
			expect(typeof htmlObject).to.equal('object');
		});
	});
});