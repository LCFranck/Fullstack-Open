import {

  Link,

} from "react-router-dom"


const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
    background: "pink",
  }
  return (
    <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/blogs">create</Link>
        <Link style={padding} to="/users">about</Link>
          <p>{user} logged in </p>
          <button onClick={handleLogout}>Logout </button>
    </div>
  )
}

export default Menu