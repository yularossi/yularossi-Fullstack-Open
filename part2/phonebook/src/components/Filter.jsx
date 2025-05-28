//estructura del componente Filter
const Filter = ({ filter, setFilter, submitEvent }) => {
  return (
    <form onSubmit={(event) => submitEvent(event)}>
        <h2>Filter</h2>
      <div>
        filter shown with: <input 
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
    </form>
  )
}

export default Filter