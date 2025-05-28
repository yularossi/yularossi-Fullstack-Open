//estructura del componente PersonForm
const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <h2>Add a new person</h2>
      <div>
        name: <input 
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>
      <div>
        number: <input 
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm