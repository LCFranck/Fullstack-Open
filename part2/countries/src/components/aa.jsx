

const Content = (props) => (
      <div>
        {props.countryList.map((part, id) => (
          <Part key={id} part={part} />
        ))}
      </div>
    )