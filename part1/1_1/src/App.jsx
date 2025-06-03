
const Header = (props) => {
    console.log("header: ", props)
    return (
        <div>
            <h1>{props.courseName}</h1>
        </div>
    )
}

const Content = (props) => {
    console.log("content: ", props)
    return (
        <div> 
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
        </div>
    )
}

const Part = (props) => {
  console.log("part: ", props)
    return (
      <div> 
            <p>{props.part.part} {props.part.exercises} </p>
      </div>

    )

}


const Total = (props) => {
    console.log("total: ", props)
    return (   
        <div>
          <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
        </div>
        )
}



const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      { part: 'Fundamentals of React', exercises: 10 },
      { part: 'Using props to pass data', exercises: 7 },
      { part: 'State of a component', exercises: 14 }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

export default App;