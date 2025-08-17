// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    // 'save' parameter determines if the task should be saved to Local Storage
    function addTask(taskText = null, save = true) {
        // If no taskText is provided, get it from the input field
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        // Alert if input is empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new li element and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign onclick event to remove the task
        removeButton.onclick = function () {
            taskList.removeChild(li);

            // Remove task from Local Storage
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        // Append remove button to li, then li to taskList
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input field if adding from input
        if (taskText === taskInput.value.trim()) {
            taskInput.value = '';
        }

        // Save task to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false prevents re-saving
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing Enter key in input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initialize by loading tasks
    loadTasks();
});
