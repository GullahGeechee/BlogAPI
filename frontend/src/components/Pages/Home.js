import NavBar from '../Layout/NavBar';
import BlogPost from '../Form/BlogPost';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';


const Home = (props) => {
    const [blogs, setBlogs] = useState(null)
    const history = useHistory()
    useEffect(() => {
        axios.get('http://localhost:6001/blogs', {
            headers: {
                'x-auth-token': localStorage.getItem('userToken'),
            },
        })
        .then(res => setBlogs(res.data)).catch(err => console.error(err))
        .catch((err) => console.error(err));
    }, []);

    const handleDelete = (blog) => {
        // console.log(blogs)
        axios.delete(`http://localhost:6001/blogs/${blog._id}`, {
            headers: {
            "x-auth-token": localStorage.getItem('userToken'), 
            },
        })
        .then((res) => {
            console.log(res.data);
            setBlogs([...blogs.filter((blogstatus) => blogstatus._id !== blog._id)])
            })
        .catch(err => console.error(err)); 
    };

    const handleUpdate = (blog) => {
        history.push(`/update/${blog._id}`)


    }

    return(
        <div>
        <NavBar user={props.user}/>
            <h1>Home Page</h1>
        <BlogPost setBlogs={setBlogs} blogs={blogs}/>
    
            {blogs && blogs.map(blog => (
                <div key={blog._id}>
                <h6>{blog.title} </h6>
               
                <h6>{blog.details}{""}
                {blog.user === props.user._id && (
                <span 
                className='btn btn-danger'
                style={{marginRight: '5px'}}
                 onClick={() => handleDelete(blog)}>X</span>
            )}
            
            {blog.user === props.user._id && (
                <span
                  className="btn btn-info"
                  onClick={() => handleUpdate(blog)}
                >
                  Update
                </span>
              )}
            </h6>
                 </div>


            ))}
        </div>
    );
 };


 export default Home;