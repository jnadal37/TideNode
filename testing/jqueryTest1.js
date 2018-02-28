 //const jsdom = require("jsdom"); //doesn't work, because newer jsdom doesn't work with current jquery.
const jsdom = require('jsdom/lib/old-api');
const { JSDOM } = jsdom;

//const dom = new JSDOM(`<!DOCTYPE html><p>Hello world 2</p>`);

jsdom.env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);


    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());


});

