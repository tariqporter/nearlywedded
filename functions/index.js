const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const path = require('path');
// const cors = require('cors');
const cors = require('cors')({ origin: true });
const expressip = require('express-ip');
const nodemailer = require('nodemailer');

const app = express();
app.use(expressip().getIpInfoMiddleware);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

// Automatically allow cross-origin requests
app.use(cors);

// console.log(`functions.config(): ${JSON.stringify(functions.config())}`);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().mailer.admin_email,
    pass: functions.config().mailer.admin_password,
  },
});

const sendEmail = functions.https.onRequest((req, res) => {
  console.log(req.body, req.params);
  cors(req, res, async () => {
    const { userId } = req.body.data;
    console.log(userId);
    const ref = db.collection('users').doc(userId);
    const doc = await ref.get();
    const data1 = doc.data();
    console.log(data1);

    const mailOptions = {
      from: 'Nearly Wedded <info@nearlywedded.com>',
      to: 'tic084@gmail.com',
      subject: 'Save the date - September 4th 2020',
      html: `<div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"=
      gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><=
      div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div =
      dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail=
      _quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div c=
      lass=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=
      =3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_qu=
      ote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div clas=
      s=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"l=
      tr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote">=
      <div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"=
      gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><=
      div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div =
      dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail=
      _quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div c=
      lass=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=
      =3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_qu=
      ote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div clas=
      s=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"l=
      tr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote">=
      <div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"=
      gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><=
      div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div =
      dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail=
      _quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div c=
      lass=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=
      =3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_qu=
      ote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div dir=3D"ltr"><div clas=
      s=3D"gmail_quote"><div dir=3D"ltr"><div class=3D"gmail_quote"><div style=3D=
      "background:rgba(130,215,255,0.2)"><table width=3D"450" border=3D"0" cellpa=
      dding=3D"0" cellspacing=3D"0" align=3D"center" style=3D"text-align:center;b=
      order-collapse:collapse">
            <tbody>
              <tr>
                <td width=3D"450" height=3D"50"></td>
              </tr>
            </tbody>
          </table>
          <table width=3D"450" border=3D"0" cellpadding=3D"0" cellspacing=3D"0" a=
      lign=3D"center" style=3D"background:#fff;padding:30px;border:4px rgba(214,2=
      28,224,0.5) solid">
            <tbody>
              <tr>
                <td width=3D"450" valign=3D"middle" align=3D"center" height=3D"30=
      " style=3D"font-family:Georgia,Times,&#39;Times New Roman&#39;,serif;font-s=
      ize:26px">
                  Tariq &amp; Irina
                </td>
              </tr>
              <tr>
                <td width=3D"450" valign=3D"middle" align=3D"center" height=3D"30=
      " style=3D"font-family:Georgia,Times,&#39;Times New Roman&#39;,serif;color:=
      #777">
                  ARE GETTING MARRIED!
                </td>
              </tr>
              <tr>
                <td width=3D"450" valign=3D"middle" align=3D"center" height=3D"30=
      ">
                  <div style=3D"text-align:left;margin-top:10px"><font face=3D"ge=
      orgia, serif">
                    Dear <span style=3D"font-size:13.3333px">Leila</span>,</font>=
      </div>
                  <div style=3D"text-align:left;margin-top:10px"><font face=3D"ge=
      orgia, serif">
                    We&#39;ve set a date for our wedding and can&#39;t wait to sh=
      are the day with you!</font></div>
                </td>
              </tr>
              <tr height=3D"100px">
                <td width=3D"450" valign=3D"middle" align=3D"center" height=3D"30=
      ">
                  <a href=3D"https://nearlywedded.com/save-the-date?userid=3DSJvD=
      FTHnHwj9vQEwKdmb" style=3D"text-decoration:none;color:#fff;background:#494b=
      4d;padding:10px;height:34px;border-radius:16px;font-family:Georgia,Times,&#=
      39;Times New Roman&#39;,serif" target=3D"_blank">Open Save the Date</a>
                </td>
              </tr>
            </tbody>
          </table>
          <table width=3D"450" border=3D"0" cellpadding=3D"0" cellspacing=3D"0" a=
      lign=3D"center" style=3D"text-align:center;border-collapse:collapse">
            <tbody>
              <tr>
                <td width=3D"450" height=3D"50"></td>
              </tr>
            </tbody>
          </table>
          <table width=3D"450" border=3D"0" cellpadding=3D"0" cellspacing=3D"0" a=
      lign=3D"center" style=3D"text-align:center;border-collapse:collapse">
            <tbody>
              <tr>
                <td width=3D"450" height=3D"50"></td>
              </tr>
            </tbody>
          </table>
        </div>
          `,
    };

    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.json({ data: `err: ${err.toString()}` });
      }
      return res.json({ data: 'sent' });
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
