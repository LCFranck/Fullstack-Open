import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'



import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const names = persons.map(person => (person.name))
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))


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
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')

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
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  )
}


export default App