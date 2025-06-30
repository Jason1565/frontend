import React from 'react';
import '../../compoentsCss/PetNode.css';

function PetNode(props) {
    
    return (
        <span class="pet-list" >
            <img src={props.avatar} alt={props.name} class="pet-avatar"></img>
            <div class="pet-info">{props.name}</div>

            <button class="adopt-button" onClick={
                () => props.ViewDetail(props.id)}>
                点击查看详情
            </button>

        </span>
    )}

export default PetNode;