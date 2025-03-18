//TRADE SENDING FUNCTIONS


const currentUser = JSON.parse(localStorage.getItem('currentUser'));
const currentUsername = currentUser.username.toLowerCase();
function loadMenu() {
  // Get the select menu element
  const selectMenu = document.querySelector('select[name="Tplayers"]');
  
  // Loop through each option in the select menu
  const options = selectMenu.querySelectorAll('option');
  
  options.forEach(option => {
    // Compare the value of the option with the current user's username
    if (option.value.toLowerCase() === currentUsername) {
      // Remove the option if it matches
      option.remove();
    }
  });
}
loadMenu();


let tradeCards = ["","","","","",""]; // Array to store the cards added to the trade list
let indexCards = [0,0,0,0,0,0];
let savedTrade = "";
let tradeTo = "";

// Move the card to the trade list when clicked in resultList
function moveToTradeList(cardClass) {
  console.log('move ' + cardClass);
  const cardElement = document.querySelector(`.${cardClass}`);

  // Add the card to the trade list
  const cardImage = cardElement.src; // Get the image source of the card
  const tradeSlot = findEmptyTradeSlot(cardImage,parseInt(cardClass.replace(/\D/g, ''), 10));
  
  if (tradeSlot !== null) {
    console.log('moving');
    // Mark the card as selected (faded) in resultList
    cardElement.style.opacity = "0.5";  // Fade out the card in the resultList
    cardElement.style.pointerEvents = "none";  // Disable further clicking

    // Update the corresponding tradeList slot with the card image
    const tradeSlotImage = tradeSlot.querySelector("img");
    tradeSlotImage.src = cardImage;
    tradeSlotImage.style.width = "110px"; // Set size for image
  }
}

// Remove the card from the trade list when clicked
function removeFromTradeList(cardClass) {
    console.log('remove ' + cardClass);
    const tradeSlot = document.querySelector(`.${cardClass}`);
    const tradeSlotSrc = tradeSlot.src;
    //const tradeSlotImage = tradeSlot.querySelector("img");
  
    console.log('removing ' + tradeSlot);
    console.log('removing ' + tradeSlotSrc);
    // Ensure tradeSlotImage exists before accessing src
    if (tradeSlot !== null) {
      console.log('remover');
  
      // Find the index of the card in tradeCards array and remove it
      const cardIndex = parseInt(cardClass.replace(/\D/g, ''), 10);
      
      console.log('remover' + tradeSlot.src);
      // Reset the trade slot to default (hide image and set to "Pack.png")
      tradeSlot.src = "Pack.png";
      tradeSlot.style.width = "0px";  // Hide image
  
      // Find a result slot with the matching src to restore opacity
      const slotToRestore = findMatchingResultSlot(tradeSlotSrc,indexCards[parseInt(cardClass.replace(/\D/g, ''), 10)]);
      if (slotToRestore) {
        console.log('FOUND matching result slot');
        const cardElement = slotToRestore.querySelector("img");
        // Set opacity back to 1 and restore visibility in the result list
        console.log('FOUND' + cardElement.src);
        cardElement.style.opacity = "1";  // Restore opacity
        cardElement.style.pointerEvents = "auto";  // Re-enable clicking
      }

      if (cardIndex !== -1) {
        tradeCards[cardIndex]="";
        indexCards[cardIndex]=0;
      }
    }
  }
  
  function findMatchingResultSlot(src,index) {
    if(src !== "pack.png"){
      console.log('find matching result slot' + index);
      const resultListItems = document.querySelectorAll(".resultList li");
      
      for (let i = 0; i < resultListItems.length; i++) {
        const resultSlotImage = resultListItems[i].querySelector("img");
        
        // If a slot with matching src is found, return it
        if (i == index) {
          console.log('YES ' + i);
          return resultListItems[i];
        }
      }
    }
    return null; // No matching slot found
  }

// Find the first empty slot in the tradeList
function findEmptyTradeSlot(tradeVal, indexVal) {
  console.log('find empty');
  const tradeListItems = document.querySelectorAll(".tradeList li");

  for (let i = 0; i < tradeListItems.length; i++) {
    console.log('search');
    const tradeSlotImage = tradeListItems[i].querySelector("img");

    if (tradeSlotImage.width === 0) {
      console.log('found');
      tradeCards[i]=tradeVal; // Store the card in the tradeCards array
      indexCards[i]=indexVal; //get index in resultList
      return tradeListItems[i];
    }
  }
  return null; // No empty slots available
}

