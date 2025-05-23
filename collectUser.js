//USER'S COLLECTION FUNCTIONS

// Check if we're on the Sets page before running this code
if (document.querySelector(".setSelector") || window.location.href.includes("collectSets.html")) {
// Function to dynamically populate the set selector dropdown
function populateSetSelector() {
const setSelector = document.querySelector(".setSelector");

// Clear existing options
setSelector.innerHTML = "";

// Add "All Sets" option
const allOption = document.createElement("option");
allOption.value = "all";
allOption.textContent = "All Sets";
setSelector.appendChild(allOption);

// Add regular sets (up to 50)
for (let i = 1; i <= 50; i++) {
// Check if this set exists in allSets array and has cards
if (i < allSets.length && allSets[i] && allSets[i].length > 0) {
const option = document.createElement("option");
option.value = i.toString();
// Format set number with leading zero for single digits
option.textContent = "Set " + (i < 10 ? "0" + i : i);
setSelector.appendChild(option);
}
}

// Add V sets (up to V25)
for (let i = 1; i <= 25; i++) {
const vSetIndex = 50 + i; // This assumes V sets start at index 51
if (vSetIndex < allSets.length && allSets[vSetIndex] && allSets[vSetIndex].length > 0) {
const option = document.createElement("option");
option.value = vSetIndex.toString();
option.textContent = "Set V" + i;
setSelector.appendChild(option);
}
}

// Add S sets (up to S25)
for (let i = 1; i <= 25; i++) {
const sSetIndex = 75 + i; // This assumes S sets start at index 76
if (sSetIndex < allSets.length && allSets[sSetIndex] && allSets[sSetIndex].length > 0) {
const option = document.createElement("option");
option.value = sSetIndex.toString();
option.textContent = "Set S" + i;
setSelector.appendChild(option);
}
}

// Add B sets (B1 and B2)
for (let i = 1; i <= 2; i++) {
const bSetIndex = 100 + i;
// Always add B1 and B2 even if they don't exist yet
const option = document.createElement("option");
option.value = bSetIndex.toString();
option.textContent = "Set B" + i;
setSelector.appendChild(option);
}
}

// Create a modified version of loadSelectedSet that doesn't conflict with other pages
function loadSelectedSet() {
// Hide any unused table elements
const unusedTable = document.querySelector(".collectionList");
if (unusedTable) {
unusedTable.style.display = "none";
}

let compareCards;
let filledCards;
let listName = document.querySelector(".players");
let setSelector = document.querySelector(".setSelector");
const selectedSetValue = setSelector.value;

// First, hide all sets
for (let setList = 1; setList < allSets.length; setList++) {
let setBox = document.querySelector(".s" + setList);
if (setBox) {
setBox.style.display = "none";
}
}

// If "all" is selected, show all sets, otherwise just show the selected set
if (selectedSetValue === "all") {
// Load all sets using the original function
loadCards();
} else {
// Convert the selected value to a number and load just that set
const setNumber = parseInt(selectedSetValue);
if (setNumber >= 1 && setNumber < allSets.length && allSets[setNumber]) {
// Get user-specific cards for comparison
const userRef = db.collection('users');

async function loadSingleSet() {
if (listName.value == "all") {
const allQuery = await userRef.get();
compareCards = allQuery.docs[0].data().cards.concat(
allQuery.docs[1].data().cards,
allQuery.docs[2].data().cards,
allQuery.docs[3].data().cards,
allQuery.docs[4].data().cards,
allQuery.docs[5].data().cards).sort();
filledCards = compareCards;
} else {
const userQuery = await userRef
.where('name', '==', listName.value)
.get();

const doc = userQuery.docs[0];
compareCards = doc.data().cards.sort();

const allQuery = await userRef.get();
filledCards = allQuery.docs[0].data().cards.concat(
allQuery.docs[1].data().cards,
allQuery.docs[2].data().cards,
allQuery.docs[3].data().cards,
allQuery.docs[4].data().cards,
allQuery.docs[5].data().cards).sort();
}

// Display only the selected set
let setBox = document.querySelector(".s" + setNumber);
if (setBox) {
setBox.style.display = "flex";
let setCards = allSets[setNumber];

if (setCards && setCards.length > 0) {
for (let i = 0; i < setCards.length; i++) {
let cardResult = document.querySelector(".s" + setNumber + "c" + i);
if (cardResult) {
cardResult.style.border = "none";
cardResult.style.opacity = "1";

if (compareCards.includes(setCards[i])) {
cardResult.src = "img/" + setCards[i] + ".png";
cardResult.style.width = "110px";
}
else {
if (filledCards.includes(setCards[i])) {
cardResult.src = "img/" + setCards[i] + ".png";
cardResult.style.border = "2px lightcyan solid";
cardResult.style.opacity = "0.6";
}
else {
cardResult.src = "Back.png";
}
cardResult.style.width = "110px";
}
if (setCards[i].includes("-A")) {
cardResult.style.border = "2px red solid";
}
if (setCards[i].includes("-P")) {
cardResult.style.border = "2px blue solid";
}
}
}
}
}
}

loadSingleSet();
}
}
}

// Initialize when the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
populateSetSelector();
});
}



