import React from 'react'
import  './index.module.css'
import { Message } from '../Message'

const emptyList = (
  <div className="empty">
    <span role="img" aria-label="post">
      📝
    </span>
    <h2>No Messages Yet</h2>
    <p>Be the first to post in this room or invite someone to join the room</p>
  </div>
)

export const MessageList = ({ messages = {}, user, createConvo }) => (
  <ul id="messages" className="chatMessageList">
    {Object.keys(messages).length > 0 ? (
      <wrapper->
        {Object.keys(messages)
          .reverse()
          .map(k => Message({ user, createConvo })(messages[k]))}
      </wrapper->
    ) : (
      emptyList
    )}
  </ul>
)
