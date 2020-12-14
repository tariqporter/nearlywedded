const fs = require('fs');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');
const { getEmail } = require('./templates/saveTheDate');
// const { getRsvpEmail } = require('./templates/rsvp');
const { getUpdate1Email } = require('./templates/update1');
const { getLocationInfo } = require('./getLocationInfo');

const serviceAccountPath = './function-config.json';

admin.initializeApp({
  credential: fs.existsSync(serviceAccountPath)
    ? admin.credential.cert(require(serviceAccountPath).serviceaccount)
    : admin.credential.applicationDefault(),
});
const db = admin.firestore();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().mailer.admin_email,
    pass: functions.config().mailer.admin_password,
  },
  dkim: {
    domainName: 'nearylwedded.com',
    keySelector: 'key1',
    privateKey: functions.config().mailer.private_key,
  },
});

// module.exports.sendRsvpEmail = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     const { userId } = req.body.data;
//     const data = { data: { err: 'sent', success: true } };
//     try {
//       const ref = db.collection('users').doc(userId);
//       const doc = await ref.get();
//       const data1 = doc.data();
//       const mailOptions = {
//         from: 'Tariq & Irina <info@nearlywedded.com>',
//         to: 'tic084@gmail.com',
//         subject: 'Tariq & Irina are getting married - September 4th 2020',
//         html: getRsvpEmail({ id: doc.id, name: data1.name }),
//       };

//       return transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//           data.data.err = `err: ${err.toString()}`;
//           data.data.success = false;
//           return res.json(data);
//         }
//         return res.json(data);
//       });
//     } catch (err) {
//       console.log('sendRsvpEmail', err);
//     }
//     return res.json(data);
//   });
// });

module.exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { userId } = req.body.data;
    const data = { data: { err: 'sent', success: true } };
    try {
      const ref = db.collection('users').doc(userId);
      const doc = await ref.get();
      const data1 = doc.data();
      const mailOptions = {
        from: 'Tariq & Irina <info@nearlywedded.com>',
        to: data1.email,
        subject: 'Tariq & Irina are getting married - UPDATE: May 9th 2021',
        html: getUpdate1Email({ id: doc.id, name: data1.name }),
      };

      return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          data.data.err = `err: ${err.toString()}`;
          data.data.success = false;
          return res.json(data);
        }
        return res.json(data);
      });
    } catch (err) {
      console.log('sendEmail', err);
    }
    return res.json(data);
  });
});

module.exports.getEvents = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const data = { data: { events: [] } };
    try {
      const data1 = await db.collection('events').get();
      data.data.events = data1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.log('getEvents', err);
    }
    return res.json(data);
  });
});

module.exports.getHotels = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const data = { data: { hotels: [] } };
    try {
      const data1 = await db.collection('hotels').get();
      data.data.hotels = data1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.log('getHotels', err);
    }
    return res.json(data);
  });
});

module.exports.getFaqs = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const data = { data: { faqs: [] } };
    try {
      const data1 = await db.collection('faqs').get();
      data.data.faqs = data1.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.log('getFaqs', err);
    }
    return res.json(data);
  });
});

module.exports.getUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { userId } = req.body.data;
    const data = { data: { user: { id: null } } };
    try {
      if (!userId) res.json(data);
      const ref = db.collection('users').doc(userId);
      const doc = await ref.get();
      if (!doc.exists) return res.json(data);

      const ipInfo = getLocationInfo(req);
      const { saveDateViewDates, viewDates, ...data1 } = doc.data();
      const newViewDate = {
        date: new Date(),
        map:
          ipInfo && ipInfo.ll && ipInfo.ll.length >= 2
            ? `http://www.google.com/maps/place/${ipInfo.ll[0]},${ipInfo.ll[1]}`
            : '',
        info: ipInfo || null,
      };

      ref.update({
        viewDates: viewDates ? admin.firestore.FieldValue.arrayUnion(newViewDate) : [newViewDate],
      });

      data.data.user = { id: doc.id, ...data1 };
    } catch (err) {
      console.log('getUser', err);
    }
    return res.json(data);
  });
});

module.exports.viewSaveTheDate = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { userId } = req.body.data;
    const data = { data: { saveDateViewDatesLength: 1 } };
    try {
      const ref = db.collection('users').doc(userId);
      const doc = await ref.get();
      if (!doc.exists) {
        data.data.saveDateViewDatesLength = -1;
        return res.json(data);
      }

      const ipInfo = getLocationInfo(req);
      const data1 = doc.data();
      const saveDateViewDates = {
        date: new Date(),
        map:
          ipInfo && ipInfo.ll && ipInfo.ll.length >= 2
            ? `http://www.google.com/maps/place/${ipInfo.ll[0]},${ipInfo.ll[1]}`
            : '',
        info: ipInfo || null,
      };

      ref.update({
        saveDateViewDates: admin.firestore.FieldValue.arrayUnion(saveDateViewDates),
      });
      data.data.saveDateViewDatesLength = data1.saveDateViewDates.length + 1;
    } catch (err) {
      console.log('viewSaveTheDate', err);
    }
    return res.json(data);
  });
});

module.exports.submitRsvpSelection = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { userId, rsvp, guestName } = req.body.data;
    const data = { data: { rsvp, guestName } };
    try {
      const ref = db.collection('users').doc(userId);
      const doc = await ref.get();
      if (!doc.exists) {
        data.data.rsvp = 'error';
        return res.json(data);
      }
      const data1 = doc.data();
      const updateObj = {};
      if (!data1.rsvp) updateObj.rsvp = rsvp;
      if (guestName) updateObj.guestName = guestName;
      ref.update(updateObj);
    } catch (err) {
      console.log('submitRsvpSelection', err);
    }
    return res.json(data);
  });
});
