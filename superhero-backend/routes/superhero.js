const express = require('express');
const axios = require('axios');
const router = express.Router();
const SavedHero = require('../models/SavedHero');

router.get('/search/:name', async (req, res) => {
  const name = req.params.name;
  const token = process.env.SUPERHERO_API_TOKEN;

  try {
    const response = await axios.get(`https://superheroapi.com/api/${token}/search/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching superhero data' });
  }
});

router.post('/save', async (req, res) => {
  const { userId, hero } = req.body;

  try {
    const savedHero = await SavedHero.create({
      user_id: userId,
      hero_id: hero.id,
      hero_data: hero
    });
    res.status(201).json(savedHero);
  } catch (error) {
    res.status(500).json({ error: 'Error saving hero' });
  }
});

router.get('/saved/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const savedHeroes = await SavedHero.findAll({ where: { user_id: userId } });
    res.json(savedHeroes.map(hero => hero.hero_data));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching saved heroes' });
  }
});

router.delete('/delete/:heroId', async (req, res) => {
  const { heroId } = req.params;
  const { userId } = req.body;

  try {
    const deletedHero = await SavedHero.destroy({
      where: {
        hero_id: heroId,
        user_id: userId
      }
    });

    if (deletedHero) {
      res.status(200).json({ message: 'Hero deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Hero not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting hero' });
  }
});

module.exports = router;










