const functions = require("firebase-functions");
const admin = require('firebase-admin');
// const adminMock = require('./admin-mock');
const express = require('express');
const path = require('path');
const cors = require('cors');
const expressip = require('express-ip');

// const firebase = require("firebase/app");
// require("firebase/auth");
// require("firebase/firestore");

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD6aN6TYIRHnTw9q-mrbaDu9NYAAraV66M",
//   authDomain: "staging-nearlywedded.firebaseapp.com",
//   databaseURL: "https://staging-nearlywedded.firebaseio.com",
//   projectId: "staging-nearlywedded",
//   storageBucket: "staging-nearlywedded.appspot.com",
//   messagingSenderId: "112074444845",
//   appId: "1:112074444845:web:5ad947c4de2885f85d28a4",
//   measurementId: "G-Z9RDEN1BCY"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const app = express();
app.use(expressip().getIpInfoMiddleware);
// const config = functions.config();

// const serviceAccount = require('/Users/tariqporter/Downloads/nearlywedded-28143-firebase-adminsdk-tbogu-813b71a9e6.json');
// const serviceAccount = functions.config().serviceaccount;
// console.log(functions.config());
// if (serviceAccount) {
//   serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
// }
// else {
//   serviceAccount = {};
//   admin = adminMock;
// }

// const adminApp = admin.initializeApp();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://staging-nearlywedded.firebaseio.com"
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
  const { userId } = req.params;
  const ref = db.collection('users').doc(userId);
  const doc = await ref.get();
  if (!doc.exists) {
    return res.json({ saveDateViewDatesLength: -1 });
  }

  const ipInfo = req.ipInfo;
  const data1 = doc.data();
  const saveDateViewDates = {
    date: new Date(),
    map: ipInfo && ipInfo.ll && ipInfo.ll.length >= 2 ? `http://www.google.com/maps/place/${ipInfo.ll[0]},${ipInfo.ll[1]}` : '',
    info: ipInfo
  };

  ref.update({
    saveDateViewDates: admin.firestore.FieldValue.arrayUnion(saveDateViewDates)
  });

  const saveDateViewDatesLength = !data1.saveDateViewDates ? 1 : data1.saveDateViewDates.length + 1;
  return res.json({});
});

app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'development') {
  app.listen(process.env.PORT || 8080);
}

const api = functions.https.onRequest(app);

module.exports = { api };