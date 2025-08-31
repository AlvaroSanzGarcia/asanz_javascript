// Image and message variables.
let ideImage = "images/IDE.jpg";
let gitImage = "images/GitHub.jpg";
let portoImage = "images/Porto.jpg";
let message = "Hello World!";

// Functions to update image and text content.
function showIDE() {
    document.getElementById("replaceMe").src = ideImage;
}

function showGit() {
    document.getElementById("replaceMe").src = gitImage;
}

function showMessage() {
    document.getElementById("replaceText").textContent = message;
}

function reset() {
     document.getElementById("replaceText").textContent = "Message will display here";
     document.getElementById("replaceMe").src = portoImage;
}

// Event handlers.
document.getElementById("button1").onclick = showIDE;
document.getElementById("button2").onclick = showGit;
document.getElementById("button3").onclick = showMessage;
document.getElementById("button4").onclick = reset;