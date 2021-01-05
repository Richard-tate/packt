let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('.darkBtn');


const enableDarkMode = () => {
 document.body.classList.add('darkMode');

 localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
  document.body.classList.remove('darkMode');
 
  localStorage.setItem('darkMode', null );
 };

if(darkMode === 'enabled'){
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
 if(darkMode !== 'enabled'){
   enableDarkMode();
 }
 else{
   disableDarkMode();
 }
});

class ToDoClass {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('TASKS'));
      if(!this.tasks) {
        this.tasks = [
          {task: 'Go to Dentist', isComplete: false},
          {task: 'Do Gardening', isComplete: true},
          {task: 'Renew Library Account', isComplete: false},
        ];
      
      }

      this.loadTasks();
      this.addEventListeners();
      this.counter();
    }


    addEventListeners() {
      const clearBtn = document.querySelector('.clearBtn').addEventListener('click', event =>{
        this.removeCompleted();
      });
      
    
     document.querySelector('#all').addEventListener('click', event =>{
        this.filterAll();
      });
       document.querySelector('#active')  .addEventListener('click', (event) =>{
        this.filterActive();
      });
      document.querySelector('#completed').addEventListener('click' , (event) =>{
        this.filterCompleted();
      });

      document.querySelector('#allMobile').addEventListener('click', event =>{
        this.filterAll();
      });
       document.querySelector('#activeMobile')  .addEventListener('click', (event) =>{
        this.filterActive();
      });
      document.querySelector('#completedMobile').addEventListener('click' , (event) =>{
        this.filterCompleted();
      });
      // Add Task
      document.getElementById('addTask').addEventListener("keypress", event => {
        if(event.keyCode === 13) {
          this.addTask(event.target.value);
          event.target.value = "";
        }
      });
    }

 
    removeCompleted( ){ 
      const comp = document.querySelectorAll('.completed');
      comp.forEach(comp =>{
       comp.parentNode.removeChild(comp);
     });
    let items = localStorage.getItem('TASKS');
    let allItems = JSON.parse(items);
    let fin = allItems.filter(function(x){return x.isComplete !== true;});
    let set = JSON.stringify(fin);

    localStorage.setItem('TASKS', set);

    }
    
  
    addTask(task) {
      let newTask = {
        task,
        isComplete: false,
      };
      let parentDiv = document.getElementById('addTask').parentElement;
      if(task === '') {
        parentDiv.classList.add('has-error');
      } else {
        parentDiv.classList.remove('has-error');
        this.tasks.push(newTask);
        this.loadTasks();
        this.counter();
      }
    }

    toggleTaskStatus(index) {
      this.tasks[index].isComplete = !this.tasks[index].isComplete;
      this.loadTasks();
      this.counter();
    }

    deleteTask(event, taskIndex) {
      event.preventDefault();
      this.tasks.splice(taskIndex, 1);
      this.loadTasks();
      this.counter();
    }

    generateTaskHtml(task, index) {
      return `
        <li class="todo-list-item ${task.isComplete?'completed': ''}">
          <div class="row">
            <div class="checkbox">
              <label class="rounded"><input id="toggleTaskStatus" type="checkbox" onchange="toDo.toggleTaskStatus(${index})" value="" class="btnCheck" ${task.isComplete?'checked':''}><span class="checkmark"></span></label>
            </div>
            <div class="task-text ${task.isComplete?'complete':''}">
              ${task.task}
            </div>
            <div class="delete-icon-area">
              <a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><img id="deleteTask" data-id="${index}" class="delete-icon" src="images/icon-cross.svg"></a>
            </div>
          </div>
        </li>
      `;
    }

    loadTasks() {
      localStorage.setItem('TASKS', JSON.stringify(this.tasks));
      let tasksHtml = this.tasks.reduce((html, task, index) => html += this.generateTaskHtml(task, index), '');
      document.getElementById('taskList').innerHTML = tasksHtml;
    }
    counter(){
      let allTodos = document.querySelectorAll('li').length;
      let completed = document.querySelectorAll('.complete').length;
      let remaining = allTodos - completed;
      let count = document.querySelector('.counter-num');
      count.innerHTML = remaining;
    }

    filterActive(){
      let hidden = document.querySelectorAll('li');
      hidden.forEach(hidden =>{
        hidden.classList.remove('hidden');
      })
      let completed = document.querySelectorAll('.complete');
      completed.forEach(completed =>{
        completed.parentElement.parentNode.classList.add('hidden');
      });
      }

    filterAll(){
      let allTodos = document.querySelectorAll('li');
      allTodos.forEach(todo =>{
        todo.classList.remove('hidden');
      });
    }

    filterCompleted(){
     let allTodos = document.querySelectorAll('li');
     allTodos.forEach(todo =>{
         todo.classList.add('hidden');
     })
   
     let completed = document.querySelectorAll('.complete');
     completed.forEach(complete => {
       complete.parentElement.parentNode.classList.remove('hidden');
     });
    }
    
}

const btnContainer = document.querySelector(".filter-container");
const btns = btnContainer.getElementsByClassName("btn-filter");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

const Container = document.querySelector(".filter-container-mobile");
const btns2 = Container.getElementsByClassName("btn-filter2");
for (let i = 0; i < btns2.length; i++) {
  btns2[i].addEventListener("click", function() {
    let current2 = document.getElementsByClassName("active-mobile");
    current2[0].className = current2[0].className.replace(" active-mobile", "");
    this.className += " active-mobile";
  });
}

let toDo;

window.addEventListener("load", () => {
  toDo = new ToDoClass();
 
});