//estructura del componente Total
const Total = (props) => {
    console.log(props)
    return (
      <>
        <p><strong>Total of {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} exercises</strong></p>
      </>
    )
}

export default Total