// Reset the trade list to be empty
function resetTradeList() {
  // Empty the tradeCards array
  console.log('reset + tradeSlotImage.src');
  // Reset each trade list slot
  const tradeListItems = document.querySelectorAll(".tradeList li");
  tradeListItems.forEach((tradeSlot) => {
    console.log('resetting ' + tradeSlot);
    const tradeSlotImage = tradeSlot.querySelector("img");
    console.log(findFadedResultSlot(tradeSlotImage.src,indexCards[tradeCards.indexOf(tradeSlotImage.src)]));
    console.log('resetted ' + tradeSlotImage.src);
    tradeSlotImage.src = "Pack.png";  // Set image to "pack.png"
    tradeSlotImage.style.width = "0px";  // Set image width to 0px
  });

  tradeCards = ["","","","","",""];
  indexCards = [0,0,0,0,0,0];
}

function findFadedResultSlot(src,index) {
  tradeCards[indexCards.indexOf(index)]="";
  if(src !== "pack.png"){
    console.log('find faded result slot ' + index);
    const resultListItems = document.querySelectorAll(".resultList li");
    
    for (let i = 0; i < resultListItems.length; i++) {
      const resultSlotImage = resultListItems[i].querySelector("img");
      
      // If a slot with matching src is found, fix it
      if (i == index) {
        
        resultSlotImage.style.opacity = "1";  // Restore opacity
        resultSlotImage.style.pointerEvents = "auto";  // Re-enable clicking
        console.log('YESS' + i);
      }
    }
    return true;
  }
  return false; // No matching slot found
}





function saveTrade() {
  //check tradeCards isn't empty
  if(tradeCards.filter(card => card !== "").length==0){
    console.log("zero");
    window.alert("You must select at least 1 Card to trade. Please try again.");
    return;
  }
  updatePage();
  addYourCards();
  
  // Join the cards array into a single string with commas
  let saveCards = tradeCards.filter(card => card !== "");
  saveCards = saveCards.map(cardurl => {
    // Use a regular expression to match the part after the last '/' and before '.png'
    let match = cardurl.match(/\/([^\/]+)\.png$/);
    return match ? match[1] : cardurl;  // Return the shortened part if a match is found
  });
  let cardsString = saveCards.join(',');
  // Combine the name and the cards string
  tradeTo = document.querySelector(".Tplayers").value;
  savedTrade = currentUsername + " " + cardsString;
  console.log(savedTrade);
  console.log(tradeTo);
}

function updatePage() {
  // Change the "Trading with" text
  const tradingText = document.querySelector('p');
  tradingText.textContent = "Select your cards to trade:";

  // Hide the Tplayers selector
  const tPlayersSelect = document.querySelector('.Tplayers');
  tPlayersSelect.style.display = "none";

  // Hide the Trade With text
  const tradeWith = document.querySelector('.tradeText');
  tradeWith.style.display = "none";

  // Hide the Search button
  const searchButton = document.querySelector('.compare');
  searchButton.style.display = "none";

  // Hide the Confirm Trade button
  const confirmTradeButton = document.querySelectorAll('.compare')[1]; // We target the second button here
  confirmTradeButton.style.display = "none";

  // Make Your Cards: text and yourList visible
  const yoursFix = document.querySelector('.yours');
  yoursFix.style.display = "inline-block";
  const yourListFix = document.querySelector('.yourList');
  yourListFix.style.display = "flex";

  // Make Send Trade button visible
  const sendTradeButton = document.querySelector('.send');
  sendTradeButton.style.display = "inline-block";

  // Hide the resultList
  const resultListHide = document.querySelector('.resultList');
  resultListHide.style.display = "none";

  //Make myList visible
  const myListFix = document.querySelector('.myList');
  myListFix.style.display = "flex";

  const tradeListItems = document.querySelectorAll(".tradeList li");
  tradeListItems.forEach((tradeSlot) => {
    console.log('resetting ' + tradeSlot);
    const tradeSlotImage = tradeSlot.querySelector("img");
    console.log(findFadedResultSlot(tradeSlotImage.src,indexCards[tradeCards.indexOf(tradeSlotImage.src)]));
    console.log('resetted ' + tradeSlotImage.src);
  });
}

