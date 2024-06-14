import { useState, useEffect } from 'react'
import {Filter,PersonForm,Persons,findNames,found} from './components/Notes'
import noteServices from './services/Notes'
 

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [findName, setFindName] = useState('')

  useEffect(() => {
    refreshServices(); // Llama a la función refreshServices al montar el componente
  }, []);

  const refreshServices = () => {
    noteServices.getAll()
      .then(directory => {
        setPersons(directory);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


  const addServices = (object) =>{
    noteServices
    .create(object)
    .then(returnedPerson =>{
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewPhone('');
    })
  }

  const addClient = (event) =>{
    event.preventDefault();
    const founded = found(persons,newName)
    if(founded){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const personObject = {
          name: newName,
          number: newPhone,
      }

      addServices(personObject)
    }
  }
  const handleNameChange = (event) =>{setNewName(event.target.value)}
  const handlePhoneChange = (event) =>{setNewPhone(event.target.value)}
  const handleFindChange = (event) =>{setFindName(event.target.value)}
  const findPersons = (value) =>{return findNames(persons,value)}

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Filter findName={findName} handleFindChange={handleFindChange} />
      </div>
      <div>
        <h2>Add a new</h2>
        <PersonForm onSubmit={addClient} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
        <h2>Numbers</h2>
        <Persons refreshServices={refreshServices} findName={findName} findPersons={findPersons} persons={persons} setPersons={setPersons} />
      </div>
    </>


  )
}

export default App