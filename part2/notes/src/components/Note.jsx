//estructura del componente Note
const Note = ({ person}) => {
    return (
      <li>{person.name}: {person.number}</li>
    )
  }
  
  export default Note