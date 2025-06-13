import Person from './components/Person'

import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(persons => (persons.name))
    console.log(names);

    if ((names.includes(newName))){
      alert(`${newName} is already added to phonebook`);
      console.log("already includes")
      return
    } 
 
    const personObject = {
      name: newName,
     // important: Math.random() > 0.5,
    //  id: String(persons.length + 1),
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  )
}


export default App