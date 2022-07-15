import NavBar from '../Layout/NavBar';
import BlogPost from '../Form/BlogPost';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = (props) => {
    const [blogs, setBlog] = useState(null)
    useEffect(() => {
        axios.get('http://localhost:6001/blogs', {
            headers: {
                'x-auth-token': localStorage.getItem('userToken')
            }
        }).then(res => setBlog(res.data)).catch(err => console.error(err))
    }, [])

    const handleDelete = (blogs) => {
        // console.log(blogs)
        axios.delete('http://localhost:6001/blogs/${blogs._id}', {
            "x-auth-token": localStorage.getItem('userToken'), 
        }).then(res => setBlog([...blogs.filter(blogstatus => blogstatus._id !== blogs._id)]).catch(err => console.error(err)))
    }

    return(
        <div>
        <NavBar user={props.user}/>
            <h1>Home Page</h1>
        <BlogPost setBlog={setBlog} blogs={blogs}/>
    
            {blogs && blogs.map(blogs => (
                <div key={blogs._id}>
                <h6>{blogs.title} </h6>
               
                <h6>{blogs.details}{""}
                {blogs.user === props.user._id &&
                <span className='btn btn-danger' onClick={() => handleDelete(blogs)}>X</span>{""}</h6>
                

                </div>


            ))}
        </div>
    );
 };


 export default Home;