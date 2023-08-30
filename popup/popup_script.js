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
      document.querySelector("#quizletcopy").title = result[keyString] || "If theres data to get it will be here.";
      if(result[keyString]) {
        document.querySelector("#quizletcopy").classList.remove('w3-red')
        document.querySelector("#quizletcopy").classList.add("w3-green")
      }
    });
  })
}

//message listener for getting quizlet strings
chrome.runtime.onMessage.addListener((message, sender) => {
  //if this is our message
  if (message.type === "quizletString") {
    //update the textarea immediatly
    document.querySelector("#quizletcopy").title = message.quizletString;
    document.querySelector("#quizletcopy").classList.remove('w3-red')
    document.querySelector("#quizletcopy").classList.add("w3-green")
  }
});

function quizletCopyClick() {
  //copy text to clipboard and change button color to green
  navigator.clipboard.writeText(document.querySelector("#quizletBox").value);
  document.getElementById("quizletcopy").classList.add("w3-green");
}