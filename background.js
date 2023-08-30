//allow use of session storage in content script
chrome.storage.session.setAccessLevel({ accessLevel: "TRUSTED_AND_UNTRUSTED_CONTEXTS" });

chrome.runtime.onMessage.addListener((message, sender) => {
    //get the key the data for this tab will be under
    let storageKey = "quizletString" + sender.tab.id;

    //set the key to the string
    chrome.storage.session.set({ [storageKey]: message.quizletString });
});