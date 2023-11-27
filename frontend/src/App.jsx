import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.jsx'
import personsService from './services/persons.jsx'

const Notification = ({message, setMessage}) => {
    if (message === null) {
        return
    }

    setTimeout(() => {
        setMessage(null)
    }, 5000)

    return (
        <div className="message">
            {message}
        </div>
    )
}
const Person = ({person, removePerson}) => {
    return (
        <p>
            {person.name} {person.number}
        <button onClick={removePerson}>delete</button>
        </p>
    )
}

const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <form>
            filter shown with
            <input
                value={newFilter}
                onChange={handleFilterChange}
            />
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newFilter, setNewFilter] = useState('')
    const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personsService
            .getData()
            .then(initialPersons => setPersons(initialPersons))
    }, [])

    const removePerson = (person) => {
        if (confirm(`Delete ${person.name}`)) {
            setMessage(`Deleted ${person.name}`)
            personsService
                .remove(person.id)
                .then(response => setPersons(persons.filter(n => n.name!==person.name)))
        }
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} setMessage={setMessage} />
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            <h3>Add a new</h3>
            <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />
            <h2>Numbers</h2>
            <div> {personsFiltered.map(person =>
                        <Person key={person.id}
                                person={person}
                                removePerson={() => removePerson(person)}/>
                )}
            </div>
        </div>
    )

}

export default App
