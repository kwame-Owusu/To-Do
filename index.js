const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

//Function to load tasks from localStorage
const loadTasks = () =>  {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => addTaskToDOM(taskText));
}

//save tasks to localStorage
const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push(taskItem.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// add a new task to the DOM
const addTaskToDOM = (taskText) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.textContent = taskText;

    // Create delete button for the task
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(taskItem);
        saveTasks();
    };
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// Function to add a new task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTaskToDOM(taskText);
        saveTasks();
        // Clear the input field
        taskInput.value = "";
    }
}

// Add event listener to the add task button
addTaskButton.addEventListener('click', addTask);
// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);
