import React from 'react'
import './index.module.css'

export const UserList = ({ room, current, createConvo, removeUser }) => (
  <ul className="chatUserList">
    {room.users.map(user => (
      <li
        key={user.id}
        className={user.presence.state === 'online' ? 'online' : null}
        onClick={e => createConvo({ user })}
        style={{ order: user.presence.state === 'online' && -1 }}
      >
        <img src={user.avatarURL} alt={user.name} />
        <p>{user.name}</p>
      </li>
    ))}
  </ul>
)
