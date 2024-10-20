let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

const taskInput = document.getElementById('task-input');
const processTasksButton = document.getElementById('process-tasks-button');
const notesList = document.getElementById('notes-list');


function initializeCompletedTasks() {
  notesList.innerHTML = '';
  completedTasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'note-item';
    listItem.innerHTML = `<span>${task}</span>`;
    
    const deleteButton = createDeleteButton(index);
    listItem.appendChild(deleteButton);
    notesList.appendChild(listItem);
  });
}


function createDeleteButton(index) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.className = 'delete-button';
  button.addEventListener('click', () => deleteTask(index));
  return button;
}


processTasksButton.addEventListener('click', () => {
  const tasks = taskInput.value.split('\n').filter(task => task.trim() !== '');
  displayTasks(tasks);
  taskInput.value = ''; 
});


function displayTasks(tasks) {
    const noteEditor = document.querySelector('.note-editor');
    tasks.forEach(task => {
      const taskRow = document.createElement('div');
      taskRow.className = 'task-row new-task'; 
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
  
      const taskLabel = document.createElement('span');
      taskLabel.textContent = task;
      taskLabel.className = 'task-label';
  
   
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          addCompletedTask(task);
          taskRow.remove(); 
        }
      });
  
      taskRow.appendChild(checkbox);
      taskRow.appendChild(taskLabel);
      noteEditor.appendChild(taskRow);
    });
  }
  

function addCompletedTask(task) {
  completedTasks.push(task);
  updateLocalStorage();
  initializeCompletedTasks();
}


function deleteTask(index) {
  completedTasks.splice(index, 1);
  updateLocalStorage();
  initializeCompletedTasks();
}


function updateLocalStorage() {
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}


initializeCompletedTasks();
