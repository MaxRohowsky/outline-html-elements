

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { type: "launch" }).catch(error => console.error(`Send Message Error: ${error}`));
});

/*
chrome.runtime.onInstalled.addListener((object) => {
  // Inject Extension on install
  const manifest = chrome.runtime.getManifest();

  const injectIntoTab = (tab) => {
    const scripts = manifest.content_scripts[0].js;
    const s = scripts.length;
    console.log("Scripts: ", scripts);

    const styles = manifest.content_scripts[0].css;
    const st = styles.length;
    console.log("Styles: ", styles);

    for (let i = 0; i < s; i++) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [scripts[i]],
      });
    }

    for (let i = 0; i < st; i++) {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: [styles[i]],
      });
    }

    setTimeout(() => {
      if (tab.url && (tab.url.includes("twitter.com/compose/post") || tab.url.includes("x.com/compose/post"))) {
        chrome.tabs.sendMessage(tab.id, { type: "POST" }).catch(error => console.error(`Send Message Error: ${error}`));
      }

    }, 4000);
  };

  // Get all windows
  chrome.windows.getAll(
    {
      populate: true,
    },
    (windows) => {
      let currentWindow;
      const w = windows.length;

      for (let i = 0; i < w; i++) {
        currentWindow = windows[i];

        let currentTab;
        const t = currentWindow.tabs.length;

        for (let j = 0; j < t; j++) {
          currentTab = currentWindow.tabs[j];
          console.log("Current Tab: ", currentTab);
          if (currentTab.url.includes("twitter.com") || currentTab.url.includes("x.com")) {
            console.log("Injecting into tab: ", currentTab);
            injectIntoTab(currentTab);

          }
        }
      }
    }
  );

  if (object.reason === "install") {
    chrome.tabs.create({ url: "https://maxontech.io/x-font-editor" });
  }
});
*/