

import { useSelector } from 'react-redux'

import {  List, StyledLink, SmallTitle } from '../styled';



//in retrospect i might nt hvae needed to create another reducer but here we are

const UsersList = () => {

    const users = useSelector(state => state.users)

    if (!users || users.length === 0) return <div>loading...</div>


    const authorList = {};


    users.forEach(user => {
        const username = user.username;
        if (username!=="root"){
        authorList[username] = {
            id: user.id,
            count: user.blogs.length
        };
    }
    });



  return (
    <List>
    <div>
      <SmallTitle>Authors</SmallTitle>
        <table>
        <thead>
            <tr>
                <th>Author</th>
                <th> Blogs</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(authorList).map(([username, data]) => (
                  <tr key={username}>
                    <td>
                        <StyledLink to={`/users/${data.id}`}>
                            {username}
                        </StyledLink>
                        </td>
                    <td>{data.count}</td>
                  </tr>
        ))}
        </tbody>
        </table>
    </div>
    </List>
  )
}


export default UsersList