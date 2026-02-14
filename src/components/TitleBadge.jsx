import React from 'react'

const TitleBadge = ({ points }) => {
  const getTitle = (points) => {
    if (points >= 5000) return 'Royal Candy Sovereign'
    if (points >= 4001) return 'Supreme Sugar Hero'
    if (points >= 3301) return 'Frost Queen'
    if (points >= 2701) return 'Caramel Champion'
    if (points >= 2201) return 'Lolly Luminary'
    if (points >= 1801) return 'Candy Commander'
    if (points >= 1501) return 'Sprinkle Star'
    if (points >= 1201) return 'Sugar Strategist'
    if (points >= 901) return 'Frosted Achiever'
    if (points >= 701) return 'Caramel Climber'
    if (points >= 501) return 'Candy Crafter'
    if (points >= 351) return 'Lolly Learner'
    if (points >= 251) return 'Sprinkle Striver'
    if (points >= 151) return 'Bubble Sprout'
    if (points >= 81) return 'Sweet Explorer'
    if (points >= 41) return 'Candy Beginner'
    return 'Sugar Seed'
  }

  return (
    <div className="title-badge">
      {getTitle(points)}
    </div>
  )
}

export default TitleBadge