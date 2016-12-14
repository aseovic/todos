import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    user:              PropTypes.object.isRequired,
    todo:              PropTypes.object.isRequired,
    updateTodoRequest: PropTypes.func.isRequired,
    deleteTodoRequest: PropTypes.func.isRequired,
    toggleTodoRequest: PropTypes.func.isRequired
  };

  state = {
    editing: false
  };

  handleDoubleClick = () => {
    this.setState({editing: true})
  };

  handleSave = (user, id, text) => {
    if (text.length === 0) {
      this.props.deleteTodoRequest(user, id)
    }
    else {
      this.props.updateTodoRequest(user, id, text)
    }
    this.setState({editing: false})
  };

  render() {
    const { user, todo, toggleTodoRequest, deleteTodoRequest } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(user, todo._id, text)}/>
      )
    }
    else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => toggleTodoRequest(user, todo._id)}/>
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodoRequest(user, todo._id)}/>
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
