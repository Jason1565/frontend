import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config'; // 项目配置文件中的基础 URL
import { useGlobalState } from './../../GlobalState'; // 获取全局状态的 hook
import './../../adminCompoentsCss/UserControlling.css'; // 引入样式

function UserControlling() {
  const [userList, setUserList] = useState([]); // 存储用户列表
  const [filteredUsers, setFilteredUsers] = useState([]); // 筛选后的用户列表
  const [searchTerm, setSearchTerm] = useState(''); // 搜索关键词
  const [searchType, setSearchType] = useState(''); // 筛选类型
  const [selectedUser, setSelectedUser] = useState(null); // 选中的用户详细信息
  const [loading, setLoading] = useState(true); // 数据加载状态
  const [isEditing, setIsEditing] = useState(false); // 是否正在编辑
  const [editUser, setEditUser] = useState({}); // 当前编辑的用户信息
  const { token } = useGlobalState(); // 获取用户认证信息（假设用户是管理员）

  // 获取用户列表
  useEffect(() => {
    if (token === '1') { // 如果是管理员，获取用户数据
      fetch(`${BASE_URL}/user/getUserInformation`) // 假设 API 地址
        .then((response) => response.json())
        .then((data) => {
          setUserList(data);
          setFilteredUsers(data); // 初始时，未筛选的数据即是所有数据
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          setLoading(false);
        });
    }
  }, [token]);

  // 处理搜索框输入变化
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 处理筛选类型变化（下拉框选择）
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  // 处理筛选按钮点击事件
  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredUsers(userList); // 如果没有搜索词，显示所有用户
    } else {
      const filtered = userList.filter((user) => {
        if (searchType === 'userId') {
          return String(user.userId).toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'account') {
          return user.account.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'email') {
          return user.email.toLowerCase().includes(searchTerm.toLowerCase());
        }else if (searchType === 'phone') {
          return user.phone.toLowerCase().includes(searchTerm.toLowerCase());
        }else if (searchType === 'nickname') {
            return user.nickname.toLowerCase().includes(searchTerm.toLowerCase());}
        return false;
      });
      setFilteredUsers(filtered);
    }
  };

  // 处理查看用户详细资料
  const handleViewDetails = (userId) => {
    if (selectedUser && selectedUser.userId === userId) {
      setSelectedUser(null); // 隐藏详细信息
    } else {
      fetch(`${BASE_URL}/user/getUserInformationById/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('用户详细信息:', data); // 打印 API 返回的数据
          if (Array.isArray(data) && data.length > 0) {
            setSelectedUser(data[0]); // 取数组中的第一个用户
          } else {
            setSelectedUser(data); // 如果返回的是单个对象，直接赋值
          }
        })
        .catch((error) => console.error('Error fetching user details:', error));
    }
  };

  // 处理删除用户
  const handleDeleteUser = (userId) => {
    if (window.confirm('确定删除该用户？')) {
      fetch(`${BASE_URL}/user/deleteByUserId/${userId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error(`请求失败，状态码：${response.status}`);
          }
        })
        .then((data) => {
          if (data === "success") {
            alert('用户删除成功');
            setUserList(userList.filter((user) => user.userId !== userId));
            setFilteredUsers(filteredUsers.filter((user) => user.userId !== userId));
          } else {
            alert('删除失败');
          }
        })
        .catch((error) => {
          console.error('删除用户时出错:', error);
          alert(error.message); // 显示具体的错误信息
        });
    }
  };

// 处理修改用户信息
const handleEditUser = (user) => {
  setEditUser(user); // 设置当前编辑的用户
  setIsEditing(true); // 打开编辑模态框
};

// 处理表单输入变化
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setEditUser({ ...editUser, [name]: value });
};

