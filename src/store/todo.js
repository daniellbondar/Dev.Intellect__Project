import { makeAutoObservable } from 'mobx';

class TodoState {
  todoList = [];

  constructor() {
    makeAutoObservable(this);
  }
  
  add(todo) {
    console.log('add(todo)')
    console.log('1-this.todoList',this.todoList)
    this.todoList.push(todo);
    console.log('this.todoList',this.todoList)
  }

  remove(id) {
    this.todoList = this.todoList.filter((todo) => todo.id !==id);
  }

  changeDone(id) {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
  }
}

const todoState = new TodoState();

export default todoState;
