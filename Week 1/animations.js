let ideImage = "images/IDE.jpg";
let gitImage = "images/GitHub.jpg";
let portoImage = "images/Porto.jpg";
let message = "Hello World!";

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