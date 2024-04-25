
var fullWidth = window.innerWidth;
var fullHeight = window.innerHeight;

//var text = this.querySelector("input[type='text']").value;
var text = "Xontrompigoulis"
//var elem = document.createElement("div");
var elem = document.createElement("p");
//elem.setAttribute("id", "rcorners1");
elem.setAttribute("class", "p2");

elem.textContent = text;
elem.style.position = "absolute";
elem.style.left = Math.round(Math.random() * fullWidth) + "px";
elem.style.top = Math.round(Math.random() * fullHeight) + "px";
elem.style.width = Math.round(Math.random()*100 + 10) + "px";


document.body.appendChild(elem);
var positionInfo = elem.getBoundingClientRect();
var height = positionInfo.height;
height = 2;

const myElements = document.querySelectorAll(".popup")
myElements.forEach(
    el => {
    el.addEventListener("click", () => {
    el.querySelector("#myPopup").classList.toggle("show");    
    }
    )
})