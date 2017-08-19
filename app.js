var express = require('express');
var app = express();
var dt = require('./test');
var sheduler = require('./Meetingscheduler')
var fs = require('fs');

app.get("/",function(req,res){


fs.readFile('test.txt', function(err, data) {
 
  
    res.send("<h1>hello</h1>"+ dt.myDateTime()+JSON.stringify(sheduler.GetMeetingschedule(data).meetings));
});

});
//global connection -----------------------------

    app.listen(3000, "localhost", function () {
        console.log('Express server listening on port : 3000 or ' + 3000); //+ process.env.PORT
    });

//global connection -------------------------
