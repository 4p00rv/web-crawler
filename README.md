# Web-Crawler
Web-crawler using gumbo parser to extract static content from website.

Usage
--------------
Considering you have the latest version of npm installed, execute the following command to install dependencies:

```npm install```


Now you can call the crawler using:

```npm run crawler {url-to-crawl}```

To verify the tests run

```npm test```

You can also require the script in your code and add a call back to process the extracted content.

Example:

```
var crawler = require("path_or_dirname/web-crawler/app/web-crawler");
crawler.crawl("http://example.org",function(content){
	{do something with the content here};
})
```