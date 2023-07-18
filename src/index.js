import { legacy_createStore } from "redux";

const formContainer = document.getElementById('todoForm');
const todoInput = document.querySelector('input');
const todoList = document.querySelector('ul');

const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM"

const onSubs = () => {
  const todos = todoStore.getState();
  todoList.innerHTML = "";
  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = "DEL";
    todoItem.id = todo.id;
    todoItem.innerText = todo.text;
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
  });
};


const addTodo = (todo) => {
  return {
    type: ADD_ITEM,
    text: todo,
    id: Date.now()
  };
};

const dispatchAddTodo = (todo) => {
  todoStore.dispatch(addTodo(todo));
};

const onSubmit = (e) => {
  e.preventDefault();
  const todoText = todoInput.value;
  todoInput.value = ""; // 입력창 초기화, 어차피 value값은 todoText에 저장되어있다.
  dispatchAddTodo(todoText);
}

const todoModifier = (state = [], action) => {
  switch(action.type){
    case ADD_ITEM:
      return [...state, {text: action.text, id: action.id}];
    case DELETE_ITEM:
      return [...state];
    default:
      return [];
  }
};

const todoStore = legacy_createStore(todoModifier);

formContainer.addEventListener('submit', onSubmit);

todoStore.subscribe(onSubs);