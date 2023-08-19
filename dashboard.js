// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore , setDoc,getDoc , doc ,getDocs, addDoc, collection,query,where, deleteDoc , updateDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
// Assume db and auth are properly initialized

const welcomeMessage = document.getElementById("welcomeMessage");

const addButton = document.querySelector("#addBlog");
addButton.addEventListener("click", addUserData);

async function addUserData(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;

    if (!title || !text) {
        alert("Please fill both fields");
        return;
    }

    const user = auth.currentUser; // Retrieve the currently logged-in user
    if (!user) {
        alert("User not authenticated");
        return;
    }

    const userUid = user.uid; // Retrieve the user UID

    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            title: title,
            text: text,
            userUid: userUid // Include the user UID
        });

        console.log("Document written with ID: ", docRef.id);
        alert("User data added successfully!");
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("An error occurred while adding user data.");
    }
}



const cardContainer = document.getElementById("cardContainer");
window.addEventListener("load", fetchAndDisplayData);
const userUid = localStorage.getItem("userUid");
console.log(userUid, "useruid");



async function fetchAndDisplayData() {
    // ... Previous code ...
    if (!userUid) {
        console.log("User UID not available.");
        return;
    }
    const userDocRef = doc(db, "users", userUid); // Replace "users" with your collection name
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            const userName = userData.firstName; // Replace "name" with the actual field name in your collection
            const userlName = userData.lastName;
            welcomeMessage.textContent = `${userName + userlName}`; // Display personalized welcome message
            console.log(userData,"user")
        } else {
            console.log("User data not found.");
        }
       

    const itemsCollection = collection(db, "blogs"); // Replace "blogs" with your collection name
    
       const querySnapshot = await getDocs(
        query(itemsCollection, where("userUid", "==", userUid)) // Filter based on userUid
    );
    querySnapshot.forEach((doc,) => {
                // const itemData = doc.data();
                console.log(doc.data(), "data")
                cardContainer.innerHTML += `<div class="card1" style = " border-radius:6px; margin-bottom: 20px; height:23rem; margin-left:13rem ;width:58rem; background-color:white; ">
                <div class="main1" style="display: flex;"  >
                    <div class="im"  alt=""><img style="width: 120px;
                    height: 120px;
                    border-radius: 100%;
                    margin-top: 30px;
                    margin-left: 30px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_4ks1ITQCjKuXWWaJHtldiSSvmYiTra6wog&usqp=CAU" ></div>
                    <div>   <h1 class="write" style=" margin-top: 50px;
                    margin-left: 25px;"> ${doc.data().title}</h1>
                    <div class="main2" style="display: flex; margin-left: 30px;" > <p>${userDoc.data().firstName} ${userDoc.data().lastName} -</p>
                        <p> </p></div></div>
                 
                   
                </div>
               
                <p class="page" style=" margin-top: 50px;
                margin-left: 20px;" >${doc.data().text}</p>
                    <div>
                        <button class="edit" id="editb" style="border-radius:4px; margin-left: 30px;
                        width: 80px;
                        height: 30px;
                        color:white;
                        background-color: black;
                        border: 1px solid #612be0;">Edit</button>
                        <button class="delete" id="deleteB" style="border-radius:4px; margin-left: 10px;
                        width: 80px;
                        height: 30px;
                        color:white;
                        background-color: black;
                        border: 1px solid #612be0;">Delete</button>
                    </div>
            </div>`
            const editButton = document.querySelector(".edit");
            editButton.addEventListener("click", () => editCard(doc.id, doc.data().title, doc.data().text));
            const deleteButton = document.querySelector(".delete");
            deleteButton.addEventListener("click", () => deleteCard("click", () => deleteCard(doc.id)));
            // Append the card to the container
            // cardContainer.appendChild(card);
        // function edit(){
        //     console.log("edit")
        // }
       



                
        
        // Create a card element
        // const card = document.createElement("div");
        // card.classList.add("card"); // Apply your card styling here

        // // Populate the card with data
        // const title = document.createElement("h2");
        // title.textContent = itemData.title;

        // const description = document.createElement("p");
        // description.textContent = itemData.text;

        // // Create delete and edit buttons
        // const deleteButton = document.createElement("button");
        // deleteButton.textContent = "Delete";
        // deleteButton.addEventListener("click", () => deleteCard(doc.id)); // Call deleteCard function

        // const editButton = document.createElement("c");
        // editButton.textContent = "Edit";
        // editButton.addEventListener("click", () => editCard(doc.id, itemData.title, itemData.text)); // Call editCard function

        // // Append title, description, delete button, and edit button to the card
        // card.appendChild(title);
        // card.appendChild(description);
        // card.appendChild(deleteButton);
        // card.appendChild(editButton);

        // // Append the card to the container
        // cardContainer.appendChild(card);
    });
}

async function deleteCard(cardId) {
    try {
        await deleteDoc(doc(db, "blogs", cardId));
        console.log("Document deleted successfully");
        alert("Document deleted successfully")
    } catch (error) {

        console.error("Error deleting document: ", error);
        alert("An error occurred while deleting the document.");
    }

    // Refresh the card display after deletion
    await fetchAndDisplayData();
}

async function editCard(cardId, currentTitle, currentText) {
    // Assuming you have input fields for editing
    const newTitle = prompt("Enter new title:", currentTitle);
    const newText = prompt("Enter new text:", currentText);

    if (!newTitle || !newText) {
        alert("Please fill both fields.");
        return;
    }

    try {
        await updateDoc(doc(db, "blogs", cardId), {
            title: newTitle,
            text: newText,
        });
        console.log("Document updated successfully");
    } catch (error) {
        console.error("Error updating document: ", error);
        alert("An error occurred while updating the document.");
    }

    // Refresh the card display after editing
    fetchAndDisplayData();
}

// ... Rest of your code ...
