import Part from './Part'

//estructura del componente Content
const Content = ({parts}) => {
    console.log(parts)
    return (
      <>
        {parts.map((part) => (<Part key={part.id} data={part} />))}
      </>
    )
}

export default Content