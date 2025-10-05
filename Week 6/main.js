"use strict";

// -------------------------------Part 1: Object literal------------------------------------
let country = {
    countryName: "Spain",
    population: 47350000,
    countryCapital: "Madrid",
    region: "Europe",
    currency: "Euro(€)",
    phonePrefix: "+34",
    government: {
        system: "Parliamentary monarchy",
        headOfState: "King Felipe VI",
        headOfGovernment: "Prime Minister",
        constitutionDate: 1978,
        administrativeDivisions: {
            autonomousCommunities: 17,
            provinces: 50,
            municipalities: 8131
        },
    },
    languages: ["Castilian", "Catalan/Valencian", "Euskera", "Galician", "Aranese"],
    showCountryDetails: function () {
        return `<b>Country Name:</b> ${this.countryName}<br>
                <b>Population:</b> ${this.population}<br>
                <b>Capital:</b> ${this.countryCapital}<br>
                <b>Region:</b> ${this.region}<br>
                <b>Currency:</b> ${this.currency}<br>
                <b>Phone Prefix:</b> ${this.phonePrefix}<br>
                <b>Government:</b> ${this.government.system}<br>
                <b>Languages:</b> ${this.languages.join(", ")}`;
    }
}

document.getElementById("object-literal-output").innerHTML = country.showCountryDetails();



// -------------------------------Part 2: Object class----------------------------------
function Student(name, lastName) {
    this.name = name;
    this.lastName = lastName;
    this.GPA = null;
    this.email = null;
    this.dateOfBirth = null;
    this.creditsEarned = null;
    this.enrolledCourses = [];
}


// Prototype method
Student.prototype.getLetterGrade = function () {
    if (this.GPA === null) {
        return "No GPA Available";
    } else if (this.GPA >= 3.7) return `<b>Student:</b> ${this.name} ${this.lastName}, <b>Grade:</b> A<br>`;
    else if (this.GPA >= 3.0) return `<b>Student:</b> ${this.name} ${this.lastName}, <b>Grade:</b> B<br>`;
    else if (this.GPA >= 2.0) return `<b>Student:</b> ${this.name} ${this.lastName}, <b>Grade:</b> C<br>`;
    else if (this.GPA >= 1.0) return `<b>Student:</b> ${this.name} ${this.lastName}, <b>Grade:</b> D<br>`;
    else return `<b>Student:</b> ${this.name} ${this.lastName}. <b>Grade:</b> F<br>`;
}


// Instantiating Student objects
let student1 = new Student("Emily", "Davis");
let student2 = new Student("Ethan", "Clark");
let student3 = new Student("Grace", "Anderson");

student1.GPA = 3.8;
student2.GPA = 3.1;
student3.GPA = 2.9;

document.getElementById("student-object-output").innerHTML += student1.getLetterGrade();
document.getElementById("student-object-output").innerHTML += student2.getLetterGrade();
document.getElementById("student-object-output").innerHTML += student3.getLetterGrade();




// ----------------Part 3: Prototype chain / Public,private & privileged functions--------------------------

// Superclass
function Item(SKU) {
    this.SKU = SKU;
}

Item.prototype.displaySKU = function () {
    return `<b>SKU:</b> ${this.SKU}<br>`
}


// Child class of Item
function Product(SKU, productName, description, price) {
    Item.call(this, SKU);
    this.productName = productName;
    this.description = description;
    this.price = price;
    function calculateTax() {       // Private function
        let taxRate = 0.0903;
        let taxPrice = price * taxRate;
        return taxPrice;
    }

    this.calculatePriceAfterTax = function () {      //  Privileged function
        let priceAfterTax = this.price + calculateTax();
        return `<b>Price After Tax:</b> ${priceAfterTax.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })}<br>`;
    }
}



// Child class of Product
function Book(SKU, productName, description, price, title, author) {
    Product.call(this, SKU, productName, description, price);
    this.title = title;
    this.author = author;
    this.pageCount = null;
    this.publisher = null;
    this.publicationDate = null;
    this.language = null;
    this.genre = null;
}



// Child class of Book
function EBook(SKU, productName, description, price, title, author, filename) {
    Book.call(this, SKU, productName, description, price, title, author);
    this.filename = filename;
    this.filesize = null;
}




// Protoype chain

/* Note: Always assign prototype methods *after* setting up the prototype chain.
If you define methods on Product.prototype first, then overwrite it with Object.create(...),
you replace the entire prototype object—wiping out any previously defined methods.
To preserve your methods, assign them *after* the prototype chain is established. */

Product.prototype = Object.create(Item.prototype);
Product.prototype.constructor = Product;

Product.prototype.displayProduct = function () {     // Public function
    return `<b>Product:</b> ${this.productName}<br><b>Description:</b> ${this.description}<br><b>Price:</b> ${this.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })}<br>`;
}

Book.prototype = Object.create(Product.prototype);
Book.prototype.constructor = Book;

Book.prototype.displayBook = function () {      // Public function
    return `<b>Title:</b> ${this.title}, <b>Author:</b> ${this.author}, <b>Publisher:</b> ${this.publisher}<br>`
}

EBook.prototype = Object.create(Book.prototype);
EBook.prototype.constructor = EBook;



// Object instantiation
let product1 = new Product(
    "SKU123",
    "Wireless Headphones",
    "Noise-cancelling over-ear headphones w/ Bluetooth 5.1",
    129.99
);



document.getElementById("function-types-output").innerHTML += product1.displayProduct();
document.getElementById("function-types-output").innerHTML += product1.calculatePriceAfterTax();

// The displayProduct() method returns an HTML-formatted string intended for use in a webpage.
// When logged to the console, the HTML tags will appear as plain text and won’t render visually.

console.log(product1.displayProduct());

// Uncomment the line below to test access to the private function.
// It will throw an error because calculateTax() is not accessible outside the constructor.

// console.log(product1.calculateTax());   



// Object instantiation
let eBook1 = new EBook(
    "EBK-00123",
    "EBook",
    "A magical novel set in a mysterious circus",
    24.95,
    "The Night Circus",
    "Erin Morgenstern",
    "the_night_circus.epub"
);
eBook1.publisher = "Doubleday";
eBook1.filesize = "2.8MB";
eBook1.publicationDate = "2011-09-13";
eBook1.language = "English";
eBook1.genre = "Fantasy";
eBook1.pageCount = 387;


document.getElementById("prototype-chain-output").innerHTML += eBook1.displayProduct();
document.getElementById("prototype-chain-output").innerHTML += eBook1.displayBook();
document.getElementById("prototype-chain-output").innerHTML += eBook1.calculatePriceAfterTax();
document.getElementById("prototype-chain-output").innerHTML += eBook1.displaySKU();



// -----------------------------Part 4: Parsing to/from JSON data--------------------------------
let json_String = JSON.stringify(country);
document.getElementById("JSON-object-ouput").innerHTML += `<b>JSON String:</b> ${json_String}<br>`;

let object = JSON.parse(json_String);
document.getElementById("JSON-object-ouput").innerHTML += `<b>Parse JSON back to Object and display a property:</b> ${object.languages.join(", ")}<br>`;