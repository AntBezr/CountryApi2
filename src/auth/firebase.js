import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzpX83_WObvKZBiHdsw3TMFck7bmQck0Y",
  authDomain: "countryapi-f528c.firebaseapp.com",
  projectId: "countryapi-f528c",
  storageBucket: "countryapi-f528c.appspot.com",
  messagingSenderId: "570056839675",
  appId: "1:570056839675:web:4a224a0bb489ff2a86fb5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  }
  catch (err) {
    console.log(err);
    alert(err.message)
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    })
  }
  catch (err) {
    console.log(err);
    alert(err.message)
  }
}

const logout = () => {
  signOut(auth)
}

export const addFavouriteToFirebase = async (uid, countryName) => {
  try {
    await addDoc(collection(db, `users/${uid}/favourites`), { countryName });
    console.log("Favourites added to favourites firebase");
  } catch (err) {
    console.log("Error adding favourites to firebase", err);
  }
}

export const removeFavouriteFromFirebase = async (uid, countryName) => {
  try {
    if (!countryName) {
      console.log("Error removing favourites from firebase, name parameter is missing");
      return;
    }
    const q = query(collection(db, `users/${uid}/favourites`), where("countryName", "==", countryName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favourites removed from firebase database");
    });
  } catch (err) {
    console.log("Error removing favourites from firebase database", err);
  }
}

export const clearFavoritesFromFirebase = async (uid) => {
  try {
    const q = query(collection(db, `users/${uid}/favourites`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favourites removed from firebase database");
    });
  } catch (err) {
    console.log("Error removing favourites from firebase database", err);
  }
}

export { auth, db, loginWithEmailAndPassword, logout, registerWithEmailAndPassword };