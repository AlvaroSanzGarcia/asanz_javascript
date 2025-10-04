// Class-based prototype chain 

class Item {
    constructor() {   // Base class
        this.SKU = null;
    }

    displaySKU() {
        return `<b>SKU:</b> ${this.SKU}<br>`;
    }
}


class Product extends Item {   // Derived class
    #calculateTax() {   // Private method
        const taxRate = 0.0903;
        return this.price * taxRate;
    }

    constructor(name, description, price) {
        super(null);
        this.name = name;
        this.description = description;
        this.price = price;
    }

    displayProduct() {   // Public method
        return `<b>Product:</b> ${this.name}<br><b>Description:</b> ${this.description}<br><b>Price:</b> ${this.price}<br>`;
    }

    displayPrice() {   // Public method
        return `<b>Price:</b> ${this.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })}<br>`;
    }

    calculatePriceAfterTax() {   // Privileged method
        const priceAfterTax = this.price + this.#calculateTax();
        return `<b>Price After Tax:</b> ${priceAfterTax.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })}<br>`;
    }
}


class Book extends Product {   // Derived class
    constructor(title, author, publisher) {
        super(null, null, null);
        this.title = title;
        this.author = author;
        this.pageCount = null;
        this.publisher = publisher;
        this.publicationDate = null;
        this.language = null;
        this.genre = null;
    }

    displayBook() {
        return `<b>Title:</b> ${this.title}, <b>Author:</b> ${this.author}, <b>Publisher:</b> ${this.publisher}<br>`;
    }
}

class eBook extends Book {   // Derived class
    constructor(title, author, publisher, filename) {
        super(title, author, publisher);
        this.filename = filename;
        this.filesize = null;
    }
}


// Example of object instantiation 
const eBook1 = new eBook("The Night Circus", "Erin Morgenstern", "Doubleday", "the_night_circus.epub");
eBook1.filesize = "2.8MB";
eBook1.SKU = "EBK-00123";
eBook1.price = 24.95;

// Calling inherited methods
document.getElementById("prototype-chain-output").innerHTML += eBook1.displayBook();
document.getElementById("prototype-chain-output").innerHTML += eBook1.displayPrice();
document.getElementById("prototype-chain-output").innerHTML += eBook1.calculatePriceAfterTax();
document.getElementById("prototype-chain-output").innerHTML += eBook1.displaySKU();
