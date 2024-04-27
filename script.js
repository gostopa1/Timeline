
var fullWidth = window.innerWidth;
var fullHeight = window.innerHeight;

var TimelineEvent = {
    startingDate: 0,
    endingDate: 100,
    importance: 1,
    yLocation: 1,
    text: "PhD",
    category: 1,
    popupText: "I did this and that",
    create: function (eventYLocation=1,startingDate, endingDate, eventText = "An Event",eventPopuptext = "This is what happened", eventCategory = 0)
    {
      const newTimelineEvent = Object.create(this);
      newTimelineEvent.startingDate = startingDate;
      newTimelineEvent.endingDate = endingDate;
      newTimelineEvent.text = eventText;
      newTimelineEvent.popupText = eventPopuptext;
      newTimelineEvent.category = eventCategory;
      newTimelineEvent.yLocation = eventYLocation*50+50;
      return newTimelineEvent;
    },
    'setYLocation': function (newYLocation)
    {
        console.log("Got in here");
        this.yLocation=newYLocation;
        console.log(this.yLocation);
    }
};

var startingDate = "2010-01-01";
var endDate = "2024-07-01";
//var exampleDate = "2024-07-01T20:23:01.804Z"
//var date = "2012-01-01"

// Handling dates
function dateToInt(dateStr) 
{
    return Date.parse(dateStr);
    //return new Date(dateStr).getTime();
}


function getPixelFromDate(inputDate)
{
    var output = ((dateToInt(inputDate)-dateToInt(startingDate))/(dateToInt(endDate)-dateToInt(startingDate)))*fullWidth;
    return output;
}

var colors = ["#73AD21","#73FDAA","#0000FF","#00FF00"];

var EventList = 
[
TimelineEvent.create(1, "2005-09-01", "2011-12-11", "Diploma in Computer Engineering","University of Patras"), 
TimelineEvent.create(2, "2013-09-01", "2017-06-01", "Bachelor in Music Technology","Sibelius Academy"), 
TimelineEvent.create(3, "2010-09-01", "2024-01-29", "PhD in Computational Neuroscience","Aalto University"), 
TimelineEvent.create(4, "2016-07-04", "2016-12-15", "Military Service", "Vekaranjarvi",1),
TimelineEvent.create(5, "2023-10-25", "2094-12-15", "A baby was born", "Filippos", 2),
TimelineEvent.create(1, "2018-01-08", "2094-12-15", "Neural DSP","Aalto University",3), 
TimelineEvent.create(7, "2023-05-13", "2023-05-13", "AES presentation","Machine Learning for Guitar Amplifier modeling",3), 
]



function addTimelineEvent(timelineEvent)
{
    var text = "Placeholder Text"
    var elem = document.createElement("div");
    
    elem.setAttribute("id", "rcorners1");
    elem.setAttribute("class", "popup");
    elem.style.backgroundColor = colors[timelineEvent.category];
    var popupSpan = document.createElement("span");
    popupSpan.setAttribute("class", "popuptext");
    popupSpan.setAttribute("id", "myPopup");  
    popupSpan.innerHTML=timelineEvent.popupText;
    
    elem.textContent = timelineEvent.text;
    elem.style.position = "absolute";
    //elem.style.left = timelineEvent.startingDate  + "px";
    //elem.style.width = timelineEvent.endingDate - timelineEvent.startingDate  + "px";
    
    elem.style.left = getPixelFromDate(timelineEvent.startingDate)  + "px";
    elem.style.width = getPixelFromDate(timelineEvent.endingDate) - getPixelFromDate(timelineEvent.startingDate)  + "px";
    console.log(elem.style.left);
    console.log(elem.style.width);
    elem.style.top = timelineEvent.yLocation + "px";
    
    elem.appendChild(popupSpan);

    document.body.appendChild(elem);
}

// Populate the timeline based on the events in the EventList
EventList.forEach(
    te => 
    {
        addTimelineEvent(te);
    }
)

// Adding a mouse click listener to toggle visibility on for each element of .popup class
const myElements = document.querySelectorAll(".popup")
myElements.forEach(
    el => {
    el.addEventListener("click", () => {
    el.querySelector("#myPopup").classList.toggle("show");    
    }
    )
})

