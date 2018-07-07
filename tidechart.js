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
    console.log("REFRESH TIME");
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

    var body = '<html><head><meta http-equiv="refresh" content="30" /></head><body><span style="font-size: 55px">Tide Chart for '+todayDisplayString+'</span>\n';

    //add in styles
    body +=
        '<style> \n'+
        'html {\n'+
        ' background-color: #333333; \n'+
        ' color: #efefef; \n'+
        '} \n'+
        '</style>';



    //autorefresh javascript goes here... (try out the meta version)

    //body += '<script type="text/javascript">';
    //body += '</script>';

    body += "<br/><pre><span style='font-size: 35px'>";
    for (var curLineIndex=0;curLineIndex<lines.length;curLineIndex++){
        var curLine = lines[curLineIndex];
        console.log(curLine);
        var lineDisplay = "["+curLine.time+"] "+ curLine.highLowIndicator; //+" "+pad(curLine.feet,6," ")+" ft.";
        body += lineDisplay;
        body += "<br/>";
    }

    //weather widget

    body += "<div style='width: 630px;'><iframe style='display: block;' src='https://cdnres.willyweather.com/widget/loadView.html?id=91277' width='630' height='186' frameborder='0' scrolling='no'></iframe><a style='text-indent: -9999em;position: relative;z-index: 1;height: 20px;display: block;margin: -20px 0 0 0' href='https://www.willyweather.com/nj/monmouth-county/port-monmouth.html' rel='nofollow'>https://www.willyweather.com/nj/monmouth-county/port-monmouth.html</a></div>";




    body += "</span></pre></body></html>";
    // Send the response body as "Hello World"
    response.write(body);

    response.end();
    console.log('response ended.');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

