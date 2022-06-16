// Selectors 

const todoList = document.querySelector('.todo-list');
const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo);

// Functions

function addToDo(event){
    
    event.preventDefault();
    
    const div = document.createElement('div');
    div.classList.add('todo');
    todoList.append(div);

    const newLi = document.createElement('li');
    newLi.innerText = todoInput.value;

    //Save to local storage
    saveLocalTodos(todoInput.value);

    newLi.classList.add('todo-item');
    div.append(newLi);

    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    div.append(completeButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    div.append(trashButton);

    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target;

    if(item.classList[0] === 'trash-btn'){
        // const todo = item.parentElement;
        // todo.remove();
        item.parentElement.classList.add('deleteAnimation'); 
        removeLocalTodos(item.parentElement);
        item.parentElement.addEventListener('transitionend',()=>{
            item.parentElement.remove();
        })
    }

    if(item.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle('completed');
    }
}

function filterToDo(e){
    const todos = todoList.childNodes;

   todos.forEach(function(todo){
    switch(e.target.value){
        case "all":
            todo.style.display = "flex";
            break;
        case "completed":
            if(todo.classList.contains("completed")){
                todo.style.display = "flex";
            }else{
                todo.style.display = "none";
            }
            break;
        case "uncompleted":
            if(!todo.classList.contains("completed")){
                todo.style.display= "flex";
            }else{
                todo.style.display = "none";
            }
            break;
    }
   });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerHTML;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  })
}