const toDoList = document.getElementById("toDoList");
const printToDo = document.getElementById("printToDo");
const prioSelect = document.getElementById("prioSel");
const daySelect = document.getElementById("daySel");
const today = new Date(); // Skapar ett Date-objekt
const date = today.getUTCDay(); // Hämtar dagens datum



// Kollar om toDo finns i localStorage, om inte så skapas en tom array
// Annars så visas arrayn på skärmen
if (localStorage.getItem("toDo") === null) {
    console.log("Den var null!");
    initializeEmptyToDoArray();
} else {
    console.log("Den var inte null!");
    sortArray();
}

// Eventlistener för att ändra prioSelectValue när prioSelect ändras
prioSelect.addEventListener("change", function () {
    let prioSelectValue = prioSelect.value;
    console.log("prio: " + prioSelectValue);
});

// Eventlistener för att ändra daySelectValue när daySelect ändras
daySelect.addEventListener("change", function () {
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
    let textInput = document.getElementById("input");
    let textInputValue = textInput.value;
    const newTodo = {
        text: textInputValue,
        day: daySelect.value,
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


// Funktion för att spara todo i arrayn
function saveToDoItem(textInputValue) {
    let toDoArray = getToDoArray(); // Sparar returvärde från getToDoArray() i variabeln toDoArray
    toDoArray.push(textInputValue); // Lägger till textInputValue i toDoArray
    let toDoArrayStr = JSON.stringify(toDoArray); // Gör om toDoArray till en sträng
    localStorage.setItem("toDo", toDoArrayStr); // Sparar toDoArrayStr i localStorage
    let parseToDo = JSON.parse(toDoArray[toDoArray.length - 1]);
    sortArray();
}

// Funktion för att ta bort todo från arrayn
function removeItem() {
    localStorage.clear("toDo");
    location.reload();
}

/*  Funktion för att sortera todos i arrayn
    Prioritet 1 hamnar högst upp, prioritet 2 i mitten och prioritet 3 längst ner
*/
function sortArray() {
    printToDo.innerHTML = "";
    let today = date;
    console.log("Dagens datum: " + today);

    let toDoArray = getToDoArray(); // Sparar returvärde från getToDoArray() i variabeln toDoArray
    for (let n = 1; n < 4; n++) {
        printToDo.innerHTML += "PRIORITET: " + n + "<br> ";
        for (let i = 0; i < toDoArray.length; i++) {
            let parseToDo = JSON.parse(toDoArray[i]);
            if (parseToDo.priority == n && parseToDo.day == today) {
                printToDo.innerHTML += `<li>${parseToDo.text}</li>`;
            }
        }

    }
}

