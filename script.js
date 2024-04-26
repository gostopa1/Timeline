

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
  
var EventList = 
[
TimelineEvent.create(1, 10, 300, "Diploma in Computer Engineering","University of Patras"), 
TimelineEvent.create(2, 100, 300, "Bachelor in Music Technology","Sibelius Academy"), 
TimelineEvent.create(3, 50, 400, "PhD in Computational Neuroscience","Aalto University",2), 
TimelineEvent.create(4, 100, 300,"Military Service", "Vekaranjarvi"),
TimelineEvent.create(5, 400, 600,"A baby was born", "Filippos", 1),
]
var te1 = TimelineEvent.create(10, 15);

var fullWidth = window.innerWidth;
var fullHeight = window.innerHeight;
var colors = ["#73AD21","#73FDAA","#0000FF"];

function addTimelineEvent(timelineEvent)
{
    var text = "Xontrompigoulis"
    var elem = document.createElement("div");
    
    elem.setAttribute("id", "rcorners1");
    elem.setAttribute("class", "popup");
    //elem.style.backgroundColor = "te";
    elem.style.backgroundColor = colors[timelineEvent.category];
    var popupSpan = document.createElement("span");
    popupSpan.setAttribute("class", "popuptext");
    popupSpan.setAttribute("id", "myPopup");
    
    
    popupSpan.innerHTML=timelineEvent.popupText;
    
    elem.textContent = timelineEvent.text;
    elem.style.position = "absolute";
    elem.style.left = timelineEvent.startingDate  + "px";
    elem.style.top = timelineEvent.yLocation + "px";
    elem.style.width = timelineEvent.endingDate - timelineEvent.startingDate  + "px";
    elem.appendChild(popupSpan);

    document.body.appendChild(elem);
}

EventList.forEach(
    te => 
    {
        addTimelineEvent(te);
    }
)
const myElements = document.querySelectorAll(".popup")
myElements.forEach(
    el => {
    el.addEventListener("click", () => {
    el.querySelector("#myPopup").classList.toggle("show");    
    }
    )
})

