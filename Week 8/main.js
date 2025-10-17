/* --------------------------------------- 1 ----------------------------------------- */

//A
setInterval(function () {
    console.log(i++);
}, 5000);

setInterval(() => console.log(i++), 5000);


//B
function square(x) {    // '**' is the ES6 exponentiation operator. '^' is the Bitwise XOR operator.
    return x ** 2;
}

let square = x => x ** 2;


//C
form.onmouseover = function () {    // 'onhover' is not a valid event. 'onmouseover' is.
    alert("hovering");
}

form.onmouseover = () => alert("hovering");


/* --------------------------------------- 2 ----------------------------------------- */

let xhr = new XMLHttpRequest();
xhr.open("get", "file.php?id=99");
xhr.send(null);



/* --------------------------------------- 3 ----------------------------------------- */

//  The 'responseText' property of xhr contains the response text 




/* --------------------------------------- 4 ----------------------------------------- */

fetch("file.php?id=99")




/* --------------------------------------- 5 ----------------------------------------- */

promise
.then(msg => "Promise kept")
.then(msg2 => msg2.substr(0,3))
.then(msg3 => console.log(msg3))
.catch(msg=>console.log(msg));

// If the promise resolves, the value displayed in the console is 'Pro' as msg2.substr(0,3)) 
// extracts the first three letters of msg and passes them to msg3. The third .then method 
// then prints it to the console 