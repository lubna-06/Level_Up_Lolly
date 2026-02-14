import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Level Up Lolly</h1>
        <p className="hero-subtitle">Your sweet journey to achieving dreams starts here!</p>
      </div>

      {/* Feature Cards */}
      <div className="feature-cards">
        <div className="feature-card daily-card">
          <div className="feature-icon"></div>
          <h3>Daily Missions</h3>
          <p>Complete daily tasks, earn points, and unlock candy-themed titles!</p>
          <ul className="feature-list">
            <li>Add up to 10 tasks per day</li>
            <li>Earn 10 points per task</li>
            <li>Get 50 bonus points for completing all tasks</li>
            <li>Build your streak daily</li>
          </ul>
          <Link to="/daily">
            <button className="feature-btn">Start Daily Tasks</button>
          </Link>
        </div>

        <div className="feature-card dream-card">
          <div className="feature-icon"></div>
          <h3>Dream Goals</h3>
          <p>Set long-term goals and unlock milestones as you make progress!</p>
          <ul className="feature-list">
            <li>Create your big dream goal</li>
            <li>Break it into sub-goals</li>
            <li>Complete goals to earn milestones</li>
            <li>Track your journey to success</li>
          </ul>
          <Link to="/roadmap">
            <button className="feature-btn">Plan Your Dreams</button>
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h4>Choose Your Path</h4>
            <p>Start with daily tasks or plan your long-term dreams</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h4>Complete & Progress</h4>
            <p>Check off tasks and watch your progress grow</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h4>Unlock Rewards</h4>
            <p>Earn titles, milestones, and celebrate achievements!</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <h2>Ready to Level Up?</h2>
        <p>Start your sweet journey today and become a Royal Candy Sovereign! </p>
        <div className="cta-buttons">
          <Link to="/daily">
            <button className="cta-btn primary">Daily Missions</button>
          </Link>
          <Link to="/roadmap">
            <button className="cta-btn secondary">Dream Goals</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home