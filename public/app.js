console.log(firebase)


const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInButton = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

signInButton.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut()


// auth.onAuthStateChanged(user => {
//     if (user) {
//         // signed in user's info
//     }
// })
