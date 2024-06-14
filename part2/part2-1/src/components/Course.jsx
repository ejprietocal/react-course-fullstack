const Header = ({name}) =>{
    return <h1>{name}</h1>
}
const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
}

const Total = ({parts}) =>{

    let total = parts.reduce((sum, part) => sum + part.exercises,0)
    return <strong>Total of exercises {total}</strong>
}


const Content = ({parts}) =>{
    return(
        <>
            {parts.map(part => (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}
        </>    
    )
}

const Course = ({courses}) =>{
    return(
        <>
            {courses.map(course => (
                <>
                    <Header name={course.name}/>
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </>

            ))}
        </>
    )
}

export default Course