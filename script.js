const toDoList = document.getElementById("toDoList");
const printToDo = document.getElementById("printToDo");
const prioSelect = document.getElementById("prioSel");
const daySelect = document.getElementById("daySel");

if (localStorage.getItem("toDo") === null) {
    console.log("Den var null!");
    initializeEmptyToDoArray();
} else {
    console.log("Den var inte null!");
    displayToDoItems();
}

// Eventlistener för att ändra prioSelectValue när prioSelect ändras
prioSelect.addEventListener("change", function() {
let prioSelectValue = prioSelect.value;
console.log("prio: "+ prioSelectValue);
});

// Eventlistener för att ändra daySelectValue när daySelect ändras
daySelect.addEventListener("change", function() {
let daySelectValue = daySelect.value;
console.log("day: " + daySelectValue);
});


// Funktion för att skapa och lagra en tom toDoArray i localStorage
function initializeEmptyToDoArray() {
    let toDoArray = [];
    let toDoArrayStr = JSON.stringify(toDoArray);
    localStorage.setItem("toDo", toDoArrayStr);
}

// Funktion för att lägga till en todo
function addItem() {
    const today = new Date();
    const date = today.getUTCDay(); // Hämtar dagens datum
    let textInput = document.getElementById("input");
    let textInputValue = textInput.value;
    const newTodo = {
        text: textInputValue,
        day: date,
        priority: prioSelect.value
    };
    let newToDoJSON = JSON.stringify(newTodo);
    saveToDoItem(newToDoJSON);
    
}

// Funktion för att hämta toDoArray från localStorage
function getToDoArray() {
    let toDoArrayStr = localStorage.getItem("toDo");
    let toDoArray = JSON.parse(toDoArrayStr);
    console.log(toDoArray);
    return toDoArray; // Returnerar toDoArray
}

// Funktion för att visa alla todos i arrayn under page load
function displayToDoItems() {
    let toDoArray = getToDoArray(); // Sparar returvärde från getToDoArray() i variabeln toDoArray
    for (let i = 0; i < toDoArray.length; i++) {
        let parseToDo = JSON.parse(toDoArray[i]);
        printToDo.innerHTML += `<li>${parseToDo.text}</li>`;
    }
}

// Funktion för att spara todo i arrayn
function saveToDoItem(textInputValue) {
    let toDoArray = getToDoArray(); // Sparar returvärde från getToDoArray() i variabeln toDoArray
    toDoArray.push(textInputValue); // Lägger till textInputValue i toDoArray
    let toDoArrayStr = JSON.stringify(toDoArray); // Gör om toDoArray till en sträng
    localStorage.setItem("toDo", toDoArrayStr); // Sparar toDoArrayStr i localStorage
    let parseToDo = JSON.parse(toDoArray[toDoArray.length - 1]);
    printToDo.innerHTML += `<li>${parseToDo.text}</li>`;
}

// Funktion för att ta bort todo från arrayn
function removeItem() {
    localStorage.clear("toDo");
    location.reload();
}

function sortArray() {
   
}