const toDoList = document.getElementById("toDoList");
const printToDo = document.getElementById("printToDo");

if (localStorage.getItem("toDo") === null) {
    console.log("Den var null!");
    initializeEmptyToDoArray();
} else {
    console.log("Den var inte null!");
    displayToDoItems();
}

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
        day: date
    };

    saveToDoItem(textInputValue);
}

// Funktion för att hämta toDoArray från localStorage
function getToDoArray() {
    let toDoArrayStr = localStorage.getItem("toDo");
    let toDoArray = JSON.parse(toDoArrayStr);
    console.log(toDoArray);
    return toDoArray; // Returnerar toDoArray
}

// Funktion för att visa todo-items
function displayToDoItems() {
    let toDoArray = getToDoArray(); // Sparar returvärde från getToDoArray() i variabeln toDoArray
    for (let i = 0; i < toDoArray.length; i++) {
        printToDo.innerHTML += `<li>${toDoArray[i]}</li>`;
    }
}

// Funktion för att spara todo i arrayn
function saveToDoItem(textInputValue) {
    let toDoArray = getToDoArray(); // Sparar returvärde från getToDoArray() i variabeln toDoArray
    toDoArray.push(textInputValue); // Lägger till textInputValue i toDoArray
    let toDoArrayStr = JSON.stringify(toDoArray); // Gör om toDoArray till en sträng
    localStorage.setItem("toDo", toDoArrayStr); // Sparar toDoArrayStr i localStorage
    printToDo.innerHTML += `<li>${textInputValue}</li>`;
}

// Funktion för att ta bort todo från arrayn
function removeItem() {
    localStorage.clear("toDo");
    location.reload();
}
