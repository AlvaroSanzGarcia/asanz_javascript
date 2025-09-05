// Constant declaration
const POOR_CREDIT = 1.5;
const FAIR_CREDIT = 1.0;
const GOOD_CREDIT = 0.5;
const EXCELLENT_CREDIT = -0.5;

// Initial form setup
window.onload = function() {
    document.getElementById("inputPrincipalLoanAmount").value = 250000;
    document.getElementById("inputInterestRate").value = 5.7;
    document.getElementById("inputLoanYears").value = 30;
    document.getElementById("inputDownPayment").value = 10000;
    document.getElementById("creditScoreGood").checked = true;
    calculateMonthlyPayment();
};

// Event listener for the 'calculate' button
document.getElementById("mortgageForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevents the browser from reloading the form after submitting it (default behavior)
    calculateMonthlyPayment();
});

// Event listener for the 'reset' button
document.getElementById("resetButton").addEventListener("click", resetValues);

// Event listeners to trigger re-calculation
document.getElementById("inputPrincipalLoanAmount").addEventListener("change", calculateMonthlyPayment);
document.getElementById("inputInterestRate").addEventListener("change", calculateMonthlyPayment);
document.getElementById("inputLoanYears").addEventListener("change", calculateMonthlyPayment);
document.getElementById("inputDownPayment").addEventListener("change", calculateMonthlyPayment);
document.getElementById("creditScoreGood").addEventListener("change", calculateMonthlyPayment);
document.querySelectorAll('input[name="creditScore"]').forEach(radio => {
    radio.addEventListener("change", calculateMonthlyPayment);
});

// Main function
function calculateMonthlyPayment() {
    let principalLoanAmount = parseFloat(document.getElementById("inputPrincipalLoanAmount").value);
    let interestRate = parseFloat(document.getElementById("inputInterestRate").value);
    let numberOfYears = parseFloat(document.getElementById("inputLoanYears").value);
    let downPayment = parseFloat(document.getElementById("inputDownPayment").value || 0); // Assigns 0 to the 'downPayment' variable if it's empty 

    let creditScoreAdjustment = 0;
    let selectedScore = document.querySelector('input[name="creditScore"]:checked')
    
    switch (selectedScore.value) {
        case "poor":
            creditScoreAdjustment = POOR_CREDIT;
            break;
        case "fair":
            creditScoreAdjustment = FAIR_CREDIT;
            break;
        case "good":
            creditScoreAdjustment = GOOD_CREDIT;
            break;
        case "excellent":
            creditScoreAdjustment = EXCELLENT_CREDIT;
            break;
    }

    let adjustedAnnualRate = interestRate + creditScoreAdjustment;
    let monthlyInterestRate = adjustedAnnualRate / 100 / 12;
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




