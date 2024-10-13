import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyCbLKMr3NDV-hAnREt9A3W8moGE5AsXIkY",
    authDomain: "precaution-system.firebaseapp.com",
    projectId: "precaution-system",
    storageBucket: "precaution-system.appspot.com",
    messagingSenderId: "712042308775",
    appId: "1:712042308775:web:4715fc3f72e8d91617e782"
  };




  const app = initializeApp(firebaseConfig);

 export  const db= getFirestore(app)