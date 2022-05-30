// Form validation

let description = document.getElementById("description");
let errorMsg = document.getElementById("errorMsg")
let lng = document.getElementById("lng");


// Function for validation of text description of the marker.
// Return true if text size is more than 2 symbols,
// in other way makes textarea borders turn red and shows error message
function validateDescription(e){
    let value = description.value
    if(value.length < 2){
        e.preventDefault();
        description.style.border = "solid 1px red"
        errorMsg.style.visibility = "visible";
        setTimeout(function (){
            description.style.border = "none";
        }, 3000)
        return false;
    } else {
        errorMsg.style.visibility = "hidden"
    }
    return true;
}


// Function for validation of marker's coordinates.
// Return true if coordinates are correct (=are in boundaries) and not null
function validateCoords(e){
    if(lng.textContent != null
        && lng.textContent >= -169.08998338052322
        && lng.textContent <= 193.2938908271396
        && document.getElementById("lat").textContent != null){
        e.preventDefault();
        return true;
    }

}

// Event listener for textarea with description.
// If user clicked on the textarea and then clicked somewhere else, shows error message and turns textarea borders red.
// So user remember that this field is compulsory
description.addEventListener('blur', validateDescription);


// Validation of the form after "Add" button was clicked.
// If everything is okay, page reloads.
document.getElementById("formButton")
    .addEventListener("click", function (e){
        if (validateDescription(e)){
            if (validateCoords(e)){
                document. location. reload();
            }
        } else {errorMsg.style.visibility = "visible"; }

    });
