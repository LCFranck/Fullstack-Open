interface ContentProps {
  courseparts: {
    name: string;
    exerciseCount: number;
  }[];
}

export const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseparts.map((course, index) => (
        <p key={index}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};
