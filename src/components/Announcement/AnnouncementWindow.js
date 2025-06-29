import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config'; // 项目配置文件中的基础 URL
import '../../compoentsCss/AnnouncementWindow.css'


function AnnouncementWindow() {
    const [announcements, setAnnouncements] = useState([]);
    const [content, setContent] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [isVisible, setIsVisible] = useState(true);


     // 从后端获取公告数据
     useEffect(() => {
        fetch(`${BASE_URL}/announcement/getActiveAnnc`) // 假设后端接口返回所有isActive为1的公告
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch announcements: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setAnnouncements(data); // 设置公告列表
            })
            .catch(error => {
                console.error('Error fetching announcements:', error);
            });
    }, []); // 空依赖数组表示只在组件加载时执行一次

    const handleClose = () => {
        setIsVisible(false);
    };

    const noMoreAttention = () => {
        localStorage.setItem('isShowAnnouncement', false);
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    if (localStorage.getItem('isShowAnnouncement') === 'true' && isVisible === true) {
        return (
            <div className="announcement-window">
                
                <button className="close-button" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <button className="no-attention-button" onClick={noMoreAttention}>
                    不再提示
                </button>

                <div className="content-container">
                    
                    <div className="sidebar">
                        <h3>公告列表</h3>
                        <ul>
                            {announcements.map((announcement) => (
                                <li
                                    key={announcement.id}
                                    onClick={() => {
                                        setContent(announcement.content)
                                        setUpdatedAt(announcement.createdAt)
                                    }}
                                >
                                    {announcement.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    
                    <div className="content">
                        <h3>公告详情</h3>
                        <p>{content}</p>
                        <p id="time">发布时间：{updatedAt}</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default AnnouncementWindow;