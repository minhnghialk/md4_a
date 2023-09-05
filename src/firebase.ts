import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";


// Google Auth Import
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your Config
const firebaseConfig = {
  apiKey: "AIzaSyDFHHxz6WJhWFAaHfvDlyYbv61tSjA1sRM",
  authDomain: "learnmd4-4a734.firebaseapp.com",
  projectId: "learnmd4-4a734",
  storageBucket: "learnmd4-4a734.appspot.com",
  messagingSenderId: "896190043435",
  appId: "1:896190043435:web:228e30827145dc208ee16e",
  measurementId: "G-ZGFP1ZLEXC"
};

// End Config
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFileToStorage(file: File, folderName: string) { 

  if (!file) { 
    return false
  }
  const fileRef = ref(storage, `${folderName}/` + file.name);

  let url = await uploadBytes(fileRef, file).then( async res => {
    return await getDownloadURL(res.ref)
    .then(url => url)
    .catch(er => false)
  })

  return url
}

// Google Auth Import

const googleProvider = new GoogleAuthProvider();

export async function googleLogin() {
  const auth = getAuth();
 return await signInWithPopup(auth, googleProvider)
}