async function loadCards() {
  const userRef = db.collection('users');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let prevCard = "";
  let userCards = [];

  let colList = document.querySelector('.collectionList');
  let userList = colList.id;
  if(userList=="all"){
    awardChecker();
  }
  if(userList!=="all" && userList!=="sets" && userList!=="mission"){
    console.log(userList);
    const userQuery = await userRef
          .where('name', '==', userList)
          .get();
    const doc = userQuery.docs[0];
    userCards = doc.data().cards;
    
    let sortType = document.querySelector(".sortSelect");
    if(sortType.value=="num"){
      userCards=userCards.sort();
    } else if(sortType.value=="numRev"){
      userCards=userCards.sort();
      userCards=userCards.reverse();
    } else if(sortType.value=="rec"){
      userCards=userCards.reverse();
    } else if(sortType.value=="rar"){
      userCards=sortByRarity(userCards.sort());
    } else if(sortType.value!=="old"){
      userCards=userCards.sort();
    }
    
  } else if(userList=="mission"){
    const missRef = db.collection('mission');
    const missQuery = await missRef.get();
    userCards = missQuery.docs[0].data().cards;
    console.log(userCards);
  } else{
    const userQuery = await userRef.get();
    userCards = userQuery.docs[0].data().cards.concat(
      userQuery.docs[1].data().cards, 
      userQuery.docs[2].data().cards, 
      userQuery.docs[3].data().cards,
      userQuery.docs[4].data().cards, 
      userQuery.docs[5].data().cards).sort();
  }
  
  if(userList=="sets"){
    colList.style.display = "none";
    loadSets(userCards);
    return;
  }
  console.log(userCards);
  let storeCards = userCards.slice();
  
  // Clear existing cards
  colList.innerHTML = '';
  
  // Dynamically generate card elements for all cards
  for (let i = 0; i < userCards.length; i++) {
    // Create new list item and image for each card
    const listItem = document.createElement('li');
    const image = document.createElement('img');
    
    // Set image properties
    image.className = `c${i}`;
    image.src = "img/" + userCards[i] + ".png";
    image.style.width = "110px";
    image.style.border = "none";
    image.setAttribute('onClick', `enlarge('c${i}')`);
    
    // Check for duplicate cards
    if (userCards[i] == prevCard) {
      let prevCardResult = document.querySelector(`.c${i - 1}`);
      if (prevCardResult) {
        prevCardResult.style.border = "2px yellow solid";
      }
      image.style.border = "2px yellow solid";
    } else {
      let curStr = storeCards.splice(i, 1);
      if (storeCards.includes(curStr[0])) {
        console.log(curStr[0]);
        image.style.border = "2px yellow solid";
      }
      storeCards.splice(i, 0, curStr[0]);
    }
    
    // Add image to list item
    listItem.appendChild(image);
    
    // Add list item to collection list
    colList.appendChild(listItem);
    
    prevCard = userCards[i];
  }
  
  // Update or create the card count display
  let countDisplay = document.getElementById('cardCount');
  if (!countDisplay) {
    countDisplay = document.createElement('div');
    countDisplay.id = 'cardCount';
    countDisplay.style.textAlign = 'center';
    countDisplay.style.color = 'darkblue';
    countDisplay.style.marginTop = '10px';
    countDisplay.style.fontWeight = 'bold';
    
    // Insert count after the collection list
    colList.parentNode.insertBefore(countDisplay, colList.nextSibling);
  }
  
  // Update the count text
  countDisplay.textContent = `Total Cards: ${userCards.length}`;
}
loadCards();


