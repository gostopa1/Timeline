
### Timeline

An implementation for a timeline to show events and further details on a "timely" manner ;).

Check the `events.csv` for the format of the events. 
Check the [demo](https://gotsopoulos.com/Timeline/demo/).

### Use your own data

The timeline gets the data from a CSV file called `events.php`. The file uses the pipe character (`|`) as a delimiter instead of the usual comma (`,`). The reason is to allow description text to use commas as normal.

The first row of the PHP gives away the data that each event requires:
`Starting Date|Ending Date|Importance|Line|Category|Title|Description`

#### What each field does
- `Starting Date`: The beginning of an event in `YYYY-MM-DD` format. If there is no `Ending Date` the event is considered momentary and represented with a dot
- `Ending Date`: The ending date of each event. It can be a date in `YYYY-MM-DD` format or instead it can be set to `tomorrow` to extend up to current date
- `Importance`: The importance of the event is some integer (typically from 0 to 10) which controls the size of the line or dot as well as the font size. 
- `Line`: In which line to show the event within the category. This is used to provide flexibility for visualization to avoid overlapping events showing on top of each other
- `Category`: Any abstract category name you might want, e.g. `Work` or `Education`. All events with the same category field will be added to the same section
- `Title`: The title of the event that will be shown on the timeline
- `Description`: The text that will be shown in the popup when the event is clicked. It can also use HTML code to show images or hyperlinks

### ToDos

- [x] Control time axis only by year. 
- [x] Control text size based on importance as well  
- [x] Set color for each category?  
- [x] Make sure texts do not overlap  
- [x] Manipulate dot size based on importance category
- [x] Change font to monospace
- [x] Allow today as an option on end date and stretch line till the end of the timeline
- [x] Make popup appear lower or maybe under the line? Now showing more in the center
- [x] Adjust popup background color to properly show dark blue links
- [x] Change CSV delimiter to allow also use of commas
- [x] Clicking on a category title contracts and expands the section
- [x] Reduce space between sections when contracting
- [x] Adjust colours per category (add more colors to the list) and apply also to momentary events
- [x] Add indication whether a section is expanded or not.
- [x] Remove white border from momentary events 
- [X] Write dates in European format in the popup?  
- [ ] Adjust width to screen size  
- [ ] Semi-Bug: When scrolled down and collapsing a section the positions are changing
