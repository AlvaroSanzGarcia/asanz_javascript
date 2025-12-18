// ==========================================================
// Author: Álvaro Sanz García
// ==========================================================


const summaryTable = document.getElementById("expensesTable");
let text = "";

// Retrieve settlement transactions and group expenses from local storage
window.onload = () => {
    const groupNameText = localStorage.getItem("groupName");
    const groupNameHeading = document.getElementById("groupNameHeading");
    groupNameHeading.textContent = `SHARED EXPENSES REPORT FOR "${groupNameText.toUpperCase()}"`;

    const settlementPayments = JSON.parse(localStorage.getItem("SettlementPayments")) || [];
    console.log(settlementPayments);
    
    // Clipboard data-----------------------------------------------------------------------------------------------------
    text += groupNameHeading.textContent + "\n**********************************  Balances to Settle ******************************** ";   
    // -------------------------------------------------------------------------------------------------------------------

    settlementPayments.forEach(element => {
        const card = document.createElement("div");
        card.className = "card shadow mb-3 border-0";
        card.style.width = "350px";
        card.style.minHeight = "150px";
        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header bg-primary text-white d-flex justify-content-between align-items-center"
        const headerSpan = document.createElement("span");
        headerSpan.textContent = `Settlement Payment for ${element.debtor.name}`;
        cardHeader.appendChild(headerSpan);
        card.appendChild(cardHeader);
        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex justify-content-between";
        const divInsideBody = document.createElement("div");
        const heading = document.createElement("h4");
        heading.className = "mb-1";
        heading.textContent = `${element.debtor.name} → ${element.creditor.name}`;
        const small = document.createElement("small");
        small.className = "text-muted mt-1";
        small.textContent = `${element.debtor.name} owes ${element.creditor.name} ${element.transferValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

        // Clipboard data-----------------------------------------------------------------------------------------------------
        text += "\n• " + `${element.debtor.name} owes ${element.creditor.name} ${element.transferValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
        // -------------------------------------------------------------------------------------------------------------------

        divInsideBody.appendChild(heading);
        divInsideBody.appendChild(small);
        cardBody.appendChild(divInsideBody);
        const bodySpan = document.createElement("span");
        bodySpan.className = "fw-bold text-success";
        bodySpan.textContent = `${element.transferValue.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
        cardBody.appendChild(bodySpan);
        card.appendChild(cardBody);
        const cardsContainer = document.getElementById("cardsContainer");
        cardsContainer.appendChild(card);
    });

    // Clipboard data-----------------------------------------------------------------------------------------------------
    text += "\n\n********************************* Expenses Summary ********************************";     
    // -------------------------------------------------------------------------------------------------------------------

    const groupExpenses = JSON.parse(localStorage.getItem("Expenses")) || [];
    console.log(groupExpenses);
    groupExpenses.forEach(expense => {
        const row = summaryTable.querySelector("tbody").insertRow();
        const payerCell = row.insertCell();
        payerCell.textContent = expense.payer.name;
        const descriptionCell = row.insertCell();
        descriptionCell.textContent = expense.description;
        const amountCell = row.insertCell();
        amountCell.textContent = expense.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const categoryCell = row.insertCell();
        categoryCell.textContent = expense.category;
        const dateCell = row.insertCell();
        dateCell.textContent = expense.date;
        const splitAmongCell = row.insertCell();
        splitAmongCell.textContent = expense.splitters.map(s => s.name).join(", ");
        
        // Clipboard data-----------------------------------------------------------------------------------------------------
        text += `\n• ${expense.payer.name} paid ${expense.amount.toLocaleString("en-US", {     
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        })} on ${expense.date} for ${expense.description} (${expense.category}). Shared with: ${expense.splitters.map(s => s.name).join(", ")}`;
        // -------------------------------------------------------------------------------------------------------------------
    })

    const totalSpent = Number(localStorage.getItem("TotalSpent")).toLocaleString("en-US", {     
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        });
    const totalSpentDisplay = document.getElementById("totalSpentDisplay");
    totalSpentDisplay.textContent = `Total Spent: ${totalSpent}`;

    // Clipboard data-----------------------------------------------------------------------------------------------------
    text += "\n------------------------------------------------------------------------------------------------------------------" 
    + `\n\n → Total Spent: ${totalSpent}`;
    // -------------------------------------------------------------------------------------------------------------------
    
}


// Event listener for the "Copy" button that copies text to the clipboard. It 
// updates the button label and icon to show success, then reverts them back.
document.getElementById("copy-btn").addEventListener("click", function () {
    navigator.clipboard.writeText(text);
    document.getElementById("copy-button-text").textContent = "Text Copied!";
    document.getElementById("clipboard-icon").style.display = "none";
    document.getElementById("check-icon").style.display = "inline";

    setTimeout(() => {
        document.getElementById("copy-button-text").textContent = "Copy To Clipboard";
        document.getElementById("clipboard-icon").style.display = "inline";
        document.getElementById("check-icon").style.display = "none";
    }, 1500);
})

document.getElementById("newExpenseGroup").addEventListener("click", () => {
    window.location.href = "index.html";
})