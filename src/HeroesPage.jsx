import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './context/UserContext';
import './HeroesPage.css';

function HeroesPage() {
  const { currentUser } = useUser();
  const [heroes, setHeroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('a');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHeroes() {
      if (!searchTerm) return;
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/superhero/search/${searchTerm}`);
        setHeroes(response.data.results || []);
      } catch (err) {
        setError('Error fetching heroes');
      } finally {
        setLoading(false);
      }
    }
    fetchHeroes();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  async function handleSaveHero(hero) {
    if (!hero || !currentUser || !currentUser.id) return;
  
    try {
      const response = await axios.get(`http://localhost:5000/api/superhero/saved/${currentUser.id}`);
      const isHeroSaved = response.data.some((savedHero) => savedHero.id === hero.id);
  
      if (isHeroSaved) {
        console.log("Hero is already saved.");
        return;
      }
  
      await axios.post("http://localhost:5000/api/superhero/save", {
        userId: currentUser.id,
        hero,
      });
      console.log("Hero saved successfully");
    } catch (error) {
      console.error("Error saving hero:", error);
    }
  }
  

  return (
    <div className="heroes-page">
      <h2>Heroes</h2>
      <input
        type="text"
        placeholder="Search for a hero"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="hero-list">
        {heroes.map(hero => (
          <div key={hero.id} className="hero-item">
            <img src={hero.image.url} alt={hero.name} className="hero-image" />
            <div className="hero-info">
              <h3>{hero.name}</h3>
              <p>Intelligence: {hero.powerstats.intelligence}</p>
              <p>Strength: {hero.powerstats.strength}</p>
              <p>Speed: {hero.powerstats.speed}</p>
              <p>Durability: {hero.powerstats.durability}</p>
              <p>Power: {hero.powerstats.power}</p>
              <p>Combat: {hero.powerstats.combat}</p>
              <button
                className="save-hero-button"
                onClick={() => handleSaveHero(hero)}
              >
                Save Hero
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroesPage;














