// 페이지가 로드되면 실행되는 이벤트
document.addEventListener("DOMContentLoaded", () => {
    // localStorage에 저장된 데이터가 없을 경우, 기본 할 일 목록을 추가
    if (!localStorage.getItem("todos")) {
        const sampleTodos = [
            "HTML 공부하기",
            "CSS 공부하기",
            "JavaScript 공부하기",
            "jQuery 공부하기",
            "React 공부하기",
            "디자인 공부하기"
        ];
        sampleTodos.forEach(todo => saveTodo(todo)); // 항목별로 저장
    }

    loadTodos(); // 저장된 할 일 목록을 화면에 출력
    setToday();  // 오늘 날짜 표시
});

// 오늘 날짜를 화면에 표시하는 함수
function setToday() {
    const today = new Date(); // 현재 날짜 생성
    const formatted = today.toLocaleDateString("ko-KR", {
        year: "numeric", month: "long", day: "numeric"
    });
    document.getElementById("todayDate").innerText = formatted; // 날짜 출력
}

// form이 제출되었을 때 새로운 할 일을 추가하는 함수
function add(event) {
    event.preventDefault(); // 기본 동작(페이지 새로고침) 방지

    const input = document.getElementById("todoInput"); // 입력 필드 가져오기
    const text = input.value.trim();                    // 공백 제거한 입력값

    if (!text) return; // 빈 문자열일 경우 무시

    addTodoElement(text); // 화면에 할 일 추가
    saveTodo(text);       // localStorage에 저장
    input.value = "";     // 입력 필드 초기화
    toggleEmptyMessage(); // 안내 문구 업데이트
}

// 새로운 할 일을 화면에 추가하는 함수
function addTodoElement(text) {
    const list = document.getElementById("listBody"); // ul 요소 선택
    const li = document.createElement("li");          // li 요소 생성

    // 체크박스 생성
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "btn-chk";

    // 체크 상태에 따라 'done' 클래스 토글
    checkbox.addEventListener("change", () => {
        li.classList.toggle("done", checkbox.checked);
    });

    // 할 일 텍스트 노드 생성
    const span = document.createElement("span");
    span.innerText = text;

    // 삭제 버튼 생성
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.style.marginLeft = "1rem";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.fontSize = "1.1rem";

    // 삭제 버튼 클릭 시 해당 항목 제거
    deleteBtn.addEventListener("click", () => {
        li.remove();
        removeTodoFromStorage(text);
        toggleEmptyMessage();
    });

    // 항목 구성 요소 조립
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // 애니메이션 효과 추가
    li.style.opacity = 0;
    li.style.transform = "translateY(10px)";
    list.appendChild(li);
    requestAnimationFrame(() => {
        li.style.transition = "all 0.3s ease";
        li.style.opacity = 1;
        li.style.transform = "translateY(0)";
    });
}

// 할 일을 localStorage에 저장하는 함수
function saveTodo(text) {
    const todos = JSON.parse(localStorage.getItem("todos")) || []; // 기존 목록 불러오기
    todos.push(text); // 새 항목 추가
    localStorage.setItem("todos", JSON.stringify(todos)); // 저장
}

// localStorage에서 해당 할 일을 제거하는 함수
function removeTodoFromStorage(text) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo !== text); // 해당 텍스트와 다른 항목만 남김
    localStorage.setItem("todos", JSON.stringify(todos));
}

// 저장된 할 일들을 화면에 출력하는 함수
function loadTodos() {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    saved.forEach(text => addTodoElement(text)); // 각 항목을 화면에 출력
    toggleEmptyMessage(); // 안내 문구 표시 여부 갱신
}

// 체크된 항목만 삭제하는 함수
function deleteSelected() {
    const checkboxes = document.querySelectorAll(".btn-chk");

    checkboxes.forEach(cb => {
        if (cb.checked) {
            const text = cb.nextSibling.innerText;   // 체크된 항목의 텍스트 가져오기
            removeTodoFromStorage(text);             // 저장소에서 제거
            cb.parentElement.remove();               // 화면에서 제거
        }
    });

    toggleEmptyMessage();
}

// 마지막 항목을 삭제하는 함수
function deleteLast() {
    const list = document.getElementById("listBody");
    const lastItem = list.lastElementChild;
    if (!lastItem) return; // 항목이 없으면 종료

    const text = lastItem.querySelector("span")?.innerText;
    removeTodoFromStorage(text); // 저장소에서 제거
    list.removeChild(lastItem);  // 화면에서 제거
    toggleEmptyMessage();
}

// 모든 할 일을 삭제하는 함수
function deleteAll() {
    document.getElementById("listBody").innerHTML = ""; // 전체 목록 제거
    localStorage.removeItem("todos");                   // 저장소 초기화
    toggleEmptyMessage();
}

// 할 일이 없는 경우 안내 문구를 표시하는 함수
function toggleEmptyMessage() {
    const list = document.getElementById("listBody");
    const message = document.getElementById("emptyMessage");
    message.style.display = list.children.length === 0 ? "block" : "none";
}

// 다크 모드 토글 기능.
document.getElementById("darkToggle").addEventListener("change", function () {
    document.body.classList.toggle("dark-mode", this.checked); // 클래스 토글
});
