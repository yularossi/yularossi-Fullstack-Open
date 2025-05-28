//estructura del componente Filter
const Filter = ({ filter, setFilter, submitEvent }) => {
  return (
    <form onSubmit={(event) => submitEvent(event)}>
      <div>
        find countries: <input 
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
    </form>
  )
}

export default Filter