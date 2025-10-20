// 🧩 1. Get all the elements we’ll need from the HTML
const nameInput = document.getElementById("tournament-name"); // the text input
const label = document.getElementById("tournament-label"); // the label for tournament name
const playerAmountInput = document.getElementById("player-amount"); // the number input
const dropdown = document.getElementById("tournament-type"); // the dropdown menu
const header = dropdown.querySelector(".dropdown-header"); // part that opens/closes dropdown
const selected = dropdown.querySelector(".selected"); // shows selected option text
const options = dropdown.querySelectorAll(".option"); // the 3 options
const button = document.getElementById("create-btn"); // the CREATE button

let selectedType = ""; // will store which type was picked

// 🧩 2. Adjust placeholder text based on screen size
function updatePlaceholder() {
  if (window.innerWidth <= 600) {
    // 📱 Small screen (like mobile)
    nameInput.placeholder = "Tournament name";
  } else {
    // 💻 Bigger screen (PC)
    nameInput.placeholder = "Enter name...";
  }
}

// Run it once when the page loads
updatePlaceholder();

// Also run it when the user resizes the browser window
window.addEventListener("resize", updatePlaceholder);

// 🧩 3. Open or close dropdown menu when clicked
header.addEventListener("click", () => {
  dropdown.classList.toggle("show"); // adds/removes the "show" class
});

// 🧩 4. When an option (americano, mexicano, brackets) is clicked
options.forEach((option) => {
  option.addEventListener("click", () => {
    selectedType = option.dataset.value; // save the selected type (from data-value)
    selected.textContent = option.textContent; // update the header text
    dropdown.classList.remove("show"); // close the dropdown again
  });
});

// 🧩 5. When the CREATE button is clicked
button.addEventListener("click", () => {
  const tournamentName = nameInput.value.trim(); // get text from input
  const playerAmount = playerAmountInput.value; // get number from input

  // 🧠 Make sure user filled everything
  if (!tournamentName) {
    alert("Please enter a tournament name!");
    return;
  }

  if (!selectedType) {
    alert("Please select a tournament type!");
    return;
  }

  // 🧩 6. Encode data safely for the URL
  const encodedName = encodeURIComponent(tournamentName);
  const encodedType = encodeURIComponent(selectedType);
  const encodedPlayers = encodeURIComponent(playerAmount);

  // 🧩 7. Redirect to the next page with the info in the URL
  // Example: tournament.html?name=Beach%20Cup&type=americano&players=8
  window.location.href = `tournament.html?name=${encodedName}&type=${encodedType}&players=${encodedPlayers}`;
});

// 🧩 8. Close dropdown if you click outside it
window.addEventListener("click", (e) => {
  // If you click anywhere NOT inside the dropdown, close it
  if (!dropdown.contains(e.target) && e.target !== header) {
    dropdown.classList.remove("show");
  }
});
