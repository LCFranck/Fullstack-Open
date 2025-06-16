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


  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    console.log(names);

     const personObject = {
      name: newName,
      number: newNumber,
    }

    const duplicatePerson = persons.find(p => p.name === newName)

    if (duplicatePerson){
      if (window.confirm("Name is already saved, do you want to update the phone number?")) {
        personService.update(duplicatePerson.id, personObject).then(setPersons(persons))
        console.log("updated")
        setPersons()
        setNewName('')
        setNewNumber('')
        return
    } 
      else {
        alert(`${newName} is already added to phonebook`);
        console.log("already includes")
        return
    }
    } 


    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  ///ÄNDRA HÄR
  const handleDelete = (person) =>{
    console.log("deleted!!")
    personService.remove(person.id).then(() => {
      setPersons(persons.filter(newPerson => newPerson.id !== person.id))

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
          <Person key={person.name} person={person} handleDelete={() => handleDelete(person)} />
        ))}
      </ul>
    </div>
  )
}


export default App