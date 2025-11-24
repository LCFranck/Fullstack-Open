

import { Button, Navigation, StyledLink } from '../styled';


const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Navigation>
         <StyledLink style={padding} to="/">Blogs  </StyledLink>
        <StyledLink style={padding} to="/users">   Users</StyledLink></Navigation>
          <p>{user} logged in </p>
          <Button onClick={handleLogout}>Logout </Button>
    </div>
  )
}

export default Menu