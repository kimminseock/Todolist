// DOMContentLoaded 이벤트가 발생하면 loadTodos 함수 호출하여 저장된 할 일 목록을 불러옴
document.addEventListener("DOMContentLoaded", function() {
    loadTodos();
    // 목데이터가 없다면 샘플 데이터를 추가
    if (localStorage.getItem("todos") === null) {
        const sampleTodos = ["HTML 공부하기", "CSS 공부하기", "JavaScript 공부하기", "jQuery 공부하기", "React 공부하기", "디자인 공부하기"];
        sampleTodos.forEach(todo => saveTodo(todo)); // 샘플 데이터를 localStorage에 저장
    }
});

// 저장된 할 일 목록을 불러오는 함수
function loadTodos() {
    // localStorage에서 "todos" 항목을 가져오고 없으면 빈 배열로 초기화
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    // 저장된 할 일 목록을 화면에 추가
    savedTodos.forEach(todo => addTodoElement(todo));
}

// 새로운 할 일을 추가하는 함수
function addTodo(event) {
    event.preventDefault(); // form의 기본 submit 동작을 방지하여 페이지 새로고침 방지

    const inputField = document.getElementById("todoInput"); // 할 일 입력 필드를 가져옴
    const todoText = inputField.value.trim(); // 입력값을 가져오고 양옆 공백 제거

    // 입력값이 비어 있으면 함수 종료
    if (todoText === "") return;

    // 화면에 새 할 일을 추가하고, localStorage에 저장
    addTodoElement(todoText);
    saveTodo(todoText);

    // 입력 필드를 초기화
    inputField.value = "";
}

// 화면에 새 할 일을 추가하는 함수
function addTodoElement(todoText) {
    const ul = document.getElementById("todoList"); // todo 리스트가 위치할 ul 요소에 접근

    // 새로운 li 요소 생성
    const li = document.createElement("li");

    // 체크박스(input) 생성
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; // 체크박스 타입 설정

    // 텍스트를 담을 span 요소 생성
    const span = document.createElement("span");
    span.textContent = todoText; // 텍스트 내용을 할 일로 설정

    // li 요소에 체크박스와 텍스트를 추가
    li.appendChild(checkbox);
    li.appendChild(span);

    // ul 요소에 새로운 li 추가
    ul.appendChild(li);
}

// 새로운 할 일을 localStorage에 저장하는 함수
function saveTodo(todoText) {
    // localStorage에서 "todos" 항목을 가져오고, 없으면 빈 배열로 초기화
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // 새로운 할 일 추가
    todos.push(todoText);

    // 업데이트된 할 일 목록을 localStorage에 저장
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 선택한 할 일들을 삭제하는 함수
function deleteSelected() {
    const ul = document.getElementById("todoList"); // ul 요소에 접근
    const checkboxes = document.querySelectorAll("#todoList input[type='checkbox']"); // 체크박스들 선택

    // localStorage에서 할 일 목록 가져오기
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // 각 체크박스를 순회하면서 체크된 항목 삭제
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            // 체크된 항목 삭제
            todos.splice(index, 1); // 배열에서 해당 항목 삭제
            ul.removeChild(checkbox.parentElement); // 화면에서 해당 li 삭제
        }
    });

    // 삭제 후 업데이트된 할 일 목록을 localStorage에 저장
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 마지막 할 일을 삭제하는 함수
function deleteLast() {
    const ul = document.getElementById("todoList"); // ul 요소에 접근

    // 마지막 할 일이 없으면 종료
    if (!ul.lastElementChild) return;

    // localStorage에서 할 일 목록 가져오기
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // 배열에서 마지막 항목 삭제
    todos.pop();

    // 업데이트된 할 일 목록을 localStorage에 저장
    localStorage.setItem("todos", JSON.stringify(todos));

    // 화면에서 마지막 li 삭제
    ul.removeChild(ul.lastElementChild);
}

// 모든 할 일을 삭제하는 함수
function deleteAll() {
    // todo 리스트의 모든 li 요소를 삭제
    document.getElementById("todoList").innerHTML = "";

    // localStorage에서 모든 할 일 삭제
    localStorage.removeItem("todos");
}
