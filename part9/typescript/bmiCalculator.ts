


 
const calculateBmi  = (mass: number, height: number) => {
    const BMI =  mass/(height*height)
    if (BMI<=18.5){
        console.log("Underweight", BMI)
    }
    else if (BMI<=25){
        console.log("Normal range", BMI)
    }
    else{
        console.log("Overweight", BMI)
    }
}

try {
    const mass: number = Number(process.argv[3])
    const height: number = Number(process.argv[2])
    calculateBmi(mass, height);
    } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}





