class ToDoItem{
    constructor(pTodoText,pIsFinished){
        this.text = pTodoText;
        this.isDone = pIsFinished;
    }
}

/**
 * This function find object by using given ID.
 */
function findDomElementById(pId){
return document.querySelector(`#${pId}`);

}

function readInputElementValue(pId){
let inputElement = findDomElementById(pId);
return inputElement.value;
}

/**
 * add eventlistener to button
 */
function addEventListenerToTriggerElement(){
    let addTodoTriggerElement = findDomElementById("addTodoTriggerElement");
    addTodoTriggerElement.addEventListener("click", function(event){
        // take data and add array
        let todoText = readInputElementValue("todoItemElement")
        if(checkToDoText(todoText)){
        addTodoItem(todoText);
        renderTodoList();
        }
    });
}

/**
 * add eventlistener to filter checkbox
 */
function addEventListenerToFilterElement(){
    let todoDoneFilterElement = findDomElementById("todoDoneFilter");
    todoDoneFilterElement.addEventListener("click", function(event){
        // take data and add array
        isDoneFilterActive = !isDoneFilterActive;
        renderTodoList();
    });
}

/**
 * take item and add to array AND HERE IS VERY IMPORTANT!!
 * @param {*} pTodoText 
 */
function addTodoItem(pTodoText){
    let todoItem = new ToDoItem(pTodoText,false);
    todoList.push(todoItem);
}

/**
 * print out add DOM with li tag 
 */
function renderTodoList(){
let todoListElement = findDomElementById("todoListContainer");

todoListElement.innerHTML =
todoList.filter(todo => todo.isDone == isDoneFilterActive )
        .map(todo =>`<li> 
                    ${todo.text}
                    <span onclick="finishToDoItem('${todo.text}')"> X </span> 
                    </li>`)
        .join("");



/** Alternative old method:
 
 let htmlListItems = "";
 for (let index = 0; index < todoList.length; index++) {
     const todoItem = todoList[index];
     if(todoItem.isDone == false){
         htmlListItems = "<li>" + todoItem.text + "</li>"
     }
 }
 todoListElement.innerHTML = htmlListItems;
 */
}

function checkToDoText(pTodoText){
    if(!pTodoText || pTodoText.trim()===""){
        let errMassageElement = findDomElementById("errorMassage");
        errMassageElement.innerHTML = "Please enter something!"
        return false;
    }
    return true;
}

function finishToDoItem(pTodoText) {    //??
    let todoItemTobeFinished = 
    todoList.find(todo => todo.text == pTodoText);
    todoItemTobeFinished.isDone = true;
    renderTodoList();
}