console.log("GUS: helper.js loaded");

//format a array of question objects { question: string, answer: string } into a string quizlet can import
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

//grab the dom of a url
function getSourceAsDOM(url) {
   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET", url, false);
   xmlhttp.send();
   parser = new DOMParser();
   return parser.parseFromString(xmlhttp.responseText, "text/html");
}

//get the currently focused tab
async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}