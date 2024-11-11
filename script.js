// Startup Variables
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
// Array
let tasks = [];

// Save Data to Local Storage Function
function loadData() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        showTask();
    }
}

loadData();

// Creating a Function for List Items
function createTaskListItem(taskText, index) {
    const li = document.createElement("li");
    li.innerHTML = taskText;

    const iconContainer = document.createElement("div");

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";
    editIcon.onclick = function () {
        const newTaskText = prompt("Edit the Task", taskText);
        if (newTaskText !== null) {
            editTask(index, newTaskText);
        }
    };

    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = "&times;";
    deleteButton.onclick = function () {
        deleteTask(index);
    };

    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(deleteButton);

    li.appendChild(iconContainer);

    return li;
}

// Function to add a task
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        const taskText = inputBox.value;
        tasks.push({ text: taskText, checked: false });
        saveData();
        listContainer.appendChild(createTaskListItem(taskText, tasks.length - 1));
    }
    inputBox.value = "";
}

// Edit tasks
function editTask(index, newContent) {
    if (newContent === null || newContent === "") {
        alert("You must write something");
        return;
    }
    tasks[index].text = newContent;
    showTask();
}

// Delete a task
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        showTask();
    }
}

// Array index
function getIndex(listItem) {
    return Array.from(listContainer.children).indexOf(listItem);
}

// Adds check task off list ability - Edit task
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        const index = getIndex(e.target);
        tasks[index].checked = !tasks[index].checked;
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "I") {
        const index = getIndex(e.target.parentElement.parentElement);
        const currentTaskText = tasks[index].text;
        const newTaskText = prompt("Edit the task:", currentTaskText);
        if (newTaskText !== null) {
            editTask(index, newTaskText);
        }
    }
}, false);

// Save data as JSON string to local storage
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Show tasks
function showTask() {
    listContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = createTaskListItem(task.text, index);
        
        if (task.checked) {
            li.classList.add("checked");
        }

        listContainer.appendChild(li);
    });

    saveData();
}

showTask();