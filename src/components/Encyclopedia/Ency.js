import React, { useState, useEffect } from 'react';
import '../../compoentsCss/Ency.css';
import { BASE_URL } from '../../config'; 

// 宠物百科组件
function Ency() {
    const [encyInfo, setEncyInfo] = useState(null);
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 获取百科信息
    const fetchEncyInfo = async () => {
        if (!id) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${BASE_URL}/ency/getById/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data && data.length > 0) {
                setEncyInfo(data[0]);
            } else {
                setEncyInfo(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // 当ID改变时获取百科信息
    useEffect(() => {
        if (id) {
            fetchEncyInfo();
        }
    }, [id]);

    return (
        <div className="ency-container">
            <h1>宠物百科</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="输入百科ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button onClick={fetchEncyInfo}>查询</button>
            </div>
            {loading && <div className="loading">加载中...</div>}
            {error && <div className="error">错误: {error}</div>}
            {encyInfo && (
                <div className="ency-info">
                    <h2>{encyInfo.commonName}</h2>
                    <div className="info-item">
                        <label>学名：</label>
                        <span>{encyInfo.scientificName}</span>
                    </div>
                    <div className="info-item">
                        <label>科属：</label>
                        <span>{encyInfo.family}</span>
                    </div>
                    <div className="info-item">
                        <label>描述：</label>
                        <span>{encyInfo.description}</span>
                    </div>
                    <div className="info-item">
                        <label>栖息地：</label>
                        <span>{encyInfo.habitat}</span>
                    </div>
                    <div className="info-item">
                        <label>饮食：</label>
                        <span>{encyInfo.diet}</span>
                    </div>
                    <div className="info-item">
                        <label>护理建议：</label>
                        <span>{encyInfo.careTips}</span>
                    </div>
                    {encyInfo.imageUrl && (
                        <div className="image-container">
                            <img
                                src={encyInfo.imageUrl}
                                alt={encyInfo.commonName}
                                onError={(e) => {
                                    e.target.src =
                                        'https://via.placeholder.com/150?text=Image+Not+Found';
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Ency;