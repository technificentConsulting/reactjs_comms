import React from 'react'
import './index.module.css'

export const FileInput = ({ state: { user, message, room } }) =>
  room.id ? (
    <div className="chatInputcontainer">
      <svg>
        <use xlinkHref="index.svg#attach" />
      </svg>
      <input
        className="chatInput"
        type="file"
        onChange={e => {
          const file = e.target.files[0]
          file &&
            user.sendMessage({
              text: message || file.name,
              roomId: room.id,
              attachment: {
                name: file.name.replace(/[^A-Za-z0-9._-]/g, '--'),
                file,
              },
            })
        }}
      />
    </div>
  ) : null
