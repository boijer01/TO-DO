// Hämtar element från DOM
const toDoList = document.getElementById("toDoList");
const printToDo = document.getElementById("printToDo");
const prioritySelect = document.getElementById("prioSel");
const daySelect = document.getElementById("daySel");
const scoreElement = document.getElementById("score");

const today = new Date(); // Skapar ett Date-objekt
const date = today.getUTCDay(); // Hämtar dagens datum
let displayedItems = []; // Array för att lagra index för visade objekt

daySelect.value = date; //Selection för dagen blir nuvarande dag

let score = parseInt(localStorage.getItem('scoreStorage')); //Hämtar från localstorage

// Om score inte finns i localStorage, sätt det till 0
if (isNaN(score)) {
  score = 0;
  localStorage.setItem('scoreStorage', score);
}


scoreOutput();

/*  Kontrollerar om "toDo" finns i localStorage
    Om inte, skapar en tom toDoArray och lagrar den i localStorage
    Annars, sorterar och visar todos på skärmen
*/
if (localStorage.getItem("toDo") === null) {
    initializeEmptyToDoArray();
} else {
    sortArray();
}

// Eventlisteners för att uppdatera värden när prioSelect och daySelect ändras
prioritySelect.addEventListener("change", function () {
    console.log("prio: " + prioritySelect.value);
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
        priority: prioritySelect.value
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
        printToDo.className = "printToDo";
        for (let i = 0; i < toDoArray.length; i++) {
            let parseToDo = JSON.parse(toDoArray[i]);
            if (parseToDo.priority == n && parseToDo.day == date) {
               

                // Lägger till indexet för det visade objektet i displayedItems
                displayedItems.push(i);

                // Skapar en knapp för att ta bort todo
                let removeButton = document.createElement("button");
                removeButton.className = "removeButton";
                removeButton.innerHTML = "Ta bort";
                removeButton.setAttribute("id", "removeButton");
                removeButton.setAttribute("onclick", `removeItem(${displayedItems.length - 1})`);
                removeButton.setAttribute("data-index", i);
                let listItem = document.createElement("li");
                listItem.innerHTML = parseToDo.text;
                listItem.appendChild(removeButton);
                printToDo.appendChild(listItem);
            }
        }
    }
}

//Raderar itemsen 
function removeItem(displayedIndex) {
    let toDoArray = getToDoArray();
    let itemIndex = displayedItems[displayedIndex];
    let removedToDo = JSON.parse(toDoArray[itemIndex]);
    let removedPrio = removedToDo.priority;
    console.log("raderad prioritet " + removedPrio);
    toDoArray.splice(itemIndex, 1);
    localStorage.setItem("toDo", JSON.stringify(toDoArray));
    sortArray();

    scoreAdd(removedPrio)
    
}

//Lägger till poäng beroende på vad man raderat. 
function scoreAdd(removedPrio) {
    if(removedPrio == 1){
        score += 5;
        scoreOutput();
    }
    if(removedPrio == 2) {
        score += 3;
        scoreOutput();
    }
    if(removedPrio == 3) {
        score += 2;
        scoreOutput();
    }
}

//Uppdaterar poängen.
function scoreOutput() {
   
    localStorage.setItem('scoreStorage', score);
    scoreElement.innerHTML = score;
}

