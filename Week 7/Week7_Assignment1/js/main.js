document.forms[0].addEventListener("submit", function () {

    // Save data from the form to local storage, session storage and cookies
    let formFields = document.querySelectorAll("input");
    for (let fields of formFields) {
        localStorage.setItem(fields.name, fields.value);
        sessionStorage.setItem(fields.name, fields.value);
        writeCookie(fields.name, fields.value, 7);
    }
})

// Function to create a cookie
function writeCookie(name, value, days, path, domain, secure) {
    if (name && value) {
        let maxAge = days * 24 * 60 * 60;
        let cStr = name + "=" + encodeURIComponent(value);
        if (maxAge) cStr += ";max-age=" + maxAge;
        if (path) cStr += ";path=" + path;
        if (domain) cStr += ";domain=" + domain;
        if (secure) cStr += ";secure";
        document.cookie = cStr;
    }
}