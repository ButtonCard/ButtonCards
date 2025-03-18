//USER'S COLLECTION FUNCTIONS

//All Sets Current Available
let List01 = ["01-1", "01-2", "01-3", "01-4", "01-5", "01-6", "01-7", "01-8", "01-A", "01-SA"];
let List02 = ["01-4", "01-5", "01-6"];
let allSets = [null, List01, List02];

//Loads in Cards to List from User's Collection
loadCards();
async function loadCards() {
  const userRef = db.collection('users');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let prevCard = "";
  let userCards = [];

  let colList = document.querySelector('.collectionList');
  let userList = colList.id;
  if(userList!=="all" && userList!=="sets"){
    console.log(userList);
    const userQuery = await userRef
          .where('name', '==', userList)
          .get();
    const doc = userQuery.docs[0];
    userCards = doc.data().cards.sort();
  } else{
    const userQuery = await userRef.get();
    userCards = userQuery.docs[0].data().cards.concat(
      userQuery.docs[1].data().cards, 
      userQuery.docs[2].data().cards, 
      userQuery.docs[3].data().cards).sort();
  }
  if(userList=="sets"){
    colList.style.display = "none";
    loadSets(userCards);
    return;
  }
  console.log(userCards);
  
  for (let i = 0; i < userCards.length; i++) {
    console.log(i);
    let cardResult = document.querySelector(".c" + i);
    cardResult.src = "img/" + userCards[i] + ".png";
    cardResult.style.width = "110px";
    if (userCards[i] == prevCard) {
      let prevCardResult = document.querySelector(".c" + (i - 1));
      prevCardResult.style.border = "2px yellow solid";
      cardResult.style.border = "2px yellow solid";
    }
    prevCard = userCards[i];
  }
}

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
      if (setCards[i].includes("-SA")) {
        let cardResult = document.querySelector(".s" + setList + "c" + i);
        cardResult.style.border = "2px black solid";
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
  window.scrollTo(0, 0);
}

//Hides the Enlarged Card
function hide() {
  console.log("hide");
  let hideEnlarge = document.querySelector(".large");
  hideEnlarge.src = "Pack.png";
  hideEnlarge.style.display = "none";
}
