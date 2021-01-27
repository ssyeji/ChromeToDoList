const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todoList");

const TODOS_LS = 'todos';
let todos = [];
let idNumber = 1;

/*function filterFn(todo){
    return todo.id === 1;
}*/

function deleteTodo(event){
    const btn = event.target; //이벤트가 발생한 지점
    const li = btn.parentNode; //btn의 부모노드
    todoList.removeChild(li); //삭제!!

    //filter : 콜백함수에 지정된 조건에 맞는 요소를 새롭게 반환한다.
    const clenTodos = todos.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });

    todos = clenTodos;
    saveTodos();
}

function saveTodos(){
    //localStorage에는 String 타입만 저장 가능
    localStorage.setItem(TODOS_LS, JSON.stringify(todos)); //stringify : data를 String 타입으로 변환
}

function paintTodo(text){
    //console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNumber++;

    delBtn.innerText = "🤍";
    delBtn.addEventListener("click", deleteTodo);

    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;

    todoList.appendChild(li);

    const todoObj = {
        text: text,
        id: newId
    }
    todos.push(todoObj);
    saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadTodos(){
    const loadTodos = localStorage.getItem(TODOS_LS);
    if(loadTodos !== null){
        const parsedTodos = JSON.parse(loadTodos);//String형 데이터를 Obj로 변환
        parsedTodos.forEach(function(todo){
           paintTodo(todo.text);
        });
    }
}

function init(){
    loadTodos();

    todoForm.addEventListener("submit",handleSubmit)
};

init();