//Loads All Sets if That Collect Sets Page is Opened
async function loadSets(allCards) {
  let compareCards;
  let filledCards;
  let listName = document.querySelector(".players");
  const userRef = db.collection('users');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (listName.value == "all") {
    compareCards = allCards;
    filledCards = allCards;
  } else {
    const userQuery = await userRef
      .where('name', '==', listName.value)
      .get();
    
    const doc = userQuery.docs[0];
    compareCards = doc.data().cards.sort();
    filledCards = allCards;
  }

  console.log("HERE");

  for (let setList = 1; setList < allSets.length; setList++) {
    let setBox = document.querySelector(".s" + setList);
    setBox.style.display = "flex";
    let setCards = allSets[setList];
    console.log(setCards);

    for (let i = 0; i < setCards.length; i++) {
      let cardResult = document.querySelector(".s" + setList + "c" + i);
      cardResult.style.border = "none";
      cardResult.style.opacity = "1";

      if (compareCards.includes(setCards[i])) {
        cardResult.src = "img/" + setCards[i] + ".png";
        cardResult.style.width = "110px";
      }
      else {
        if (filledCards.includes(setCards[i])) {
          cardResult.src = "img/" + setCards[i] + ".png";
          cardResult.style.border = "2px lightcyan solid";
          cardResult.style.opacity = "0.6";
        }
        else {
          cardResult.src = "Back.png";
        }
        cardResult.style.width = "110px";
      }
      if (setCards[i].includes("-A")) {
        let cardResult = document.querySelector(".s" + setList + "c" + i);
        cardResult.style.border = "2px red solid";
      }
      if (setCards[i].includes("-P")) {
        let cardResult = document.querySelector(".s" + setList + "c" + i);
        cardResult.style.border = "2px blue solid";
      }
    }
  }
}

//Enlarges Card
function enlarge(card) {
  console.log("enlarge" + card + "<-");
  let cardImg = document.querySelector("." + card);
  let showEnlarge = document.querySelector(".large");
  showEnlarge.src = cardImg.src;
  showEnlarge.style.display = "block";
  addOwned(cardImg.src);
  window.scrollTo(0, 0);
}

//Hides the Enlarged Card
function hide() {
  console.log("hide");
  let hideEnlarge = document.querySelector(".large");
  hideEnlarge.src = "Pack.png";
  hideEnlarge.style.display = "none";
  let ownText = document.querySelector(".owned");
  ownText.innerHTML = "";
  ownText.display = "none";
}

//Clicker Button
async function clicked() {
  const userRef = db.collection('users');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(currentUser);
  const userQuery = await userRef
        .where('name', '==', currentUser.username)
        .get();
  const doc = userQuery.docs[0];
  
  let time = new Date(doc.data().clickTime);
  let now = new Date();
  time.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  console.log(now.getTime());
  if (!(now - time >= 86400000)) { // 86400000 ms = 1 day
    window.alert("You have already earned your Clicker Pack Token today!");
    return;
  }
  
  if(Math.floor(Math.random() * 1000) + 1 == 1){
    console.log("+1 Token");
    let newTokens = doc.data().tokens +1;
    await doc.ref.update({
      clickTime: now.getTime(),
      tokens: newTokens
    });
    window.alert("YOU EARNED 1 PACK TOKEN!");
    location.reload();
  } else {
    let click = document.querySelector(".clicker");
    click.style.backgroundColor=getRandomColor();
  }
}

