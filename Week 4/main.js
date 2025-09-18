"use strict";

// DOM traversal: ***function skips empty nodes resulting from line breaks in the html file***
document.getElementById("log-button").addEventListener("click", function () {
    let output = document.getElementById("card2");
    document.getElementById("result-field").textContent = "";
    traverseDOM(output);
});

function traverseDOM(element) {
    if (element.nodeType === Node.TEXT_NODE) {
        const trimmed = element.textContent.trim();
        if (trimmed !== "") {
            console.log(element.textContent);
            document.getElementById("result-field").innerHTML += trimmed + "<br>";
        }
    } else {
        for (const child of element.childNodes) {
            traverseDOM(child);
        }
    }
}


// DOM modification
document.getElementById("addItemButton").addEventListener("click", function () {
    let item = document.createElement("li");
    item.className = "list-group-item";
    item.textContent = "Item added";
    document.getElementById("list-of-items").appendChild(item);
});


// Timed updates
let timeID1 = setInterval(getCurrentDateTime, 1000);

function getCurrentDateTime() {
    const dateTimeNow = new Date();
    document.getElementById("time-output").innerHTML = dateTimeNow;
}


// User input
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const response = window.prompt("Please confirm your password", "Password");
    if (response) {
        window.alert("Your password has been saved");
    } else {
        window.alert("Your password could not be saved");
    }
});


// Window properties
let timeID2 = setInterval(getScreenSize, 1000);

function getScreenSize() {
    const screenWidth = screen.width;
    let screenType;

    if (screenWidth < 480) {
        screenType = "mobile device";
    } else if (screenWidth < 1024) {
        screenType = "tablet";
    } else {
        screenType = "desktop";
    }

    document.getElementById("window-properties").innerHTML =
        `Screen width: <span style="color: #007bff;">${screenWidth} px</span><br>
         Screen type: <span style="color: #007bff;">${screenType}</span>`;
}


// Navigation history
document.getElementById("go-back-button").addEventListener("click", function () {
    history.back()
});


// Bonus: Boostrap modals
const toastTrigger1 = document.getElementById('close-button');
const toastLiveExample1 = document.getElementById('liveToast1');

if (toastTrigger1) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample1)
  toastTrigger1.addEventListener('click', () => {
    toastBootstrap.show()
  })
}


const toastTrigger2 = document.getElementById('save-button');
const toastLiveExample2 = document.getElementById('liveToast2');

if (toastTrigger2) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample2)
  toastTrigger2.addEventListener('click', () => {
    toastBootstrap.show()
  })
}