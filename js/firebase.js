// Connection with database and some of CRUD operation with DB data:
// create a new marker and read the data from DB

// Imports for firebase connection
import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import {getFirestore} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js';

// Configuration data for firebase initialization
const firebaseConfig = {
    apiKey: "AIzaSyC4yuceRFu15n2QIpe940j3wDAe2cDt_nA",
    authDomain: "kaj03-67991.firebaseapp.com",
    projectId: "kaj03-67991",
    storageBucket: "kaj03-67991.appspot.com",
    messagingSenderId: "61598078203",
    appId: "1:61598078203:web:1d80aa7844b2163b614c5e"
};

//Firebase initialization
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// Setting event listener on button "Add" (add marker on the map)
let submitBtn = document.getElementById("formButton");
submitBtn.addEventListener("click", writeMarkerData);
function writeMarkerData() {
    // Set variables with data from screen (coordinates and description of the marker)
    let lat = document.getElementById("lat").textContent;
    let lng = document.getElementById("lng").textContent;
    let desc = document.getElementById("description").value;

    // Add a new document to collection "markers" in Firebase database,
    // set values for coordinates and description
    addDoc(collection(db, "markers"), {
        lat: lat,
        lng: lng,
        description: desc
    });
}


// Read the data from database, add all markers from database to the map
const querySnapshot = await getDocs(collection(db, "markers"));
querySnapshot.forEach((doc) => {

    // Adding each marker to the map
    let m = L.marker([doc.data().lat,doc.data().lng]).addTo(map);

    //Creating popup with description for the marker
    m.bindPopup(doc.data().description);

    //Popup is going to be seen after a click on the marker
    m.on('click', function(e){
        e.target.getPopup();
    });

});