//Generates Random Color for Clicker Button
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Sorts array of cards by last digit
function sortByLastDigit(arr) {
  return arr.sort((a, b) => {
    const lastCharA = a.slice(-1);
    const lastCharB = b.slice(-1);
    const lastDigitA = isNaN(lastCharA) ? 20 : parseInt(lastCharA, 10);
    const lastDigitB = isNaN(lastCharB) ? 20 : parseInt(lastCharB, 10);
    return lastDigitA - lastDigitB;
  });
}

function sortByRarity(arr){
  const arrayOrder = {
    C: 0,
    U: 1,
    R: 2,
    E: 3,
    L: 4
  };
  const allArrays = { C, U, R, E, L };
  
  const stringToOrderMap = {};
  for (const [key, array] of Object.entries(allArrays)) {
      array.forEach((str, idx) => {
          stringToOrderMap[str] = { order: arrayOrder[key], index: idx };
      });
  }

  // Filter the input array to include only strings from C, U, R, E, or L
  let rarArray = arr.filter(str => stringToOrderMap[str]);

  // Sort the filtered array based on the order of the arrays and index within each array
  rarArray.sort((a, b) => {
      const orderA = stringToOrderMap[a].order;
      const orderB = stringToOrderMap[b].order;

      // First compare by the order of arrays (C first, U second, etc.)
      if (orderA === orderB) {
          // If they belong to the same array, compare by their index in that array
          return stringToOrderMap[a].index - stringToOrderMap[b].index;
      } else {
          return orderA - orderB;
      }
  });

  const aOrPStrings = arr.filter(str => {
    return (str.endsWith("A") || str.endsWith("P")) && 
     !str.startsWith("V") && 
     !str.startsWith("S");
  });
  console.log(arr.sort());
  console.log(rarArray);
  console.log(rarArray.length);
  let newArray = arr.sort().slice(rarArray.length+aOrPStrings.length);
  console.log(newArray);
  newArray = rarArray.concat(newArray);
  newArray = newArray.concat(aOrPStrings);
  return newArray;
}

/*
//Checks if an award has been earned and awards it
async function awardChecker() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userRef = db.collection('users');
  const userQuery = await userRef
        .where('name', '==', currentUser.username)
        .get();
  const doc = userQuery.docs[0];
  let userCards = doc.data().cards;
  let newTokens = doc.data().tokens;

  const allQuery = await userRef.get();
  let allCards = allQuery.docs[0].data().cards.concat(
    allQuery.docs[1].data().cards, 
    allQuery.docs[2].data().cards, 
    allQuery.docs[3].data().cards,
    allQuery.docs[4].data().cards, 
    allQuery.docs[5].data().cards).sort();
  
  let awarded=false;
  for (let i = 1; i < awardSets.length; i++) {
    let list = awardSets[i];

    // Filter out items ending in A or P
    let requiredCards = list.filter(card => !card.endsWith('A') && !card.endsWith('P'));

    // Check if userCards contains all requiredCards
    let containsAll = requiredCards.every(card => userCards.includes(card));
    let cardWithoutAorP = requiredCards[0].slice(0, -2); // Remove -1, -2, etc.

    if (containsAll) {
      awarded=true;
      console.log("Set awarded: " + i);
      // Remove the required cards from userCards
      userCards = userCards.filter(card => {
          if (requiredCards.includes(card)) {
              requiredCards = requiredCards.filter(requiredCard => requiredCard !== card);
              return false;
          }
          return true;
      });

      // Check if the -P card is already in allCards
      let minusPCard = cardWithoutAorP + '-P';
      let minusACard = cardWithoutAorP + '-A';

      newTokens=newTokens+2;
      if (!allCards.includes(minusPCard)&&awardSets[i].includes(minusPCard)) {
        console.log("Award P");
        // Add the -P card to userCards if not in allCards
        userCards.push(minusPCard);
        alert("Prime Award earned! +2 Tokens");
      } else {
        console.log("Award A");
        // Add the -A card to userCards if the -P card is already in allCards
        userCards.push(minusACard);
        alert("Award earned! +2 Tokens");
      }
    }
  }
  if(awarded){
    console.log("awarding");
    await doc.ref.update({
      cards: userCards,
      tokens: newTokens
    });
  }
}*/

