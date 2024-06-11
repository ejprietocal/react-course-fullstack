import { useState } from 'react'



const Button = (props) =>(
  <button onClick={props.handledClick}>{props.text}</button>
) 


const StatisticLine = ({text, value}) =>{
    return <tr><td>{text}</td><td>{value}</td></tr>
}


const Statistics = ({good, neutral, bad}) =>{

  let average = (good - bad ) / (good + neutral + bad);
  let positive = (good) / (good + neutral + bad);

  if(good === 0 && neutral === 0 && bad ===0){return <p>No feedback given</p>}
  else{
    return(
       <table>
          <StatisticLine text={'good'} value={good}/>
          <StatisticLine text={'neutral'} value={neutral}/>
          <StatisticLine text={'bad'} value={bad}/>
          <StatisticLine text={'All'} value={good + neutral + bad}/>
          <StatisticLine text={'Average'} value={average.toFixed(2)}/>
          <StatisticLine text={'Positive'} value={positive.toFixed(2) +'%'}/>
       </table> 
    )
  }
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <h1>Give a feedback</h1>
      <Button handledClick={() => setGood(good + 1)} text={'good'} />
      <Button handledClick={() => setNeutral(neutral + 1)} text={'Neutral'} />
      <Button handledClick={() => setBad(bad + 1)} text={'Bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App