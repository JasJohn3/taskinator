var formEL = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector("#tasks-to-do");



function createTaskHandler(event) { 
  event.preventDefault(); 
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  // create a li element for the unordered list
  var listItemEl = document.createElement("li");
  // apply a class name for css styling 
  listItemEl.className = "task-item";
  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement('div');
  // class name for newly created div
  taskInfoEl.className ='task-info';
  // add HTML content to div using string literal format.
  taskInfoEl.innerHTML = `<h3 class='task-name'>${taskNameInput}</h3><span class='task-type'>${taskTypeInput}</span>`;

  //  append list item with the task info inner html
  listItemEl.appendChild(taskInfoEl); 
  // append the li to the ul element
  tasksToDoEl.appendChild(listItemEl); 
  }; 

  formEL.addEventListener("submit", createTaskHandler);