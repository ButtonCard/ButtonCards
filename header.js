//HEADER FUNCTIONS

//Required Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLjx4Ys4qnzMfRog74NExTUHdZism8u-I",
  authDomain: "buttoncards.firebaseapp.com",
  databaseURL: "https://buttoncards-default-rtdb.firebaseio.com",
  projectId: "buttoncards",
  storageBucket: "buttoncards.firebasestorage.app",
  messagingSenderId: "1001795754069",
  appId: "1:1001795754069:web:1cbf4305a68f9b45eb5cdc",
  measurementId: "G-F56PTH5YNL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Load Username into Header
window.onload = async function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        // If no user is logged in, redirect to login page
        window.location.href = 'index.html';
    }
  
    const userRef = db.collection('users');
    const userQuery = await userRef
        .where('name', '==', currentUser.username)
        .get();
    const doc = userQuery.docs[0];
    
    if(currentUser.username=="dc"){
      document.getElementById('username').textContent = `User: DCMetro`;
    } else if(currentUser.username=="gem"){
      document.getElementById('username').textContent = `User: DCGemmaster`;
    } else if(currentUser.username=="void"){
      document.getElementById('username').textContent = `User: Voidmaxmph`;
    } else if(currentUser.username=="zav"){
      document.getElementById('username').textContent = `User: zaveeya785`;
    } else{
      document.getElementById('username').textContent = `User: SketchyMan`;
    }

    let opened = new Date(doc.data().open);
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    opened.setHours(0, 0, 0, 0);

    console.log(now);
    console.log(opened);
    // Compare the dates
    if (now - opened >= 86400000) { // 86400000 ms = 1 day
        console.log("At least one day has passed since opened.");
    } else {
        console.log("Less than one day has passed since opened.");
    }
    await doc.ref.update({
      open: now
    });

    let tokens = doc.data().tokens;
    document.getElementById('token').textContent = `Pack Tokens: ` + tokens;
}

//Logout Button Click
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
