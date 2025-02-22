import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../adminCompoentsCss/Sidebar.css';


function Sidebar() {

    const navigate = useNavigate();
    function Logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('account');
        localStorage.removeItem('password');
        localStorage.removeItem('identity');
        navigate('/login');
        window.location.reload();
    }

    return (
        <div className="sidebar">
            <h1>管理员系统</h1>
            <nav>
                <ul>
                    <button onClick={() => { navigate(-1) }}>返回</button>
                    <li><a href="/AdminDashBoard">宠物信息</a></li>
                    <li><a href="/addpetreview">宠物添加</a></li>
                    <li><a href="/applicationhandling">宠物申请</a></li>
                    <li><a href="/usercontrolling">用户管理</a></li>
                    <li><a href="/">公告管理</a></li>

                    <button onClick={Logout}>退出登录</button>

                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
