// ==========================================================
// Author: Álvaro Sanz García
// ==========================================================



// Variable declaration
const group = [];
const form = document.getElementById("participant-form");
const participantInput = document.getElementById("participant-input");
const groupNameInput = document.getElementById("group-name-input");
const participantsContainer = document.getElementById("participants-container");



// Clear custom validation message as soon as the user types in the participant field
document.getElementById("participant-input").addEventListener("input", () => {
    participantInput.setCustomValidity("");
    participantInput.reportValidity();
})

// 'Add participant' button event listener
document.getElementById("add-participant-button").addEventListener("click", () => {
    participantInput.setCustomValidity("");
    const participant = document.getElementById("participant-input").value.trim();

    if (form.checkValidity()) {
        if (!group.some((p) => p.toLowerCase() === participant.toLowerCase())) {
            participantsContainer.classList.remove("d-none");
            document.getElementById("remove-participant-button").classList.remove("d-none");
            const name = document.createElement("option");
            name.textContent = participant;
            name.value = participant;
            participantsContainer.appendChild(name);
            group.push(participant);
            participantInput.value = "";
            participantInput.setCustomValidity("");
            participantInput.focus();
        } else {
            participantInput.setCustomValidity("This name already exists. Please enter a different one.");
            participantInput.reportValidity();
            participantInput.select();
        }
    } else {
        form.reportValidity();
    }
})

// 'Delete participant' button event listener
document.getElementById("remove-participant-button").addEventListener("click", () => {
    const participantToDelete = participantsContainer.value;
    if (participantToDelete) {
        group.splice(group.indexOf(participantToDelete), 1);
        participantsContainer.remove(participantsContainer.selectedIndex);
    }
})

// 'Continue to add expenses' button event listener
document.getElementById("add-expenses-button").addEventListener("click", (e) => {
    if (Array.isArray(group) && group.length <= 1) {
        e.preventDefault();
        participantInput.setCustomValidity("Please, enter at least 2 participants.");
        participantInput.reportValidity();
        participantInput.focus();
    } else if (!groupNameInput.value) { //
        e.preventDefault(); //
        groupNameInput.setCustomValidity("Please, enter a name for the group."); //
        groupNameInput.reportValidity(); //
        groupNameInput.focus(); //
    } else {
        e.preventDefault();
        localStorage.setItem("participants", JSON.stringify(group));
        localStorage.setItem("groupName", groupNameInput.value); //
        form.submit();
    }
})