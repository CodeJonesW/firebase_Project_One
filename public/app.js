console.log(firebase)

// user sign in and signout via firebase authentication
const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');
const signInButton = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

signInButton.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut()


auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user", user)
        // signed in user's info
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        signOutBtn.hidden = false
        userDetails.innerHTML = `<h3> Hi ${user.displayName}! <p>User Id:${user.uid}</p>`;
    } else {
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
    }
});



// manage notes via firestore
const db = firebase.firestore();

const createNote = document.getElementById('createNote')
const noteList = document.getElementById('notesList')
const noteDiv = document.getElementById('noteDiv')
const noteInput = document.getElementById('noteInput')
let notesRef;
let unsubscribe;


auth.onAuthStateChanged(user => {
    if (user) {

        const { serverTimestamp } = firebase.firestore.FieldValue;

        noteDiv.hidden = false
        notesRef = db.collection('notes')
        createNote.onclick = () => {
            console.log("my note", noteInput.value)
            notesRef.add({
                uid: user.uid,
                descripton: noteInput.value,
                // use servertimeStamp instead of Date.now() so that date obj is consistent across all client devices
                createdAt: serverTimestamp()
            });
        }
    }
});



