const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const list = document.querySelector("#list")
const template = document.querySelector("#list-item-template")
const LOCAL_STORAGE_PREFIX = "ADVANCED-TODOS"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-TODOS`
let todos = loadTodo()
todos.forEach(todos=> renderTodo(todos))

list.addEventListener("change", e=>{
    if(!e.target.matches("[data-list-item-checkbox]")) return;
    const parent = e.target.closest(".list-item")
    const todoId = parent.dataset.todoId
    const todo = todos.find(todo => todo.id === todoId)
    todo.complete = e.target.checked
    saveTodo()
})

list.addEventListener("click", e=>{
    if(!e.target.matches("[data-button-delete]")) return
    const parent = e.target.closest(".list-item")
    const todoId = parent.dataset.todoId
    parent.remove()
    todos = todos.filter(todo => todoId !== todo.id)
    saveTodo()
})
form.addEventListener("submit", e=>{
    e.preventDefault()
    const todoName = todoInput.value
    if(todoName =="") return
    const newTodo = {
        name: todoName,
        complete: false,
        id : new Date().valueOf().toString()
    }
    todos.push(newTodo)
    renderTodo(newTodo)
    saveTodo()
    todoInput.value = ""
})

function renderTodo(todo) {
    const templateClone = template.content.cloneNode(true) // this will clone all the data inside template
    const textElement = templateClone.querySelector("[data-list-item-text]")
    const todoId = templateClone.querySelector(".list-item")
    const checkbox = templateClone.querySelector("[data-list-item-checkbox]")
    checkbox.checked = todo.complete
    todoId.dataset.todoId = todo.id
    textElement.innerText = todo.name
    list.appendChild(templateClone)
}

function loadTodo(){
    const todoString = localStorage.getItem(TODOS_STORAGE_KEY)
    return JSON.parse(todoString) || []
}
function saveTodo(){
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

/*
1. take input 
2. add it to template clone and apply appendChild on list by renderTodo function
3. take all the todos inside an array todos[]
4. run a function saveTodo that saves todos[] in form of string in our local storage
5. run a function loadTodo so that we take todos from our local storage and convert it to array and then save it to todos[] as todos = loadTodo
6. Now, for all todos[], run renderTodo function by help of forEach function ---> it will renderTodo even after reloading the window
7. Now set the id of each data while submitting the todo and then while rendering todo, set that data into dataset-todoId into list item
8. Take the checkbox, if checked then set todo.complete = true else false and and again saveTodo into local storage
9. Take delete button --> then on click delete button, remove parent list from window then take id of that deleted item and update todos[] by filtering it out and then saveTodo()

we can also make it easy by not doing checkbox part
*/