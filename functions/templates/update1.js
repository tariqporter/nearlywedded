module.exports.getUpdate1Email = ({ id, name }) =>
  `
<div style="background:rgba(130,215,255,0.2)">
  <table width="450" border="0" cellpadding="0" cellspacing="0" align="center" style="text-align:center;border-collapse:collapse;">
      <tbody>
          <tr>
              <td width="450" height="50"></td>
          </tr>
      </tbody>
  </table>
  <table width="450" border="0" cellpadding="0" cellspacing="0" align="center" style="background:#fff;padding:30px;border:4px rgba(214,228,224,0.5) solid;color:#000;">
      <tbody>
          <tr>
              <td width="450" valign="middle" align="center" height="30" style="font-family:Georgia,Times,'Times New Roman',serif;font-size:26px;">
                  Tariq &amp; Irina
              </td>
          </tr>
          <tr>
              <td width="450" valign="middle" align="center" height="30" style="font-family:Georgia,Times,'Times New Roman',serif;color:#777">
                  ARE GETTING MARRIED...EVENTUALLY!
              </td>
          </tr>
          <tr>
              <td width="450" valign="middle" align="center" height="30">
                  <div style="text-align:left;margin-top:10px">
                      <font face="georgia, serif">
            Dear <span style="font-size:13.3333px">${name}</span>,</font>
        </div>
        <div style="text-align:left;margin-top:10px;">
          <font face="georgia, serif" style="color:#000;">
            We love you and can't wait to see you to celebrate our union. 
            However, due to this pesky virus, we will have to wait a short while longer before we can all come together and celebrate. 
            In an effort to make sure that you can all safely join us for our wedding, we have moved our wedding to Sunday, May 9, 2021. 
            <br><br>
            The venue remains the same, as does our enthusiasm to come together. 
            We are sorry for any inconvenience this will create with having to alter travel arrangements.
            If you have any trouble, please let us know and we will try to help. 
            <br><br>
            In the meantime, stay safe and sane. We can't wait to see you!
            <br><br>
          </font>
        </div>
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
  <div style="display:none;">${new Date().toString()}</div>
</table>
</div>`;
