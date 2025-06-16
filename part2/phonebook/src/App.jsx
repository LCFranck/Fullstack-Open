import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import { useState, useEffect } from 'react'
import personService from './services/persons.jsx'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const names = persons.map(person => (person.name))
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = persons.filter(person => person?.name?.toLowerCase().includes(newFilter.toLowerCase())
)
  //const personsToShow = persons


  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    console.log(names);


    if ((names.includes(newName))){
      alert(`${newName} is already added to phonebook`);
      console.log("already includes")
      return
    } 

    const personObject = {
      name: newName,
      number: newNumber,
    //  id: String(persons.length + 1),
    }

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }


  const handleFilter = (event) =>{
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h2>Add a person!</h2>
        <Form 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange}
          addPerson={addPerson}
        />

    
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  )
}


export default App