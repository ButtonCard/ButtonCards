//TRADE SENDING FUNCTIONS

//load cards into list for user to select from
async function loadUserCards() {

  let Tlist;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentUsername = currentUser.username.toLowerCase();
  const userRef = db.collection('users');
  
  const userQuery = await userRef
        .where('name', '==', currentUsername)
        .get();
  const doc = userQuery.docs[0];
  Tlist = doc.data().cards.sort();

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
await loadUserCards();
