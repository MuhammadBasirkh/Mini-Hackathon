// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore , setDoc , doc , getDoc , addDoc ,collection } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBECGJTGN3EFuZvSOn3azvSf38w-TraZhE",
    authDomain: "hackathon-95c57.firebaseapp.com",
    projectId: "hackathon-95c57",
    storageBucket: "hackathon-95c57.appspot.com",
    messagingSenderId: "597510028076",
    appId: "1:597510028076:web:60cde2518988c487df0a89"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const loginBtn = document.querySelector("#loginBtn")
loginBtn.addEventListener("click" , login)
async function login(e) {
    try {
         e.preventDefault();
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        console.log(email , password)
        const userLogin = await signInWithEmailAndPassword(auth ,email ,password)
        console.log("userlogin" , userLogin)
        localStorage.setItem("userUid" , userLogin.user.uid)
        const userRef = doc(db , "users" , userLogin.user.uid)
        console.log("userRef" , userRef)
        const docSnap = await getDoc(userRef)
        console.log("docsnap" , docSnap)
        if (!docSnap.exists()) {
            console.log("Invaild user")
            alert("Invaild User")
            return
        }
        console.log("Document data : " , docSnap.data())
        const userData = docSnap.data()
        console.log("userdata" , userData)
        localStorage.setItem("user" , JSON.stringify(userData))
      window.location.replace("./dashboard.html")
        
    } catch (error) {
        console.log("error. message" , error.message)
        alert("error ")
        
    }
    
}