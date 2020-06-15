// UI elements
const taskInput = document.querySelector('#task');
const clrBtn = document.querySelector('#clear-task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const addBtn = document.querySelector('#add-task');
const icon = document.querySelectorAll('i');

loadAllEventListeners();

function loadAllEventListeners() {
	document.addEventListener('DOMContentLoaded', getTasks);
	addBtn.addEventListener('click', addTask);
	taskList.addEventListener('click', removeTask);
	filter.addEventListener('keyup', filterTasks);
	clrBtn.addEventListener('click', clearTasks);
}
// To add a task
function addTask(e) {
	if (taskInput.value === '') alert('Please enter a task to be added!');
	else {
		const li = document.createElement('li');
		li.innerText = taskInput.value;
		const i = document.createElement('i');
		i.classList.add('fas', 'fa-window-close');
		li.append(i);

		storeLocal(taskInput.value);

		taskList.append(li);
	}
}
// To remove a task
function removeTask(e) {
	if (confirm('Are you sure you want to delete this task?')) e.target.parentElement.remove();

	removeLocal(e.target.parentElement);
}
// To filter tasks from lists
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	const lists = document.querySelectorAll('li');

	lists.forEach((list) => {
		if (!list.innerText.toLowerCase().includes(text)) list.style.display = 'none';
		else list.style.display = 'flex';
	});
}
// To clear tasks
function clearTasks(e) {
	if (taskList.firstChild === null) alert("You don't have any tasks to clear!");
	else {
		if (confirm('Are you sure you want to delete all the tasks?')) {
			while (taskList.firstChild) {
				taskList.firstChild.remove();
			}
			clearTaskLocal();
		}
	}
}
// Storage functions
// -------------------------------------------

// To store a task in local storage
function storeLocal(task) {
	let tasks;

	if (localStorage.getItem('tasks') === null) tasks = [];
	else tasks = JSON.parse(localStorage.getItem('tasks'));
	console.log(tasks);
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
// To remove a task from local storage
function removeLocal(taskToDel) {
	let tasks;

	if (localStorage.getItem('tasks') === null) tasks = [];
	else tasks = JSON.parse(localStorage.getItem('tasks'));

	tasks.forEach((task, index) => {
		if (taskToDel.innerText === task) tasks.splice(index, 1);
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}
// To clear all tasks from local storage
function clearTaskLocal() {
	let tasks;

	if (localStorage.getItem('tasks') === null) tasks = [];
	else tasks = JSON.parse(localStorage.getItem('tasks'));

	tasks = [];
	localStorage.setItem('tasks', JSON.stringify(tasks));
}
// To get all tasks from local storage
function getTasks() {
	let tasks;

	if (localStorage.getItem('tasks') === '') tasks = [];
	else tasks = JSON.parse(localStorage.getItem('tasks'));

	tasks.forEach((task) => {
		let listItem = document.createElement('li');

		listItem.innerText = task;
		let i = document.createElement('i');
		i.classList.add('fas', 'fa-window-close');
		listItem.append(i);
		taskList.append(listItem);
	});
}
