import React from 'react'

const LevelCircle = ({ level, status, onClick }) => {
  const getClassName = () => {
    if (status === 'completed') return 'level-circle completed'
    if (status === 'unlocked') return 'level-circle unlocked'
    return 'level-circle locked'
  }

  const handleClick = () => {
    if (status === 'unlocked' && onClick) {
      onClick()
    }
  }

  return (
    <div className={getClassName()} onClick={handleClick}>
      Level {level}
    </div>
  )
}

export default LevelCircle