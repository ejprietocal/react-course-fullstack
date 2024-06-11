import { useState } from 'react'


const Button = props =>(<button onClick={props.handleClick}>{props.text}</button>)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const initialVote = Array.from({length: anecdotes.length},() => 0);

  const [vote, setVote] = useState(initialVote);

  const getRandonInt= max =>{
    return Math.floor(Math.random() * max);
  }

  const setTovalue = () =>{
       setSelected(getRandonInt(anecdotes.length - 1)); 
  }
  const handleVote = (index) =>{
    setVote(prevVote =>{
        const newVote =[...prevVote];
        newVote[index] ++;
        return newVote;
    })
  }

  const max = array => {
     const maxValue = Math.max(...array);
     const maxIndex = array.indexOf(maxValue);

     console.log(maxIndex)
     return maxIndex;   
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>  
      <p>{anecdotes[selected]}</p>
      <p>Has {vote[selected]} Votes</p>
      <Button handleClick={() =>handleVote(selected)} text='vote' />  
      <Button handleClick={() =>setTovalue('next')} text='next anecdote' />  
      <h2>Anecdote with most Votes</h2>  
      <p>{anecdotes[max(vote)]}</p>
      <p>has {vote[max(vote)]} votes</p>
    </div>
  )
}

export default App