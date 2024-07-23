import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleInput = (e) => {
    console.log(e);
    e.preventDefault();
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(`http://localhost:8000/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      setUser({
        username: '',
        password: ''
      })
      navigate('/books_list');
      console.log(response);
    } catch (error) {
      console.log('login failed', error);
    }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container">
              <div className='registration-form'>
                <h1>Login Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor='username'>username</label>
                    <input 
                      type='text' 
                      id='username' 
                      name="username" 
                      placeholder='username' 
                      required 
                      autoComplete='off'
                      value={user.username}
                      onChange={handleInput}
                    />
                    </div>
                    <div>
                    <label htmlFor='password'>password</label>
                    <input 
                      type='password' 
                      id='password' 
                      name="password" 
                      placeholder='password' 
                      required 
                      autoComplete='off'
                      value={user.password}
                      onChange={handleInput}
                    />
                    </div>
                    <br/>
                    <button type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login;
