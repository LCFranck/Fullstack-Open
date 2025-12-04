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
                <ul>Description: {props.coursepart.description}</ul> 
                </>      
        case "group":
            return <>
                <h3>{props.coursepart.name} {props.coursepart.exerciseCount}</h3>
                 <ul>Group projects: {props.coursepart.groupProjectCount} </ul>
            </>
        case "background":
            return <>
                <h3>{props.coursepart.name} {props.coursepart.exerciseCount}</h3>
                <ul>Description: {props.coursepart.description}</ul> 
                <ul>Background material: {props.coursepart.backgroundMaterial} </ul>

                </>
        case "special":
            return <>
                <h3> {props.coursepart.name} {props.coursepart.exerciseCount}</h3>
                <ul>Description: {props.coursepart.description}</ul> 
                <ul>Requirements: {props.coursepart.requirements.join(', ')}</ul>

            </>
        default:
            return assertNever(props.coursepart);         
        }
}