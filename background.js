//NoBing
//by Luke Rehmann < l@rehmann.co >
//   http://rehmann.co

function sleep(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}

   chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
            	alert(details.requestHeaders[i].value);
              details.requestHeaders.splice(i, 1);
              break;
            }
          }
          return {requestHeaders: details.requestHeaders};
        },
        {urls: [
      "https://www.bing.com/*",
      "https://m.bing.com/*",
      "http://www.bing.com/*",
      "http://m.bing.com/*",
    ]},
        ["blocking", "requestHeaders"]);

chrome.webRequest.onHeadersReceived.addListener(
  function(info) {
      var requrl=info.url;
      var googurl=requrl.replace('www.bing.com/search', 'www.google.com/search');

	  if (requrl.indexOf('www.bing.com/search')>-1 && requrl.indexOf('setmkt')==-1){
	  	chrome.tabs.update(info.tabId, {url: googurl  });
	  } else if (requrl.indexOf('www.bing.com/search')>-1){
	  	sleep(50)
	  	chrome.tabs.update(info.tabId, {url: googurl  });
	  }
  },
  {
    urls: [
      "https://www.bing.com/*",
      "https://m.bing.com/*",
      "http://www.bing.com/*",
      "http://m.bing.com/*",
    ],
    types: ["main_frame"]
  });