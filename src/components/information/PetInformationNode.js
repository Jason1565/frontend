import React from 'react';
import { useGlobalState } from '../../GlobalState'
import { BASE_URL } from './../../config'
import { useNavigate } from 'react-router-dom';
import '../../compoentsCss/PetNode.css';

function PetInformationNode(props) {

    const { globalState, editCount, setEditCount } = useGlobalState();

    const filteredpet = globalState.filter(pet => pet.petId === props.petId);
    const navigate = useNavigate();

    async function submitapply(petId) {
        const postdata = {
            petId: petId,
            status: 4,
            belonging: localStorage.getItem('userId')
        }
        await fetch(`${BASE_URL}/pet/updateAllWithJson`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postdata)
            }
        )
        setEditCount(editCount + 1)
        alert('申请成功，请等待管理员审核')
        navigate(-1)
    }

    async function cancelapply(petId) {
        const postdata = {
            petId: petId,
            status: 3,
            belonging: null
        }
        await fetch(`${BASE_URL}/pet/updateAllWithJson`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postdata)
            }
        )
        setEditCount(editCount + 1)
        alert('取消申请成功')
        navigate(-1)
    }

    const PetPage = filteredpet.map((pet) => (
        // <div>
        //     <ul key={pet.petId}>
        //         <li><h1>{pet.name}</h1></li>
        //         <li><img src={pet.avatar} alt={pet.name} style={{width: '100px', height: '100px'}}></img></li>
        //         <li><span>宠物品种:{pet.species}</span></li>
        //         <li><span>年龄:{pet.age}</span></li>
        //         <li><span>性别:{pet.gender}</span></li>
        //         <li><span>宠物描述:{pet.description}</span></li>
        //         <div className="button">
        //             {pet.status == 3 && (
        //                 <button onClick={() => submitapply(pet.petId)}>
        //                     <span>申请领养</span>
        //                 </button>
        //             )}
        //         </div>
        //         <div className="button">
        //             {pet.status == 4 && (
        //                 <button onClick={() => cancelapply(pet.petId)}>
        //                     <span>取消申请领养</span>
        //                 </button>
        //             )}
        //         </div>
        //     </ul>
        // </div>

        <div
            style={{
                display: 'flex',
                justifyContent: 'center', // 水平居中
                alignItems: 'center', // 垂直居中
                flexDirection: 'row', // 子元素横向排列
                maxWidth: '50%', // 设置最大宽度
                margin: '50px auto', // 水平居中
                padding: '20px',
                border: '1px solid #ddd', // 可选：添加边框
                borderRadius: '8px', // 可选：添加圆角
                backgroundColor: '#f9f9f9', // 可选：背景颜色
            }}
            >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column', // 子元素纵向排列
                    alignItems: 'center', // 垂直居中
                    marginRight: '20px', // 图片与信息之间的间距
                }}
            >
                <img
                    src={pet.avatar}
                    alt={pet.name}
                    style={{
                        width: '300px',
                        height: '300px',
                        objectFit: 'cover', // 确保图片比例适配
                    }}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column', // 子元素纵向排列
                    flex: 1, // 占据剩余空间
                }}
            >
                <h1>{pet.name}</h1>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li><span>宠物品种: {pet.species}</span></li>
                    <li><span>年龄: {pet.age}</span></li>
                    <li><span>性别: {pet.gender}</span></li>
                    <li><span>宠物描述: {pet.description}</span></li>
                </ul>
                <div
                    style={{
                        marginTop: '20px',
                    }}
                >
                    {pet.status == 3 && (
                        <button class="adopt-button" onClick={() => submitapply(pet.petId)}>
                            <span>申请领养</span>
                        </button>
                    )}
                    {pet.status == 4 && (
                        <button onClick={() => cancelapply(pet.petId)}>
                            <span>取消申请领养</span>
                        </button>
                    )}
                </div>
            </div>
            </div>

    ))

    return (
        <div class="pet-container" style={{ marginTop: '50px' }}>
            {PetPage}
        </div>
    )
}

export default PetInformationNode;