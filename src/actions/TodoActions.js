import * as types from '../constants/ActionTypes'
import request from 'superagent'
import uuid from 'uuid/v4';

export const initTodos      = (todos)    => ({type: types.INIT_TODOS, todos});
export const addTodo        = (id, text) => ({type: types.ADD_TODO, id, text});
export const deleteTodo     = (id)       => ({type: types.DELETE_TODO, id});
export const updateTodo     = (id, text) => ({type: types.UPDATE_TODO, id, text});
export const completeTodo   = (id, completed) => ({type: types.COMPLETE_TODO, id, completed});
export const clearCompleted = ()         => ({type: types.CLEAR_COMPLETED});

const collection = (user) => {
  return user.name.replace(' ', '_');
};

export function fetchAllTodos(user) {
  return (dispatch) => {
    request
      .get('/api/' + collection(user))
      .end(function (err, res) {
        console.log(err, res);
        if (!err) {
          dispatch(initTodos(res.body));
        }

      });
  }
}

export function addTodoRequest(user, text) {
  return (dispatch) => {
    var id = uuid();
    request
      .post('/api/' + collection(user))
      .send({_id: id, text: text, completed: false})
      .end(function (err, res) {
        console.log(err, res);
        if (!err) {
          dispatch(addTodo(id, text));
        }
      });
  }
}

export function updateTodoRequest(user, id, text) {
  return (dispatch) => {
    request
      .put('/api/' + collection(user) + "/" + id)
      .send({text: text})
      .end(function (err, res) {
        console.log(err, res);
        if (!err) {
          dispatch(updateTodo(id, text));
        }
      });
  }
}

export function toggleTodoRequest(user, id) {
  return (dispatch) => {
    request
      .put('/api/' + collection(user) + "/" + id + "/toggle")
      .end(function (err, res) {
        console.log(err, res);
        if (!err) {
          dispatch(completeTodo(id, res.body.completed));
        }
      });
  }
}

export function deleteTodoRequest(user, id) {
  return (dispatch) => {
    request
      .delete('/api/' + collection(user) + "/" + id)
      .end(function (err, res) {
        console.log(err, res);
        if (!err) {
          dispatch(deleteTodo(id));
        }
      });
  }
}

export function clearCompletedRequest(user) {
  return (dispatch) => {
    request
      .delete('/api/' + collection(user))
      .end(function (err, res) {
        console.log(err, res);
        if (!err) {
          dispatch(clearCompleted());
        }
      });
  }
}

