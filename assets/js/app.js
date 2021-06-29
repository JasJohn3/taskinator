let buttonEL = document.getElementById('save-task');
let tasksToDoEl = document.querySelector("#tasks-to-do");

buttonEL.addEventListener('click', createTaskHandler);

function createTaskHandler(){
  let taskItemEL = document.createElement('li');
  taskItemEL.className="task-item";
  taskItemEL.textContent ="New Task Item!";
  let deleteButton = document.createElement('button')
  deleteButton.className = "btn";
  deleteButton.innerHTML = "Delete";
  tasksToDoEl.appendChild(taskItemEL);
};