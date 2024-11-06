import React from 'react';
import { Link } from 'react-router-dom'
import './Home.css';

function Home() {
    return (
        <div className='homepage-container'> 
            <div className='home-content'>
                <h1>Super Hero Wiki</h1>
                <div className='homepage-buttons'> 
                    <Link to='/login'>
                        <button className='btn'>Log In</button>
                    </Link>
                    <Link to='/signup'>
                        <button className='btn'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;


