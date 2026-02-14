import React from 'react'

const RewardPopup = ({ title, message, onClose }) => {
  if (!title) return null

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Congratulations!</h2>
        <div className="popup-badge">{title}</div>
        <p>{message}</p>
        <button onClick={onClose}>Awesome!</button>
      </div>
    </div>
  )
}

export default RewardPopup