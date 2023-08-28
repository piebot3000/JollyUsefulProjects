//add our on load stuff
window.addEventListener("load", onload, false);
function onload() {
  //setup on click events
  document.getElementById("quizletcopy").addEventListener("click", quizletCopyClick);

  //get the current string for this tab
  getCurrentTab().then((tab) => {
    //make the correct key string based on the tab
    const keyString = "quizletString" + tab.id;

    //get the data and update the textarea to the result or a default text
    chrome.storage.session.get(keyString).then((result) => {
      document.querySelector("#quizletBox").value = result[keyString] || "If theres data to get it will be here.";
    });
  })
}

//message listener for getting quizlet strings
chrome.runtime.onMessage.addListener((message, sender) => {
  //if this is our message
  if(message.type === "quizletString") {
    console.log("quizletString recieved");

    //get the key the data for this tab will be under
    let storageKey = "quizletString" + sender.tab.id;

    //set the key to the string
    chrome.storage.session.set({ [storageKey]: message.quizletString });
    //update the textarea immediatly
    document.querySelector("#quizletBox").value = message.quizletString;
  }
});

function quizletCopyClick() {
  //copy text to clipboard and change button color to green
  navigator.clipboard.writeText(document.querySelector("#quizletBox").value);
  document.getElementById("quizletcopy").classList.add("w3-green");
}