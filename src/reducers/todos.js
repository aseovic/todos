import { INIT_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, TOGGLE_TODO, CLEAR_COMPLETED } from '../constants/ActionTypes'

export default function todos(state = [], action = null) {
  switch (action.type) {
    case INIT_TODOS:
      return action.todos || [];

    case ADD_TODO:
      return [
        {
          id: action.id,
          completed: false,
          text: action.text
        },
        ...state
      ];

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      );

    case UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      );

    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      );

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false);

    default:
      return state;
  }
}
