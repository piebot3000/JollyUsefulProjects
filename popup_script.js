window.addEventListener("load", onload, false);
function onload() {
  document.getElementById("quizletcopy").addEventListener("click", quizletCopyClick);
  chrome.storage.session.get('quizletString').then((result) => {
    document.querySelector("#quizletBox").value = result["quizletString"] || "Text will show up here.";
  });
}

chrome.runtime.onMessage.addListener((message) => {
  console.log("message recieved");
  if(message.type === "quizletString") {
    console.log("right type");
    document.querySelector("#quizletBox").value = message.quizletString;
  }
});

function quizletCopyClick() {
  navigator.clipboard.writeText(document.querySelector("#quizletBox").value);
  document.getElementById("quizletcopy").classList.add("w3-green");
}