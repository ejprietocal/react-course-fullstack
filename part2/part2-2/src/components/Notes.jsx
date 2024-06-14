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

const Persons = ({findName,findPersons,persons,setPersons}) =>{
  return(
    <>
      {findPersons(findName).map(person =>(
        <>
          <p>{person.name} {person.number} <ButtonDelete name={person.name} id={person.id} setPersons={setPersons} persons={persons} /> </p>
        </>
      ))}
    </>
  )
}

const findNames = (array, nameFragment) =>{
  return array.filter(person => person.name.toLowerCase().includes(nameFragment.toLowerCase()))
}

const ButtonDelete = ({id,name,setPersons,persons}) =>{
  return(
  <button 
      onClick={ () =>{
          if(window.confirm(`Delete ${name}?`)){
            noteServices
              .Delete(id)
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

const found = (persons,newName) => {persons.find((person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())};


export {Filter,PersonForm,Persons,findNames,found,ButtonDelete}