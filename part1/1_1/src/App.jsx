
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
            <p>{props.part.name} {props.part.exercises} </p>
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

  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]

  return (
    <div>
      <Header courseName={course} />
      <Content parts={parts} />
      <Total total={parts} />
    </div>
  )
}

export default App;