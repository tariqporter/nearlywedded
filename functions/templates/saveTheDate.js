module.exports.getEmail = ({ id, name }) =>
  `
<div style="background:rgba(130,215,255,0.2)">
  <table width="450" border="0" cellpadding="0" cellspacing="0" align="center" style="text-align:center;border-collapse:collapse">
      <tbody>
          <tr>
              <td width="450" height="50"></td>
          </tr>
      </tbody>
  </table>
  <table width="450" border="0" cellpadding="0" cellspacing="0" align="center" style="background:#fff;padding:30px;border:4px rgba(214,228,224,0.5) solid">
      <tbody>
          <tr>
              <td width="450" valign="middle" align="center" height="30" style="font-family:Georgia,Times,'Times New Roman',serif;font-size:26px">
                  Tariq &amp; Irina
              </td>
          </tr>
          <tr>
              <td width="450" valign="middle" align="center" height="30" style="font-family:Georgia,Times,'Times New Roman',serif;color:#777">
                  ARE GETTING MARRIED!
              </td>
          </tr>
          <tr>
              <td width="450" valign="middle" align="center" height="30">
                  <div style="text-align:left;margin-top:10px">
                      <font face="georgia, serif">
            Dear <span style="font-size:13.3333px">${name}</span>,</font>
        </div>
        <div style="text-align:left;margin-top:10px">
          <font face="georgia, serif">
            We've set a date for our wedding and can't wait to share the day
            with you!
          </font>
        </div>
      </td>
    </tr>
    <tr height="100px">
      <td width="450" valign="middle" align="center" height="30">
        <a
          href="https://nearlywedded.com/save-the-date?userid=${id}"
          style="text-decoration:none;color:#fff;background:#494b4d;padding:10px;height:34px;border-radius:16px;font-family:Georgia,Times,'Times New Roman',serif"
          target="_blank">
          Open Save the Date
          </a>
      </td>
    </tr>
  </tbody>
</table>
<table
  width="450"
  border="0"
  cellpadding="0"
  cellspacing="0"
  align="center"
  style="text-align:center;border-collapse:collapse">
  <tbody>
    <tr>
      <td width="450" height="50"></td>
    </tr>
  </tbody>
</table>
<table
  width="450"
  border="0"
  cellpadding="0"
  cellspacing="0"
  align="center"
  style="text-align:center;border-collapse:collapse">
  <tbody>
    <tr>
      <td width="450" height="50"></td>
    </tr>
  </tbody>
</table>
</div>`;
