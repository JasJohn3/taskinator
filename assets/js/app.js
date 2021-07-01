var formElement = document.querySelector('#task-form');
var tasksToDoElement = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;



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
     // add task id as a custom attribute
     listItemElement.setAttribute("data-task-id", taskIdCounter);
    // create div to hold task info and add to list item
    var taskInfoElement = document.createElement('div');
    // class name for newly created div
    taskInfoElement.className ='task-info';
    // add HTML content to div using string literal format.
    taskInfoElement.innerHTML = `<h3 class='task-name'>${taskDataObject.name}</h3><span class='task-type'>${taskDataObject.type}</span>`;
  
    //  append list item with the task info inner html
    listItemElement.appendChild(taskInfoElement); 

    var taskActionsElement = createTaskActions(taskIdCounter);
    listItemElement.appendChild(taskActionsElement);
    // append the li to the ul element
    tasksToDoElement.appendChild(listItemElement);
      // increase task counter for next unique id
      taskIdCounter++; 
  }

  function createTaskActions(taskId){
    var actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    var statusChoices = ["To Do", "In Progress", "Completed"];
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    for(let i = 0; i <statusChoices.length; i++){
      var statusOptionEl = document.createElement('option');
      statusOptionEl.textContent = statusChoices[i];
      statusOptionEl.setAttribute('value', statusChoices[i]);

      // append the select option
      statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
  }

  var taskButtonHandler = function(event) {
    console.log(event.target);

    if(event.target.matches(".delete-btn")){
      // get the element's task id
      var taskId = event.target.getAttribute("data-task-id");
      deleteTask(taskId);
    }
    
    if(event.target.matches(".edit-btn")){
      alert('Edit Button Pressed!')
      var taskId = event.target.getAttribute("data-task-id");
      editTask(taskId);
    }
  };

  var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  };
  var editTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
  };

  formElement.addEventListener("submit", taskFormHandler);
  pageContentEl.addEventListener("click", taskButtonHandler);