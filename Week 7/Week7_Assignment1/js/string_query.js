window.onload = function () {

    // Retrieve the query string from the URL (everything after ?) and removes the leading ?
    let qString = location.search.slice(1);

    // Replaces every occurrence of the + character in the qString variable with a blank space
    qString = qString.replace(/\+/g, " ");

    // Replaces URI Encoding Characters
    qString = decodeURIComponent(qString);

    // Replace every occurrence of the + character (if there are any) with a blank space
    let formattedString = qString.split(/&/g);


    for (let items of formattedString) {
        // Extract the field names and values      
        let fieldValuePair = items.split(/=/);
        let fieldName = fieldValuePair[0];
        let fieldValue = fieldValuePair[1];

        // Display each field name and value from the query string
        document.getElementById("display-container").innerHTML += `<p><b>${fieldName}:</b> ${fieldValue}</p>`;

        // Optional: You could store these values in localStorage here,
        // but in this implementation, they are saved during form submission instead.
        // Example:
        // localStorage.setItem(fieldName, fieldValue);
    }
    
    // Add a button to navigate to the last page
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "text-center";
    let button = document.createElement("button");
    button.textContent = "View Web Storage";
    button.className = "btn btn-warning mt-3";
    button.onclick = function () {
        window.location.href = "web_storage_display.html";
    };
    buttonContainer.appendChild(button);

    document.getElementById("display-container").insertAdjacentElement("beforeend", buttonContainer);

    // Log the contents of localStorage to verify data saved during form submission
    console.log(localStorage);
}