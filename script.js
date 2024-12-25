console.log("Hello World!");
// This is a Dracula board game prototypev1.

const locations = {
  farm: {
    cards: ["Garlic", "Garlic", "Garlic", "Garlic", "Crops +1", "Crops +1", "Crops +1", "Crops +1", "Crops +2", "Crops +2","Crops +2", "Crops +2", "Rotten Crops", "Rotten Crops", "Rotten Crops", "Rotten Crops", "spy", "spy", "spy", "spy"],
    spaces: 2,
    discard: []
  },
  church: {
    cards: ["holy water", "holy water", "holy water", "holy water", "crucifix", "crucifix", "crucifix", "crucifix", "rosary", "rosary", "donation", "donation", "donation", "donation", "confession", "holy communion", "holy communion", "holy communion", "Father's assistance", "Father's assistance"],
    spaces: 1,
    discard: []
  },
  market: {
    cards: ["Armor", "Weapon", "+1 coin", "+2 coins", "+3 coins", "Armor", "Weapon", "+1 coin", "+2 coins", "+3 coins", "Armor", "Weapon", "+1 coin", "+2 coins", "+3 coins", "Armor", "Weapon", "+1 coin", "+2 coins", "+3 coins"],
    spaces: 2,
    discard: []
  },
  castle: {
    cards: ["trap", "trap", "trap", "trap", "counter measures", "counter measures", "counter measures", "counter measures", "spy", "spy", "spy", "spy", "unholy aura", "unholy aura", "unholy aura", "unholy aura", "trauma", "trauma", "Dracula's Coffin", "Dracula's Coffin"],
    spaces: 1,
    discard: []
  }
}; 

let time = "daytime";

let player = {
  name: `you`,
  hp: 3,
  hand: []
};
let cpu1 = {
  name: `Joe`,
  hp: 3,
  hand: []
};
let cpu2 = {
  name: `Bill`,
  hp: 3,
  hand: []
};
let cpu3 = {
  name: `Jane`,
  hp: 3,
  hand: []
};
const playerList = [player.name, cpu1.name, cpu2.name, cpu3.name]


// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
//Draw card function
function drawCard(location, amount) {
  for (let i = 0; i < amount; i++) {
    const card = location.cards.pop();
    player.hand.push(card);
    return console.log(card);
  }
}
//Shuffle location decks
shuffle(locations.farm.cards);
shuffle(locations.market.cards);
shuffle(locations.church.cards);
shuffle(locations.castle.cards);

// Fix playerTurn function
function playerTurn() {
  if (time === "daytime") {
    console.log("It's now " + time + " and your turn. Choose a location to visit for your day");
    // Inform player to click on an image to choose location
  }
}
let turnOrder = shuffle(playerList);
function randomIndex(len) { 
  return Math.floor(Math.random() * len);
}

function goToLocation(locationName) {
  if (time === "daytime" && locationName) {
    let location = locations[locationName];
    if (location) {
      document.getElementById('message').innerText = `You moved to the ${locationName}.`;
      drawCard(location, 2);
      console.log(player.hand);
    } else {
      document.getElementById('message').innerText = "Invalid location.";
      console.log("Invalid location.");
    }
  }
}

// Fix cpuTurn function
function cpuTurn(cpu) {
  console.log(`It's ${time} and ${cpu.name}'s turn.`);
  let locationName = randomIndex(3);
  let location = Object.values(locations)[locationName];
  if (location) {
    console.log(`You moved to the ${locationName}.`);
    drawCard(location, 2);
  } else {
    console.log("Invalid location.");
  }
  console.log(currentPlayer.hand);
}


function updateUI() {
  // Update the day counter
  document.getElementById('daycounter').innerText = `Day ${dayCounter}`;

  // Change the daytime picture based on whether it is daytime or nighttime
  const dayNightImage = document.getElementById('daytime symbol');
  if (time === "daytime") {
    dayNightImage.src = "https://cdn3.iconfinder.com/data/icons/symbol-1-1/36/12-512.png"; // Daytime image
  } else {
    dayNightImage.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/800px-FullMoon2010.jpg"; // Nighttime image
  }
}

// Call updateUI function whenever there is a change in dayCounter or time

// Example usage to allow exiting prompt loop
let turnCounter = 1;
let draculaPowerMeter = 1;
let dayCounter = 1;
let nightCounter = 1;

const turnAnnouncement = document.createElement(`h3`);
turnAnnouncement.innerText = "It is now ${currentPlayer}s turn.";
const messageSection = document.getElementById('message');
messageSection.appendChild(turnAnnouncement);



// Daytime game loop
while (time === "daytime") {
  console.log("A New day begins! It is now day " + dayCounter);
  console.log("Player order: " + turnOrder);
  let currentPlayer = turnOrder[turnCounter % 4]; // Ensure proper cycling through players

  // Update and display turn announcement
  let turnAnnouncement = document.createElement('h3');
  turnAnnouncement.innerText = `It is now ${currentPlayer}'s turn.`;
  messageSection.appendChild(turnAnnouncement);

  if (currentPlayer === player.name) {
    playerTurn();
  } else {
    let cpu = [cpu1, cpu2, cpu3].find(c => c.name === currentPlayer);
    cpuTurn(cpu);
  }

  turnCounter++;
  if (turnCounter >= 5) {
    time = "nighttime";
    updateUI(); // Update UI elements when switching to nighttime
    break;
  }
  updateUI(); // Update UI elements per turn if needed

  // Clear previous turn announcements (optional)
  while (messageSection.firstChild) {
    messageSection.removeChild(messageSection.firstChild);
  }
}

console.log(turnOrder);

// To initialize the first update of the UI
updateUI();