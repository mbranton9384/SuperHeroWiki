// UserPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPage.css';

function UserPage({ currentUser }) {
  const [savedHeroes, setSavedHeroes] = useState([]);

  useEffect(() => {
    async function fetchSavedHeroes() {
      if (!currentUser) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/superhero/saved/${currentUser.id}`);
        setSavedHeroes(response.data);
      } catch (error) {
        console.error('Error fetching saved heroes:', error);
      }
    }

    fetchSavedHeroes();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Please log in to view your saved heroes.</p>;
  }

  return (
    <div className="user-page">
      <h2>{currentUser.username}'s Saved Heroes</h2>
      <div className="hero-list">
        {savedHeroes.length > 0 ? (
          savedHeroes.map((hero) => (
            <div key={hero.id} className="hero-card">
              <img src={hero.image.url} alt={hero.name} className="hero-image" />
              <div className="hero-info">
                <h3>{hero.name}</h3>
                <p>Intelligence: {hero.powerstats.intelligence}</p>
                <p>Strength: {hero.powerstats.strength}</p>
                <p>Speed: {hero.powerstats.speed}</p>
                <p>Durability: {hero.powerstats.durability}</p>
                <p>Power: {hero.powerstats.power}</p>
                <p>Combat: {hero.powerstats.combat}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No saved heroes found.</p>
        )}
      </div>
    </div>
  );
}

export default UserPage;