async function addYourCards() {

  for (let i = 0; i < 99; i++) {
    let cardResult = document.querySelector(".f" + i);
    cardResult.src = "Pack.png";
    cardResult.style.width = "0px";
    cardResult.style.border = "0";
  }


  let TlistName = currentUsername;
  let Tlist;
  const userRef = db.collection('users');
  if (TlistName == "gem") {
    const userQuery = await userRef
          .where('name', '==', 'gem')
          .get();
    
    const doc = userQuery.docs[0];
    Tlist = doc.data().cards.sort();
  }
  if (TlistName == "dc") {
    const userQuery = await userRef
          .where('name', '==', 'dc')
          .get();
    
    const doc = userQuery.docs[0];
    Tlist = doc.data().cards.sort();
  }
  if (TlistName == "void") {
    const userQuery = await userRef
          .where('name', '==', 'void')
          .get();
    
    const doc = userQuery.docs[0];
    Tlist = doc.data().cards.sort();
  }
  if (TlistName == "zav") {
    const userQuery = await userRef
          .where('name', '==', 'zav')
          .get();
    
    const doc = userQuery.docs[0];
    Tlist = doc.data().cards.sort();
  }

  let noTdupes = [];
  let Tdupes = [];
  let prevCard = null;
  for (let i = 0; i < Tlist.length; i++) {
    if (Tlist[i] != prevCard) {
      noTdupes.push(Tlist[i]);
    }
    else {
      Tdupes.push(Tlist[i]);
    }
    prevCard = Tlist[i];
  }

  console.log(noTdupes);

  let num = 0;
  for (let i = 0; i < Tlist.length; i++) {
    console.log("test");
    let cardResult = document.querySelector(".f" + num);
    cardResult.src = "img/" + Tlist[i] + ".png";
    cardResult.style.width = "110px";
    if (Tdupes.includes(Tlist[i])) {
      cardResult.style.border = "2px yellow solid";
    }
    num++;
  }
}




let yourCards = ["","","","","",""]; // Array to store the cards added to the your list
let yourIndexCards = [0,0,0,0,0,0];

// Move the card to the trade list when clicked in resultList
function moveToYourList(cardClass) {
  console.log('move ' + cardClass);
  const cardElement = document.querySelector(`.${cardClass}`);

  // Add the card to the trade list
  const cardImage = cardElement.src; // Get the image source of the card
  const yourSlot = findEmptyYourSlot(cardImage,parseInt(cardClass.replace(/\D/g, ''), 10));
  
  if (yourSlot !== null) {
    console.log('moving');
    // Mark the card as selected (faded) in resultList
    cardElement.style.opacity = "0.5";  // Fade out the card in the resultList
    cardElement.style.pointerEvents = "none";  // Disable further clicking

    // Update the corresponding tradeList slot with the card image
    const yourSlotImage = yourSlot.querySelector("img");
    yourSlotImage.src = cardImage;
    yourSlotImage.style.width = "110px"; // Set size for image
  }
}

// Remove the card from the trade list when clicked
function removeFromYourList(cardClass) {
    console.log('removeyour ' + cardClass);
    const yourSlot = document.querySelector(`.${cardClass}`);
    const yourSlotSrc = yourSlot.src;
    //const tradeSlotImage = tradeSlot.querySelector("img");
  
    console.log('removingyour ' + yourSlot);
    // Ensure tradeSlotImage exists before accessing src
    if (yourSlot !== null) {
      console.log('remover');
  
      // Find the index of the card in tradeCards array and remove it
      const cardIndex = parseInt(cardClass.replace(/\D/g, ''), 10);
      
      console.log('remover' + yourSlot.src);
      // Reset the trade slot to default (hide image and set to "Pack.png")
      yourSlot.src = "Pack.png";
      yourSlot.style.width = "0px";  // Hide image
  
      // Find a result slot with the matching src to restore opacity
      const slotToRestore = findMatchingMySlot(yourSlotSrc,yourIndexCards[parseInt(cardClass.replace(/\D/g, ''), 10)]);
      if (slotToRestore) {
        console.log('FOUND matching my slot');
        const cardElement = slotToRestore.querySelector("img");
        // Set opacity back to 1 and restore visibility in the result list
        console.log('FOUND' + cardElement.src);
        cardElement.style.opacity = "1";  // Restore opacity
        cardElement.style.pointerEvents = "auto";  // Re-enable clicking
      }

      if (cardIndex !== -1) {
        yourCards[cardIndex]="";
        yourIndexCards[cardIndex]=0;
      }
    }
  }
  
  function findMatchingMySlot(src,index) {
    if(src !== "pack.png"){
      console.log('find matching my slot' + index);
      const myListItems = document.querySelectorAll(".myList li");
      
      for (let i = 0; i < myListItems.length; i++) {
        const mySlotImage = myListItems[i].querySelector("img");
        
        // If a slot with matching src is found, return it
        if (i == index) {
          console.log('YES ' + i);
          return myListItems[i];
        }
      }
    }
    return null; // No matching slot found
  }

// Find the first empty slot in the tradeList
function findEmptyYourSlot(yourVal, yourIndexVal) {
  console.log('find your empty');
  const yourListItems = document.querySelectorAll(".yourList li");

  for (let i = 0; i < yourListItems.length; i++) {
    console.log('search');
    const yourSlotImage = yourListItems[i].querySelector("img");

    if (yourSlotImage.width === 0) {
      console.log('found');
      yourCards[i]=yourVal; // Store the card in the tradeCards array
      yourIndexCards[i]=yourIndexVal; //get index in resultList
      return yourListItems[i];
    }
  }
  return null; // No empty slots available
}

async function sendTrade() {
  //check yourCards aren't empty
  if(yourCards.filter(card => card !== "").length==0){
    console.log("zero");
    window.alert("You must select at least 1 Card to trade. Please try again.");
    return;
  }
  
  // Join the cards array into a single string with commas
  let sendCards = yourCards.filter(card => card !== "");
  sendCards = sendCards.map(cardurl => {
    // Use a regular expression to match the part after the last '/' and before '.png'
    let match = cardurl.match(/\/([^\/]+)\.png$/);
    return match ? match[1] : cardurl;  // Return the shortened part if a match is found
  });
  let cardsString = sendCards.join(',');
 // Combine the name and the cards string
  savedTrade = savedTrade + " " + cardsString;
  console.log(savedTrade);

  const userRef = db.collection('users');
  const userQuery = await userRef
        .where('name', '==', tradeTo)
        .get();
  if (!userQuery.empty) {
      const doc = userQuery.docs[0];        
      let currentTrades = doc.data().trades;
      currentTrades.push(savedTrade);
      console.log(doc.data().trades);
      console.log(currentTrades);
      
      await doc.ref.update({
          trades: currentTrades
      });
  }
  location.reload();
}

async function selectTrade() {

  for (let i = 0; i < 99; i++) {
    let cardResult = document.querySelector(".c" + i);
    cardResult.src = "Pack.png";
    cardResult.style.width = "0px";
    cardResult.style.border = "0";
  }


  let TlistName = document.querySelector(".Tplayers");
  let Tlist;
  const userRef = db.collection('users');
  if (TlistName.value == "gem") {
    const userQuery = await userRef
          .where('name', '==', 'gem')
          .get();
    
    const doc = userQuery.docs[0];
    Tlist = doc.data().cards.sort();
  }
  if (TlistName.value == "dc") {
    const userQuery = await userRef
          .where('name', '==', 'dc')
          .get();
    
    const doc = userQuery.docs[0];
    Tlist = doc.data().cards.sort();
  }
  if (TlistName.value == "void") {
    const userQuery = await userRef
          .where('name', '==', 'void')
          .get();
    
    const doc = userQuery.docs[0];
    Tlist = doc.data().cards.sort();
  }
  if (TlistName.value == "zav") {
    const userQuery = await userRef
          .where('name', '==', 'zav')
          .get();
    
    const doc = userQuery.docs[0];
    Tlist = doc.data().cards.sort();
  }

  let noTdupes = [];
  let Tdupes = [];
  let prevCard = null;
  for (let i = 0; i < Tlist.length; i++) {
    if (Tlist[i] != prevCard) {
      noTdupes.push(Tlist[i]);
    }
    else {
      Tdupes.push(Tlist[i]);
    }
    prevCard = Tlist[i];
  }

  console.log(noTdupes);

  let num = 0;
  for (let i = 0; i < Tlist.length; i++) {
    console.log("test");
    let cardResult = document.querySelector(".c" + num);
    cardResult.src = "img/" + Tlist[i] + ".png";
    cardResult.style.width = "110px";
    if (Tdupes.includes(Tlist[i])) {
      cardResult.style.border = "2px yellow solid";
    }
    num++;
  }
}
