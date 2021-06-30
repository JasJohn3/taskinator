var formElement = document.querySelector('#task-form');
var tasksToDoElement = document.querySelector("#tasks-to-do");



function taskFormHandler(event) { 
  event.preventDefault(); 
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  if(!taskNameInput || !taskTypeInput){
    alert("You need to fill out the task form!")
    return false;
  }
  let taskDataObject ={
    name: taskNameInput,
    type: taskTypeInput
  }
  createTaskElement(taskDataObject);
  formElement.reset();
  }; 
  function createTaskElement(taskDataObject){
    // create a li element for the unordered list
    var listItemElement = document.createElement("li");
    // apply a class name for css styling 
    listItemElement.className = "task-item";
    // create div to hold task info and add to list item
    var taskInfoElement = document.createElement('div');
    // class name for newly created div
    taskInfoElement.className ='task-info';
    // add HTML content to div using string literal format.
    taskInfoElement.innerHTML = `<h3 class='task-name'>${taskDataObject.name}</h3><span class='task-type'>${taskDataObject.type}</span>`;
  
    //  append list item with the task info inner html
    listItemElement.appendChild(taskInfoElement); 
    // append the li to the ul element
    tasksToDoElement.appendChild(listItemElement); 
  }
  formElement.addEventListener("submit", taskFormHandler);