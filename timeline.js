
var screen_width = window.screen.width;
let minYear = 2005;
let minYearDate = new Date(minYear,0);
let maxYear = 2029;
let maxYearDate = new Date(maxYear,0);
let totalNumberOfDays=((maxYearDate-minYearDate)/(1000*3600*24));
let pixelsPerDay = screen_width/totalNumberOfDays; // close to 0.2
let minDate, maxDate, totalDays;

let categoryColours=['#00f','#f00','#0f0','#3ff','#4f4','#f3f']

var is_collapsed=[];
var max_layers=[];
const const_offset=50;
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
        var init_offset=80;
        let offset_from_top = init_offset;
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
            var max_layer=0; // To store the maximum line number on each category

            events.forEach(e => {
                const start = new Date(e['Starting Date']);

                if (e['Ending Date']=="today") var end = new Date(Date.now());
                else var end = e['Ending Date'] ? new Date(e['Ending Date']) : null;

                const startOffset = (start - minDate)/(1000*3600*24) * pixelsPerDay;

                let layer = e['Line'];
                max_layer = max_layer < layer ? layer : max_layer;
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

            title.addEventListener('click', () => {
                eventsWrapper.classList.toggle('collapsed');
                if (eventsWrapper.classList.contains('collapsed'))
                    {
                        eventsWrapper.style.display= 'none';
                    }
                else
                    {
                        eventsWrapper.style.display= 'block';
                    }
                catDiv.classList.toggle('collapsed');
                let cnt=0;
                let temp_offset=init_offset;
                document.querySelectorAll(".category").forEach(function(elem) {    
                    elem.style.top = temp_offset + 'px';
                    
                    if (elem.classList.contains('collapsed'))
                        is_collapsed[cnt]=1;
                    else
                        is_collapsed[cnt]=0;

                    if (elem.classList.contains('collapsed'))
                        temp_offset+=0; // i.e. do nothing
                    else
                        temp_offset+=(max_layers[cnt]*50)+const_offset;

                    cnt+=1;
                });
            });
            offset_from_top += (max_layer*50)+const_offset;
            max_layers[cat_ind]=max_layer;

            cat_ind+=1;
        }
    }

    function drawAxis() {
        timeAxis.innerHTML = '';
        timeAxis.style.width = (totalDays * pixelsPerDay + 300) + 'px';

        for (let y=2005; y<=2030; y+=1) 
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