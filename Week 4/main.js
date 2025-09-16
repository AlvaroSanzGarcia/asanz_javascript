"use strict";

window.onload = function () {
    // First card - DOM Traversal
    let cardContainer1 = document.getElementById("card1");
    let cardHeader1 = document.createElement("div");
    cardHeader1.className = "card-header";
    cardHeader1.textContent = "DOM Traversal"
    cardHeader1.style.fontWeight = "bold";
    cardContainer1.appendChild(cardHeader1);

    let cardBody1 = document.createElement("div");
    cardBody1.className = "card-body";
    cardContainer1.appendChild(cardBody1);

    let inputGroup1 = document.createElement("div");
    inputGroup1.className = "input-group mb-3";
    
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.id = "textField";
    inputField.className = "form-control";
    inputField.placeholder = "Enter text";
    inputField.addEventListener("input", function() {
        let output = document.getElementsByClassName("result-group");
        for (let i = 0; i < output.length; i++) {
            output[i].textContent = document.getElementById("textField").value;
        }
    });
    inputGroup1.appendChild(inputField);

    cardBody1.appendChild(inputGroup1);   
     

    for (let i = 0; i < 3; i++) {
        let resultGroup = document.createElement("div");
        resultGroup.className = "input-group mb-3 result-group";

        let resultField = document.createElement("div");
        resultField.textContent = "text to be replaced";

        resultGroup.appendChild(resultField);
        cardBody1.appendChild(resultGroup);
    }  




    // Second card - DOM Modification
    let cardContainer2 = document.getElementById("card2");

    let cardHeader2 = document.createElement("div");
    cardHeader2.className = "card-header";
    cardHeader2.textContent = "DOM Modification";
    cardHeader2.style.fontWeight = "bold";
    cardContainer2.appendChild(cardHeader2);

    let cardBody2 = document.createElement("div");
    cardBody2.className = "card-body";
    cardContainer2.appendChild(cardBody2);


    let addItemButton = document.createElement("button");
    addItemButton.type = "button";
    addItemButton.className = "btn btn-primary";
    addItemButton.textContent = "Add Item";
    addItemButton.addEventListener("click", function () {
        let item = document.createElement("li");
        item.className = "list-group-item";
        item.innerHTML = "Item added";
        document.getElementById("list-of-items").appendChild(item);
    });
    cardBody2.appendChild(addItemButton);

    let listOfItems = document.createElement("ul");
    listOfItems.className = "list-group list-group-flush";
    listOfItems.id = "list-of-items";
    for (let i = 0; i < 4; i++) {
        let item = document.createElement("li");
        item.className = "list-group-item";
        item.innerHTML = "Item " + i;
        listOfItems.appendChild(item);
    }
    cardBody2.appendChild(listOfItems);
}