window.onload = function () {

    // Display local storage data
    const localContainer = document.getElementById("local-storage-container");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        localContainer.innerHTML += `<p>${key}: ${value}</p>`;
    }
    console.log(this.localStorage);

    // Display session storage data
    const sessionContainer = document.getElementById("session-storage-container");
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        sessionContainer.innerHTML += `<p>${key}: ${value}</p>`;
    }

    // Display cookies
    const cookieContainer = document.getElementById("cookie-storage-container");
    let myPreferences = readCookie();
    for (let name in myPreferences) {
        let value = myPreferences[name];
        cookieContainer.innerHTML += `<p>${name}: ${value}</p>`;
    }

    console.log("Cookies:", myPreferences);
}



// Function to read cookies
function readCookie() {
    let fields = {};
    if (document.cookie) {
        let cookieList = document.cookie.split("; ");
        for (items of cookieList) {
            let cookie = items.split("=");
            let name = cookie[0];
            let value = decodeURIComponent(cookie[1]);
            fields[name] = value;
        }
    }
    return fields;
}