import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

const TweetBox = () => {
    const [post, setPost] = useState('')
    const [imageURL, setImageURL] = useState('');

    const handleTweet = (e) => {
        e.preventDefault();
        const userPost = {
            post: post,
            photo: imageURL,
        }
        console.log(userPost);

        // comment
        fetch('http://localhost:5000/post', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userPost),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
        
    //comment

}

return (
    <div className="tweetBox">
        <form onSubmit={handleTweet}>
            <div className="tweetBox__input">
                <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.pn" />
                <input
                    type="text"
                    placeholder="What's happening?"
                    onChange={(e) => setPost(e.target.value)}

                />
            </div>

            <div className="imageIcon_tweetButton">
                <label htmlFor='image' className="imageIcon">
                    <AddPhotoAlternateOutlinedIcon />
                </label>
                <input
                    type="file"
                    id='image'
                    className="imageInput"

                />
                <Button className="tweetBox__tweetButton" type="submit">Tweet</Button>
            </div>
        </form>
    </div>
)
}

export default TweetBox
