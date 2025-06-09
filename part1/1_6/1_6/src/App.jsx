import { useState } from 'react'


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = (props) => {
  return (   
        <tr>
          <td>{props.text}</td>
          <td>{props.statistics}</td>
        </tr>
        )
}


 
const Statistics = (props) => {
    console.log('Total now', props.total)

      if (props.total === 0) {    
      return (
        <div>
          <p>No feedback given</p>
       </div>
       )  

    }

    return (
        <table>
          <tbody>
          <StatisticLine statistics = {props.good} text = {"good"}/>
          <StatisticLine statistics = {props.neutral} text = {"neutral"}/>
          <StatisticLine statistics = {props.bad} text = {"bad"} />
          <StatisticLine statistics = {props.total} text = {"total"} />
          <StatisticLine statistics = {props.avg} text = {"average"} />
          <StatisticLine statistics = {props.pos + ' %'} text = {"positive"} /> 
          </tbody>
       </table>
       )  
    
}



const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + bad + neutral;
  const avg = (good + (bad*-1) + (neutral*0))/total;
  const pos = (good)/total;




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
          

    <Statistics 
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            avg={avg}
            pos={pos}
          />

    </div>
   
  )
}

export default App
