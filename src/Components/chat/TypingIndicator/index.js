import React from 'react'
import './index.module.css'

const dots = (
  <div className="dots">{[0, 1, 2].map(x => <div key={x} />)}</div>
)

export const TypingIndicator = ({ typing = {} }) =>
  Object.keys(typing).length ? (
    <div className="chatTypingIndi">
      <div>{dots}</div>
      <div>{`${Object.keys(typing)
        .slice(0, 2)
        .join(' and ')} is typing`}</div>
    </div>
  ) : null
