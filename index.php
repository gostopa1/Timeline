<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Modern Timeline</title>
<style>
    body {
        margin: 0;
        background: #121212;
        color: #f0f0f0;
        font-family: monospace;
        overflow: hidden;
    }
    #wrapper {
        position: absolute;
        top: 0;
        bottom: 40px; /* Leave room for time axis */
        left: 0;
        right: 0;
        overflow: auto;
    }
    #timeline-container {
        position: relative;
    }
    .category {
        position: relative;
        margin-bottom: 100px;
    }
    .category-title {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0;
        cursor: pointer;
    }
    .event {
        position: absolute;
        cursor: pointer;
    }
    .bar {
        border-radius: 5px;
        background-color: #4caf50;
    }
    .moment {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #e91e63;
        border: 2px solid white;
    }
    .title {
        position: absolute;
        top: -20px;
        font-weight: bold;
        white-space: nowrap;
    }
    .events-wrapper {
        position: relative;
    }
    #time-axis-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        background: #1e1e1e;
        border-top: 1px solid #555;
        overflow: hidden;
    }
    #time-axis {
        position: absolute;
        height: 100%;
    }
    .tick {
        position: absolute;
        top: 10px;
        border-left: 1px solid #777;
        height: 20px;
        color: #aaa;
        font-size: 12px;
        white-space: nowrap;
        padding-left: 5px;
    }
    #popup {
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -30%);
        background: #222;
        padding: 20px;
        border: 1px solid #555;
        border-radius: 10px;
        display: none;
        z-index: 100;
        max-width: 400px;
        box-shadow: 0 0 20px rgba(0,0,0,0.8);
    }
    #popup-close {
        float: right;
        cursor: pointer;
        font-weight: bold;
        color: #aaa;
    }
</style>
</head>
<body>
    <h1>Timeline</h1>

<div id="wrapper">
    <div id="timeline-container"></div>
</div>

<div id="time-axis-wrapper">
    <div id="time-axis"></div>
</div>

<div id="popup">
    <span id="popup-close">[X]</span>
    <h3 id="popup-title"></h3>
    <p id="popup-time"></p>
    <p id="popup-desc"></p>
</div>

<script>
let pixelsPerDay = 0.2;
let minDate, maxDate, totalDays;

