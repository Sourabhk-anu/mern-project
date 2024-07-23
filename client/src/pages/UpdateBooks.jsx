import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateBooks = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publication: ''
  });

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await fetch(`http://localhost:8000/api/books/${id}`);
        const data = await response.json(response);
        setFormData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [id]);

const handleInputChnage = (e) => {
    e.preventDefault();
    setFormData({...formData, [e.target.name]: e.target.value})
}

const handleSubmit = async(e) => {
  e.preventDefault();
  console.log(formData);
  setFormData({
      title: '',
      author: '',
      publication: ''
  })
  try {
      const response = await(fetch(`http://localhost:8000/api/books/${id}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
      }))
      const data = await response.json(response)
      console.log(data);
      navigate('/books_list');
  } catch (error) {
      console.log("Updating books is failed",error)
  }
}

  return (
    <div>
      <h1>Update the books data</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChnage}
        />
        </div>
        <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleInputChnage}
        />
        </div>
        <div>
        <label htmlFor="publication">Publication</label>
        <input
          type="text"
          name="publication"
          placeholder="Publication"
          value={formData.publication}
          onChange={handleInputChnage}
        />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  )
}

export default UpdateBooks
