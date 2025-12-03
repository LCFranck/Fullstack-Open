interface TotalProps {
  totalExercises: number;
}


export const Total = (props: TotalProps) => {
  return (
    <div>
        <p>
          Total number of exercises  {props.totalExercises}
        </p>
    </div>
  );
};
