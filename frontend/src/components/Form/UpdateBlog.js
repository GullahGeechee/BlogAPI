import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateBlog = (props) => {
  const [blogs, setBlog] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http:///localhost:6001/blogs/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res.data)
        setBlog(res.data)
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:6001/blogs/${id}`, blogs, {
        headers: {
          'x-auth-token': localStorage.getItem("userToken")
        }
      }).then(res => history.push('/home'))
  };

  return (
    <div>
      {blogs && (
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            value={blogs.title}
            onChange={(e) =>
              setBlog({ ...blogs, [e.target.id]: e.target.value })
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
              value={blogs.details}
              onChange={(e) =>
                setBlog({ ...blogs, [e.target.id]: e.target.value })
              }
            />
          </div>

          <input
            type="submit"
            className="btn btn-success"
            value="Update Blog"
          />
        </form>
      )}
    </div>
  );
};

export default UpdateBlog;