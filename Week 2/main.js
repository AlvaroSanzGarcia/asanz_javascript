// Event listener for the 'calculate' button
document.getElementById("mortgageForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevents the browser from reloading the form after submitting it (default behavior)
    calculateMonthlyPayment();
});

// Event listener for the 'reset' button
document.getElementById("resetButton").addEventListener("click", resetValues);

// Main function
function calculateMonthlyPayment() {
    let principalLoanAmount = parseFloat(document.getElementById("inputPrincipalLoanAmount").value);
    let interestRate = parseFloat(document.getElementById("inputInterestRate").value);
    let numberOfYears = parseFloat(document.getElementById("inputLoanYears").value);
    let downPayment = parseFloat(document.getElementById("inputDownPayment").value || 0); // Assigns 0 to the 'downPayment' variable if it's empty 

    let monthlyInterestRate = interestRate / 100 / 12;
    let numberOfPayments = numberOfYears * 12;
    let loanAmount = principalLoanAmount - downPayment;

    let monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    document.getElementById("outputMonthlyPayment").value = "$" + monthlyPayment.toFixed(2);
}

// Reset function
function resetValues() {
    document.getElementById("mortgageForm").reset();
}






