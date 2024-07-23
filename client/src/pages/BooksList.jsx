import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const BooksList = () => {

  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const fetchBooks = async() => {
    try {
      const response = await fetch(`http://localhost:8000/api/all`)
        const data = await response.json();
        setBooks(data);
    } catch (error) {
      console.error("Failed to show bookList", error);
    }
  }

  useEffect(() => {
    fetchBooks();
    })

    const handleUpdate = async(id) => {
      navigate(`/updateBooks/${id}`);
    }

    const handleDelete = async(id) => {
      try {
        const response = await fetch(`http://localhost:8000/api/books/${id}`, {
          method: 'DELETE',
        });
        if(response.ok) {
            fetchBooks();
        }
      } catch (error) {
        console.error("Failed to delete book", error);
      }
    }

  return (
    <div>
      <section>
        <main>
        <h1>Welcome to the Book data</h1>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Publication</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publication}</td>
                  <td>
                    <button onClick={() => handleUpdate(book._id)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(book._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </section>
    </div>
  )
}

export default BooksList
