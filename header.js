//HEADER FUNCTIONS

//Load Usernmae into Header
window.onload = function() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(currentUser);
      if (currentUser) {
          if(currentUser.username=="dc"){
            document.getElementById('username').textContent = `Username: DCMetro`;
          } else if(currentUser.username=="gem"){
            document.getElementById('username').textContent = `Username: DCGemmaster`;
          } else if(currentUser.username=="void"){
            document.getElementById('username').textContent = `Username: Voidmaxmph`;
          } else if(currentUser.username=="zav"){
            document.getElementById('username').textContent = `Username: zaveeya785`;
          } else{
            document.getElementById('username').textContent = `Username: SketchyMan`;
          }
      } else {
          // If no user is logged in, redirect to login page
          window.location.href = 'index.html';
      }
  }

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

//Logout Button Click
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
