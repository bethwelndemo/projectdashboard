import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helpers/axiosInstanceToken';
import CheckSession from '../../helpers/CheckSession';
import Layout from '../layout/Layout';
import './allshoes.css';

const AllShoes = () => {
    const { username, admin_id, accenss_token } = CheckSession();
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axiosInstance.get('/get-all-shoes')
            .then(response => {
                setShoes(response.data.shoes);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to fetch shoes");
                setLoading(false);
            });
    }, []);

    // Filter shoes based on the search term
    const filteredShoes = shoes.filter(shoe =>
        shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-container">
            <Layout />
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {!loading && !error && (
                <>
                    <h2>All Shoes</h2>
                    <input
                        type="text"
                        placeholder="Search shoes..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <table className="shoes-table">
                        <thead>
                            <tr>
                                <th>Shoe ID</th>
                                <th>Category ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Brand Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShoes.map((shoe) => (
                                <tr key={shoe.shoe_id}>
                                    <td>{shoe.shoe_id}</td>
                                    <td>{shoe.category_id}</td>
                                    <td>{shoe.name}</td>
                                    <td>{shoe.price}</td>
                                    <td>{shoe.description}</td>
                                    <td>{shoe.brand_name}</td>
                                    <td>{shoe.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AllShoes;
