import noteServices from '../services/Notes'

const Filter = ({findName, handleFindChange}) =>{
  return <p>Filter show with: <input value={findName} onChange={handleFindChange} /></p>
}

const PersonForm = ({onSubmit,newName,newPhone,handleNameChange,handlePhoneChange}) =>{
  return(
    <>
      <form onSubmit={onSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div> 
        <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Persons = ({findName,findPersons,persons,setPersons,setErrorMessage,setClassName}) =>{
  return(
    <>
      {findPersons(findName).map(person =>(
        <>
          <p>{person.name} {person.number} <ButtonDelete setClassName={setClassName} personName={person.name} setErrorMessage={setErrorMessage} name={person.name} id={person.id} setPersons={setPersons} persons={persons} /> </p>
        </>
      ))}
    </>
  )
}

const findNames = (array, nameFragment) =>{
  return array.filter(person => person.name.toLowerCase().includes(nameFragment.toLowerCase()))
}

const ButtonDelete = ({id,name,setPersons,persons,setErrorMessage,personName,setClassName}) =>{
  return(
  <button 
      onClick={ () =>{
          if(window.confirm(`Delete ${name}?`)){
            noteServices
              .Delete(id,setErrorMessage,personName,setClassName)
              .then(status =>{
                if(status === 200 || status === 204){
                  setPersons(persons.filter(person => person.id !== id))
                }
              })
          }
        }
      }
  >
      Delete
  </button>

  )
}

const Notification = ({ message,newName,setErrorMessage,className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}


const found = (persons,newName) => {return persons.find((person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())}

export {Filter,PersonForm,Persons,findNames,found,ButtonDelete,Notification}