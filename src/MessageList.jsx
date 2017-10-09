import React, {Component} from 'react';
import Message            from './Message.jsx';

//Render the message body
  //this is not HTML, can only use JSX <div>
    //this message tag is require from Message.jsx
export default class MessageList extends Component {
  render() {
    return(

    <main className='Messages'>
      {
      //this.props.messages is the array that I am given that I can map
        this.props.messages.map((message, index) =>
      //Message acquire from .jsx and message is a property to write text
      //a key is needed that is unique for a component of that type
        <Message message={message} key={message.id}/>
        )
      }
    </main>

    );
  }
}
