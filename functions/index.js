const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const path = require('path');
const cors = require('cors');
const expressip = require('express-ip');
const nodemailer = require('nodemailer');

const app = express();
app.use(expressip().getIpInfoMiddleware);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().mailer.admin_email,
    pass: functions.config().mailer.admin_password,
  },
});

const sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { userId } = req.query;
    console.log(userId);
    const ref = db.collection('users').doc(userId);
    const doc = await ref.get();
    const data1 = doc.data();
    console.log(data1);

    const mailOptions = {
      from: 'Nearly Wedded <info@nearlywedded.com>',
      to: 'tic084@gmail.com',
      subject: "I'M A PICKLE!!!",
      html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
              <br />
              <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
          `,
    };

    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.send(err.toString());
      }
      return res.send('Sent');
    });
  });
});

app.get('/data/events/', async (req, res) => {
  const data1 = await db.collection('events').get();
  const data = {
    events: data1.docs.map(doc => ({ id: doc.id, ...doc.data() })),
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
    map:
      ipInfo && ipInfo.ll && ipInfo.ll.length >= 2
        ? `http://www.google.com/maps/place/${ipInfo.ll[0]},${ipInfo.ll[1]}`
        : '',
    info: ipInfo,
  };

  ref.update({
    saveDateViewDates: admin.firestore.FieldValue.arrayUnion(saveDateViewDates),
  });

  const saveDateViewDatesLength = !data1.saveDateViewDates
    ? 1
    : data1.saveDateViewDates.length + 1;
  return res.json({ saveDateViewDatesLength });
});

app.use(express.static(path.join(__dirname, 'build')));

if (process.env.NODE_ENV === 'development') {
  app.listen(process.env.PORT || 8080);
}

const api = functions.https.onRequest(app);

module.exports = { api, sendEmail };
