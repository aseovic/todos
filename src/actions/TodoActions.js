import * as types from '../constants/ActionTypes'
import request from 'superagent'
import uuid from 'uuid/v4';

export const initTodos      = (todos)    => ({type: types.INIT_TODOS, todos});
export const addTodo        = (id, text) => ({type: types.ADD_TODO, id, text});
export const deleteTodo     = (id)       => ({type: types.DELETE_TODO, id});
export const updateTodo     = (id, text) => ({type: types.UPDATE_TODO, id, text});
export const toggleTodo     = (id)       => ({type: types.TOGGLE_TODO, id});
export const clearCompleted = ()         => ({type: types.CLEAR_COMPLETED});

export function fetchAllTodos(user) {
  return (dispatch) => {
    dispatch(initTodos([]));
  }
}

export function addTodoRequest(user, text) {
  return (dispatch) => {
    var id = uuid();
    dispatch(addTodo(id, text));
  }
}

export function updateTodoRequest(user, id, text) {
  return (dispatch) => {
    dispatch(updateTodo(id, text));
  }
}

export function toggleTodoRequest(user, id) {
  return (dispatch) => {
    dispatch(toggleTodo(id));
  }
}

export function deleteTodoRequest(user, id) {
  return (dispatch) => {
    dispatch(deleteTodo(id));
  }
}

export function clearCompletedRequest(user) {
  return (dispatch) => {
    dispatch(clearCompleted());
  }
}

