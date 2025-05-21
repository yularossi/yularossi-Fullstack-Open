import Note from './Note'

//estructura del componente List de la phonebook
const List = ({ setPersons, filteredPersons }) => {
  return (
    <div>
        <h2>Numbers</h2>
        <ul>
        {filteredPersons.map((person) => 
            <Note key={person.name} person={person} setPersons={setPersons} />
        )}
        </ul>
    </div>
  )
}

export default List