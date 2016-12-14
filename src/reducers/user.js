import { LOGIN } from '../constants/ActionTypes'

export default function user(state = {}, action = null) {
  switch (action.type) {
    case LOGIN:
      return action.user || {};

    default:
      return state;
  }
}
