// ==========================================================
// Author: Álvaro Sanz García
// ==========================================================



// Class declaration
class Person {
    constructor(name) {
        this.name = name;
        this.balance = 0;
    }
}


class Expense {
    constructor(payer, description, amount, category, date, splitters = []) {
        this.payer = payer;
        this.description = description;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.splitters = splitters;
    }
}

class Group {
    constructor() {
        this.people = [];
        this.expenses = [];
    }

    addPerson(person) {
        this.people.push(person);
    }

    addExpense(expense) {
        this.expenses.push(expense);
    }

    calculateTotalSpent() {
        const total = this.expenses.reduce((accumulator, expense) => accumulator + expense.amount, 0);
        return total;
    }

    settleBalances() {
        // Populate creditors and debtors lists and order them
        for (let i = 0; i < group.people.length; i++) {
            const person = group.people[i];
            if (group.people[i].balance > 0) {
                creditors.push(person);
            } else if (group.people[i].balance < 0) {
                debtors.push(person);
            }
        }
        sortByBalance();

        // Debug: print each transaction. Prevent form submission to keep console output visible.
        console.log("\n=== Settlement Transactions ===");

        while (creditors.length !== 0 && debtors.length !== 0) {
            // Pop Debtor and Creditor with the greatest balances from their arrays and settle their balances
            const creditor = creditors.pop();
            const debtor = debtors.pop();
            const transferValue = Math.min(Math.abs(debtor.balance), creditor.balance);
            debtor.balance += transferValue;
            creditor.balance -= transferValue;

            // Log transaction
            const transaction = new Transaction(creditor, debtor, transferValue);
            transactionLedger.transactions.push(transaction);
            console.log(`• ${debtor.name} pays ${creditor.name} ${transferValue.toLocaleString("en-US", { style: "currency", currency: "USD" })}`);   // Debug: print each transaction

            // Return Debtor and Creditor to their arrays if their balances haven't zeroed and order the lists again
            if (debtor.balance !== 0) {
                debtors.push(debtor);
            }
            if (creditor.balance !== 0) {
                creditors.push(creditor);
            }
            sortByBalance();
        }

        // Debug: log each person's balance after settlement. Prevent form submission to keep console output visible.
        console.log("\n=== Balances After Debt Settlement ===");
        group.people.forEach(p => {
            const normalizedBalance = (Object.is(p.balance, -0) ? 0 : p.balance)
            console.log(`${p.name}: ${normalizedBalance.toLocaleString("en-US", { style: "currency", currency: "USD" })}`);
        });
    }
}

class Transaction {
    constructor(creditor, debtor, transferValue) {
        this.creditor = creditor;
        this.debtor = debtor;
        this.transferValue = transferValue;
    }
}

class TransactionLedger {
    constructor() {
        this.transactions = [];
    }
}


// Variable declaration
const table = document.getElementById("expenses-table");
const form = document.getElementById("expenses-form");
const payerField = document.getElementById("payer-input");
const splitAmongField = document.getElementById("split-among-field");
const group = new Group();
const creditors = [];
const debtors = [];
const transactions = [];
const transactionLedger = new TransactionLedger();


// Instantiate Person objects from values retrieved from the previous form
window.onload = () => {
    const participants = JSON.parse(localStorage.getItem("participants")) || [];
    participants.forEach(name => {
        const person = new Person(name);
        group.addPerson(person);
        const payerOption = document.createElement("option");
        const splitAmongOption = document.createElement("option");
        payerOption.textContent = name;
        payerOption.value = name;
        splitAmongOption.textContent = name;
        splitAmongOption.value = name;
        payerField.appendChild(payerOption);
        splitAmongField.appendChild(splitAmongOption);
    });
}



// Event listeners
document.getElementById("add-expense").addEventListener("click", function () {
    if (form.checkValidity()) {
        // Populate table with expenses so the user can see a record of each entry
        document.getElementById("table-container").classList.remove("d-none");
        const formFields = document.querySelectorAll("input, select");
        const row = table.insertRow();
        let splitters = [];
        for (let i = 0; i < formFields.length; i++) {
            const cell = row.insertCell(i);
            if (formFields[i].type === "number") {
                const amount = parseFloat(formFields[i].value);
                cell.textContent = amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
            } else if (formFields[i].id === "split-among-field") {
                splitters = Array.from(formFields[i].selectedOptions).map(opt => group.people.find(p => p.name === opt.value));
                cell.textContent = splitters.map(s => s.name).join(", ");
            } else {
                cell.textContent = formFields[i].value;
            }
        }

        // Update balances: payer credited with amount minus their share, others debited their share
        const payerName = formFields[0].value;
        const payer = group.people.find(p => p.name === payerName);
        const amountPaid = parseFloat(formFields[2].value);
        const debtShare = amountPaid / splitters.length;
        payer.balance += amountPaid;
        for (let i = 0; i < splitters.length; i++) {
            const debtor = splitters[i];
            debtor.balance -= debtShare;
        }

        // Add expense to the Group
        const expense = new Expense(payer, formFields[1].value, parseFloat(formFields[2].value), formFields[3].value, formFields[4].value, splitters);
        group.addExpense(expense);

        // Create 'Delete' expense button in each row
        const deleteCell = row.insertCell(formFields.length);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "btn btn-outline-danger btn-sm";
        deleteButton.addEventListener("click", () => deleteExpense(expense, row));
        deleteCell.appendChild(deleteButton);

        // Debug: print each person's balance 
        console.log("\n=== Current Balances ===");
        group.people.forEach(p => {
            console.log(`${p.name}: ${p.balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}`);
        });

        form.reset();
    } else {
        form.reportValidity();
    }
})

document.getElementById("split-expenses").addEventListener("click", function (e) {
    e.preventDefault();
    if (group.expenses.length === 0) {
        // Prevent form submission if no expenses are logged and display modal
        const modalElement = document.getElementById('no-expenses-alert');
        const noExpensesModal = new bootstrap.Modal(modalElement);
        noExpensesModal.show();
    } else {
        // Settle balances
        group.settleBalances();
        // Save expenses list to localStorage
        localStorage.setItem("Expenses", JSON.stringify(group.expenses));
        // Save settlement payments list to localStorage
        localStorage.setItem("SettlementPayments", JSON.stringify(transactionLedger.transactions));
        // Save total spent amount to localStorage
        localStorage.setItem("TotalSpent", group.calculateTotalSpent());
        form.submit();
    }
})


// Sorting function for the creditor and debtor lists
const sortByBalance = () => {
    creditors.sort((a, b) => { return a.balance - b.balance });
    debtors.sort((a, b) => { return b.balance - a.balance });
}


// Function to delete expenses
const deleteExpense = (expense, expenseTableRow) => {
    const expenseToDeleteIndex = group.expenses.indexOf(expense);

    // Delete expense data and update people's balances
    if (expenseToDeleteIndex > -1) {
        group.expenses.splice(expenseToDeleteIndex, 1);
        const payer = expense.payer;
        payer.balance -= expense.amount;
        for (let i = 0; i < expense.splitters.length; i++) {
            const debtor = expense.splitters[i];
            debtor.balance += expense.amount / expense.splitters.length;
        }
    }

    // Debug: print each person's balance after deleting expense
    console.log("\n=== Current Balances ===");
    group.people.forEach(p => {
        console.log(`${p.name}: ${p.balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}`);
    });

    // Delete row in the eexpenses table
    expenseTableRow.remove();
}