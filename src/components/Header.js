import React, { PropTypes, Component } from 'react'

class Header extends Component {
  render() {
    const { user } = this.props;
    const title = user ? user.name + "'s To Dos" : "To Dos";
    const image = user ? user.picture.data.url : "todos.png";

    return (
      <header className="header">
        <h1><img src={image}/> {title}</h1>
      </header>
    )
  }
}

export default Header;