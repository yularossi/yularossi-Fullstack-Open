import Note from './Note'

//estructura del componente List de la phonebook
const List = ({ setPersons, filteredPersons, deleteNumber }) => {
  return (
    <div>
        <h2>Numbers</h2>
        <ul>
        {filteredPersons.map((person) => 
          <div key={person.id} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
            <Note key={person.name} person={person} setPersons={setPersons} />
            <button onClick={deleteNumber.bind(null, person.id)}>
              Delete
            </button>
          </div>
            
        )}
        </ul>
    </div>
  )
}

export default List