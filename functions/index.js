const functions = require("firebase-functions");
let admin = require('firebase-admin');
const adminMock = require('./admin-mock');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
let serviceAccount = functions.config().serviceaccount;
if (serviceAccount) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  // var serviceAccount = env.ENVIRONMENT === 'PRODUCTION' ? require("./service-account.json") : require("./staging-service-account.json");
}
else {
  serviceAccount = {};
  admin = adminMock;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccount.databaseurl
});
const db = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get('/data/events/', async (req, res) => {
  const data1 = await db.collection('events').get();
  const data = {
    events: data1.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  };
  return res.json(data);
});

app.get('/data/user/:userId/', async (req, res) => {
  const { userId } = req.params;
  // const users = {
  //   '8b10131a-5eb1-4095-b441-59bddb9d6134': { id: '8b10131a-5eb1-4095-b441-59bddb9d6134', firstName: 'Tariq', lastName: 'Porter' },
  //   '95abc15b-0be6-4d2c-ada8-6332abbdbc7c': { id: '95abc15b-0be6-4d2c-ada8-6332abbdbc7c', firstName: 'Irina', lastName: 'Zamyatin' }
  // };
  const data1 = await db.collection('users').doc(userId).get();
  const data2 = data1.data();
  const user = data2 ? { id: data1.id, ...data2 } : null;
  // const data = {
  //   events: data1.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  // };
  return res.json({ user });
});

app.use(express.static(path.join(__dirname, 'build')));

// app.get('/venues', async (req, res) => {
//   const client = await pool.connect()
//   const result = await client.query('SELECT * FROM venue');
//   const results = { venues: result ? result.rows : null };
//   res.json(results);
// });

if (process.env.NODE_ENV === 'development') {
  app.listen(process.env.PORT || 8080);
}

const api = functions.https.onRequest(app);

module.exports = { api };