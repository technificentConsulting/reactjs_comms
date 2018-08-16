import React from 'react'
import './index.module.css'

export const RoomHeader = ({
  state: { room, user, sidebarOpen, userListOpen },
  actions: { setSidebar, setUserList },
}) => (
  <header className="chatRoomHeader">
    <button onClick={e => setSidebar(!sidebarOpen)}>
      <svg>
        <use xlinkHref="index.svg#menu" />
      </svg>
    </button>
    <h1>{room.name && room.name.replace(user.id, '')}</h1>
    {room.users && (
      <div onClick={e => setUserList(!userListOpen)}>
        <span>{room.users.length}</span>
        <svg>
          <use xlinkHref="index.svg#members" />
        </svg>
      </div>
    )}
  </header>
)
