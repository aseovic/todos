import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

class TodoInput extends Component {
  static propTypes = {
    user:    PropTypes.object.isRequired,
    addTodo: PropTypes.func.isRequired
  };

  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addTodo(this.props.user, text);
    }
  };

  render() {
    return (
      <TodoTextInput newTodo
                     onSave={this.handleSave}
                     placeholder="What needs to be done?" />
    )
  }
}

export default TodoInput;