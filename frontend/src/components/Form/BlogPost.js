import {useState} from 'react';
import axios from 'axios';

const BlogPost = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        details: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault()
            axios.post('http://localhost:6001/blogs', formData,{
                headers: {
                'x-auth-token': localStorage.getItem('userToken') 
            }
     }).then(res => props.setBlogs([...props.blogs, res.data]))
    }
         

    return (
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
          />
    
          <div className="mb-3">
            <label className="form-label" htmlFor="details">
              Details
            </label>
            <input
              className="form-control"
              type="text"
              id="details"
              name="details"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
            />
          </div>
    
          <input type="submit" className="btn btn-success" />
        </form>
    )
}

export default BlogPost;