//Checks if an award has been earned and awards it
async function awardChecker() {
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userRef = db.collection('users');
  const userQuery = await userRef
        .where('name', '==', currentUser.username)
        .get();
  const doc = userQuery.docs[0];
  let userCards = doc.data().cards;

  const allQuery = await userRef.get();
  let allCards = allQuery.docs[0].data().cards.concat(
    allQuery.docs[1].data().cards, 
    allQuery.docs[2].data().cards, 
    allQuery.docs[3].data().cards,
    allQuery.docs[4].data().cards, 
    allQuery.docs[5].data().cards).sort();
  let usersTokens = [allQuery.docs[0].data().tokens,allQuery.docs[1].data().tokens,allQuery.docs[2].data().tokens,allQuery.docs[3].data().tokens,allQuery.docs[4].data().tokens,allQuery.docs[5].data().tokens];
  let usersCards = [allQuery.docs[0].data().cards,allQuery.docs[1].data().cards,allQuery.docs[2].data().cards,allQuery.docs[3].data().cards,allQuery.docs[4].data().cards,allQuery.docs[5].data().cards];
  
  let awarded=false;
  for (let i = 0; i < awardSets.length; i++) {
    // Loop through all users to check if they need awards
    for(let num = 0; num < 6; num++){
      let list = awardSets[i];
      // Filter out items ending in A or P
      let requiredCards = list.filter(card => !card.endsWith('A') && !card.endsWith('P'));
      
      console.log(allQuery.docs[num].data().name + " " + num);
      // Check if current User's Cards contains all requiredCards
      let containsAll = requiredCards.every(card => usersCards[num].includes(card));
      let cardWithoutAorP = requiredCards[0].slice(0, -2); // Remove -1, -2, etc.
  
      if (containsAll) {
        awarded=true;
        console.log("Set awarded: " + i);
        // Remove the required cards from the current User's Cards
        usersCards[num] = usersCards[num].filter(card => {
            if (requiredCards.includes(card)) {
                requiredCards = requiredCards.filter(requiredCard => requiredCard !== card);
                return false;
            }
            return true;
        });
  
        // Check if the -P card is already in allCards
        let minusPCard = cardWithoutAorP + '-P';
        let minusACard = cardWithoutAorP + '-A';
  
        usersTokens[num]=usersTokens[num]+3;
        let curName=allQuery.docs[num].data().fullName;
        if(cardWithoutAorP=="B1"){
          let randSelec = [...B2, minusACard];
          let ranIndex = Math.floor(Math.random() * randSelec.length);
          console.log("Award B " + minusACard);
          usersCards[num].push(randSelec[ranIndex]);
          if(ranIndex==6){
            alert("Set B1 Award & 3 Tokens earned for " + curName + "!");
          } else{
            alert("Ruby Edition Card " + randSelec[ranIndex] + " & 3 Tokens earned for " + curName + "!");
          }
        }
        else if (!allCards.includes(minusPCard)&&awardSets[i].includes(minusPCard)) {
          console.log("Award P " + minusPCard);
          // Add the -P card to usersCards[num] if not in allCards
          usersCards[num].push(minusPCard);
          alert("Set " + cardWithoutAorP + " Prime Award & 3 Tokens earned for " + curName + "!");
        } else {
          console.log("Award A " + minusACard);
          // Add the -A card to usersCards[num] if the -P card is already in allCards
          usersCards[num].push(minusACard);
          alert("Set " + cardWithoutAorP + " Award & 3 Tokens earned for " + curName + "!");
        }
      }
    }
  }

  for(let num = 0; num < 6; num++){
    const docAll = allQuery.docs[num];
    await docAll.ref.update({
      cards: usersCards[num],
      tokens: usersTokens[num]
    });
  }
}


