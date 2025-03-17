//USER'S COLLECTION FUNCTIONS

//Loads in Cards to List from User's Collection
loadCards();
async function loadCards() {
  const userRef = db.collection('users');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let prevCard = "";
  let userCards = [];

  let colList = document.querySelector('.collectionList');
  let userList = colList.id;
  if(userList!=="all"){
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