let categoryColours=['#f00','#00f','#0f0','#3ff','#4f4']
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('timeline-container');
    const timeAxis = document.getElementById('time-axis');
    const wrapper = document.getElementById('wrapper');
    const timeAxisWrapper = document.getElementById('time-axis-wrapper');

    fetch('load_events.php')
    .then(res => res.json())
    .then(data => {
        const categories = {};
        data.forEach(e => {
            if (!categories[e.Category]) categories[e.Category] = [];
            categories[e.Category].push(e);
        });

        let allDates = [];
        data.forEach(e => {
            allDates.push(new Date(e['Starting Date']));
            if (e['Ending Date']){
                if (e['Ending Date']=="today") allDates.push(new Date(Date.now()));
                else allDates.push(new Date(e['Ending Date']));
            }
        });
        minDate = new Date(Math.min(...allDates));
        minDate.setDate(minDate.getDate()+365*1.5); // Add one 1.5 year to offset
        maxDate = new Date(Math.max(...allDates));
        totalDays = Math.ceil((maxDate - minDate) / (1000 * 3600 * 24));
        buildTimeline(categories);
        drawAxis();
    });

    function buildTimeline(categories) {
        container.innerHTML = '';
        let offset_from_top = 80;
        let cat_ind = 0;
        for (let cat in categories) {
            const catDiv = document.createElement('div');
            catDiv.className = 'category';
            catDiv.style.top = offset_from_top + 'px';
            container.appendChild(catDiv);

            const title = document.createElement('div');
            title.className = 'category-title';
            title.textContent = cat;
            catDiv.appendChild(title);

            const eventsWrapper = document.createElement('div');
            eventsWrapper.className = 'events-wrapper';
            catDiv.appendChild(eventsWrapper);

            const events = categories[cat].sort((a,b)=> new Date(a['Starting Date'])-new Date(b['Starting Date']));
            const layers = [];

            events.forEach(e => {
                const start = new Date(e['Starting Date']);

                if (e['Ending Date']=="today") var end = new Date(Date.now());
                else var end = e['Ending Date'] ? new Date(e['Ending Date']) : null;

                const startOffset = (start - minDate)/(1000*3600*24) * pixelsPerDay;

                let layer = e['Line'];

                const eDiv = document.createElement('div');
                eDiv.className = 'event';
                eDiv.style.left = (startOffset + 150) + 'px';
                eDiv.style.top = (layer * 50 + 40) + 'px';

                if (end) {
                    const dur = (end - start)/(1000*3600*24) * pixelsPerDay;
                    const bar = document.createElement('div');
                    bar.style.backgroundColor = categoryColours[cat_ind];
                    bar.className = 'bar';
                    bar.style.width = dur + 'px';
                    bar.style.height = (parseInt(e.Importance) + 4) + 'px';
                    eDiv.appendChild(bar);
                } else {
                    const dot = document.createElement('div');
                    dot.className = 'moment';
                    dot.style.width = parseInt(e.Importance) + 4 + 'px';
                    dot.style.height = parseInt(e.Importance) + 4 + 'px';

                    dot.style.backgroundColor = categoryColours[cat_ind];
                    eDiv.appendChild(dot);
                }

                const title = document.createElement('span');
                title.className = 'title';
                //Adjust font size based on importance
                title.style.fontSize = parseInt(e.Importance) + 12 + 'px';
                title.textContent = e.Title;
                eDiv.appendChild(title);

                eDiv.addEventListener('click', (evt)=>{
                    evt.stopPropagation();
                    openPopup(e);
                });
                eventsWrapper.appendChild(eDiv);
            });

            // Toggle behavior
            title.addEventListener('click', () => {
                if (eventsWrapper.style.display === 'none') {
                    eventsWrapper.style.display = 'block';
                } else {
                    eventsWrapper.style.display = 'none';
                }
            });
            const category_offset = 40;
            offset_from_top += (layers.length*50) + category_offset;
            cat_ind+=1;
        }
        container.style.height = offset_from_top + 'px';
    }

    function drawAxis() {
        timeAxis.innerHTML = '';
        timeAxis.style.width = (totalDays * pixelsPerDay + 300) + 'px';

        for (let y=2005; y<=2035; y+=1) 
            { 
            const date = new Date(y,0);
            d = Math.ceil((date - minDate) / (1000 * 3600 * 24));   
            const tick = document.createElement('div');
            tick.className = 'tick';
            tick.style.left = (d * pixelsPerDay + 150) + 'px';
            var tempYear = date.toISOString().split('T')[0].split('-')[0];
            
            tick.innerHTML = parseInt(tempYear)+1; // Offset by one year to show properly
            timeAxis.appendChild(tick);
        }
    }

    // Sync time axis horizontal scroll
    wrapper.addEventListener('scroll', () => {
        timeAxis.style.left = -wrapper.scrollLeft + 'px';
    });

    document.getElementById('popup-close').onclick = () => closePopup();
    document.body.addEventListener('click', () => closePopup());
    document.getElementById('popup').addEventListener('click', e => e.stopPropagation());

    function openPopup(event) {
        document.getElementById('popup-title').textContent = event.Title;
        let timeText = event['Ending Date'] ? `From ${event['Starting Date']} to ${event['Ending Date']}` : `On ${event['Starting Date']}`;
        document.getElementById('popup-time').textContent = timeText;
        document.getElementById('popup-desc').innerHTML = event.Description;
        document.getElementById('popup').style.display = 'block';
    }
    function closePopup() {
        document.getElementById('popup').style.display = 'none';
    }
});
</script>

</body>
</html>
