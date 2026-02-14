import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { db } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import LevelCircle from '../components/LevelCircle'
import RewardPopup from '../components/RewardPopup'

// Cache for faster subsequent loads
const dreamDataCache = new Map();

const Roadmap = () => {
  const [mainGoal, setMainGoal] = useState('')
  const [subGoals, setSubGoals] = useState([])
  const [newSubGoal, setNewSubGoal] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [popupData, setPopupData] = useState({ title: '', message: '' })
  const [milestones, setMilestones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Get current dream title based on completed goals count
  const getDreamTitle = (completedCount) => {
    if (completedCount >= 35) return 'Candy Conqueror'
    if (completedCount >= 30) return 'Frosted Mastermind'
    if (completedCount >= 25) return 'Caramel Visionary'
    if (completedCount >= 20) return 'Lolly Architect'
    if (completedCount >= 15) return 'Sprinkle Navigator'
    if (completedCount >= 10) return 'Sugar Adventurer'
    if (completedCount >= 5) return 'Candy Pathfinder'
    return 'Dream Starter'
  }

  // Get next milestone info
  const getNextMilestone = (completedCount) => {
    const milestones = [
      { count: 5, title: 'Candy Pathfinder' },
      { count: 10, title: 'Sugar Adventurer' },
      { count: 15, title: 'Sprinkle Navigator' },
      { count: 20, title: 'Lolly Architect' },
      { count: 25, title: 'Caramel Visionary' },
      { count: 30, title: 'Frosted Mastermind' },
      { count: 35, title: 'Candy Conqueror' }
    ]

    for (let milestone of milestones) {
      if (completedCount < milestone.count) {
        return {
          count: milestone.count,
          title: milestone.title,
          remaining: milestone.count - completedCount
        }
      }
    }

    return { count: completedCount, title: 'Max Level!', remaining: 0 }
  }

  // Get progress data based on completion count
  const getProgressData = () => {
    const completedCount = subGoals.filter(g => g.status === 'completed').length
    const totalGoals = subGoals.length

    if (totalGoals === 0) {
      return {
        currentTitle: 'Dream Starter',
        nextMilestone: 'Add goals to begin',
        completedCount: 0,
        totalGoals: 0,
        progress: 0,
        goalsRemaining: 0,
        currentThreshold: 0,
        nextThreshold: 5
      }
    }

    const currentTitle = getDreamTitle(completedCount)
    const nextInfo = getNextMilestone(completedCount)

    // Calculate progress towards NEXT MILESTONE (not overall completion)
    let currentThreshold = 0
    let nextThreshold = 5

    // Find current milestone threshold
    const milestoneLevels = [
      { count: 0, title: 'Dream Starter' },
      { count: 5, title: 'Candy Pathfinder' },
      { count: 10, title: 'Sugar Adventurer' },
      { count: 15, title: 'Sprinkle Navigator' },
      { count: 20, title: 'Lolly Architect' },
      { count: 25, title: 'Caramel Visionary' },
      { count: 30, title: 'Frosted Mastermind' },
      { count: 35, title: 'Candy Conqueror' }
    ]

    for (let i = 0; i < milestoneLevels.length; i++) {
      if (completedCount >= milestoneLevels[i].count) {
        currentThreshold = milestoneLevels[i].count
        if (i + 1 < milestoneLevels.length) {
          nextThreshold = milestoneLevels[i + 1].count
        } else {
          nextThreshold = milestoneLevels[i].count // Max level
        }
      }
    }

    // Calculate progress between current and next milestone
    let progress = 0
    if (nextThreshold > currentThreshold) {
      const progressInRange = completedCount - currentThreshold
      const totalInRange = nextThreshold - currentThreshold
      progress = (progressInRange / totalInRange) * 100
    } else {
      progress = 100 // Max level reached
    }

    return {
      currentTitle: currentTitle,
      nextMilestone: nextInfo.title,
      completedCount: completedCount,
      totalGoals: totalGoals,
      progress: Math.min(progress, 100),
      goalsRemaining: nextInfo.remaining,
      currentThreshold: currentThreshold,
      nextThreshold: nextThreshold
    }
  }

  // OPTIMIZED LOAD - With caching for instant subsequent loads
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser)
      
      if (!currentUser) {
        setLoading(false)
        setDataLoaded(false)
        setMainGoal('')
        setSubGoals([])
        setMilestones([])
        return
      }

      // CHECK CACHE FIRST - Instant load!
      const cached = dreamDataCache.get(currentUser.uid)
      if (cached) {
        setMainGoal(cached.dreamGoal || '')
        setSubGoals(cached.dreamSubGoals || [])
        setMilestones(cached.dreamMilestones || [])
        setDataLoaded(true)
        setLoading(false)
      }

      try {
        const docRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          dreamDataCache.set(currentUser.uid, data)
          setMainGoal(data.dreamGoal || '')
          setSubGoals(data.dreamSubGoals || [])
          setMilestones(data.dreamMilestones || [])
        } else {
          const initialData = { dreamGoal: '', dreamSubGoals: [], dreamMilestones: [] }
          dreamDataCache.set(currentUser.uid, initialData)
          setMainGoal('')
          setSubGoals([])
          setMilestones([])
        }
        
        setDataLoaded(true)
      } catch (err) {
        console.error('Error loading:', err)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  // OPTIMIZED SAVE - Immediate save with cache update
  useEffect(() => {
    if (!user || !dataLoaded) return

    const saveData = async () => {
      try {
        const data = {
          dreamGoal: mainGoal,
          dreamSubGoals: subGoals,
          dreamMilestones: milestones
        }
        
        dreamDataCache.set(user.uid, data)
        
        const docRef = doc(db, 'users', user.uid)
        await setDoc(docRef, data, { merge: true })
      } catch (err) {
        console.error('Save error:', err)
        setError('Failed to save data')
      }
    }

    saveData()
  }, [mainGoal, subGoals, milestones, user, dataLoaded])

  const addSubGoal = () => {
    if (newSubGoal.trim()) {
      const goal = {
        id: Date.now(),
        text: newSubGoal,
        status: subGoals.length === 0 ? 'unlocked' : 'locked'
      }
      setSubGoals([...subGoals, goal])
      setNewSubGoal('')
    }
  }

  const getMilestoneTitle = (completedCount) => {
    if (completedCount >= 35) return 'Candy Conqueror'
    if (completedCount >= 30) return 'Frosted Mastermind'
    if (completedCount >= 25) return 'Caramel Visionary'
    if (completedCount >= 20) return 'Lolly Architect'
    if (completedCount >= 15) return 'Sprinkle Navigator'
    if (completedCount >= 10) return 'Sugar Adventurer'
    if (completedCount >= 5) return 'Candy Pathfinder'
    return null
  }

  const completeLevel = (id) => {
    const goalIndex = subGoals.findIndex(g => g.id === id)
    if (goalIndex === -1) return

    const updatedGoals = [...subGoals]
    updatedGoals[goalIndex].status = 'completed'

    if (goalIndex + 1 < updatedGoals.length) {
      updatedGoals[goalIndex + 1].status = 'unlocked'
    }

    setSubGoals(updatedGoals)

    const completedCount = updatedGoals.filter(g => g.status === 'completed').length
    const previousCompleted = completedCount - 1
    
    const newMilestone = getMilestoneTitle(completedCount)
    const previousMilestone = getMilestoneTitle(previousCompleted)

    if (newMilestone && newMilestone !== previousMilestone) {
      if (!milestones.includes(newMilestone)) {
        setMilestones([...milestones, newMilestone])
        setPopupData({
          title: newMilestone,
          message: `You've completed ${completedCount} goals and earned a new milestone!`
        })
        setShowPopup(true)
      }
    }

    if (completedCount === updatedGoals.length && updatedGoals.length > 0) {
      const legendTitle = 'Royal Lolly Legend'
      if (!milestones.includes(legendTitle)) {
        setMilestones([...milestones, legendTitle])
        setPopupData({
          title: legendTitle,
          message: 'You completed all your dream goals! You are a true legend!'
        })
        setShowPopup(true)
      }
    }
  }

  const deleteSubGoal = (id) => {
    const filtered = subGoals.filter(g => g.id !== id)
    if (filtered.length > 0 && filtered[0].status === 'locked') {
      filtered[0].status = 'unlocked'
    }
    setSubGoals(filtered)
  }

  const progressData = getProgressData()

  return (
    <div className="container roadmap-container">
      {loading && !dreamDataCache.get(user?.uid) && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading your dreams...</p>
        </div>
      )}

      {!user && !loading && (
        <div className="page-header">
          <h2>Please Login</h2>
          <p style={{ color: '#888', marginTop: '1rem' }}>
            You need to be logged in to access Dream Goals.
          </p>
        </div>
      )}

      {user && (
        <>
          <div className="page-header">
            <h2>Dream Goals</h2>
            <div className="dream-title-badge">
              {progressData.currentTitle}
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="progress-section">
            <div className="progress-info">
              <div className="progress-text">
                <span className="current-title">{progressData.currentTitle}</span>
                <span className="arrow">→</span>
                <span className="next-title">{progressData.nextMilestone}</span>
              </div>
              {progressData.goalsRemaining > 0 && (
                <div className="points-remaining">
                  {progressData.goalsRemaining} more goals to next milestone
                </div>
              )}
              {progressData.totalGoals > 0 && (
                <div className="completion-text">
                  {progressData.completedCount} out of {progressData.totalGoals} goals completed
                </div>
              )}
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressData.progress}%` }}
              >
                <span className="progress-percentage">
                  {Math.round(progressData.progress)}%
                </span>
              </div>
            </div>
            <div className="progress-points">
              <span>{progressData.currentThreshold} goals</span>
              {progressData.goalsRemaining > 0 && (
                <span>{progressData.nextThreshold} goals</span>
              )}
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <h3>{progressData.completedCount}</h3>
              <p>Goals Completed</p>
            </div>
            <div className="stat-card">
              <h3>{progressData.totalGoals}</h3>
              <p>Total Goals</p>
            </div>
            <div className="stat-card">
              <h3>{milestones.length}</h3>
              <p>Milestones Earned</p>
            </div>
          </div>

          <div className="goal-input">
            <h3>Main Dream Goal</h3>
            <input
              type="text"
              value={mainGoal}
              onChange={(e) => setMainGoal(e.target.value)}
              placeholder="What's your big dream? (e.g., Get fit, Learn coding...)"
            />
          </div>

          <div className="goal-input">
            <h3>Add Sub-Goal</h3>
            <input
              type="text"
              value={newSubGoal}
              onChange={(e) => setNewSubGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSubGoal()}
              placeholder="Break down your dream into smaller steps..."
            />
            <button onClick={addSubGoal} disabled={!newSubGoal.trim()}>
              Add Sub-Goal
            </button>
          </div>

          {milestones.length > 0 && (
            <div className="goal-input">
              <h3>Earned Milestones</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {milestones.map((milestone, index) => (
                  <div key={index} className="title-badge" style={{ margin: '0.5rem' }}>
                    {milestone}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="levels-path">
            {subGoals.map((goal, index) => (
              <div key={goal.id} className="level-node">
                <LevelCircle
                  level={index + 1}
                  status={goal.status}
                  onClick={() => completeLevel(goal.id)}
                />
                <div className="level-node-text">
                  <strong>{goal.text}</strong>
                  <div style={{ marginTop: '0.5rem' }}>
                    <button 
                      onClick={() => completeLevel(goal.id)}
                      disabled={goal.status !== 'unlocked'}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Complete
                    </button>
                    <button onClick={() => deleteSubGoal(goal.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {subGoals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
              <p>No sub-goals yet. Break down your dreams into smaller steps!</p>
            </div>
          )}

          {showPopup && (
            <RewardPopup
              title={popupData.title}
              message={popupData.message}
              onClose={() => setShowPopup(false)}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Roadmap