import React, { useState } from 'react';
import './addcategory.css';
import Layout from '../layout/Layout';
import axiosInstance from '../../helpers/axiosInstance';
import CheckSession from '../../helpers/CheckSession';

const AddCategory = () => {
    const { admin_id } = CheckSession(); // Assuming CheckSession returns { admin_id, access_token }
    const [category_name, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [failure, setFailure] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setFailure(null);

        axiosInstance.post('/addshoecategory', {
            admin_id,
            category_name
        })
        .then(function (response) {
            console.log(response.data);
            setLoading(false);
            setSuccess('Shoe category added successfully'); // Fixed success message
        })
        .catch(function (error) {
            console.log(error.message);
            setLoading(false);
            setFailure('Failed to add category'); // Fixed failure message
        });
    };

    return (
        <div className="container">
            <Layout />
            <form onSubmit={handleSubmit} className="add-category-form">
                <h2>Add Category</h2>
                {loading && <div className="response loading">Please Wait...</div>}
                {success && <div className="response success">{success}</div>}
                {failure && <div className="response failure">{failure}</div>}
                <div className="form-group">
                    <label htmlFor="category_name">Category Name:</label>
                    <input
                        type="text"
                        id="category_name"
                        name="category_name"
                        value={category_name}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
                    />
                </div>
                <button type="submit" className="submit-button">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;
