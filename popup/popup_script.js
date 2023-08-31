var quizletCopyButton;

//add our on load stuff
window.addEventListener("load", onload, false);
function onload() {
  //get our button and save it
  quizletCopyButton = document.querySelector("#quizletCopyButton");
  
  //setup on click events
  quizletCopyButton.addEventListener("click", quizletCopyClick);

  //get the current string for this tab
  getCurrentTab().then((tab) => {
    //make the correct key string based on the tab
    const keyString = "quizletString" + tab.id;

    //get the data and update the textarea to the result or a default text
    chrome.storage.session.get(keyString).then((result) => {
      quizletCopyButton.title = result[keyString] || "If theres data to get it will be here.";
      if(result[keyString]) {
        quizletCopyButton.classList.remove('w3-red')
        quizletCopyButton.classList.add("w3-green")
      }
    });
  })
}

//message listener for getting quizlet strings
chrome.runtime.onMessage.addListener((message, sender) => {
  //if this is our message
  if (message.type === "quizletString") {
    //update the textarea immediatly
    quizletCopyButton.title = message.quizletString;
    quizletCopyButton.classList.remove('w3-red')
    quizletCopyButton.classList.add("w3-green")
  }
});

function quizletCopyClick() {
  //copy text to clipboard
  navigator.clipboard.writeText(quizletCopyButton.title);

  //popup the success bar for a few seconds
  document.querySelector("#successPopupText").innerText = quizletCopyButton.title;
  var successPopup = document.querySelector("#successPopup");
  successPopup.style.display = "block";
  setTimeout(() => { successPopup.style.display = "none"; }, 2000);
}