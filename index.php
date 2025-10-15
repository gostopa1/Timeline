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
        margin-bottom: 50px;
        top: 0px;
        height: 0px;
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
    }
    .title {
        position: absolute;
        top: -20px;
        font-weight: bold;
        white-space: nowrap;
    }
    .events-wrapper {
        position: relative;
        overflow: visible;
        max-height: 1000px; /* big enough to fit most */
        transition: max-height 0.4s ease, opacity 0.3s ease;
        opacity: 1;
    }
    .events-wrapper.collapsed {
        max-height: 0;
        opacity: 0;
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
        top: 50%;
        left: 50%;
        transform: translate(-50%, -30%);
        background: #aaa;
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
        color: #000000ff;
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

<script src="timeline.js"></script>

</body>
</html>
