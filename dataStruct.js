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
      newTimelineEvent.yLocation = eventYLocation*50+500;
      return newTimelineEvent;
    },
    'setYLocation': function (newYLocation)
    {
        console.log("Got in here");
        this.yLocation=newYLocation;
        console.log(this.yLocation);
    }
};
