const express = require('express');
const path = require('path');
// const { Pool } = require('pg');

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/events', async (req, res) => {
  const data = {
    events: [
      { id: 0, title: 'Cocktail Reception', date: 'Friday, September 4, 2020', time: '2 PM - 4:30 PM', description: 'Arrive early and have some drinks and relax.' },
      { id: 1, title: 'Wedding Ceremony', date: 'Friday, September 4, 2020', time: '4:30 PM - 5 PM', description: 'This is the ceremony.' },
      { id: 2, title: 'Wedding Reception', date: 'Friday, September 4, 2020', time: '5 PM - 11 PM', description: 'Following the ceremony, we look forward to continuing the celebration with dinner and dancing.' }
    ]
  };
  return res.json(data);
});

// app.get('/venues', async (req, res) => {
//   const client = await pool.connect()
//   const result = await client.query('SELECT * FROM venue');
//   const results = { venues: result ? result.rows : null };
//   res.json(results);
// });

app.listen(process.env.PORT || 8080);