// Hämtar element från DOM
const toDoList = document.getElementById("toDoList");
const printToDo = document.getElementById("printToDo");
const prioSelect = document.getElementById("prioSel");
const daySelect = document.getElementById("daySel");

const today = new Date(); // Skapar ett Date-objekt
const date = today.getUTCDay(); // Hämtar dagens datum
let displayedItems = []; // Array för att lagra index för visade objekt

// Kontrollerar om "toDo" finns i localStorage
// Om inte, skapar en tom toDoArray och lagrar den i localStorage
// Annars, sorterar och visar todos på skärmen
if (localStorage.getItem("toDo") === null) {
    initializeEmptyToDoArray();
} else {
    sortArray();
}

// Eventlisteners för att uppdatera värden när prioSelect och daySelect ändras
prioSelect.addEventListener("change", function () {
    console.log("prio: " + prioSelect.value);
});
daySelect.addEventListener("change", function () {
    console.log("day: " + daySelect.value);
});

// Funktion för att skapa och lagra en tom toDoArray i localStorage
function initializeEmptyToDoArray() {
    let toDoArray = [];
    let toDoArrayStr = JSON.stringify(toDoArray);
    localStorage.setItem("toDo", toDoArrayStr);
}

// Funktion för att lägga till en todo och spara den i localStorage
function addItem() {
    let textInputValue = document.getElementById("input").value;
    const newTodo = {
        text: textInputValue,
        day: daySelect.value,
        priority: prioSelect.value
    };
    saveToDoItem(JSON.stringify(newTodo));
}

// Funktion för att hämta toDoArray från localStorage
function getToDoArray() {
    let toDoArrayStr = localStorage.getItem("toDo");
    return JSON.parse(toDoArrayStr);
}

// Funktion för att spara todo i toDoArray och uppdatera localStorage
function saveToDoItem(textInputValue) {
    let toDoArray = getToDoArray();
    toDoArray.push(textInputValue);
    localStorage.setItem("toDo", JSON.stringify(toDoArray));
    sortArray();
}

// Funktion för att sortera och visa todos på skärmen
function sortArray() {
    printToDo.innerHTML = "";
    let toDoArray = getToDoArray();

    for (let n = 1; n < 4; n++) {
        printToDo.innerHTML += "PRIORITET: " + n + "<br> ";
        for (let i = 0; i < toDoArray.length; i++) {
            let parseToDo = JSON.parse(toDoArray[i]);
            if (parseToDo.priority == n && parseToDo.day == date) {
                printToDo.innerHTML += `<li>${parseToDo.text}</li>`;

                // Lägger till indexet för det visade objektet i displayedItems
                displayedItems.push(i);

                // Skapar en knapp för att ta bort todo
                let removeButton = document.createElement("button");
                removeButton.innerHTML = "Ta bort";
                removeButton.setAttribute("id", "removeButton");
                removeButton.setAttribute("onclick", `removeItem(${displayedItems.length - 1})`);
                removeButton.setAttribute("data-index", i);
                printToDo.appendChild(removeButton);
            }
        }
    }
}

function removeItem(displayedIndex) {
    let toDoArray = getToDoArray();
    let itemIndex = displayedItems[displayedIndex];
    toDoArray.splice(itemIndex, 1);
    localStorage.setItem("toDo", JSON.stringify(toDoArray));
    sortArray();
}
