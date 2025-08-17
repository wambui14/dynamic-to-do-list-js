// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements using the IDs from your HTML
    const addButton = document.getElementById('add-task-btn'); // matches HTML
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        // Get the trimmed value from the input field
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Remove the task when the remove button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to li, then li to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Event listener for clicking the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing the Enter key in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
