InnerHtml =
'<table> \
<tr> \
   <td>Your IP: </td> \
   <td>74.117.212.100</td> \
</tr> \
<tr> \
<td>Proxy: </td> \
<td>PROXY DETECTED<br>208.87.233.180<br>1.1 webdefence.global.blackspider.com:8081 16g</td> \
</tr> \
<tr> \
   <td>Location: </td> \
   <td>-, -<br>-, US<br></td> \
   </tr> \
   <tr> \
      <td>ISP: </td>\
      <td>SCHWEITZER ENGINEERING LABORATORIES INC.</td> \
   </tr> \
</table>';

InnerHtml2 =
'<style>td{ padding: 5px; }</style> \
<table> \
   <tr>\
      <td>Your IP: </td>\
      <td>74.117.212.38</td>\
   </tr>\
   <tr>\
      <td>Proxy: </td>\
      <td>NO PROXY DETECTED<br></td>\
   </tr>\
   <tr>\
      <td>Location: </td>\
      <td>-, -<br>-, US<br></td>\
   </tr>\
   <tr>\
      <td>ISP: </td>\
      <td>SCHWEITZER ENGINEERING LABORATORIES INC.</td>\
   </tr>\
</table>';

$(document).ready(function() {
	var tds = $(InnerHtml).find('td');
   var ip = tds[1].innerHTML;
   var proxy = tds[3].innerHTML;

   var ipInfo = null;

   if(proxy.indexOf('PROXY DETECTED') == 0) {
      var match = proxy.match(/<br>(.+)<br>(.+)/);
      if (match != null && match.length > 2) {
         ipInfo = match[1] + ' (' + match[2] + ')';
      } else {
         ipInfo = "Failed to get your IP Address"
      }
   }
   else {
      ipInfo = ip;
   }

   document.write(ipInfo)
});