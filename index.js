const todoArray = [];

window.onload = function() {
  if(localStorage.getItem('todo')) {
    JSON.parse(localStorage.getItem('todo')).forEach((todo) => {
      todoArray.push(todo);
      displayTodo(todo);
    });
  }
  createInput.focus();
}

const createInput = document.querySelector('.create-input');
const addButton = document.querySelector('.add-button');
const todoListUl = document.querySelector('.todo-list__ui');
createInput.addEventListener('change', addTodo);
addButton.addEventListener('click', addTodo);

function displayTodo(todo) {
  const todoListItem = document.createElement('li');
  const label = document.createElement('label');
  label.innerText = todo; 
  const inputEdit = document.createElement('input');
  inputEdit.type = 'text';
  const buttonsBlock = document.createElement('div');
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  const removeButton = document.createElement('button');
  removeButton.innerText = 'Delete';
  buttonsBlock.classList.add('todo-list__buttons-block');
  todoListItem.classList.add('todo-list__item');
  editButton.classList.add('button', 'edit-button');
  removeButton.classList.add('button', 'remove-button');
  inputEdit.classList.add('input', 'edit-input');
  label.classList.add('todo-list__label');
  removeButton.addEventListener('click', removeTodo);
  editButton.addEventListener('click', editTodo);
  todoListUl.append(todoListItem);
  todoListItem.append(label, inputEdit, buttonsBlock);
  buttonsBlock.append(editButton, removeButton);
}

function addTodo() {
  if(createInput.value) {
    todoArray.push(createInput.value);
    displayTodo(createInput.value);
    createInput.value = '';
    dataUpdated();
  } 
}  

function removeTodo() {
  const todoListItem = this.closest('li');
  todoArray.splice(todoArray.indexOf(todoListItem.firstChild.innerText), 1);
  todoListItem.remove();
  dataUpdated();
}

function editTodo() {
  const todoListItem = this.closest('li');
  const label = todoListItem.querySelector('label');
  const inputEdit = todoListItem.querySelector('input[type=text]');
  const editMode = todoListItem.classList.contains('editMode');

  if(editMode) {
    if(!inputEdit.value) {
      return;
    }
    todoArray.splice(todoArray.indexOf(label.innerText), 1, inputEdit.value);
    label.innerText = inputEdit.value;
    this.innerText = 'Edit';
    dataUpdated();
  } else {
    inputEdit.value = label.innerText;
    this.innerText = 'Save';
  }

  todoListItem.classList.toggle('editMode');
}

function dataUpdated() {
  if(localStorage.getItem('todo')) {
    localStorage.removeItem('todo');
  }
  localStorage.setItem('todo', JSON.stringify(todoArray));
}