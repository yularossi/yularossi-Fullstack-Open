//estructura del componente Note
const Note = ({ person}) => {
    return (
      <li className = 'person'>{person.name}: {person.number}</li>
    )
  }
  
  export default Note