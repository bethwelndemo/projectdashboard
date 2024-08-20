// Imports
import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../helpers/axiosInstance";

const Signin = () => {
    //navigate used in page redirection
    const navigate = useNavigate();
    //States - Hooks
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [failure, setFailure] = useState(null);

    //Action when submit button is pressed
    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setFailure(null);
        console.log("Submitting");

        //Use Axios instance to post data to API
        axiosInstance.post('/labsignin', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log("Response received:", response.data);
            setLoading(false); //update hook
            //Handle response
            if (response.data && response.data.member && response.data.access_token) {
                //Above - Check that data is available
                console.log("Login successful:", response.data.member);
                //Save Data to Local Storage
                localStorage.setItem("lab_id", response.data.member.lab_id);
                localStorage.setItem("lab_name", response.data.member.lab_name);    
                localStorage.setItem("access_token", response.data.access_token);
                setSuccess(response.data.member); //update success hook

                navigate("/addtests"); // use navigate to Redirect to main content
            } else {
                //Login has failed
                console.log("Login Failed, No token received");
                setFailure("Login Failed, No token received");
            }
        })
        .catch(function (error) {
            console.error("Error occurred:", error.message);
            setLoading(false);//update hook
            setFailure(error.message); //update hook
        });
    }

    return (
        <div className="form">
            <Section>
                {loading && <div className="text-warning">Please Wait...</div>}
                {success && <div className="text-success">{success.lab_name} logged in successfully</div>}
                {failure && <div className="text-danger">{failure}</div>}
                <form onSubmit={submit} className="card shadow p-3 pt-4">
                    <h1>Login Lab</h1>
                    <div className="card-body">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control"
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                        />
                        <br />
                        <button className="btn btn-dark" type="submit">Login Account</button>
                    </div>
                    <Link to="/signup">Don't have an Account? Create one</Link>
                </form>
            </Section>
        </div>
    );
}

export default Signin;
//This is a styled component  to position the form
const Section = styled.section`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    top: 50px;
`;