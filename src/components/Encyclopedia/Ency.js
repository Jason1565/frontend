import React, { useState, useEffect } from 'react';
import '../../compoentsCss/Ency.css'; 
import {BASE_URL} from '../../config'

const AnimalEncyclopedia = () => {
  const [animals, setAnimals] = useState([]);
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 从后端获取数据
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/ency/getAll`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setAnimals(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('无法加载动物数据，请稍后再试');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrevClick = () => {
    setCurrentAnimalIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : animals.length - 1
    );
  };

  const handleNextClick = () => {
    setCurrentAnimalIndex((prevIndex) => 
      prevIndex < animals.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (animals.length === 0) {
    return <div className="error">没有找到动物数据</div>;
  }

  const currentAnimal = animals[currentAnimalIndex];

  return (
    <div className="encyclopedia-container" style={{ backgroundImage: `url(${currentAnimal.imageUrl})` }}>
      <div className="controls">
        <button className="arrow prev" onClick={handlePrevClick}>←</button>
        <button className="arrow next" onClick={handleNextClick}>→</button>
      </div>

      <div className="info-cards">
        <div className="card left">
          <h1>{currentAnimal.commonName}</h1>
        </div>
        <div className="card right">
          <p><strong>学名:</strong> {currentAnimal.scientificName}</p>
          <p><strong>科:</strong> {currentAnimal.family}</p>
          <p><strong>描述:</strong> {currentAnimal.description}</p>
          <p><strong>栖息地:</strong> {currentAnimal.habitat}</p>
          <p><strong>饮食:</strong> {currentAnimal.diet}</p>
          {currentAnimal.lifespan && <p><strong>寿命:</strong> {currentAnimal.lifespan}</p>}
          <p><strong>护理提示:</strong> {currentAnimal.careTips}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimalEncyclopedia;