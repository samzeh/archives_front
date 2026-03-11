import { auth, db } from "./firebase";
import { doc, setDoc, deleteDoc, getDocs, collection, query, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import type { User } from "firebase/auth";


export async function signup (email: string, password: string, username: string): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {username, email})
  return user;
}

export async function login(identifier: string, password: string): Promise<User> {
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


export async function logout() {
  try {
    await signOut(auth);
  } catch (err: any) {
    console.error("Logout error:", err.message);
  }
}