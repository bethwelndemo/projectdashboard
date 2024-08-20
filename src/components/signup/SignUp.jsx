import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance'

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        setLoading(true);

        axiosInstance.post('/admin_signup', {
            email,
            username,
            phone,
            password
        })
        .then((response) => {
            setSuccess(response?.data?.message);
            setLoading(false);
            navigate('/signin');
        })
        .catch((error) => {
            setLoading(false);
            setFailure(error.message);
        });
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2 className="signup-header">Sign Up</h2>
                {success && <div className="success-message">{success}</div>}
                {failure && <div className="error-message">{failure}</div>}

                <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            placeholder="Enter Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            disabled={loading} // Disable input fields while loading
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-input"
                            placeholder="Enter Username"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-input"
                            placeholder="Enter Phone"
                            required
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            placeholder="Enter Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading} // Disable the submit button while loading
                    >
                        {loading ? "Signing Up..." : "Sign Up"} 
                    </button>
                </form>
                <p className="login-link">
                    Already have an account? <a href="/signin" className="link">Log in here</a>.
                </p>
            </div>
        </div>
    );
};

export default SignUp;