async function addOwned(cardSrc){
  
  const userRef = db.collection('users');
  const allQuery = await userRef.get();
  let ownText = document.querySelector(".owned");
  ownText.style.display = "block";
  ownText.innerHTML = "";
  let cutSrc = cardSrc.split("img/")[1].replace(".png", "");

  console.log("cards" + (allQuery.docs[0].data().cards) + " - " + cutSrc);
  if ((allQuery.docs[0].data().cards).includes(cutSrc)) {
    ownText.innerHTML += "DCGem, ";
  }
  if ((allQuery.docs[1].data().cards).includes(cutSrc)) {
    ownText.innerHTML += "DCMetro, ";
  }
  if ((allQuery.docs[2].data().cards).includes(cutSrc)) {
    ownText.innerHTML += "Jig, ";
  }
  if ((allQuery.docs[3].data().cards).includes(cutSrc)) {
    ownText.innerHTML += "Peach, ";
  }
  if ((allQuery.docs[4].data().cards).includes(cutSrc)) {
    ownText.innerHTML += "VoidMax, ";
  }
  if ((allQuery.docs[5].data().cards).includes(cutSrc)) {
    ownText.innerHTML += "Zaveeya, ";
  }
  
  console.log("own add");
  ownText.innerHTML = ownText.innerHTML.substring(0, ownText.innerHTML.length - 2);
  console.log("owners " + ownText.innerHTML);
}


//Checks if mission is complete
async function checkMiss() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userRef = db.collection('users');
  const userQuery = await userRef
        .where('name', '==', currentUser.username)
        .get();
  const doc = userQuery.docs[0];
  const allQuery = await userRef.get();
  let allCards = allQuery.docs[0].data().cards.concat(
    allQuery.docs[1].data().cards, 
    allQuery.docs[2].data().cards, 
    allQuery.docs[3].data().cards,
    allQuery.docs[4].data().cards, 
    allQuery.docs[5].data().cards).sort();
  let userCards = doc.data().cards;
  let newTokens = doc.data().tokens;

  // Get Mission cards
  const missRef = db.collection('mission');
  const missQuery = await missRef.get();
  let missCards = missQuery.docs[0].data().cards;
  let missNum = missQuery.docs[0].data().missNum;
  console.log(missCards);
  
  // Check if userCards contains all missCards
  let containsAll = missCards.every(card => userCards.includes(card));

  // Returns if mission is not complete
  if(!containsAll){
    console.log("Not Complete");
    alert("You have not completed the Mission.");
    return;
  }
  // Adds token if mission complete
  newTokens=newTokens+1;
  console.log("Mission Complete");
  alert("Mission Complete! +1 Token");
  await doc.ref.update({
    tokens: newTokens
  });

  // Gets new Mission
  let cardDeck = missionSets.flat();
  let newMission = randMission(cardDeck, allCards);
  console.log(newMission);
  missNum=missNum+1;

  let missDoc = missQuery.docs[0];
  await missDoc.ref.update({
    cards: newMission,
    missNum: missNum
  });
  location.reload();
}

function randMission(deck, all) {
  let newMiss = [];
  
  while (newMiss.length < 6 && deck.length > 0) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    console.log(deck[randomIndex]);
    if(all.includes(deck[randomIndex])){
      newMiss.push(deck[randomIndex]);
      deck.splice(randomIndex, 1);
    }
  }

  return newMiss;
}
