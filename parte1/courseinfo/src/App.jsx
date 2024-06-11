const Header = (props) =>{

    console.log(props)
    return <h1>{props.course.name}</h1> 
}

const Content = (props) =>{
    return (
        <>
            {props.parts.map(element => (
                <p key={element.id}>{element.name} {element.exercises}</p>
            ))}
        </>
    )
}
const Total = (props) =>{

    let total = 0;
    
    {props.total.forEach(element => {
        total += element.exercises
    })}

    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
    return (
      <div>
        <Header course={course} />
        <Content parts ={course.parts} />
        <Total total={course.parts} />
      </div>
    )   
  }
  
  export default App