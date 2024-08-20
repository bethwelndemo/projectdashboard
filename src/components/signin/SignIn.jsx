import React, { useState } from 'react';
import './signin.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [failure, setFailure] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  
  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
  
    axiosInstance.post('/admin_signin', { email:email , password:password })
      .then((response) => {
        // console.log(response?.data); // Log the response to verify
        // setSuccess(response?.data?.message);
        setLoading(false);
        // handle the response
        if(response?.data && response?.data?.access_token && response?.data?.member){
            //save data to local storage
            localStorage.setItem("admin_id", response?.data?.member?.admin_id)
            localStorage.setItem("username", response?.data?.member?.username)
            localStorage.setItem("email", response?.data?.member?.email)
            localStorage.setItem("phone", response?.data?.member?.phone)
            localStorage.setItem("access_token", response?.data?.access_token)

            //redirect user to home page
            navigate("/")

        }else{
            // login failed
            setFailure("LOGIN FAILED")
        }
      })
      .catch((error) => {
        // console.log('Error:', error); // Log the error for debugging
        setFailure(error.message);
        setLoading(false);
      });
  };
  
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-header">Admin SignIn</h2>
        {/* return response for success */}
        {success && <div style={{color:'green'}}>{success}</div>}
        {/* return response for failure */}
        {failure && <div style={{color:'red'}}>{failure}</div>}
        <form onSubmit={handleSignIn}>
          <div className="login-form-group">
            <input
              type="email"
              id="email"
              name="email"
              className="login-input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <input
              type="password"
              id="password"
              name="password"
              className="login-input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login Account'}
          </button>
         
        </form>
        <p className="login-terms">
          Don't have an account? <a href="/signup" className="login-link">Sign up here</a>.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
