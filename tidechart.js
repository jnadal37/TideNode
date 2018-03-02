/**********REQUIRES**********************/
var http = require('http');
/*
    issues with current jquery being able to use current jsdom. jsdom broke integration.
 */
//const jsdom = require('jsdom/lib/old-api');

/**********VARS**********************/
var dataFile = "./tidedata.txt";
//var $;
var isCompletedParsing = false;

/*********ENTITIES*******************/
function TideLine(date, day, time, feet, cm, highLowIndicator){
    this.date = date;
    this.day = day;
    this.time = time;
    this.feet = feet;
    this.cm = cm;
    this.highLowIndicator = highLowIndicator;
}

var context = {
    renderedOutput : null,
};


//WIRE UP JQUERY:
//jsdom.env("", function(err, window) {
//    if (err) {
//        console.error(err);
//        return;
//    }
//    $ = require("jquery")(window);
    //$("<h1>test passes</h1>").appendTo("body");
    //console.log($("body").html());
//});

/***************HELPER FUNCTIONS*********************/
function pad (str, max, whichChar) {
    str = str.toString();
    return str.length < max ? pad(whichChar + str, max) : str;
}

//https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
function setTodayFileLines(file){
    console.log("onGetFileLinesEnter")
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file)
    });

    lineReader.on('line', onLineRead);
    lineReader.on('close', onFileReadComplete);
    console.log("onGetFileLinesExit")
}

var lines=[];
function onLineRead(line) {
    if(line.indexOf(todayString) == 0) {
        //fix problem where tabs are inconsistent. tab == 4 spaces. then we can rely on absolute positioning
        line = line.replace(/\t/g, '    ');
        var lineEntity = parseLine(line);
        lines.push(lineEntity);
        console.log('Line from file:', line);
    }
}

function parseLine(line){
    var date =  line.substring(0,10).trim();
    var day = line.substring(14, 17).trim();
    var time= line.substring(21,29).trim();
    var ft = line.substring(33,39).trim();
    var cm=line.substring(45,52).trim();
    var highLowIndicator=line.substring(line.length-1,line.length); //last character

    var lineEntity = new TideLine(date, day, time, ft, cm, highLowIndicator);
    return lineEntity;
}


var todayString = "";
var todayDisplayString = "";
function setTodayString(){
    if (todayString==""){
        var today = new Date();
        todayString = today.getFullYear().toString()+
        "/"+
            pad((today.getMonth()+1).toString(),2,"0")
            +"/"+
            pad(today.getDate(),2,"0");
        console.log(todayString);

        todayDisplayString = (today.getMonth()+1).toString()+"/"+
            today.getDate().toString()+"/"+
            today.getFullYear().toString();
    }
}



function onFileReadComplete(){
    console.log('completed reading file.');
    console.log('total lines found for today: '+lines.length);
    isCompletedParsing = true;
}









/*************** MAIN LOGIC ******************************/
//v1: Minimum Features Possible:
//1. figure out today's date
setTodayString();

//2. load and parse file from NOAA
//google noaa tide predictions
//choose state, locality
//click "click here for annual published tide tables"
//save in this project as "tidedata.txt"
if (lines.length == 0){
    console.log('setting file lines.');
    setTodayFileLines(dataFile);
}

http.createServer(function (request, response) {

    console.log('wait for file read complete.');
    while (!isCompletedParsing){
    //block until file is complete.
    }

    console.log('unblocking UI.');

    //keep in mind this is async. we need to wait until lines are done.... or do things more reactively.


    //var x = lines;
    //var lineTest = 5;

    //console.log(lines);

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
    response.writeHead(200, {'Content-Type': 'text/HTML'});

    var body = '<html><body>Tide Chart for '+todayDisplayString+'\n';

    //autorefresh javascript goes here...

    body += "<br/><pre>";
    for (var curLineIndex=0;curLineIndex<lines.length;curLineIndex++){
        var curLine = lines[curLineIndex];
        console.log(curLine);
        var lineDisplay = "["+curLine.time+"] "+ curLine.highLowIndicator+" "+pad(curLine.feet,6," ")+" ft.";
        body += lineDisplay;
        body += "<br/>";
    }
    body += "</pre></body></html>";
    // Send the response body as "Hello World"
    response.write(body);

    response.end();
    console.log('response ended.');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

