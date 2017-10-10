import React, {Component}   from 'react';
import ChatBar              from './ChatBar.jsx';
import MessageList          from './MessageList.jsx';
import Navbar               from './Navbar.jsx';
import renderHTML           from 'react-render-html';

class App extends Component {

//SET INITIAL STATE, //initializing the state so this.state
constructor(props) {
 super(props); //this is super, so children right below refer to this props
 this.state = {
   currentUser: {name: "Anonymous"},
   messages: [],
   onlineUserCount: 0,
 }
};

 // Called after the component was rendered and it was attached to the DOM.
 // code is called when the App component is first rendered on the page.
componentDidMount() {
  console.log("componentDidMount <App />");
  this.socket = new WebSocket("ws://localhost:3001");
  console.log('Connected to the server!');

  // Wait for new messages and then add them to the DOM
  this.socket.onmessage = this.addRecievedMessage;

};


componentDidUpdate() {
  // const elements = document.getElementsByClassName('message-content');
  //
  // if (elements.length) {
  //     const element  = elements[elements.length - 1]
  //     element.scrollIntoView({block: "end"})
  //   };

};


//App will update by calling the render() method below
render() {
  return (
    <div>
      <Navbar       onlineUserCounter = {this.state.onlineUserCounter}/>
      <MessageList  messages        = {this.state.messages}           />
      <ChatBar      currentUser     = {this.state.currentUser}
                    changeNewUser   = {this.changeNewUser}
                    sendNewMessage  = {this.sendNewMessage}           />
    </div>
  );
};

// send notification to server once name is changed
changeNewUser = (event) => {

  event.preventDefault()
  // Create a new message object to send to the server
  const newSystemMessage = {
    type    : 'systemMessage',
    content : `${this.state.currentUser.name} changed their name to ${event.target.username}`
  }
  // change the current state to Anonymous or new username-->setState
  if (!event.target.value) {
    this.setState({currentUser: {name: "Anonymous"}})
  }
  else {
    this.setState({currentUser: {name: event.target.value}})
  }
  this.socket.send(JSON.stringify(newSystemMessage))
}

//receiving the text in the input field and passing it up to App
sendNewMessage = (event) => {
  //console.log(event.charCode)
  if(event.charCode === 13) { //code 13 is the key"enter"
  //console.log('sendNewMessage>>>>>>', event.target.value)
  //this will trigger React to call our components render() method
  event.preventDefault()
  const newMessage = {
    id: 'userMessage',
    type: 'userMessage',
    currentUser: this.state.currentUser.name,
    content: event.target.value
  }
  console.log(this.state.currentUser.name)
  event.target.value = ""
  //send to the server to be broadcast!! but server use OBJECT only JSON.parse()
  this.socket.send(JSON.stringify(newMessage));
  }
}


//when received data from server, update the STATE with new mesasages
  addRecievedMessage = (receivedMessage) => {
    //the recived messages is a string which needed to turn into OBJECT
    var newMessage = JSON.parse(receivedMessage.data)
    //console.log(newMessage.type)
    console.log(newMessage.currentUser)

    // Concat the message to the messages in the state
    switch(newMessage.type) {
      case 'userMessage': {
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        break;
      }
      case 'systemMessage':
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        break;

      case 'onlineUserCount':
        this.setState({onlineUserCounter: newMessage.count})
        break;
    }


  }



}
export default App;
