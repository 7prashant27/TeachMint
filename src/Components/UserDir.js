import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const UserDir = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                console.log("Data: ", data);
                setUsers(data);
                console.log('users ', users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const fetchPostCount = async (userId) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const data = await response.json();
            return data.length; 
        } catch (error) {
            console.error('Error fetching post count:', error);
            return 0;
        }
    };


    const updateUserPostsCount = async () => {
        const updatedUsers = await Promise.all(
            users.map(async (user) => {
                const postCount = await fetchPostCount(user.id);
                return { ...user, posts: postCount };
            })
        );

        setUsers(updatedUsers);
    };



    useEffect(() => {
        updateUserPostsCount();
    }, [users]);


    return (

        <div>
            <div className="user-container">
                <h1>People Directory</h1>
                <div className='users-list'>
                    {users.map(user => (
                        <Link key={user.id} to={`/user/${user.id}`}>
                            <div className="user-card">
                                <p>{`Name: ${user.name}`}</p>
                                <p>{`Posts: ${user.posts || 0}`}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDir;