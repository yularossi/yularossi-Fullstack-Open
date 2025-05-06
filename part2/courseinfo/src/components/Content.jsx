import Part from './Part'

//estructura del componente Content
const Content = (props) => {
    console.log(props)
    const result = props.parts.map(props.part => <Part data={props.part} />)
    return (
      <>
        
      </>
    )
}

export default Content