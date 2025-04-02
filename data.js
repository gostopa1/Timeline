var today = new Date().toISOString().slice(0, 10);
console.log(today);
var EventList = 
[
TimelineEvent.create(1, "2005-09-01", "2011-12-11", "Diploma in Computer Engineering","University of Patras",1), 
TimelineEvent.create(2, "2013-09-01", "2017-06-01", "Bachelor in Music Technology","Sibelius Academy"), 
TimelineEvent.create(3, "2010-09-01", "2024-01-29", "PhD in Computational Neuroscience",'Aalto University </br> Department of Neuroscience and Biomedical Engineering. </br> <a href="https://aaltodoc.aalto.fi/items/4958ac7e-e2cd-40f5-ad0f-52155dae36a">Link to Thesis</a> </br> <img src="./images/thesis.png" alt="Thesis" >'), 
TimelineEvent.create(4, "2016-07-04", "2016-12-15", "Military Service", "Vekaranjarvi",1),
TimelineEvent.create(5, "2023-10-25", today, "A baby was born", "Filippos", 2),
TimelineEvent.create(2, "2018-01-08", today, "Neural DSP","Started as a Machine Learning Engineer, have been serving as Machine Learning Team Lead since 2019",3), 

// Presentations
TimelineEvent.create(9, "2023-12-21", "", "PhD Thesis Defence",'Thesis title: Interpretable artificial neural networks for fMRI data classification </br>. Opponent: Prof. <a href="https://scholar.google.com/citations?user=StmRhaUAAAAJ&hl=en"> Jussi Tohka </a>',3), 
TimelineEvent.create(7, "2023-05-13", "", "AES presentation","Machine Learning for Guitar Amplifier modeling",3), 
TimelineEvent.create(8, "2023-11-30", "", "SLUSH satellite presentation","Presentation @ Neural DSP to visitors from SLUSH event",3),
TimelineEvent.create(8, "2019-09-13", "", "Presentation at Generative Art Cafe","Presenting Markov Chains in the context of music generation, an implementation and some examples. Session held by Josué Moreno Prieto",3),
//Teaching
TimelineEvent.create(9, "2025-01-01", "2025-04-30", "Teaching ICMP25","Teaching Introduction to Computer Music Programming with Henna Tahvanainen at the Music Technology Department, Sibelius Academy. Course code: S-MT103-K24A. 6 students.",3),
TimelineEvent.create(10, "2024-01-01", "2024-04-30", "Teaching ICMP24","Teaching Introduction to Computer Music Programming with Henna Tahvanainen at the Music Technology Department, Sibelius Academy. Course code: S-MT103-K24A. 25 students.",3),
TimelineEvent.create(9, "2022-09-01", "2022-12-31", "Teaching Embedded DSP",'Programming audio DSP effects using <a href="https://electro-smith.com/products/daisy-seed"> Daisy Seed </a> </br>. Teaching with Alejandro Olarte. Course code: S-MT103',3),
TimelineEvent.create(11, "2021-09-01", "2021-31-12", "Teaching Introduction to DSP",'Introducing students to Digital Signal Processing using Python. Teaching with Henna Tahvanainen, Course code: S-MT34. 6 students.',3),
TimelineEvent.create(12, "2018-09-01", "2018-31-12", "Teaching Introduction to DSP",'Introducing students to Digital Signal Processing using Python. Teaching with Henna Tahvanainen, Course code: S-MT34. 8 students.',3),
TimelineEvent.create(13, "2021-01-01", "2021-04-30", "Teaching DSP Applications",'Programming simple DSP plugins using <a href="https://juce.com/"> JUCE </a>. Teaching with Henna Tahvanainen, Course code: S-MT34. 6 students.',3),





]



