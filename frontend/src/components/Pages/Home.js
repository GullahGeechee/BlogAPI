import NavBar from '../Layout/NavBar';
import BlogPost from '../Form/BlogPost';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';


const Home = (props) => {
    const [blogs, setBlog] = useState(null)
    const history = useHistory()
    useEffect(() => {
        axios.get('http://localhost:6001/blogs', {
            headers: {
                'x-auth-token': localStorage.getItem('userToken'),
            },
        })
        .then(res => setBlog(res.data)).catch(err => console.error(err))
        .catch((err) => console.error(err));
    }, []);

    const handleDelete = (blogs) => {
        // console.log(blogs)
        axios.delete('http://localhost:6001/blogs/${blogs._id}', {
            headers: {
            "x-auth-token": localStorage.getItem('userToken'), 
            },
        })
        .then((res) => {
            console.log(res.data);
            setBlog([...blogs.filter((blogstatus) => blogstatus._id !== blogs._id)])
            })
        .catch(err => console.error(err)); 
    };

    const handleUpdate = () => {
        history.push(`/update/${blogs._id}`)


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
                {blogs.user === props.user._id && (
                <span 
                className='btn btn-danger'
                style={{marginRight: '5px'}}
                 onClick={() => handleDelete(blogs)}>X</span>
            )}
            
            {blogs.user === props.user._id && (
                <span
                  className="btn btn-info"
                  onClick={() => handleUpdate(blogs)}
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