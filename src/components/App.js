import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as TodoActions from '../actions/TodoActions'
import * as UserActions from '../actions/UserActions'
import Header from '../components/Header'
import TodoInput from '../components/TodoInput'
import MainSection from '../components/MainSection'
import FacebookLogin from 'react-facebook-login';

const App = ({user, todos, actions}) => {

  const responseFacebook = (user) => {
    console.log(user);
    actions.login(user);
  };

  if (user.name) {
    return (
      <div>
        <Header user={user} />
        <TodoInput user={user} addTodo={actions.addTodoRequest}/>
        <MainSection user={user} todos={todos} actions={actions}/>
      </div>
    )
  }
  else {
    return (
      <div>
        <Header />
        <FacebookLogin
          appId="337661333286285"
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
          />
      </div>
    )
  }
};

App.propTypes = {
  user:    PropTypes.object.isRequired,
  todos:   PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user:  state.user,
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  actions: {
    login:                 (user)     => {
      dispatch(UserActions.login(user))
    },
    addTodoRequest:        (user, text)     => {
      dispatch(TodoActions.addTodoRequest(user, text))
    },
    updateTodoRequest:     (user, id, text) => {
      dispatch(TodoActions.updateTodoRequest(user, id, text))
    },
    deleteTodoRequest:     (user, id)       => {
      dispatch(TodoActions.deleteTodoRequest(user, id))
    },
    toggleTodoRequest:     (user, id)       => {
      dispatch(TodoActions.toggleTodoRequest(user, id))
    },
    clearCompletedRequest: (user)         => {
      dispatch(TodoActions.clearCompletedRequest(user))
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
