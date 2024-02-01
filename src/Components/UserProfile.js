import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Clock from './Clock';
import PostGrid from './Posts';

// const PostModal = ({ post, onClose }) => (
//     <div className="modal">
//         <div className="modal-content">
//             <span className="close" onClick={onClose}>
//                 &times;
//             </span>
//             <h2>{post.title}</h2>
//             <p>{post.body}</p>
//         </div>
//     </div>
// );

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Data: ", data);
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [userId]);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
    };


    return (
        <div>
            <div className="profile-container">
                {user && (
                    <div className="profile-container-navbar">
                        <div >
                            <div className="profile-container-navbar-wrapper" >
                                <button className="back-button">
                                    <Link to="/"> Back </Link>
                                </button>
                                <Clock />
                            </div>
                        </div>

                        <div className="user-details">
                            <h2>{user.name}'s Profile</h2>
                            <div className="user-details-box">
                                <div className="user-details-wrapper">

                                    <div>
                                        <strong>
                                            Name:
                                        </strong>
                                        {user.name}
                                    </div>

                                    <div>
                                        <strong>
                                            Address:
                                        </strong>
                                        {user.address.street}, {user.address.city}
                                    </div>

                                </div>
                                <div className="user-address-wrapper">
                                    <div>
                                        <strong>UserName: </strong>

                                        {user.username}</div>
                                    <div>

                                        <div>
                                            <strong>Email:</strong>
                                            {user.email}</div>
                                        <div>
                                            <strong>Phone: </strong>
                                            {user.phone}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <PostGrid userId={userId} />
                    </div>
                )}

                {/* {selectedPost && <PostModal post={selectedPost} onClose={handleCloseModal} />} */}
            </div>

        </div>
    );
};

export default UserProfile;