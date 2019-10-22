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

app.get('/data/events/', async (req, res) => {
  const data1 = await db.collection('events').get();
  const data = {
    events: data1.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  };
  return res.json(data);
});

app.get('/data/user/:userId/', async (req, res) => {
  const { userId } = req.params;
  const data1 = await db.collection('users').doc(userId).get();
  const data2 = data1.data();
  const user = data2 ? { id: data1.id, ...data2 } : null;
  return res.json({ user });
});

app.post('/data/user/saveTheDateViews/:userId/', async (req, res) => {
  const { userId } = req.params;
  const doc = db.collection('users').doc(userId);
  const union = doc.update({
    saveDateViewDates: admin.firestore.FieldValue.arrayUnion(new Date())
  });
  const saveDateViewDates = await union;
  return res.json({ saveDateViewDates });
});

app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'development') {
  app.listen(process.env.PORT || 8080);
}

const api = functions.https.onRequest(app);

module.exports = { api };