// 处理表单提交
const handleSubmit = (event) => {
  event.preventDefault();

  // 找到原始用户数据
  const originalUser = userList.find((user) => user.userId === editUser.userId);
  if (!originalUser) {
    alert('未找到原始用户数据');
    return;
  }

  // 构建需要更新的字段
  const updatedFields = {};
  updatedFields.userId = editUser.userId;
  for (const key in editUser) {
    if (editUser[key] !== originalUser[key]) {
      updatedFields[key] = editUser[key];
    }
  }


  // 确保 userId 始终包含在请求体中
  console.log(updatedFields)

  // 如果没有字段需要更新，直接返回
  if (Object.keys(updatedFields).length === 1) {
    alert('没有字段被修改');
    return;
  }

  // 发送更新请求
  fetch(`${BASE_URL}/user/updateAllWithJson`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields), // 只传递需要更新的字段
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP 错误，状态码：${response.status}`);
      }
      return response.text(); // 解析返回的文本（字符串）
    })
    .then((data) => {
      if (data === "success") {
        alert('用户信息更新成功');
        // 更新前端用户列表
        const updatedUsers = userList.map((user) =>
          user.userId === editUser.userId ? { ...user, ...updatedFields } : user
        );
        setUserList(updatedUsers);
        setFilteredUsers(updatedUsers);
        setIsEditing(false); // 关闭编辑模态框
      } else {
        alert('更新失败');
      }
    })
    .catch((error) => {
      console.error('更新用户信息时出错:', error);
      alert('更新失败');
    });
};



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-controlling">
      <div style={{fontSize:'18px'}}>
        <h1>用户管理</h1>
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
          <option value="userId">用户ID</option>
          <option value="account">账号</option>
          <option value="nickname">昵称</option>
          <option value="email">邮箱</option>
          <option value="phone">联系方式</option>
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

      {/* 用户列表 */}
      <table>
        <thead>
          <tr>
            <th>用户ID</th>
            <th>账号</th>
            <th>昵称</th>
            <th>邮箱</th>
            <th>联系电话</th>
            <th>注册时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="7">No users found</td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <React.Fragment key={user.userId}>
                <tr>
                  <td>{user.userId}</td>
                  <td>{user.account}</td>
                  <td>{user.nickname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.regTime}</td>
                  <td>
                    <button onClick={() => handleViewDetails(user.userId)}>
                      {selectedUser && selectedUser.userId === user.userId ? '隐藏详细信息' : '查看详细信息'}
                    </button>
                    <button onClick={() => handleEditUser(user)}>修改信息</button>
                    <button onClick={() => handleDeleteUser(user.userId)}>删除用户</button>
                  </td>
                </tr>
                {selectedUser && selectedUser.userId === user.userId && (
                  <tr>
                    <td colSpan="7">
                      <div className="user-details">
                        <h2>{selectedUser.nickname}</h2>
                        <p><strong>用户ID:</strong> {selectedUser.userId}</p>
                        <p><strong>用户账号:</strong> {selectedUser.account}</p>
                        <p><strong>密码:</strong> {selectedUser.password}</p>
                        <p><strong>邮箱:</strong> {selectedUser.email}</p>
                        <p><strong>联系方式:</strong> {selectedUser.phone}</p>
                        <p><strong>身份:</strong> {selectedUser.identity}</p>
                        <p><strong>注册时间:</strong> {selectedUser.regTime}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {/* 编辑用户模态框 */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>修改用户信息</h2>
            <form onSubmit={handleSubmit}>
              <label>
                账号:
                <input
                  type="text"
                  name="account"
                  value={editUser.account || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                昵称:
                <input
                  type="text"
                  name="nickname"
                  value={editUser.nickname || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                密码:
                <input
                  type="text"
                  name="password"
                  value={editUser.password || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                邮箱:
                <input
                  type="email"
                  name="email"
                  value={editUser.email || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                联系电话:
                <input
                  type="text"
                  name="phone"
                  value={editUser.phone || ''}
                  onChange={handleInputChange}
                />
              </label>
              
              
              <button type="submit">保存</button>
              <button type="button" onClick={() => setIsEditing(false)}>取消</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserControlling;