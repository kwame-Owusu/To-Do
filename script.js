const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Function to save tasks to local storage
const saveTasksToLocalStorage = () => {
    const tasks = [];
    const taskItems = document.querySelectorAll('#task-list li');
    taskItems.forEach(taskItem => {
        const taskText = taskItem.childNodes[0].textContent.trim();
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to load tasks from local storage
const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newTask = document.createElement('li');
        const delTask = document.createElement('button');
        const completed = document.createElement('button');
        
        completed.classList.add('completed-btn');
        completed.textContent = 'Completed';
        delTask.classList.add('del-btn');
        delTask.textContent = 'Delete';
        newTask.textContent = task.text;
        
        if (task.completed) {
            newTask.classList.add('completed');
        }
        
        newTask.appendChild(delTask);
        newTask.appendChild(completed);
        taskList.appendChild(newTask);

        // Attach event listeners to the buttons
        delTask.addEventListener('click', () => {
            newTask.remove();
            saveTasksToLocalStorage(); //we call the function to keep local storage in sync
        });

        completed.addEventListener('click', () => {
            newTask.classList.toggle('completed');
            saveTasksToLocalStorage();
        });
    });
};

// Event listener for adding new tasks
addTaskButton.addEventListener('click', () => {
    const newTask = document.createElement('li');
    const delTask = document.createElement('button');
    const completed = document.createElement('button');
    
    completed.classList.add('completed-btn');
    completed.textContent = 'Completed';
    delTask.classList.add('del-btn');
    delTask.textContent = 'Delete';
    newTask.textContent = taskInput.value.trim();
    
    // Check if the input is empty
    if (taskInput.value.trim() === '') {
        alert('Please Enter Text');
        return;
    }
    
    taskList.appendChild(newTask);
    newTask.appendChild(delTask);
    newTask.appendChild(completed);
    taskInput.value = ''; // Clear the input field
    
    // Add event listeners to new task buttons
    delTask.addEventListener('click', () => {
        newTask.remove();
        saveTasksToLocalStorage(); 
    });

    completed.addEventListener('click', () => {
        newTask.classList.toggle('completed');
        saveTasksToLocalStorage();
    });

    saveTasksToLocalStorage(); // Save task after adding
});

// Load tasks from local storage on page load
window.onload = loadTasksFromLocalStorage;
