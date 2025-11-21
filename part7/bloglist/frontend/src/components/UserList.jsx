

import { useSelector } from 'react-redux'

import {

  Link,

} from "react-router-dom"


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


 /*    <Link to={`/anecdotes/${anecdote.id}`}>
          {anecdote.content}
        </Link>
 */

  return (
    <div>
      <h2>Blogs</h2>
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
                        <Link to={`/users/${data.id}`}>
                            {username}
                        </Link>
                        </td>
                    <td>{data.count}</td>
                  </tr>
        ))}
        </tbody>
        </table>
    </div>
  )
}


export default UsersList