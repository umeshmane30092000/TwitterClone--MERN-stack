import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import twitterImage from '../../assets/images/twitter.jpeg'
import TwitterIcon from '@mui/icons-material/Twitter';
import { useCreateUserWithEmailAndPassword  , useSignInWithGoogle} from 'react-firebase-hooks/auth'
import auth from '../../firebase.init'
import GoogleButton from "react-google-button";
import axios from 'axios'
import "./Login.css"

const Signup = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth)

    //   console.log(error);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if (user || googleUser) {
        navigate('/');
        console.log(user);
        console.log(googleUser);
    }
    if (error) {
        console.log(error.message);
    }

    if (loading) {
        console.log('loading...')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(email, password);
        const user = {
            username: username,
            name: name,
            email: email,
        }
        
        axios.post(`http://localhost:5000/register`, user);
       

    }

    const handleGoogleSignIn = () => {

        signInWithGoogle();
    }
    return (
       
        <>
            <div className="login-container">

                <div className="image-container">
                    <img className="image" src={twitterImage} alt="twitterImage" />
                </div>


                <div className="form-container">
                    <div className="">
                        <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />

                        <h2 className="heading">Happening now</h2>

                        <div className="d-flex align-items-sm-center">
                            <h3 className="heading1"> Join twitter today </h3>
                        </div>


                        {error && <p className="errorMessage">{error}</p>}
                        <form onSubmit={handleSubmit}>

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="username"
                                placeholder="@username "
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="name"
                                placeholder="Enter Full Name"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input className="email"
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn">Sign Up</button>
                            </div>
                        </form>
                        <hr />
                        <div className="google-button">
                            <GoogleButton

                                className="g-btn"
                                type="light"

                                onClick={handleGoogleSignIn}
                            />
                        </div>
                        <div>
                            Already have an account?
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--twitter-color)',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Signup

