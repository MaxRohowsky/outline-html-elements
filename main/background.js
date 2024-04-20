

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { type: "launch" }).catch(error => console.error(`Send Message Error: ${error}`));
});
