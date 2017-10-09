import React, {Component} from 'react';

// Render the navbar
class NavBar extends Component {
  render() {
    return (
      //class in HTML >> className in JSX
      <nav className='navbar'>
        <a href='/' className='navbar-brand'>  Chatty</a>
        <div>{this.props.onlineUserCounter} user(s) online</div>
      </nav>
    );
  }
}
export default NavBar;


//in every JSX file, we need to import REACT
//in order to use REACT to write JSX file
// export it to be require it in APP.jsx
