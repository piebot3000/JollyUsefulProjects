var quizletCopyButton;

function formatQuizlet(questions) {
  const COLUMN_DELIM = "----";
  const ROW_DELIM = "||||";

  var buffer = "";
  for (i of questions) {
    buffer += i.question;
    buffer += COLUMN_DELIM;
    buffer += i.answer;
    buffer += ROW_DELIM;
  }

  buffer = buffer.replace(/(\r\n|\n|\r)/gm, "");
  buffer = buffer.replace(/ +(?= )/g, '');

  return buffer;
}

//get the currently focused tab
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

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
  if (message.quizletQuestions) {
    //update the textarea immediatly
    quizletCopyButton.title = formatQuizlet(message.quizletString);
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