import { useState } from 'react'


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {
    return (   
        <div>
          <p> {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
        </div>

        )
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    console.log('value now', good)
    setGood(good + 1)
  }

  const handleNeutral = () => {
    console.log('value now', neutral)
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    console.log('value now', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>{"give feedback"}</h1>

      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <h1>{"statistics"}</h1>



    </div>
  )
}

export default App
