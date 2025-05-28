//estructura del componente Note
const Note = ({ country}) => {
    return (
      <li className = 'country'>{country.name.common}</li>
    )
  }
  
  export default Note