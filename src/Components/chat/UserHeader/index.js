import React from 'react'
import './index.css'

const placeholder =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA'

export const UserHeader = ({ user = {} }) => (
  <header className="chatUserHeader" >
    <img src={user.avatarURL || placeholder} alt={user.name} />
    <div>
      <h3>{user.name}</h3>
      <h5>{user.id && `@${user.id}`}</h5>
    </div>
  </header>
)
