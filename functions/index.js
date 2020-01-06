const fs = require('fs');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const geoip = require('geoip-lite');
const nodemailer = require('nodemailer');
const { getEmail } = require('./templates/saveTheDate');

const serviceAccountPath = './function-config.json';

// const app = express();
// app.use(expressip().getIpInfoMiddleware);
admin.initializeApp({
  credential: fs.existsSync(serviceAccountPath)
    ? admin.credential.cert(require(serviceAccountPath).serviceaccount)
    : admin.credential.applicationDefault(),
});
const db = admin.firestore();

// Automatically allow cross-origin requests
// app.use(cors);

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

const getIpInfo = ip => {
  // IPV6 addresses can include IPV4 addresses
  // So req.ip can be '::ffff:86.3.182.58'
  // However geoip-lite returns null for these
  if (ip.includes('::ffff:')) {
    ip = ip.split(':').reverse()[0];
  }
  const lookedUpIP = geoip.lookup(ip);
  if (ip === '127.0.0.1' || ip === '::1') {
    return { error: "This won't work on localhost" };
  }
  if (!lookedUpIP) {
    return { error: 'Error occured while trying to process the information' };
  }
  return lookedUpIP;
};

const getLocationInfo = req => {
  const xForwardedFor = (req.headers['x-forwarded-for'] || '').replace(
    /:\d+$/,
    ''
  );
  const ip = xForwardedFor || req.connection.remoteAddress;
  req.ipInfo = getIpInfo(ip);
};

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
        to: 'tic084@gmail.com',
        subject: 'Save the date - September 4th 2020',
        html: getEmail({ id: doc.id, name: data1.name }),
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
      data.data = {
        events: data1.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      };
    } catch (err) {
      console.log('getEvents', err);
    }
    return res.json(data);
  });
});

module.exports.getUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { userId } = req.body.data;
    const data = { data: { user: { id: null } } };
    try {
      const ref = db.collection('users').doc(userId);
      const doc = await ref.get();
      if (!doc.exists) {
        return res.json(data);
      }
      const data1 = doc.data();
      data.data.user = { id: doc.id, name: data1.name };
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
        saveDateViewDates: admin.firestore.FieldValue.arrayUnion(
          saveDateViewDates
        ),
      });
      data.data.saveDateViewDatesLength = data1.saveDateViewDates.length + 1;
    } catch (err) {
      console.log('viewSaveTheDate', err);
    }
    return res.json(data);
  });
});

// app.use(express.static(path.join(__dirname, 'build')));

// if (process.env.NODE_ENV === 'development') {
//   app.listen(process.env.PORT || 5000);
// }
