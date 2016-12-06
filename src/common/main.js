var IpInfo = null;
var BrowserProxyJson = null;
var locationInfo = null;

IpInfoStyle =
'<style scoped="scoped"> \
   #ip-info { \
      line-height: 14px; \
      bottom: 0; \
      right: 0; \
      text-align: right; \
      z-index: 2147483647; \
      position: fixed; \
      display: block; \
      height: 16px; \
      margin: 0; \
      padding: 1px 10px 1px 4px; \
      font-size: 11px; \
      font-family: "Segoe UI", "Lucida Grande", sans-serif; \
      color: #000; \
      background-color: #eee; \
      border-top: 1px solid #aaa; \
      border-left: 1px solid #aaa; \
      border-right: 1px solid #aaa; \
      border-bottom: none; \
      border-radius: 3px 0 0 3px; \
      word-wrap: break-word \
   } \
</style>';

function SendIpInfo(target) {
   target.dispatchMessage('IpInfo', IpInfo);
}

function SetIpInfo(ipInfo, callback) {
   IpInfo = IpInfoStyle + '<div id="ip-info">' + ipInfo + '</div>';
   callback();
}

function GetIpInfo(callback) {
   $.get("http://www.whatismyip.com/api/wimi.php", function(content) {
      console.log(content);
      var tds = $(content).find('td');
      var ip = tds[1].innerHTML;
      var proxy = tds[3].innerHTML;

      var ipAddress = null;
      var proxyHost = null;

      if(proxy.indexOf('PROXY DETECTED') == 0) {
         var match = proxy.match(/<br>(.+)<br>(.+)/);
         if (match != null && match.length > 2) {
            ipAddress = match[1];
            proxyHost = match[2];
         }
      } else {
         ipAddress = ip;
      }

      if(ipAddress == null) {
         SetIpInfo("Unknown IP address", callback);
         return;
      }

      $.get('http://api.hostip.info/get_html.php?ip=' + ipAddress, function(content) {
         locationInfo = content;
         console.log(content);
         var match = content.match(/Country:\s(.*)[\n]City:\s(.*)/);
         if (match != null && match.length > 2) {
            var country = match[1];
            var city = match[2];
            var ipInfo = ipAddress + ' (';
            if(typeof(city) != "undefined") {
               ipInfo += city + ', ';
            }
            ipInfo += country + ')';

            SetIpInfo(ipInfo, callback);
         }
         else {
            SetIpInfo(ipAddress + ' (Location unknown)', callback);
         }
      });
   });
}

function MyIPAddress() {
	var self = this;

   kango.browser.addEventListener(kango.browser.event.DOCUMENT_COMPLETE, function (eventDetails){
      chrome.proxy.settings.get({'incognito': false}, function(proxyConfig) {
         var proxyConfigJson = JSON.stringify(proxyConfig);
         if(proxyConfigJson != BrowserProxyJson) {
            BrowserProxyJson = proxyConfigJson;
            IpInfo = null;
         }
      });

      if(IpInfo == null) {
         GetIpInfo(function() {
            SendIpInfo(eventDetails.target);
         });
      } else {
         SendIpInfo(eventDetails.target);
      }
   });
}

var extension = new MyIPAddress();
