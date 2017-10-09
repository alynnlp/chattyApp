import React, {Component} from 'react';
import renderHTML         from 'react-render-html';


//Render the message body
export default class Message extends Component {

// RENDER EACH MESSAGE ELEMENT
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
    return (
      <div className={this.props.message.username}></div>
    )
  }
  else {
    return ''
  }
}


// RETURN MESSAGE CONTENT ELEMENT BASED ON THE MESSAGE TYPE AND EXISTENCE OF AN IMAGE
  messageContent = (messageType) => {

    // If the message is a user message
    if (messageType === 'userMessage') {
      // A non greedy regular expression to check if the message content has any image link
      let re = /(?:(?:https?|ftp):\/\/)?(?:w{3}\.)?\S+\.\S+\/.+?\.(?:png|jpg|gif)/ig

      // Replace all the image URLs with an image tag
      let content = this.props.message.content
      // content = content.replace(re,'<div className="message-image"></div>')

      return (
        <div className='message-content'>
          <div>{renderHTML(content)}</div>
        </div>
      )
    }
    // If the message is a 'system message'
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
