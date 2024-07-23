import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

  const [user, setUser] = useState({
    username: '',
    email: '',
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
      const response = await fetch(`http://localhost:8000/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      setUser({
        username: '',
        email: '',
        password: ''
      })
      navigate('/login');
      console.log(response);
    } catch (error) {
      console.log('Register failed: ' + error)
    }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container">
              <div className='registration-form'>
                <h1>Registration Form</h1>
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
                    <label htmlFor='email'>email</label>
                    <input 
                      type='email' 
                      id='email'
                      name="email" 
                      placeholder='enter your email' 
                      required 
                      autoComplete='off'
                      value={user.email}
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
                    <button type="submit">Sign Up</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Signup
