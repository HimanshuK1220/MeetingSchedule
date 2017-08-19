var moment = require('moment');
var MeetingModel = require('./Meeting.js');
var map = require('hashmap');
var arraylist = require('arraylist');
// Instantiate Meeting:
let lmap = new map();
class MeetingsSchedule {
    constructor() {
        
    }
}

MeetingsSchedule.GetMeetingschedule = function (data) {
    if(!data)
        {
            console.log('Employee has requested for booking is not a valid input'); 
        return "";
        
        }

        var splitData = data.toString().split('\n')
        var officeHoursTime = splitData[0].split(" ");
        var officeStartTime =   moment(officeHoursTime[0].toString().substr(0,4),'HHmm');
        var  officeFinishTime = moment(officeHoursTime[1].toString().substr(0,4),'HHmm');
       
       
        for (var i = 1; i < splitData.length; i = i + 2) {
           
            //Array of meeting Slots
            if(splitData[i + 1])
                {
                            var meetingSlotRequest = splitData[i + 1].toString().split(' ');
                            
                            var meetingDate = moment(meetingSlotRequest[0].toString()).toDate();
                            
                            var meeting = extractMeeting(splitData[i],officeStartTime, officeFinishTime, meetingSlotRequest);

                            if (meeting != null) {
                             
                                if (lmap.get(meetingDate)) {

                                
                                  var list = lmap.get(meetingDate);
                                console.log("Length"+list.length);
                                  for(var j = 0; j<=list.length;j++)
                                    {
                                        var item = list.get(j);
                                        console.log("item"+item.meetingStartTime.diff(meeting.meetingStartTime));
                                        if(item.meetingStartTime.diff(meeting.meetingStartTime) == 0 && item.meetingFinishTime.diff(meeting.meetingFinishTime) == 0)
                                            {
                                                console.log("Remove from array");
                                    lmap.get(meetingDate).remove(j);
                                    lmap.get(meetingDate).add(meeting);
                                    break;
                                            }
                                    }

                                } else {
                                    var meetings = new  arraylist();
                                    meetings.add(meeting);
                                    
                                    lmap.set(meetingDate, meetings);
                                    //console.log("Set if not Exist"+meeting.meetingStartTime);
                                }
                            }
                        }
                    }

                 var mettingscd =   new MeetingsSchedule();
        return mettingscd= {officeStartTime:officeStartTime, officeFinishTime:officeFinishTime,
                        meetings:lmap};

};

function  extractMeeting(requestLine, officeStartTime,officeFinishTime, meetingSlotRequest) {
var employeeRequest = requestLine.split(' ');

var employeeId = employeeRequest[2];

var meetingStartTime = moment(meetingSlotRequest[1].toString(),'HH:mm');
//
var  meetingFinishTime = moment(meetingStartTime).add(meetingSlotRequest[2].substr(0,1).toString(),'h');
console.log("Time"+meetingSlotRequest[1].toString()+"Slot"+meetingSlotRequest[2].substr(0,1).toString()+"meetingStartTime"+meetingStartTime.format('HH:mm')+"meetingFinishTime"+meetingFinishTime.format('HH:mm'))
var s =meetingTimeOutsideOfficeHours(officeStartTime, officeFinishTime,
    meetingStartTime, meetingFinishTime);
 
if (s) {
   console.log("EmployeeId:: " + employeeId
            + " has requested booking which is outside office hour.");
    return null;
} else {
    var meetting = new MeetingModel();
    console.log("----------Employee id"+employeeId+"STime"+meetingStartTime.format('HH:mm')+"Last"+meetingFinishTime.format('HH:mm'));
    return  Meeting = {EmployeeId:employeeId,meetingStartTime: meetingStartTime,meetingFinishTime: meetingFinishTime};

}
}

function  meetingTimeOutsideOfficeHours(officeStartTime, officeFinishTime, meetingStartTime, meetingFinishTime) {
    console.log("officeStartTime"+officeStartTime.format('HH:mm')+"officeFinishTime"+officeFinishTime.format('HH:mm')+"meetingStartTime"+meetingStartTime.format('HH:mm')+"meetingFinishTime"+meetingFinishTime.format('HH:mm'));
    
return meetingStartTime.isBefore(officeStartTime)
        || meetingStartTime.isAfter(officeFinishTime)
        || meetingFinishTime.isAfter(officeFinishTime)
        || meetingFinishTime.isBefore(officeStartTime);
}
module.exports = MeetingsSchedule;