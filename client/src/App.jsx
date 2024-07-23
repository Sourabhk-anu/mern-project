import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import BooksList from './pages/BooksList';
import Navbar from './components/Navbar';
import AddBooks from './pages/AddBooks';
import UpdateBooks from './pages/UpdateBooks';
import Error from './pages/Error'

const App = () => {

  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const user = localStorage.getItem('token')
  //   user && setToken(user)
  // }, []);

  // const logOut = () => {
  //   setToken(null)
  //   localStorage.clear()
  // }


  return (
    <div className="App">
      {/* {token && <button onClick={logOut}>LOG OUT</button> } */}
      <BrowserRouter>
      <Navbar />
        <Routes>
        <Route path="/" element={<AddBooks />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books_list" element={<BooksList />} />
          <Route path="/updateBooks/:id" element={<UpdateBooks />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
