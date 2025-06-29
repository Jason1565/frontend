import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config'; // 项目配置文件中的基础 URL
import { useGlobalState } from './../../GlobalState'; // 获取全局状态的 hook
import './../../adminCompoentsCss/AnncControlling.css'; // 引入样式

function AnnouncementControlling() {
  const [announcementList, setAnnouncementList] = useState([]); // 存储公告列表
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]); // 筛选后的公告列表
  const [searchTerm, setSearchTerm] = useState(''); // 搜索关键词
  const [searchType, setSearchType] = useState(''); // 筛选类型
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // 选中的公告详细信息
  const [loading, setLoading] = useState(true); // 数据加载状态
  const [isEditing, setIsEditing] = useState(false); // 是否正在编辑
  const [editAnnouncement, setEditAnnouncement] = useState({}); // 当前编辑的公告信息
  const { token } = useGlobalState(); // 获取用户认证信息（假设用户是管理员）
  const [isModalOpen, setIsModalOpen] = useState(false); // 控制模态框的显示
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    createdBy: ''
    }); // 新公告的表单数据

  // 获取公告列表
  useEffect(() => {
    if (token === '1') { // 如果是管理员，获取公告数据
      fetch(`${BASE_URL}/announcement/getAll`) // 假设 API 地址
        .then((response) => response.json())
        .then((data) => {
          setAnnouncementList(data);
          setFilteredAnnouncements(data); // 初始时，未筛选的数据即是所有数据
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching announcements:', error);
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
      setFilteredAnnouncements(announcementList); // 如果没有搜索词，显示所有公告
    } else {
      const filtered = announcementList.filter((announcement) => {
        if (searchType === 'title') {
          return announcement.title.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchType === 'content') {
          return announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
      setFilteredAnnouncements(filtered);
    }
  };

  // 发布公告
  const handleCreateAnnouncement = (event) => {
    event.preventDefault();
    const { title, content, createdBy } = newAnnouncement;
  
    if (!title || !content || !createdBy) {
      alert('请填写所有必填项');
      return;
    }
  
    fetch(`${BASE_URL}/announcement/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        createdBy,
        createdAt: new Date().toISOString(), // 当前时间作为创建时间
        updatedAt: new Date().toISOString(), // 当前时间作为更新时间
        isActive: 1 // 默认状态为启用
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP 错误，状态码：${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
        if(data === "success"){
            alert('公告发布成功');
            setAnnouncementList([...announcementList, data]); // 将新公告添加到列表
            setFilteredAnnouncements([...filteredAnnouncements, data]); // 更新筛选后的列表
            setIsModalOpen(false); // 关闭模态框
            setNewAnnouncement({ title: '', content: '', createdBy: '' }); // 清空表单数据
        }
    })
    .catch((error) => {
      console.error('发布公告时出错:', error);
      alert(error);
    //   alert('发布公告失败');
    });
  };

  // 处理查看公告详细资料
  const handleViewDetails = (announcementId) => {
    if (selectedAnnouncement && selectedAnnouncement.announcementId === announcementId) {
      setSelectedAnnouncement(null); // 隐藏详细信息
    } else {
      fetch(`${BASE_URL}/announcement/getAnncById/${announcementId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('公告详细信息:', data); // 打印 API 返回的数据
          if (Array.isArray(data) && data.length > 0) {
            setSelectedAnnouncement(data[0]); // 取数组中的第一个公告
          } else {
            setSelectedAnnouncement(data); // 如果返回的是单个对象，直接赋值
          }
        })
        .catch((error) => console.error('Error fetching announcement details:', error));
    }
  };

  // 处理删除公告
  const handleDeleteAnnouncement = (announcementId) => {
    if (window.confirm('确定删除该公告？')) {
      fetch(`${BASE_URL}/announcement/deleteById/${announcementId}`, {
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
            alert('公告删除成功');
            setAnnouncementList(announcementList.filter((announcement) => announcement.announcementId !== announcementId));
            setFilteredAnnouncements(filteredAnnouncements.filter((announcement) => announcement.announcementId !== announcementId));
          } else {
            alert('删除失败');
          }
        })
        .catch((error) => {
          console.error('删除公告时出错:', error);
          alert(error.message); // 显示具体的错误信息
        });
    }
  };

  // 处理修改公告信息
  const handleEditAnnouncement = (announcement) => {
    setEditAnnouncement(announcement); // 设置当前编辑的公告
    setIsEditing(true); // 打开编辑模态框
  };

  // 处理表单输入变化
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditAnnouncement({ ...editAnnouncement, [name]: value });
  };

  // 处理表单提交
  const handleSubmit = (event) => {
    event.preventDefault();

    // 找到原始公告数据
    const originalAnnouncement = announcementList.find((announcement) => announcement.announcementId === editAnnouncement.announcementId);
    if (!originalAnnouncement) {
      alert('未找到原始公告数据');
      return;
    }

    // 构建需要更新的字段
    const updatedFields = {};
    updatedFields.announcementId = editAnnouncement.announcementId;
    for (const key in editAnnouncement) {
      if (editAnnouncement[key] !== originalAnnouncement[key]) {
        updatedFields[key] = editAnnouncement[key];
      }
    }

    // 确保 announcementId 始终包含在请求体中
    console.log(updatedFields)

    // 如果没有字段需要更新，直接返回
    if (Object.keys(updatedFields).length === 1) {
      alert('没有字段被修改');
      return;
    }

    // 发送更新请求
    fetch(`${BASE_URL}/announcement/updateAnnc`, {
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
          alert('公告信息更新成功');
          // 更新前端公告列表
          const updatedAnnouncements = announcementList.map((announcement) =>
            announcement.announcementId === editAnnouncement.announcementId ? { ...announcement, ...updatedFields } : announcement
          );
          setAnnouncementList(updatedAnnouncements);
          setFilteredAnnouncements(updatedAnnouncements);
          setIsEditing(false); // 关闭编辑模态框
        } else {
          alert('更新失败');
        }
      })
      .catch((error) => {
        console.error('更新公告信息时出错:', error);
        alert('更新失败');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="announcement-controlling">
      <div style={{ fontSize: '18px' }}>
        <h1>公告管理</h1>
      </div>

      {/* 筛选 */}
      <div className="search-container">

      <button onClick={() => setIsModalOpen(true)} style={{ marginRight: '20px' }}>
            发布公告
      </button>

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
          <option value="title">标题</option>
          <option value="content">内容</option>
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

      {/* 发布公告模态框 */}
      {isModalOpen && (
        <div className="modal-overlay">
            <div className="modal-content">
            <h2>发布公告</h2>
            <form onSubmit={handleCreateAnnouncement}>
                <label>
                标题:
                <input
                    type="text"
                    name="title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                />
                </label>
                <label>
                内容:
                <textarea
                    name="content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                />
                </label>
                <label>
                创建人ID:
                <input
                    type="text"
                    name="createdBy"
                    value={newAnnouncement.createdBy}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, createdBy: e.target.value })}
                />
                </label>
                <button type="submit">发布</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>取消</button>
            </form>
            </div>
        </div>
      )}

      {/* 公告列表 */}
      <table>
        <thead>
          <tr>
            <th>公告ID</th>
            <th>标题</th>
            <th>内容</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnnouncements.length === 0 ? (
            <tr>
              <td colSpan="5">No announcements found</td>
            </tr>
          ) : (
            filteredAnnouncements.map((announcement) => (
              <React.Fragment key={announcement.announcementId}>
                <tr>
                  <td>{announcement.announcementId}</td>
                  <td>{announcement.title}</td>
                  <td>{announcement.content}</td>
                  <td>{announcement.createdAt}</td>
                  <td>
                    <button onClick={() => handleViewDetails(announcement.announcementId)}>
                      {selectedAnnouncement && selectedAnnouncement.announcementId === announcement.announcementId ? '隐藏详细信息' : '查看详细信息'}
                    </button>
                    <button onClick={() => handleEditAnnouncement(announcement)}>修改信息</button>
                    <button onClick={() => handleDeleteAnnouncement(announcement.announcementId)}>删除公告</button>
                  </td>
                </tr>
                {selectedAnnouncement && selectedAnnouncement.announcementId === announcement.announcementId && (
                  <tr>
                    <td colSpan="5">
                      <div className="announcement-details">
                        <h2>{selectedAnnouncement.title}</h2>
                        <p><strong>公告ID:</strong> {selectedAnnouncement.announcementId}</p>
                        <p><strong>标题:</strong> {selectedAnnouncement.title}</p>
                        <p><strong>内容:</strong> {selectedAnnouncement.content}</p>
                        <p><strong>创建人ID:</strong> {selectedAnnouncement.createdBy}</p>
                        <p><strong>创建时间:</strong> {selectedAnnouncement.createdAt}</p>
                        <p><strong>更新时间:</strong> {selectedAnnouncement.updatedAt}</p>
                        <p><strong>状态:</strong> {selectedAnnouncement.isActive === 1 ? '启用' : '禁用'}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>

      {/* 编辑公告模态框 */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>修改公告信息</h2>
            <form onSubmit={handleSubmit}>
              <label>
                标题:
                <input
                  type="text"
                  name="title"
                  value={editAnnouncement.title || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                内容:
                <textarea
                  name="content"
                  value={editAnnouncement.content || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                创建时间:
                <input
                  type="text"
                  name="createdAt"
                  value={editAnnouncement.createdAt || ''}
                  onChange={handleInputChange}
                  readOnly
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

export default AnnouncementControlling;