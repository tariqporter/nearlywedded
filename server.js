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
      {
        id: 0,
        title: 'Wedding Ceremony on site',
        location: '',
        time: '5:30 PM - 6 PM',
        description: 'Make sure to get here by 5 PM'
      },
      {
        id: 1,
        title: 'Cocktail hour',
        location: 'Old Barn & Garden Area',
        time: '6 PM - 7 PM',
        description: 'Following the ceremony, grab yourself a drink and explore the barn and garden'
      },
      {
        id: 2,
        title: 'Sit-down dinner',
        location: 'Reception Barn',
        time: '7 PM - 11 PM',
        description: 'Get your dinner on!'
      }
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