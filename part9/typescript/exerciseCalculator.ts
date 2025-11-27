


interface Results {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface InputValues {
    days: number[],
    target: number
}


const parseArguments = (args: string[]): InputValues => {
  if (args.length < 3) throw new Error('Not enough arguments'); 

  let days: number[] = [];
  let target: number;

  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
     throw new Error('One of the arguments was not a number!');
  }


  for (const x of args.slice(3)) {
    if (!isNaN(Number(x))) {
      days.push(Number(x));
    } else {
     throw new Error('One of the arguments was not a number!');
    }
  }

  return { days, target };
};


const calculateExercises  = (a: number[], target: number) => {
    const periodLength = a.length
    const trainingDays = a.filter(d => d > 0 ).length
    const average = (a.reduce((sum, h) => sum + h, 0))/periodLength
    const success = average >= target;
    let rating: number;
    let ratingDescription: string;
   
    if (average - target <= -1.5){
         rating = 1
         ratingDescription="Not good"  
    }

    else if (average - target <= -0.5){
         rating = 1
         ratingDescription="Could be better"
    }

    else {
         rating = 1
         ratingDescription="Very good"
    }


    return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}
 
try {
 // const values  = [1 ,3, 5, 0, 7, 3, 1]
    const { days,  target } = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}