import Content from './Content'
import Header from './Header'
import Total from './Total' //ya esta importado el componente Total para cuando requiera implementarlo en la App

//estructura del componente Course
const Course = ({course}) => {
    return (
        <div>
        <Header course = {course.name}/>
        <Content parts = {course.parts}/>
        
        </div>
    )    
}

export default Course