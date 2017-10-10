import React, {Component} from 'react';
import renderHTML         from 'react-render-html';


//Render the message body
export default class Message extends Component {


render() {
  return (
    <div className={this.messageClassName(this.props.message.type)}>
      {this.messageUserName(this.props.message.type)}
      {this.messageContent(this.props.message.type)}
    </div>
  )
}


messageClassName = (messageType) => {
  if ( messageType === 'userMessage') {
    return 'message'
  }
  else {
    return 'message system'
  }
}

messageUserName = (messageType) => {
  if (messageType === 'userMessage') {
    let usernameStyles = {
      color: this.props.message.color
    }

    let username = this.props.message.currentUser


    return (

      <div className='username'>
        <div>{renderHTML(username)}</div>
      </div>
    )
  }
  else {
    return ''
  }
}



  messageContent = (messageType) => {

    // If the message is a user message
    if (messageType === 'userMessage') {

      let re = /(?:(?:https?|ftp):\/\/)?(?:w{3}\.)?\S+\.\S+\/.+?\.(?:png|jpg|gif)/ig

      let content = this.props.message.content

      return (
        <div className='message-content'>
          <div>{renderHTML(content)}</div>
        </div>
      )
    }

    // system message
    else {
      let usernameStyles = {
        color: this.props.message.color
      }
      return (
        <div className='message-content'>
          <span className='message-content'>{this.props.message.content}</span>
        </div>
      )
    }
  }
}
