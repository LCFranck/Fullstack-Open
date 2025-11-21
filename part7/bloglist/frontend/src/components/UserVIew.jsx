import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'


const UserView = () => {

    const { id } = useParams()
    const blogs = useSelector(state => state.blogs)
    const blogUser = blogs.find((n) => n.user?.id === id)


    if (!blogUser){
        return (<div> This user has no blogs! </div>)
    }

    const name = blogUser.user.username
    const userBlogs = blogs.filter(blog => blog.user && blog.user?.id === id)

  /*   if (!userBlogs){
        return (<div> user has no blogs... </div>)
    } */

    return (
        <div>
        <h1> {name} </h1>
        <h2>Blogs</h2>
        <ul>
            {userBlogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
            ))}
        </ul>
        </div>
    )
}

export default UserView