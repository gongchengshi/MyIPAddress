// ==UserScript==
// @name MyIPAddressContentScript
// @include http://*
// @include https://*
// ==/UserScript==

kango.addMessageListener('IpInfo', function(event) {
   $('body').append($(event.data));
});
