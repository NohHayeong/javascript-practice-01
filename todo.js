const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];  //17번 클린투두로 바꿔줘야되니까 상수가 아닌 변수로


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;  
    toDoList.removeChild(li);                    
    const cleanToDos = toDos.filter(function(toDo){    //filter == 함수에서 true인것들만 모아서 새로운 array를 만듦
        return toDo.id !== parseInt(li.id);          //li에 없는 id fliter <-이게 지우고싶은거   //parseInt == string->int
    });
    toDos = cleanToDos; 
    saveToDos();
}

function saveToDos(){ //로컬스토리지에 todos저장            //로컬스토리지는 텍스트로 저장해야됨
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //stringify==자바스크립트->텍스트(스트링) 변환
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "💜"
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj); //toDos array에 toDoObj를 push함
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); //parse == 스트링->자바스크립트 
        parsedToDos.forEach(function(toDo){ //forEach == array 멤버 각각에 fucntion 호출
            paintToDo(toDo.text);
        });
    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();