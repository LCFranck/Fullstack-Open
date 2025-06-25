

const Content = (props) => {


    if (props.list.length === 1){
        return (
            <div>     
                <h1> {props.country} </h1>
                 <p>
                    Capital: {props.capital} </p>
                <p> 
                    area: {props.area}
                </p>
                <h1> Languages </h1>

                <ul>
                    {Object.values(props.lan).map((language) => (
                    <li key={language}>{language}</li>
                    ))}
                </ul>
                <img src={props.flag} alt="flag" />
 
            </div>
        )}
    else if (props.list.length > 10)
        return (
    <div> 
                <ul>too many matches, specify another filter</ul>
    </div>

    )
    else 
        return (
            <div> 
                <ul>
                    {(props.list).map((country) => (
                    <li 
                        key={country}>{country}
                        <button onClick={() => props.onSearch(country)}>select</button>

                    </li>
                    
                    ))}
                </ul>
            </div>
        )
}
export default Content