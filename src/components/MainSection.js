import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]:       () => true,
  [SHOW_ACTIVE]:    todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {
  static propTypes = {
    user:    PropTypes.object.isRequired,
    todos:   PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  state = {filter: SHOW_ALL};

  handleClearCompleted = () => {
    this.props.actions.clearCompletedRequest(this.props.user)
  };

  handleShow = filter => {
    this.setState({filter})
  };

  renderFooter(completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted}
                onShow={this.handleShow}/>
      )
    }
  }

  render() {
    const { user, todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos  = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
        todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        <ul className="todo-list">
          {filteredTodos.map(todo =>
              <TodoItem user={user} key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    )
  }
}

export default MainSection;