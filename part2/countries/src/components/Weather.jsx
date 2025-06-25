

const Weather = (props) => {

    if (props.list.length === 1)
        return (
        
            <div> 
                <h1> Weather in {props.city} </h1>
                <p>Temp is {props.temp}</p>
                <p>Wind is {props.wind} m/s</p>
                <img src={props.icon} alt="weather icon" />


            </div>
        )
                    
                    

 
}
export default Weather