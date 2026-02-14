import React, { useState, useEffect } from 'react'

const Stopwatch = ({ isCompleted }) => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval = null

    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning, isCompleted])

  useEffect(() => {
    if (isCompleted) {
      setIsRunning(false)
    }
  }, [isCompleted])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  return (
    <div className="stopwatch">
      <div className="stopwatch-time">{formatTime(time)}</div>
      {!isRunning ? (
        <button className="stopwatch-btn" onClick={handleStart} disabled={isCompleted}>
          Start
        </button>
      ) : (
        <button className="stopwatch-btn" onClick={handlePause}>
          Pause
        </button>
      )}
      <button className="stopwatch-btn" onClick={handleReset} disabled={isCompleted}>
        Reset
      </button>
    </div>
  )
}

export default Stopwatch