//Variables
const taskList = document.getElementById('task-list');


//Event Listeners
eventListeners();


function eventListeners() {
	//Form Submission
	document.querySelector('#form').addEventListener('submit', newTask);

	//Remove task from list
	taskList.addEventListener('click', removeTask);

	//Document
	document.addEventListener('DOMContentLoaded', localStorageOnLoad)
}


//Functions

function newTask(e){
	e.preventDefault();

	//Read the textarea value
	const task = document.getElementById('task').value;

	//Create the remove button
	const removeBtn = document.createElement('a');
	removeBtn.classList = 'remove-task';
	removeBtn.textContent = 'X';

	
	//Create an <li> element
	const li = document.createElement('li');
	li.textContent = task;


	//Add remove button to each task
	li.appendChild(removeBtn);

	//Add to the list
	taskList.appendChild(li);
	addTaskLocalStorage(task);

	//Print the alert
	alert('Task added.');

	//clears text area after submitted
	this.reset();

}

//Removes the tasks from the DOM
function removeTask(e) {
	if (e.target.classList.contains('remove-task')) {
		e.target.parentElement.remove();
	} 
	//Remove Task from storage
	removeTaskLocalStorage(e.target.parentElement.textContent);
}


//Adds the tasks into local storage.

function addTaskLocalStorage(task) {

	let tasks = getTasksFromStorage();

	//Add the task into the array
	tasks.push(task);

	//Convert tasks array into string
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
	let tasks;
	const tasksLS = localStorage.getItem('tasks');
	//Get the values if null is returned, then create an empty array.
	if ( tasksLS === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(tasksLS);
	}
	return tasks;
}

//Print local storage tasks on load
function localStorageOnLoad() {
	let tasks = getTasksFromStorage();

	//Loop through storage and print the values
	tasks.forEach(function(task) {
		//Create the remove button
		const removeBtn = document.createElement('a');
		removeBtn.classList = 'remove-task';
		removeBtn.textContent = 'X';

		
		//Create an <li> element
		const li = document.createElement('li');
		li.textContent = task;


		//Add remove button to each task
		li.appendChild(removeBtn);

		//Add to the list
		taskList.appendChild(li);
	});
}

//Removes task from local storage

function removeTaskLocalStorage(task) {
	//Get tasks from storage

	let tasks = getTasksFromStorage();
	//Remove X from task

	const taskDelete = task.substring( 0, task.length - 1);

	//Loop through the tasks and remove the task that is equal
	tasks.forEach(function(taskLS, index) {
		if (taskDelete === taskLS) {
			tasks.splice(index, 1);
		}
	});
	//Save the data
	localStorage.setItem('tasks', JSON.stringify(tasks));
}