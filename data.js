var today = new Date().toISOString().slice(0, 10);
console.log(today);
var EventList = 
[
TimelineEvent.create(1, "2005-09-01", "2011-12-11", "Diploma in Computer Engineering","University of Patras"), 
TimelineEvent.create(2, "2013-09-01", "2017-06-01", "Bachelor in Music Technology","Sibelius Academy"), 
TimelineEvent.create(3, "2010-09-01", "2024-01-29", "PhD in Computational Neuroscience",'Aalto University </br> Department of Neuroscience and Biomedical Engineering. </br> <a href="https://aaltodoc.aalto.fi/items/4958ac7e-e2cd-40f5-ad0f-52155dae36a">Link to Thesis</a> </br> <img src="./images/thesis.png" alt="Thesis" >'), 
TimelineEvent.create(4, "2016-07-04", "2016-12-15", "Military Service", "Vekaranjarvi",1),
TimelineEvent.create(5, "2023-10-25", today, "A baby was born", "Filippos", 2),
TimelineEvent.create(2, "2018-01-08", today, "Neural DSP","Started as a Machine Learning Engineer, have been serving as Machine Learning Team Lead since 2019",3), 
TimelineEvent.create(7, "2023-05-13", "2023-05-13", "AES presentation","Machine Learning for Guitar Amplifier modeling",3), 
TimelineEvent.create(8, "2023-1-30", "2023-1-30", "SLUSH satellite presentation","Presentation @ Neural DSP to visitors from SLUSH event",3), 
TimelineEvent.create(1, "2020-09-01", "2020-12-11", "","University of Patras"), 
]



