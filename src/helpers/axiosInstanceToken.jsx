    // Import axios
    import axios from 'axios';

    // Retrieve the access token from localStorage
    const access_token = localStorage.getItem("access_token");

    // Create an axios instance
    const axiosInstance = axios.create({
    baseURL: 'https://shoeapp2.pythonanywhere.com/api', // Replace with your API's base URL
    timeout: 30000, // Adjust the timeout as needed (in milliseconds)
    headers: {
        'Content-Type': 'application/json', // Set the default content type for requests
        'Authorization': `Bearer ${access_token}` // Provide access_token as Bearer
    },
    });

    // Export the axios instance
    export default axiosInstance;