// 페이지가 로드되면 실행되는 이벤트 리스너
document.addEventListener("DOMContentLoaded", () => {
    // localStorage에 데이터가 없는 경우 목데이터를 추가
    if (!localStorage.getItem("todos")) {
        const sampleTodos = [
            "HTML 공부하기",
            "CSS 공부하기",
            "JavaScript 공부하기",
            "jQuery 공부하기",
            "React 공부하기",
            "디자인 공부하기"
        ];
        // 목데이터를 하나씩 저장
        sampleTodos.forEach(todo => saveTodo(todo));
    }

    loadTodos();   // 저장된 할 일 목록 불러오기
    setToday();    // 오늘 날짜 출력
});

// 오늘 날짜를 화면에 표시하는 함수
function setToday() {
    const today = new Date(); // 현재 날짜 생성
    const formatted = today.toLocaleDateString("ko-KR", {
        year: "numeric", month: "long", day: "numeric"
    });
    document.getElementById("todayDate").innerText = formatted; // 날짜 출력
}

// localStorage에서 할 일 목록을 불러와 화면에 출력하는 함수
function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || []; // 데이터 없으면 빈 배열
    savedTodos.forEach(todo => addTodoElement(todo)); // 각 항목을 화면에 추가
    toggleEmptyMessage(); // 할 일 없을 경우 안내 문구 표시
}

// form 제출 시 새로운 할 일을 추가하는 함수
function add(event) {
    event.preventDefault(); // form 기본 동작 막기 (새로고침 방지)

    const inputField = document.getElementById("todoInput"); // 입력창 요소 가져오기
    const todoText = inputField.value.trim(); // 입력값 양쪽 공백 제거

    if (todoText === "") return; // 빈 값이면 추가하지 않음

    addTodoElement(todoText);  // 화면에 할 일 추가
    saveTodo(todoText);        // localStorage에 저장
    inputField.value = "";     // 입력창 비우기
    toggleEmptyMessage();      // 안내 문구 상태 갱신
}

// 하나의 할 일을 화면에 추가하는 함수
function addTodoElement(todoText) {
    const list = document.getElementById("listBody"); // ul 요소 선택
    const li = document.createElement("li");          // li 요소 생성

    const checkbox = document.createElement("input"); // 체크박스 생성
    checkbox.type = "checkbox";
    checkbox.className = "btn-chk";

    // 체크박스 상태 변경 시 줄긋기 효과 적용
    checkbox.addEventListener("change", () => {
        li.classList.toggle("done", checkbox.checked);
    });

    const span = document.createElement("span"); // 텍스트 노드 생성
    span.innerText = todoText;

    li.appendChild(checkbox); // 체크박스 추가
    li.appendChild(span);     // 텍스트 추가
    list.appendChild(li);     // 리스트에 li 추가
}

// 새로운 할 일을 localStorage에 저장하는 함수
function saveTodo(todoText) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // 기존 목록 불러오기
    todos.push(todoText); // 새 항목 추가
    localStorage.setItem("todos", JSON.stringify(todos)); // 저장소에 다시 저장
}

// 체크된 항목만 삭제하는 함수
function deleteSelected() {
    const list = document.getElementById("listBody"); // ul 요소
    const checkboxes = document.querySelectorAll(".btn-chk"); // 모든 체크박스 선택
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    let updatedTodos = [];

    // 체크박스 순회
    checkboxes.forEach((checkbox, index) => {
        if (!checkbox.checked) {
            updatedTodos.push(todos[index]); // 체크 안 된 항목은 유지
        } else {
            list.removeChild(checkbox.parentElement); // 체크된 항목은 삭제
        }
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // 변경된 목록 저장
    toggleEmptyMessage(); // 안내 문구 갱신
}

// 마지막 할 일을 삭제하는 함수
function deleteLast() {
    const list = document.getElementById("listBody");
    const lastItem = list.lastElementChild;
    if (!lastItem) return; // 항목이 없으면 종료

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.pop(); // 마지막 항목 제거
    localStorage.setItem("todos", JSON.stringify(todos)); // 저장소 업데이트
    list.removeChild(lastItem); // 화면에서 제거
    toggleEmptyMessage();
}

// 모든 할 일을 삭제하는 함수
function deleteAll() {
    const list = document.getElementById("listBody");
    list.innerHTML = ""; // 모든 li 제거
    localStorage.removeItem("todos"); // 저장소 초기화
    toggleEmptyMessage();
}

// 할 일 없을 때 안내 문구 출력 여부 결정
function toggleEmptyMessage() {
    const list = document.getElementById("listBody");
    const message = document.getElementById("emptyMessage");
    message.style.display = list.children.length === 0 ? "block" : "none";
}

// 다크 모드 토글 이벤트
document.getElementById("darkToggle").addEventListener("change", function () {
    document.body.classList.toggle("dark-mode", this.checked); // 체크 여부에 따라 dark-mode 클래스 토글
});
