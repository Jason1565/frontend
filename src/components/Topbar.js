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
                    <button onClick={() => { navigate(-1) }}> ⬅ </button>
                    <li><a href="/" >主页</a></li>
                    <li><a href="/Information">动物信息</a></li>
                    <li><a href="/Ency">动物百科</a></li>
                    {/* <li><a href="/about">About</a></li> */}
                    <li><a href="/contact">联系我们</a></li>
                    
                    <li id="personalcenter"><a href="/personalcenter">☺ 个人中心</a></li>

                    {localStorage.getItem('token') === "1" ?
                        <p>欢迎 {localStorage.getItem('account')}!('・ω・')</p> :
                        null}

                    {localStorage.getItem('token') === "1" ?
                        <Logout />
                        :
                        <li id="login"><a href="/login">登录</a></li>}

                </ul>
            </nav>

        </div>
    )
}



export default Topbar;