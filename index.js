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

const body = document.querySelector('body');
const container = document.createElement('div');
const todoList = document.createElement('div');
const header = document.createElement('h1');
const createBlock = document.createElement('div');
const createInput = document.createElement('input');
const addButton = document.createElement('button');
const todoListBlock = document.createElement('div');
const todoListUl = document.createElement('ul');

container.classList.add('container');
todoList.classList.add('todo-list');
header.classList.add('todo-list__header');
createBlock.classList.add('todo-list__create-block');
createInput.classList.add('input', 'create-input');
addButton.classList.add('button', 'add-button');
todoListBlock.classList.add('todo-list__block');
todoListUl.classList.add('todo-list__ui');
header.innerText = 'My Todo List';
addButton.innerText = 'Add';

createInput.addEventListener('change', addTodo);
addButton.addEventListener('click', addTodo);

body.append(container);
container.append(todoList);
createBlock.append(createInput, addButton);
todoList.append(header, createBlock, todoListBlock);
todoListBlock.append(todoListUl);

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