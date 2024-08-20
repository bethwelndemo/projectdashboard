import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../layout/Layout';
import CheckSession from '../../helpers/CheckSession';
import axiosInstance from '../../helpers/axiosInstance';
import './maincontent.css';

function Home() {
    const { username, admin_id, access_token } = CheckSession();
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState(0); // Initialize products count as a number
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, ordersResponse, shoesResponse] = await Promise.all([
                    axiosInstance.get('/shoe_category', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    }),
                    axiosInstance.get('/get-all-orders', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    }),
                    axiosInstance.get('/get-all-shoes', { // Fetch all shoes data
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                        }
                    })
                ]);

                const categories = categoriesResponse?.data || [];
                const orders = ordersResponse?.data || [];
                const shoes = shoesResponse?.data?.shoes || []; // Extract shoes data

                // Update product count based on total quantity
                const totalQuantity = shoes.reduce((acc, shoe) => acc + parseInt(shoe.quantity, 10), 0);
                setProducts(totalQuantity);

                // Aggregate data by brand_name, summing up quantities
                const brandQuantityMap = shoes.reduce((acc, shoe) => {
                    if (!acc[shoe.brand_name]) {
                        acc[shoe.brand_name] = 0;
                    }
                    acc[shoe.brand_name] += parseInt(shoe.quantity, 10); // Add the quantity to the existing value
                    return acc;
                }, {});

                // Convert map to array format for chart
                const brandQuantityData = Object.keys(brandQuantityMap).map(brand_name => ({
                    name: brand_name, // Brand name for X-axis
                    quantity: brandQuantityMap[brand_name] // Total quantity for Y-axis
                }));

                setCategories(categories);
                setOrders(orders);
                setData(brandQuantityData);
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Layout />
            <section className="home-container">
                <h1>Dashboard</h1>
                <div className="home-row">
                    <div className="home-card-wrapper">
                        <div className="home-card blue shadow">
                            <BsFillArchiveFill /> PRODUCTS
                            <div className="home-card-body">{products}</div> {/* Display total product quantity */}
                        </div>
                    </div>
                    <div className="home-card-wrapper">
                        <div className="home-card orange shadow">
                            <BsFillGrid3X3GapFill /> CATEGORIES
                            <div className="home-card-body">
                                {categories.length === 0 ? "No categories" : categories.length}
                            </div>
                        </div>
                    </div>
                    <div className="home-card-wrapper">
                        <div className="home-card red shadow">
                            <BsPeopleFill /> ORDERS
                            <div className="home-card-body">{orders.length}</div>
                        </div>
                    </div>
                </div>
                <div className='charts'>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={data}
                            margin={{
                                right: 30,
                                left: 20,
                                bottom: 50, // Increased bottom margin for better label visibility
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="name" 
                                angle={-45} 
                                textAnchor="end" 
                                height={50} // Increase height to accommodate rotated labels
                                tick={{ fontSize: 12 }} // Optional: adjust font size for better readability
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quantity" fill="#8884d8"/> {/* Display total quantity on Y-axis */}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
}

export default Home;
