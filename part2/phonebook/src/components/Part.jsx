//estructura del componente Part
const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>{props.data.name} {props.data.exercises}</p>
    </>
  )
}

export default Part