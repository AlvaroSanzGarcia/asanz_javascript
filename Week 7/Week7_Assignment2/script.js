"use strict";
let tiltyTable = document.getElementById("tiltyTable");
let draggableBoxes = document.getElementsByClassName("box");

let zIndexCounter=0;
let startingX,startingY;
let boxX,boxY;

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', tilt, false);
}


draggableBoxes[0].onclick = function () {
    // 1) finish this line: "let boxCopy = [clone of draggableBoxes]"
    let boxCopy = draggableBoxes[0].cloneNode(true);
    // 2) finish this line: "[append boxCopy to the tilty table]"
    tiltyTable.appendChild(boxCopy);
    // 3) finish this line: "[event listener for pointerdown to run the grabBox function]"
    boxCopy.addEventListener("pointerdown", grabBox);
}


function grabBox(e) {

    startingX = e.clientX;
    startingY = e.clientY;
    
    e.target.style.touchAction = "none";
    zIndexCounter++;
    e.target.style.zIndex = zIndexCounter;
    
    boxX = e.target.offsetLeft;
    boxY = e.target.offsetTop;

    e.target.addEventListener("pointermove",moveBox);
    e.target.addEventListener("pointerup",dropBox);

}

function moveBox(e) {
    let currentX = e.clientX
    let currentY = e.clientY
    
    let deltaX = currentX - startingX;
    let deltaY = currentY - startingY;

    // 4) finish 2 lines: "[set the position of the target]"
    e.target.style.left = boxX + deltaX + "px";
    e.target.style.top = boxY + deltaY + "px";

}

function dropBox(e) {
    // 5) finish 2 lines: "[remove event listeners for pointermove and ponterup]"
    e.target.removeEventListener("pointermove", moveBox);
    e.target.removeEventListener("pointerup", dropBox);
}

    // 6) add your own twist to the motion of tilting your phone. 
let lastBeta = 0;
let lastGamma = 0;

function tilt(e) {
    let diffBeta,diffGamma;
    for (let i=0; i<tiltyTable.children.length; i++) {
        let elemRect = tiltyTable.children[i].getBoundingClientRect();
        diffBeta = e.beta - lastBeta;
        diffGamma = e.gamma - lastGamma;
        tiltyTable.children[i].style.top = elemRect.top + diffBeta + "px";
        tiltyTable.children[i].style.left = elemRect.left + diffGamma + "px";

        // Assigns background color to each box based on tilt and position
        let hue = Math.abs(e.beta + e.gamma + i * 20) % 360;
        tiltyTable.children[i].style.backgroundColor = `hsl(${hue}, 80%, 60%)`;
    }
    lastBeta = e.beta;
    lastGamma = e.gamma;

}

    // 7) screenshot or gif of the app running on your phone.
    //     (or if your phone doesn't work, show the Chrome simulator)