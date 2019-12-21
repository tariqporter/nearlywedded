const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const path = require('path');
const cors = require('cors');
const expressip = require('express-ip');

const app = express();
app.use(expressip().getIpInfoMiddleware);

const adminApp = admin.initializeApp();
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
  const ref = db.collection('users').doc(userId);
  const doc = await ref.get();
  if (!doc.exists) {
    return res.json({ user: { id: null } });
  }
  const data1 = doc.data();
  const user = { id: doc.id, name: data1.name };
  return res.json({ user });
});

app.post('/data/user/saveTheDateViews/:userId/', async (req, res) => {
  const defaultAuth = admin.auth();
  console.log(defaultAuth);
  // firebase.auth().signInWithEmailAndPassword('tic084@gmail.com', 'NearlyWedded!5248967041')
  //   .then((firebaseUser) => {
  //     console.log('success', firebaseUser.user.uid);
  //     return firebaseUser;
  //     // Success 
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage);
  //     // ...
  //   });
  // cyTPKaL9iVWfNDPYREDuW8IdmUV2
  // const { userId } = req.params;
  // const ref = db.collection('users').doc(userId);
  // const doc = await ref.get();
  // if (!doc.exists) {
  //   return res.json({ saveDateViewDatesLength: -1 });
  // }

  // const ipInfo = req.ipInfo;
  // const data1 = doc.data();
  // const saveDateViewDates = {
  //   date: new Date(),
  //   map: ipInfo && ipInfo.ll && ipInfo.ll.length >= 2 ? `http://www.google.com/maps/place/${ipInfo.ll[0]},${ipInfo.ll[1]}` : '',
  //   info: ipInfo
  // };

  // ref.update({
  //   saveDateViewDates: admin.firestore.FieldValue.arrayUnion(saveDateViewDates)
  // });

  // const saveDateViewDatesLength = !data1.saveDateViewDates ? 1 : data1.saveDateViewDates.length + 1;
  return res.json({});
});

app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'development') {
  app.listen(process.env.PORT || 8080);
}

const api = functions.https.onRequest(app);

module.exports = { api };