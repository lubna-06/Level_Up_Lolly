# Level Up Lolly 

Team Name: Bloom
- **Team Members:**
-   Member 1:Lubna Salin - LBSITW
-    Member 2: Joshna P John - LBSITW
-    Hosted Project Link
[mention your project hosted link here]

Project Description
A gamified task management and goal tracking app with a sweet candy theme!

**Problem Statement**:

Many people struggle to consistently complete daily and long-term tasks because traditional to-do lists are boring and fail to motivate users. There is no system that makes task completion engaging, rewarding, and visually fun, especially for users who enjoy gamified experiences.
Level Up Lolly addresses this problem by turning tasks into a gamified, candy-themed journey:
Daily tasks are converted into “missions” with points awarded for completion.
Long-term goals are broken into a roadmap of levels, where completing sub-goals unlocks the next level.
Users earn cute milestone titles and streak rewards as they progress.
The interface uses animations, level indicators, and visual progress to make task management fun and motivating.
The system ensures users are encouraged to complete tasks regularly while enjoying a playful, game-like experience, turning productivity into a rewarding activity

**Solution**:Level Up Lolly gamifies task management to make daily and long-term goals fun and engaging:
Daily Missions: Users can add up to 4 daily tasks. Completing tasks earns points, and finishing all tasks triggers bonus points and streak rewards. Optional timers and animated progress make each task interactive.
Long-Term Roadmap: Users create a main goal with multiple sub-goals arranged in a “level” roadmap. Completing a sub-goal unlocks the next, and finishing milestones awards cute titles, creating a sense of progression and achievement.
Progress Tracking: Points, streaks, completed tasks, and earned titles are saved (localStorage or Firebase), allowing users to continue exactly where they left off.
Gamified Interface: The app uses candy-themed visuals, level circles, milestone popups, and animations to make productivity motivating and enjoyable.
Impact: Users are encouraged to complete tasks consistently, track long-term progress, and stay motivated through rewards, levels, and titles.

## Features

- **Daily Missions**: Track up to 10 daily tasks with optional stopwatch timers
- **Points System**: Earn 10 points per task, plus 50 bonus points for completing all daily tasks
- **Title Progression**: Unlock 17 candy-themed titles from "Sugar Seed" to "Royal Candy Sovereign"
- **Roadmap**: Set long-term goals with unlockable milestone levels
- **Milestone Rewards**: Earn special titles for completing roadmap levels
- **Streak Counter**: Track your daily completion streak
- **Beautiful Animations**: Smooth CSS animations with dark purple completion states

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`
## Project Documentation
<img width="1920" height="1080" alt="Screenshot 2026-02-14 092844" src="https://github.com/user-attachments/assets/6f29d79c-4e12-45c3-ab07-90adad872ac6" />

<img width="1920" height="1080" alt="Screenshot 2026-02-14 092949" src="https://github.com/user-attachments/assets/08f17764-316c-43a9-90e6-5ef56e82ed3e" />



<img width="1920" height="1080" alt="Screenshot 2026-02-14 093024" src="https://github.com/user-attachments/assets/1f63fc2d-6f7d-45bb-9074-ebafe59baf92" />

<img width="1920" height="1080" alt="Screenshot 2026-02-14 093307" src="https://github.com/user-attachments/assets/2f050261-6842-4008-820c-01c9a3c62455" />

<img width="1920" height="1080" alt="Screenshot 2026-02-14 093356" src="https://github.com/user-attachments/assets/5fbf6626-3193-4eb9-925c-c600885a1c15" />

<img width="1920" height="1080" alt="Screenshot 2026-02-14 093451" src="https://github.com/user-attachments/assets/77769537-8787-41b1-b916-314da892bbe9" />


<img width="1920" height="1080" alt="Screenshot 2026-02-14 093506" src="https://github.com/user-attachments/assets/8eb68f8b-b16b-48aa-928d-2f545616b686" />


<img width="1920" height="1080" alt="Screenshot 2026-02-14 093547" src="https://github.com/user-attachments/assets/ba905e50-3691-4799-8c18-69272e02d736" />

<img width="1920" height="1080" alt="Screenshot 2026-02-14 093609" src="https://github.com/user-attachments/assets/7df52f9c-e5b6-4258-bf0d-1ccbb13b0acd" />

<img width="1920" height="1080" alt="Screenshot 2026-02-14 093625" src="https://github.com/user-attachments/assets/8f4c97d7-b316-4459-9b37-011b0d49d95f" />



<img width="1920" height="1080" alt="Screenshot 2026-02-14 093625" src="https://github.com/user-attachments/assets/8556a209-b3f4-4a13-8d78-1e8a366dd9a5" />

<img width="1920" height="1080" alt="Screenshot 2026-02-14 093643" src="https://github.com/user-attachments/assets/78550dfd-585f-4f28-9826-4f430122cb00" />


<img width="1920" height="1080" alt="Screenshot 2026-02-14 093731" src="https://github.com/user-attachments/assets/5fe6e08a-d3ee-4d3b-9f9f-d1eb1736c53f" />

<img width="1920" height="1080" alt="Screenshot 2026-02-14 093745" src="https://github.com/user-attachments/assets/cc76c683-4532-4cc8-9157-8e7d8156e411" />

## Application Workflow

<img width="1024" height="1536" alt="workflow" src="https://github.com/user-attachments/assets/07314b2e-7df7-4b78-97cf-b5c966f87376" />

## How to Use

### Daily Page
- Add up to 10 daily tasks
- Check off tasks to earn 10 points each
- Enable stopwatch for time tracking (Start/Pause/Reset)
- Complete all tasks to earn 50 bonus points and increase your streak
- Completed tasks turn dark purple with a glow animation

### Roadmap Page
- Set your main long-term goal
- Add multiple sub-goals as level milestones
- Complete levels in order (each level unlocks the next)
- Earn milestone titles at 5, 10, 15, 20, 25, 30, 35 completed levels
- Complete all levels to become a "Royal Lolly Legend"

### Title Ranks (based on total points)
- 0-40: Sugar Seed
- 41-80: Candy Beginner
- 81-150: Sweet Explorer
- 151-250: Bubble Sprout
- 251-350: Sprinkle Striver
- 351-500: Lolly Learner
- 501-700: Candy Crafter
- 701-900: Caramel Climber
- 901-1200: Frosted Achiever
- 1201-1500: Sugar Strategist
- 1501-1800: Sprinkle Star
- 1801-2200: Candy Commander
- 2201-2700: Lolly Luminary
- 2701-3300: Caramel Champion
- 3301-4000: Frost Queen
- 4001-5000: Supreme Sugar Hero
- 5000+: Royal Candy Sovereign

### Milestone Titles
- 5 levels: Candy Pathfinder
- 10 levels: Sugar Adventurer
- 15 levels: Sprinkle Navigator
- 20 levels: Lolly Architect
- 25 levels: Caramel Visionary
- 30 levels: Frosted Mastermind
- 35 levels: Candy Conqueror
- All levels: Royal Lolly Legend

## Tech Stack

- React 18
- Vite
- React Router
- CSS Animations
- Firebase for persistence

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

# Project Demo
## Video

https://drive.google.com/file/d/1Wq83AJ60McUDA_bjL51ElTJRyES2tdp_/view?usp=drivesdk


Enjoy your sweet journey to success!✨
