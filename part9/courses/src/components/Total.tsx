interface TotalProps {
  totalExercises: number;
}


export const Total = (props: TotalProps) => {
  return (
    <div>
        <h2>
          Total number of exercises  {props.totalExercises}
        </h2>
    </div>
  );
};
