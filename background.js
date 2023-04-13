// 监听插件安装事件
chrome.runtime.onInstalled.addListener(function() {
  console.log('插件已安装');
});

// 监听网页加载事件
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('tab:', tab);
  if (changeInfo.status === 'complete' && tab && tab.url && tab.url.includes('https://yuyue.njucm.edu.cn/')) {
    console.log('Executing content script');
    chrome.tabs.executeScript(tabId, {file: 'content.js'});
  }
});


// 监听浏览器图标点击事件
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {file: 'content.js'});
});
