console.log("GUS: helper.js loaded");

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

function getSourceAsDOM(url) {
   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET", url, false);
   xmlhttp.send();
   parser = new DOMParser();
   return parser.parseFromString(xmlhttp.responseText, "text/html");
}