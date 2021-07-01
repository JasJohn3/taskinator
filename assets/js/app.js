var formElement = document.querySelector('#task-form');
var tasksToDoElement = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var taskIdCounter = 0;

  //__________________________________________ Create Task Event Handler __________________________________________
  // Function dedicated to the creation of a new task and ecapsulates user generated data
function taskFormHandler(event) { 
  event.preventDefault(); 
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  if(!taskNameInput || !taskTypeInput){
    alert("You need to fill out the task form!")
    return false;
  }
  var isEdit = formElement.hasAttribute("data-task-id");
  console.log(isEdit);

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formElement.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObject = {
      name: taskNameInput,
      type: taskTypeInput
    };

    createTaskElement(taskDataObject);
  }
  formElement.reset();
  };
    //__________________________________________ Create Task Event Handler __________________________________________ 

//__________________________________________ Create Task HTML Generator Function __________________________________________
// Creates the HTML Element for any newly created task item <li></li> and appends to the unordered list <ul></ul>
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
//__________________________________________ Create Task HTML Generator Function __________________________________________

//__________________________________________ Edit/Delete/Select Progress HTML Generator function __________________________________________
// Creates the HTML Element Edit/Delete/Select Progress and appends to the list item <li></li>
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
//__________________________________________ Edit/Delete/Select Progress HTML Generator function __________________________________________


//__________________________________________ Edit/Delete/Select Progress Task Handler Function __________________________________________
// Event Handler for both edit and delete functions. Searches parent Element for the mouse click events for Edit and Delete functions
  var taskButtonHandler = function(event) {
      // get target element from event
    var targetEl = event.target;
    if(targetEl.matches(".edit-btn")){
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } else if(targetEl.matches(".delete-btn")){
      // get the element's task id
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
    

  };
//__________________________________________ Edit/Delete/Select Progress Task Handler Function __________________________________________

//__________________________________________ Delete Task Handler Function __________________________________________
// Function dedicated to removing a selected task HTML element by using the unique (data-task-id) as a selector
  var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  };

//__________________________________________ Edit Task Handler Function __________________________________________
// Function dedicated to Editing a selected task HTML element by using the unique (data-task-id) as a selector
  var editTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    document.querySelector("#save-task").textContent = "Save Task";
    formElement.setAttribute("data-task-id", taskId);
  };
//__________________________________________ Edit Task Handler Function __________________________________________

//__________________________________________ Edit Task Function __________________________________________
// This function handles the new data created by the user and updates the text information using the (data-task-id)
  var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    formElement.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  };
//__________________________________________ Edit Task Function __________________________________________
//__________________________________________ Event Handler Function for progress change dropdown menu__________________________________________
// This function handles when the user selects an option from the progress dropdown menu
  var taskStatusChangeHandler = function(event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  };
//__________________________________________ Event Handler Function for progress change dropdown menu__________________________________________
  //__________________________________________ Event Listener Function Calls __________________________________________
  formElement.addEventListener("submit", taskFormHandler);
  pageContentEl.addEventListener("click", taskButtonHandler);
  pageContentEl.addEventListener("change", taskStatusChangeHandler);
  //__________________________________________ Event Listener Function Calls __________________________________________