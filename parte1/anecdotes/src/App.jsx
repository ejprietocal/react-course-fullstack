import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => (
  <h2>{props.value}</h2>
)

const StatisticLine = props => {
  return(
    <>
      <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
      </tr>
    </>
  )
}

const Statics = props =>{

  const total = props.good  + props.neutral + props.bad;
  const positivos = props.good / total;

  const average =  (props.good  - props.bad) / total;


  if(total === 0){
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  else{
    return (
      <>
        <h2>{props.value}</h2>
        <table>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
        <tr>
          <td>All</td>
          <td>{props.good + props.neutral + props.bad}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{average.toFixed(6)}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{positivos.toFixed(6)} %</td>
        </tr>
        </table>
      </>
    ) 

  }
}

const App = () => {
  const [good, setValue] = useState(0)
  const [neutral, setValueNeutral] = useState(0)
  const [bad, setValueBad] = useState(0)


  const setToValue = (props) => {
    if(props === 'good'){
      setValue(good + 1)
    }
    else if(props === 'neutral'){
      setValueNeutral(neutral + 1)
    }
    else setValueBad(bad + 1)
  }

  return (
    <div>
      <Display value={'Give a feedback'} />
      <Button handleClick={() => setToValue('good')} text="good" />
      <Button handleClick={() => setToValue('neutral')} text="neutral" />
      <Button handleClick={() => setToValue('bad')} text="bad" />

      <Statics value={'Statistics'} good={good}  neutral={neutral} bad={bad} />

    </div>
  )
}
export default App