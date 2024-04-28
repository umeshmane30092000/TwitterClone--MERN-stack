import React, { useState } from 'react';
import axios from 'axios';
import './SubscriptionComponent.css';

const SubscriptionComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [plan, setPlan] = useState('free');
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage(''); // Clear previous status message
        try {
            const response = await axios.post('http://localhost:5000/subscribe', { username, email, plan });
            // Assuming the response contains a message field on successful subscription
            setStatusMessage(response.data.message || 'Subscription successful!');
            setIsSuccess(true);
            // Optionally reset the form or redirect the user
        } catch (error) {
            setStatusMessage(error.response?.data?.message || 'Error creating subscription.');
            setIsSuccess(false);
        }
    };

    return (
        <div className="subscription-container">
            <form onSubmit={handleSubmit} className="subscription-form">
                <h2>Create Subscription</h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="plan">Plan</label>
                    <select id="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                        <option value="free">Free</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Subscribe</button>
                {statusMessage && (
                    <div className={`status-message ${isSuccess ? 'success' : 'error'}`}>
                        {statusMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SubscriptionComponent;
