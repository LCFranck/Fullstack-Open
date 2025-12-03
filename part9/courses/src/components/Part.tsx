import type { CoursePart } from '../types'; 

interface PartProps {
  coursepart: CoursePart;
}

const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };


export const Part = (props: PartProps) => {
  
      switch(props.coursepart.kind){
        case "basic":
            return <>
                <h3>{props.coursepart.name} {props.coursepart.exerciseCount}</h3>  
                <p>Description: {props.coursepart.description}</p> 
                </>      
        case "group":
            return <>
                <h3>{props.coursepart.name} {props.coursepart.exerciseCount}</h3>
                 <p>Group projects:{props.coursepart.groupProjectCount} </p>
            </>
        case "background":
            return <>
                <h3>{props.coursepart.name} {props.coursepart.exerciseCount}</h3>
                <p>Background material: {props.coursepart.backgroundMaterial} </p>

                </>
        case "special":
            return <>
                <h3> {props.coursepart.name} {props.coursepart.exerciseCount}</h3>
                <p>Requirements: {props.coursepart.requirements.join(', ')}</p>

            </>
        default:
            return assertNever(props.coursepart);         
        }
}