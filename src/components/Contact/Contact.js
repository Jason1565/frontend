import React from 'react';
import userAvatar from '../../img/头像.svg'

function Contact() {
    return (
        <div className="contact-page" style={{ marginTop: "50px", padding: "20px" }}>
            <h1 style={{ color: '#333', marginTop:'30px', marginBottom: '30px', textAlign: 'center' }}>联系我们</h1>
            
            <div className="contact-container" style={{ display: 'flex', gap: '30px' }}>
                {/* 左侧 - 基本信息 */}
                <div className="contact-info" style={{ flex: '1', backgroundColor: 'rgba(200, 255, 200, 0.7)', padding: '20px', borderRadius: '8px' }}>
                    <h2 style={{ color: '#555', marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>基本信息</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '15px' }}>
                            <strong style={{ color: '#666', marginRight: '10px' }}>电话:</strong>
                            <span>+1234567890</span>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <strong style={{ color: '#666', marginRight: '10px' }}>地址:</strong>
                            <span>123 Main Street, Anytown, USA</span>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <strong style={{ color: '#666', marginRight: '10px' }}>社交媒体:</strong>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                <li style={{ marginBottom: '5px' }}>
                                    <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer" style={{ color: '#3b5998' }}>
                                        Facebook
                                    </a>
                                </li>
                                <li style={{ marginBottom: '5px' }}>
                                    <a href="https://www.twitter.com/example" target="_blank" rel="noopener noreferrer" style={{ color: '#1da1f2' }}>
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer" style={{ color: '#c13584' }}>
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* 右侧 - 团队成员 */}
                <div className="team-members" style={{ flex: '1', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
                    <h2 style={{ color: '#555', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>团队成员</h2>
                    
                    <div className="member" style={{ display: 'flex', marginBottom: '20px', alignItems: 'center', backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <img src={userAvatar} alt="团队成员头像" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }} />
                        <div>
                            <h3 style={{ color: '#333', margin: '0 0 5px 0' }}>陈开</h3>
                            <p style={{ color: '#666', margin: '0 0 5px 0' }}>产品经理</p>
                            <p style={{ color: '#888', margin: '0' }}>chenkai@example.com</p>
                        </div>
                    </div>
                    
                    <div className="member" style={{ display: 'flex', marginBottom: '20px', alignItems: 'center', backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <img src={userAvatar} alt="团队成员头像" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }} />
                        <div>
                            <h3 style={{ color: '#333', margin: '0 0 5px 0' }}>董晓欧 陈厚民</h3>
                            <p style={{ color: '#666', margin: '0 0 5px 0' }}>前端开发</p>
                            <p style={{ color: '#888', margin: '0' }}>dongxaioou@example.com</p>
                            <p style={{ color: '#888', margin: '0' }}>chenhoumin@example.com</p>
                        </div>
                    </div>
                    
                    <div className="member" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <img src={userAvatar} alt="团队成员头像" style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }} />
                        <div>
                            <h3 style={{ color: '#333', margin: '0 0 5px 0' }}>郭嘉豪 吴津杰</h3>
                            <p style={{ color: '#666', margin: '0 0 5px 0' }}>后端开发</p>
                            <p style={{ color: '#888', margin: '0' }}>guojiahao@example.com</p>
                            <p style={{ color: '#888', margin: '0' }}>wujinjie@example.com</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Contact;