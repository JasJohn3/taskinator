let buttonEL = document.getElementById('save-task');


buttonEL.addEventListener('click', addTask);

function addTask(){
  let tasksToDoEl = document.querySelector("#tasks-to-do");
  let taskItemEL = document.createElement('li');
  taskItemEL.className="task-item";
  taskItemEL.textContent ="New Task Item!";
  let deleteButton = document.createElement('button')
  deleteButton.className = "btn";
  deleteButton.innerHTML = "Delete";
  
  tasksToDoEl.appendChild(taskItemEL);

};