import { useState } from 'react'
import personsService from '../services/persons.jsx'

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const namesLowerCase = persons.map(person => person.name.toLowerCase())

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if(namesLowerCase.includes(newName.toLowerCase())) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const toBeUpdated = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        personsService
          .update(toBeUpdated.id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== toBeUpdated.id ? person : response.data))
            setMessage(`Updated ${newName}`)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessage(error.response.data.error)
          })
      }
      return
    }

    personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setMessage(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setMessage(error.response.data.error)
      })
  }

  return (
    <form onSubmit={addName}>
      <div>name:
        <input
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
        />
      </div>
      <div>number:
        <input
          value={newNumber}
          onChange={({ target }) => setNewNumber(target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm