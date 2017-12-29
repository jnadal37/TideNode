var http = require('http');

http.createServer(function (request, response) {


    //v1: Minimum Features Posslble:
    //1. load and parse file from NOAA
        //google noaa tide predictions
        //choose state, locality
        //click "click here for annual published tide tables"
        //save in this project as "tidedata.txt"



    //2. determine current date

    //3. show next high tide

    //4. refactor; pull things out into functions/"classes"

    //v2: nicer UI:

        //give week with clickable links to show tides
        //min/max tides for the whole day
        //some nice images

    //v3: extensions:
        //weather?
        //choose tide area?




    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // Send the response body as "Hello World"
    response.end('Tide Chart for [Today]\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');