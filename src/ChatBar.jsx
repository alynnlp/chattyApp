import React, {Component} from 'react';
//ReactDOM renders React components for the client-side


//render Chat Bar
// pass the currentUser from APP.jsx here as a prop.
//Use the prop to display the name of the current user inside the input field's defaultValue.
export default class ChatBar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Name" name="username" onChange={this.props.changeNewUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="text" onKeyPress={this.props.sendNewMessage}/>
      </footer>
    )
  }
}
