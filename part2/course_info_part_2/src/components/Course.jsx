

const Course = (props) => {

    const Header = (props) => <h1>{props.course}</h1>
    
    const Total = (props) => {
      const exercises = props.parts.map(parts => (parts.exercises))
      console.log(exercises);

      const result = exercises.reduce((sum, exercises) => sum + exercises);

      return(
      <p>Number of exercises {result}</p>
      )
    }
    
    const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>
    
  
    const Content = (props) => (
      <div>
        {props.parts.map((part, id) => (
          <Part key={id} part={part} />
        ))}
      </div>
    )

    return (
        <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts}/>
        </div>
    )
    }
export default Course;