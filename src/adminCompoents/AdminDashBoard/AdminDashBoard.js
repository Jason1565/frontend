import React, { useState, useEffect } from 'react'; // 引入React库
import { BASE_URL } from '../../config'; // 引入项目中的配置文件BASE_URL
import { useGlobalState } from './../../GlobalState'; // 引入全局状态管理hook
// 在整个应用中共享用户信息、token、身份

import './../../adminCompoentsCss/AdminDashBoard.css';

function AdminDashboard() {
  // useState是React的hook，用来在函数组件中管理状态
  const [petList, setPetList] = useState([]); // petList存储从后端获取的所有宠物信息
  const [filteredPets, setFilteredPets] = useState([]); // filteredPets根据用户搜索条件过滤后的宠物数据
  const [searchTerm, setSearchTerm] = useState(''); // searchTerm是用户输入的筛选关键词
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState(''); // 用户的搜索类别
  const { token } = useGlobalState(); // 获取用户的认证信息

  // useEffect 是 React 中的一个 hook，它允许你在 函数组件 中执行副作用操作。
  // 副作用可以理解为：那些在组件渲染之后执行的操作，通常包括数据获取、事件监听、
  // DOM 操作等。这些操作在组件的生命周期中进行控制。
  useEffect(() => {
    // 如果用户是管理员，获取宠物数据
    if (token === '1') {
      fetch(`${BASE_URL}/pet/all`) // 假设 API 地址为此
        .then(response => response.json()) // 将返回的响应数据转换为JSON
        .then(data => {
          setPetList(data);
          setFilteredPets(data); // 初始时，未筛选的数据即是所有数据
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching pets:', error);
          setLoading(false);
        });
    }
  }, [token]);

  // 处理搜索框输入变化
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // 更新搜索框内容
  };

  // 处理筛选类型的变化（下拉框选择）
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value); // 更新筛选类型
  };

  // 处理筛选按钮点击事件
  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredPets(petList); // 如果没有搜索词，显示所有宠物
    } else {
      const filtered = petList.filter((pet) => {
        if (searchType === 'name') {
          return pet.name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'species') {
          return pet.species.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'kind') {
          return pet.kind.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'age') {
          return pet.age.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'status') {
          return pet.status.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false; // 如果没有匹配的筛选条件，返回空
      });
      setFilteredPets(filtered); // 更新筛选后的宠物列表
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      
      <div style={{fontSize:'18px'}}>
        <h1>宠物信息</h1>
      </div>
     

      {/* 筛选 */}
      <div className="search-container">
        <label htmlFor="search-type" style={{ marginRight: '10px' }}>
          筛选:
        </label>
        <select
          id="search-type"
          value={searchType}
          onChange={handleSearchTypeChange} // 更新筛选类别
          style={{ marginRight: '10px' }}
        >
          <option value="">筛选元素</option>
          <option value="kind">cat/dog</option>
          <option value="species">品种</option>
          <option value="age">年龄</option>
          <option value="status">状态</option>

        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={`Search by ${searchType}`}
          style={{ marginRight: '10px' }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      

      {/* 显示筛选后的宠物信息 */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Species</th>
            <th>Kind</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* 如果没有宠物数据，显示 No pets found */}
          {filteredPets.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-pets-found">
                No pets found
              </td>
            </tr>
          ) : (
            filteredPets.map((pet) => (
              <tr key={pet.petId}>
                <td>{pet.petId}</td>
                <td>{pet.name}</td>
                <td>{pet.age}</td>
                <td>{pet.species}</td>
                <td>{pet.kind}</td>
                <td>{pet.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
