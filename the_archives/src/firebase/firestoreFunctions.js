import { auth, db } from "./firebase";
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export async function signup (email, password, username) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {username, email})
  return user;
}

export async function login(identifier, password) {
  let email = identifier;
  if (!identifier.includes("@")) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", identifier));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("User not found");
    }
    email = querySnapshot.docs[0].data().email;
  }

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}