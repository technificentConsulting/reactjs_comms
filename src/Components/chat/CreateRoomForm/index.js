import React from 'react'
import './index.module.css'

export const CreateRoomForm = ({ submit }) => (
  <form
    className="chatCreateRoomForm"
    onSubmit={e => {
      e.preventDefault()
      submit({
        name: e.target[0].value,
        private: e.target.elements[2].checked,
      })
      e.target[0].value = ''
    }}
  >
    <input placeholder="Create a Room" />
    <button>
      <input type="checkbox" />
      <svg>
        <use xlinkHref="index.svg#lock" />
      </svg>
    </button>
    <button type="submit">
      <svg>
        <use xlinkHref="index.svg#add" />
      </svg>
    </button>
  </form>
)
