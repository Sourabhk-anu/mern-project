import React, {useState} from 'react'

const AddBooks = () => {

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publication: ''
      
    })
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            title: '',
            author: '',
            publication: ''
        })
        try {
            const response = await(fetch(`http://localhost:8000/api/addBooks`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            }))
            const data = await response.json(response)
            console.log(data);
            alert('Books added successfully')
        } catch (error) {
            console.log("Adding books is failed",error)
        }
      
    }
    
    const handleInputChnage = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="title">Title:</label>
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
        <label htmlFor="publication">Publication:</label>
        <input
          type="text"
          name="publication"
          placeholder="Publication"
          value={formData.publication}
          onChange={handleInputChnage}
        />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default AddBooks
