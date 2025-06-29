import React from 'react';
import '../../compoentsCss/PetNode.css';

function PetNode(props) {
    
    return (
        <div class="pet-list" >
            <ul>
                <li><h1>{props.name}</h1></li>
                <li><img src={props.avatar} alt={props.name} style={{width: '100px', height: '100px'}}></img></li>
                
                <div class="button">
                    <button onClick={
                        () => props.ViewDetail(props.id)}>
                        <span>点击查看详情</span>
                    </button>
                </div>
            </ul>
        </div>

/* <div style={{
                display: 'flex',
                justifyContent: 'center', // 水平居中
                alignItems: 'center', // 垂直居中
                flexDirection: 'row', // 子元素横向排列
                maxWidth: '800px', // 设置最大宽度
                margin: '0 auto', // 水平居中
                padding: '20px',
                border: '1px solid #ddd', // 可选：添加边框
                borderRadius: '8px', // 可选：添加圆角
                backgroundColor: '#f9f9f9', // 可选：背景颜色
            }}>
<div style={{
                    display: 'flex',
                    flexDirection: 'column', // 子元素纵向排列
                    alignItems: 'center', // 垂直居中
                    marginRight: '20px', // 图片与信息之间的间距
                }}>
    <h1>{props.name}</h1>
    <img src={props.avatar} alt={props.name} style={{width: '120px', height: '120px'}}></img>
    
    <div class="button">
        <button onClick={
            () => props.ViewDetail(props.id)}>
            <span>点击查看详情</span>
        </button>
    </div>
    </div>
</div> */
    )
}

export default PetNode;