
// PremiumVerification.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { premiumVerify } from '../redux/premium/premiumSlice'
import axios from 'axios';
import './Verification.css'
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from 'react-router-dom';

const PremiumVerification = () => {
  const [email, setemail] = useState('');
  const [paymentToken, setpaymentToken] = useState('');
  const { ispremium } = useSelector((state) => state.premium);
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/premium', { email, paymentToken });

      const { data } = response;
      dispatch(premiumVerify(data));

    } catch (error) {
      console.error('Error during premium verification:', error);
    }
  };

  return (
    <div className="premium-verification-container">
      <h1 className="premium-verification-heading">Premium Verification</h1>
      <form className="premium-verification-form" onSubmit={handleSubmit}>
        <label>
          email:
          <input className="premium-verification-input" type="text" value={email} onChange={(e) => setemail(e.target.value)} />
        </label>
        <br />
        <label>
          paymentToken ID:
          <input className="premium-verification-input" type="text" value={paymentToken} onChange={(e) => setpaymentToken(e.target.value)} />
        </label>
        <br />
        <button className="premium-verification-button" type="submit"> pay</button>
        <Link to="/home/feed" style={{ textDecoration: 'none', color: 'blue', fontSize: '20px' }}>
          click here to go home page
        </Link>

        {ispremium && (
          <div className="premium-verification-result">
            <h2>Premium Badge</h2>
            {ispremium != null ? (
              <VerifiedIcon
                alt="Verified Premium Account"
                style={{ color: 'blue' }} // Adjust color as needed
              />
            ) : (
              <p>Failed to premium</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default PremiumVerification;
