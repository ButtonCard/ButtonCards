//PACK OPENING FUNCTIONS

//Store Info About Pack Opened
let packSizes = [4,5,6];
let num = 0;
let pack = [];

//Opens Pack and Changes Page to Start Pack Opening Sequence
function openPack(packNum) {
  
  let cardPic = document.querySelector(".pack");
  if (num != 0) {
    cardPic.style.width = "300px";
    cardPic.addEventListener("click", flipCard(cardPic, pack));
    return;
  }

  let packOptions = document.querySelector(".pack-options");
  packOptions.style.display = "none";
  let pageTitle = document.querySelector(".pageTitle");
  pageTitle.style.display = "none";

  let inPack = 0;
  let packSize = packSizes[packNum];

  //MEGA
  if (inPack < packSize && Math.floor(Math.random() * 8) + 1 == 1) {
    let randCard;
    let backUp = 0;
    let cleared = true;
    while (cleared && backUp <= 100) {
      randCard = M[Math.floor(Math.random() * (M.length))];
      if (FULLdupes[FULLcards.indexOf(randCard)] < 1) {
        cleared = false;
      }
      backUp++;
    }
    if (backUp <= 99) {
      pack.push(randCard + ".png");
      inPack++;
    }
    console.log(randCard);
  }

  //FIGURE
  if (inPack < packSize && Math.floor(Math.random() * 14) + 1 == 1) {
    let randCard;
    let backUp = 0;
    let cleared = true;
    while (cleared && backUp <= 100) {
      randCard = F[Math.floor(Math.random() * (F.length))];
      if (FULLdupes[FULLcards.indexOf(randCard)] < 1) {
        cleared = false;
      }
      backUp++;
    }
    if (backUp <= 99) {
      pack.push(randCard + ".png");
      inPack++;
    }
    console.log(randCard);
  }

  //SPECIAL
  if (inPack < packSize && Math.floor(Math.random() * 12) + 1 == 1) {
    console.log("SPECIAL");
    let randCard;
    let backUp = 0;
    let cleared = true;
    while (cleared && backUp <= 100) {
      randCard = SP[Math.floor(Math.random() * (SP.length))];
      if (FULLdupes[FULLcards.indexOf(randCard)] < 1) {
        cleared = false;
        console.log("Got Special");
      }
      backUp++;
    }
    if (backUp <= 99) {
      pack.push(randCard + ".png");
      inPack++;
    }
    console.log(randCard);
  }

  //VARIANT
  for (let i = 0; i < packSize; i++) {
    if (inPack < packSize && Math.floor(Math.random() * 10) + 1 == 1) {
      let randCard;
      let backUp = 0;
      let cleared = true;
      while (cleared && backUp <= 100) {
        randCard = V[Math.floor(Math.random() * (V.length))];
        if (FULLdupes[FULLcards.indexOf(randCard)] < 2) {
          cleared = false;
        }
        backUp++;
      }
      if (backUp <= 99) {
        pack.push(randCard + ".png");
        inPack++;
      }
      console.log(randCard);
    }
  }

  //LEGENDARY
  if (inPack < packSize && Math.floor(Math.random() * 12) + 1 == 1) {
    let randCard;
    let backUp = 0;
    let cleared = true;
    while (cleared && backUp <= 100) {
      randCard = L[Math.floor(Math.random() * (L.length))];
      if (FULLdupes[FULLcards.indexOf(randCard)] < 1) {
        cleared = false;
      }
      backUp++;
    }
    if (backUp <= 99) {
      pack.push(randCard + ".png");
      inPack++;
    }
    console.log(randCard);
  }

  //EPIC
  for (let i = 0; i < packSize; i++) {
    if (inPack < packSize && Math.floor(Math.random() * 20) + 1 == 1) {
      let randCard;
      let backUp = 0;
      let cleared = true;
      while (cleared && backUp <= 100) {
        randCard = E[Math.floor(Math.random() * (E.length))];
        if (FULLdupes[FULLcards.indexOf(randCard)] < 3) {
          cleared = false;
        }
        backUp++;
      }
      if (backUp <= 99) {
        pack.push(randCard + ".png");
        inPack++;
      }
      console.log(randCard);
    }
  }

  //RARE
  for (let i = 0; i < packSize; i++) {
    if (inPack < packSize && Math.floor(Math.random() * 7) + 1 == 1) {
      let randCard;
      let backUp = 0;
      let cleared = true;
      while (cleared && backUp <= 100) {
        randCard = R[Math.floor(Math.random() * (R.length))];
        if (FULLdupes[FULLcards.indexOf(randCard)] < 5) {
          cleared = false;
        }
        backUp++;
      }
      if (backUp <= 99) {
        pack.push(randCard + ".png");
        inPack++;
      }
      console.log(randCard);
    }
  }

  //UNCOMMON
  for (let i = 0; i < packSize; i++) {
    if (inPack < packSize && Math.floor(Math.random() * 3) + 1 == 1) {
      let randCard;
      let backUp = 0;
      let cleared = true;
      while (cleared && backUp <= 100) {
        randCard = U[Math.floor(Math.random() * (U.length))];
        if (FULLdupes[FULLcards.indexOf(randCard)] < 8) {
          cleared = false;
        }
        backUp++;
      }
      if (backUp <= 99) {
        pack.push(randCard + ".png");
        inPack++;
      }
      console.log(randCard);
    }
  }

  //COMMON
  for (let i = inPack; i < packSize; i++) {
    pack.push(C[Math.floor(Math.random() * (C.length))] + ".png");
  }

  shuffle(pack);
  console.log(pack);

  cardPic.style.width = "300px";
  cardPic.addEventListener("click", flipCard(cardPic, pack));
}

//Flips to Next Card When Opening Pack, Calls to Show Results When Pack is Empty
function flipCard(cardPic, pack) {
  if (num == pack.length) {
    cardPic.src = "Pack.png";
    cardPic.style.width = "0";
    console.log("results");
    results(pack);
    num++;
    return;
  } else if (num>=pack.length){
    cardPic.src = "Pack.png";
    cardPic.style.width = "0";
    console.log("remove");
    return;
  }
  cardPic.src = "img/" + pack[num];
  console.log(num);
  num++;
}

//Shows all the Cards from the Pack and adds them to the User's Collection
async function results(pack) {
  console.log(pack);
  let resultBack = document.querySelector(".resultList");
  resultBack.style.display = "flex";

  let resTitle = document.querySelector(".resultTitle");
  resTitle.style.display = "block";

  const userRef = db.collection('users');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userQuery = await userRef
    .where('name', '==', currentUser.username.toLowerCase())
    .get();

  const doc = userQuery.docs[0];
  let currentCards = doc.data().cards;
  let newCards = currentCards;

  let cardsOut = document.querySelector(".resultCards");
  cardsOut.innerHTML = "Cards: [";
  for (let i = 0; i < pack.length; i++) {
    cardsOut.innerHTML = cardsOut.innerHTML + pack[i].substring(0, pack[i].length - 4) + ", ";
    newCards = newCards.concat([pack[i].substring(0, pack[i].length - 4)]);
  }
  cardsOut.innerHTML = cardsOut.innerHTML.substring(0, cardsOut.innerHTML.length - 2) + "]";
  cardsOut.style.display = "block";

  await doc.ref.update({
      cards: newCards
  });

  for (let i = 0; i < pack.length; i++) {
    console.log(i);
    let cardResult = document.querySelector(".i" + i);
    cardResult.src = "img/" + pack[i];
    cardResult.style.width = "100px";
    cardResult.style.margin = "5px";
  }
}

//Shuffles Pack of Cards
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
