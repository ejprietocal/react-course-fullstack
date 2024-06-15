import { useState, useEffect } from 'react'
import {Filter,PersonForm,Persons,findNames,found,Notification} from './components/Notes'
import noteServices from './services/Notes'
import './index.css'
 

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [findName, setFindName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [className, setClassName] = useState('')


  useEffect(() => {
    refreshServices(); // Llama a la función refreshServices al montar el componente
  }, []);

  const refreshServices = () => {
    noteServices.getAll()
      .then(directory => {
        setPersons(directory);
        setErrorMessage(null)
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
      setClassName('success')
      setErrorMessage(`Added ${returnedPerson.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const addClient = (event) =>{
    event.preventDefault();
    const founded = found(persons,newName)
    if(founded){
      if(window.confirm(`${newName} is already added to phonebook, replace de old number with a new one?`)){
        const personObject = {
          ...founded,
          number: newPhone,
        } 
        noteServices
          .updatePerson(founded.id,personObject)
          .then((response)=>{
            const personFiltered = persons.map(person => person.id === founded.id ? response : person )
            setPersons(personFiltered)
            setNewName('')
            setNewPhone('')
          })
        }
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
        <Notification className={className} setClassName={setClassName} newName={newName}  message={errorMessage} />
        <Filter findName={findName} handleFindChange={handleFindChange} />
      </div>
      <div>
        <h2>Add a new</h2>
        <PersonForm  onSubmit={addClient} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} />
        <h2>Numbers</h2>
        <Persons setClassName={setClassName} setErrorMessage={setErrorMessage} refreshServices={refreshServices} findName={findName} findPersons={findPersons} persons={persons} setPersons={setPersons} />
      </div>
    </>


  )
}

export default App