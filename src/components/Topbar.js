import React, { useEffect } from 'react';
import '../compoentsCss/Topbar.css';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from './../GlobalState';
import Logout from './Authorization/Logout';

function Topbar() {
    const navigate = useNavigate();
    const { user, setUser } = useGlobalState();

    console.log(user.name);
    return (
        <div class="topbar">

            <nav>
                <ul>
                    <button onClick={() => { navigate(-1) }}> ⬅Back </button>
                    <li><a href="/" >Home</a></li>
                    <li><a href="/Information">Information</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    
                    <li id="personalcenter"><a href="/personalcenter">☺ Center</a></li>

                    {localStorage.getItem('token') === "1" ?
                        <p>Welcome {localStorage.getItem('account')}!('・ω・')</p> :
                        null}

                    {localStorage.getItem('token') === "1" ?
                        <Logout />
                        :
                        <li id="login"><a href="/login">Login</a></li>}

                </ul>
            </nav>

        </div>
    )
}



export default Topbar;