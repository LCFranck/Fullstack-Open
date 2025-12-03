import type { CoursePart } from '../types'; 
import {Part} from './Part'

interface ContentProps {
  courseparts: CoursePart[];
}





export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseparts.map((courseparts, index) => (
      <Part key={index} coursepart={courseparts} />
    ))}

    </div>
  );
};
