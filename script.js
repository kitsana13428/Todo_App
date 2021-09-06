const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem ("todos"));

if(todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo (todo) {
    let todoText = input.value;

    if(todo){
        todoText = todo.text;
    } 
    
    

    if(todoText) { /* เพิ่มสิ่งที่ต้องทำ */
        const todoEl = document.createElement("li");

        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle('completed'); /* เมื่อกด ทำการขึดค่า */

            updateLS();
        });

        todoEl.addEventListener("contextmenu", (e) => { /* คลิ๊กขวาเป็นการเอาออก */
            e.preventDefault();

            todoEl.remove();

            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = ""; /* ทำให้เป็นค่าว่างทุกครั้งที่กด ตกลง*/

        updateLS();
    }
}

function updateLS() {
    const todoEl = document.querySelectorAll("li");

    const todos = [];

    todoEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText, 
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify (todos));
}