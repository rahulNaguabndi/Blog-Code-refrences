// Initial game state - Green Light (nothing to observe)
let isGreenLight = true;

const statusText = document.getElementById("status");
const playerList = document.getElementById("playerList");

// Mutation Observer setup - the "doll"
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (!isGreenLight) {
      // The doll catches changes (like players moving during "Red Light")
      statusText.textContent = "Red Light! Someone moved!";
      statusText.classList.add("red");
      statusText.classList.remove("green");
      console.log("Red Light! Someone moved!");
    }
  });
});

// Start observing changes in the #playerList (the area being "watched")
observer.observe(playerList, { childList: true });

// Function to toggle between "Green Light" and "Red Light"
function toggleLight() {
  if (isGreenLight) {
    // Switch to Red Light (start monitoring)
    isGreenLight = false;
    statusText.textContent = "Red Light: Don't move!";
    statusText.classList.add("red");
    statusText.classList.remove("green");
    redLightImage.style.display = "block";
  } else {
    // Switch to Green Light (stop monitoring)
    isGreenLight = true;
    statusText.textContent = "Green Light: You can move!";
    statusText.classList.add("green");
    statusText.classList.remove("red");
    redLightImage.style.display = "none";
  }
}

// Add or remove players (elements) to/from the DOM
document.getElementById("addPlayer").addEventListener("click", () => {
  const newPlayer = document.createElement("div");
  newPlayer.textContent = "Player " + (playerList.children.length + 1);
  playerList.appendChild(newPlayer);
});

document.getElementById("removePlayer").addEventListener("click", () => {
  if (playerList.children.length > 0) {
    playerList.removeChild(playerList.lastChild);
  }
});

// Toggle between Green Light and Red Light every 5 seconds (automatically)
setInterval(toggleLight, 7000);
