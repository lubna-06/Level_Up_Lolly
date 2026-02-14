import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import TitleBadge from "../components/TitleBadge";
import Stopwatch from "../components/Stopwatch";
import RewardPopup from "../components/RewardPopup";

// Cache for faster subsequent loads
const userDataCache = new Map();

const Daily = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ title: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Get title thresholds for progress bar
  const getTitleThresholds = () => {
    return [
      { title: 'Sugar Seed', points: 0 },
      { title: 'Candy Beginner', points: 41 },
      { title: 'Sweet Explorer', points: 81 },
      { title: 'Bubble Sprout', points: 151 },
      { title: 'Sprinkle Striver', points: 251 },
      { title: 'Lolly Learner', points: 351 },
      { title: 'Candy Crafter', points: 501 },
      { title: 'Caramel Climber', points: 701 },
      { title: 'Frosted Achiever', points: 901 },
      { title: 'Sugar Strategist', points: 1201 },
      { title: 'Sprinkle Star', points: 1501 },
      { title: 'Candy Commander', points: 1801 },
      { title: 'Lolly Luminary', points: 2201 },
      { title: 'Caramel Champion', points: 2701 },
      { title: 'Frost Queen', points: 3301 },
      { title: 'Supreme Sugar Hero', points: 4001 },
      { title: 'Royal Candy Sovereign', points: 5000 }
    ];
  };

  const getProgressData = () => {
    const thresholds = getTitleThresholds();
    
    let currentIndex = 0;
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (points >= thresholds[i].points) {
        currentIndex = i;
        break;
      }
    }

    const current = thresholds[currentIndex];
    const next = thresholds[currentIndex + 1];

    if (!next) {
      return {
        current: current.title,
        next: 'Max Level!',
        currentPoints: points,
        nextPoints: points,
        progress: 100,
        pointsNeeded: 0
      };
    }

    const currentThreshold = current.points;
    const nextThreshold = next.points;
    const progressPoints = points - currentThreshold;
    const totalNeeded = nextThreshold - currentThreshold;
    const progress = (progressPoints / totalNeeded) * 100;

    return {
      current: current.title,
      next: next.title,
      currentPoints: points,
      nextPoints: nextThreshold,
      progress: Math.min(progress, 100),
      pointsNeeded: nextThreshold - points
    };
  };

  // OPTIMIZED LOAD - With caching for instant subsequent loads
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      
      if (!currentUser) {
        setLoading(false);
        setDataLoaded(false);
        setTasks([]);
        setPoints(0);
        setStreak(0);
        return;
      }

      // CHECK CACHE FIRST - Instant load!
      const cached = userDataCache.get(currentUser.uid);
      if (cached) {
        setTasks(cached.dailyTasks || []);
        setPoints(cached.points || 0);
        setStreak(cached.streak || 0);
        setDataLoaded(true);
        setLoading(false);
      }

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          userDataCache.set(currentUser.uid, data);
          setTasks(data.dailyTasks || []);
          setPoints(data.points || 0);
          setStreak(data.streak || 0);
        } else {
          const initialData = { dailyTasks: [], points: 0, streak: 0 };
          userDataCache.set(currentUser.uid, initialData);
          setTasks([]);
          setPoints(0);
          setStreak(0);
        }
        
        setDataLoaded(true);
      } catch (err) {
        console.error("Error loading:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // OPTIMIZED SAVE - Immediate save with cache update
  useEffect(() => {
    if (!user || !dataLoaded) return;

    const saveData = async () => {
      try {
        const data = {
          dailyTasks: tasks,
          points: points,
          streak: streak
        };
        
        userDataCache.set(user.uid, data);
        
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, data, { merge: true });
      } catch (err) {
        console.error("Save error:", err);
        setError("Failed to save data");
      }
    };

    saveData();
  }, [tasks, points, streak, user, dataLoaded]);

  const addTask = () => {
    if (newTask.trim() && tasks.length < 10) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        hasStopwatch: false
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const newCompleted = !task.completed;
        if (newCompleted) {
          setPoints((prev) => prev + 10);
        } else {
          setPoints((prev) => prev - 10);
        }
        return { ...task, completed: newCompleted };
      }
      return task;
    });

    setTasks(updatedTasks);

    const allCompleted =
      updatedTasks.every((task) => task.completed) &&
      updatedTasks.length > 0;

    if (allCompleted) {
      setPoints((prev) => prev + 50);
      setStreak((prev) => prev + 1);
      setPopupData({
        title: "All Tasks Complete!",
        message: "You earned 50 bonus points and increased your streak!"
      });
      setShowPopup(true);
    }
  };

  const toggleStopwatch = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, hasStopwatch: !task.hasStopwatch }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (taskToDelete && taskToDelete.completed) {
      setPoints((prev) => prev - 10);
    }
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const resetDaily = () => {
    setTasks([]);
  };

  const progressData = getProgressData();

  return (
    <div className="container">
      {loading && !userDataCache.get(user?.uid) && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading your missions...</p>
        </div>
      )}

      {!user && !loading && (
        <div className="page-header">
          <h2>Please Login</h2>
          <p style={{ color: '#888', marginTop: '1rem' }}>
            You need to be logged in to access Daily Missions.
          </p>
        </div>
      )}

      {user && (
        <>
          <div className="page-header">
            <h2>Daily Missions</h2>
            <TitleBadge points={points} />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="progress-section">
            <div className="progress-info">
              <div className="progress-text">
                <span className="current-title">{progressData.current}</span>
                <span className="arrow">→</span>
                <span className="next-title">{progressData.next}</span>
              </div>
              {progressData.pointsNeeded > 0 && (
                <div className="points-remaining">
                  {progressData.pointsNeeded} points to next rank
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
              <span>{progressData.currentPoints} pts</span>
              {progressData.pointsNeeded > 0 && (
                <span>{progressData.nextPoints} pts</span>
              )}
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <h3>{points}</h3>
              <p>Total Points</p>
            </div>
            <div className="stat-card">
              <h3>{streak}</h3>
              <p>Day Streak</p>
            </div>
            <div className="stat-card">
              <h3>
                {tasks.filter((t) => t.completed).length}/10
              </h3>
              <p>Completed</p>
            </div>
          </div>

          <div className="task-input-form">
            <h3>Add New Task ({tasks.length}/10)</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              placeholder="Enter your daily task..."
              disabled={tasks.length >= 10}
            />
            <button
              onClick={addTask}
              disabled={tasks.length >= 10 || !newTask.trim()}
            >
              Add Task
            </button>
          </div>

          <div className="tasks-list">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.completed ? "completed" : ""}`}
              >
                <div className="task-content">
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                </div>

                {task.hasStopwatch && (
                  <Stopwatch isCompleted={task.completed} />
                )}

                <div className="task-actions">
                  {!task.completed && (
                    <button onClick={() => toggleStopwatch(task.id)}>
                      {task.hasStopwatch ? "Hide Timer" : "Add Timer"}
                    </button>
                  )}
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {tasks.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button onClick={resetDaily}>Reset Daily Tasks</button>
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
  );
};

export default Daily;