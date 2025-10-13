window.onload = function () {

    // Display local storage data
    const localContainer = document.getElementById("local-storage-container");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        localContainer.innerHTML += `<p><b>${key}:</b> ${value}</p>`;
    }
    console.log(this.localStorage);


    // Display session storage data
    const sessionContainer = document.getElementById("session-storage-container");
    for (let i = 0; i < sessionStorage.length; i++) {

        // Remove "IsThisFirstTime_Log_From_LiveServer" key-value pair that Live Server automatically adds to session storage 
        if (sessionStorage.key(i) === "IsThisFirstTime_Log_From_LiveServer") {sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer")};

        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        sessionContainer.innerHTML += `<p><b>${key}:</b> ${value}</p>`;
    }
    

    // Display cookies
    const cookieContainer = document.getElementById("cookie-storage-container");
    let myPreferences = readCookie();
    for (let name in myPreferences) {
        let value = myPreferences[name];
        cookieContainer.innerHTML += `<p><b>${name}:</b> ${value}</p>`;
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